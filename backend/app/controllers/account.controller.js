import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from './../errors/index.js';
import AccountService from './../services/account.service.js';

const accountService = new AccountService();

class AccountController {
    async login(req, res, next) {
        try {
            const payload = {
                account_id: req.body.account_id,
                account_password: req.body.account_password,
            };
            console.log(payload)
            const data = await accountService.login(payload);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async changePassword(req, res, next) {
        try {
            const payload = {
                cur_password: req.body.cur_password,
                new_password: req.body.new_password,
                confirm_password: req.body.confirm_password,
            };
            const account = await accountService.changePassword(req.params.id, payload);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: {
                    message: 'Password changed successfully',
                },
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async getMe(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader?.split(' ')[1];
            if (!token) {
                throw new UnauthorizedError('Missing token.');
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const accountId = decoded.account.account_id;
            if(!accountId) {
                throw new UnauthorizedError('Unauthorized account.');
            }
            const data = await accountService.getMe(accountId);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async logout(req, res, next) {
        try {
            // const accountService = new AccountService();
            // await accountService.logout();
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: {
                    message: 'Logout successfully',
                },
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
}

export default new AccountController();
