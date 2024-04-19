import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Helper from './../utils/helper.util.js';
import Account from './../models/account.model.js';
import { BadRequestError } from './../errors/index.js';
import ReaderService from './reader.service.js';
import StaffService from './staff.service.js';

class AccountService {
    extractAccountData(payload) {
        const account = {
            account_id: payload.account_id,
            account_password: payload.account_password,
        };
        return Helper.extractData(account);
    }
    async findById(accountId) {
        const account = await Account.findOne({
            account_id: accountId,
        });
        return account;
    }
    async create(payload) {
        const data = this.extractAccountData(payload);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.account_password, salt);
        data.account_password = hash;
        const account = await Account.create(data);
        return account;
    }
    async login(payload) {
        const readerService = new ReaderService();
        const staffService = new StaffService();

        if (!payload.account_id || !payload.account_password) {
            throw new BadRequestError('Please fill all fields');
        }
        const account = await this.findById(payload.account_id);
        if (!account) {
            throw new BadRequestError('Account not found');
        }
        if (!bcrypt.compareSync(payload.account_password, account.account_password)) {
            throw new BadRequestError('Password is incorrect');
        }

        let data = null;
        if (account.account_id.startsWith('R')) {
            const reader = await readerService.findById(account.account_id);
            data = {
                reader_id: reader.reader_id,
                reader_first_name: reader.reader_first_name,
                reader_last_name: reader.reader_last_name,
                reader_dob: reader.reader_dob,
                reader_gender: reader.reader_gender,
                reader_address: reader.reader_address,
                reader_phone: reader.reader_phone,
            };
        } else if (account.account_id.startsWith('S')) {
            const staff = await staffService.findById(account.account_id);
            data = {
                staff_id: staff.staff_id,
                staff_name: staff.staff_name,
                staff_role: staff.staff_role,
                staff_address: staff.staff_address,
                staff_phone: staff.staff_phone,
            };
        }
        const token = jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return {
            data,
            token,
            expiresIn: 24 * 60 * 60,
        };
    }
    async changePassword(accountId, payload) {
        const currAccount = await this.findById(accountId);
        if (!currAccount) {
            throw new BadRequestError('Account not found');
        }
        if (!payload.cur_password || !payload.new_password || !payload.confirm_password) {
            throw new BadRequestError('Please fill all fields');
        }
        if (!bcrypt.compareSync(payload.cur_password, currAccount.account_password)) {
            throw new BadRequestError('Current password is incorrect');
        }
        if (payload.new_password !== payload.confirm_password) {
            throw new BadRequestError('New password does not match');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(payload.new_password, salt);
        const account = await Account.findOneAndUpdate(
            {
                account_id: accountId,
            },
            {
                $set: {
                    account_password: hash,
                },
            },
            {
                returnDocument: 'after',
                runValidators: true,
            },
        );
        return account;
    }
    async delete(accountId) {
        const filter = {
            account_id: accountId,
        };
        const account = await Account.findOneAndDelete(filter);
        return account;
    }
}

export default AccountService;
