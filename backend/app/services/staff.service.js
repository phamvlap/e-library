import Helper from './../utils/helper.util.js';
import Staff from './../models/staff.model.js';
import AccountService from './account.service.js';

class StaffService {
    extractStaffData(payload) {
        const staff = {
            staff_name: payload.staff_name,
            staff_role: payload.staff_role,
            staff_address: payload.staff_address,
            staff_phone: payload.staff_phone,
        };
        const data = Helper.extractData(staff);
        data.staff_role = data.staff_role.toUpperCase();
        return data;
    }
    async find(filter) {
        let conditions = {};
        if (filter.staff_name) {
            conditions.staff_name = {
                $regex: filter.staff_name,
                $options: 'i',
            };
        }
        if (filter.staff_role) {
            conditions.staff_role = filter.staff_role;
        }
        const staffs = await Staff.find(conditions);
        return staffs;
    }
    async findById(staffId) {
        const filter = {
            staff_id: staffId,
        };
        const staff = await Staff.findOne(filter);
        return staff;
    }
    async create(payload) {
        const accountService = new AccountService();
        const data = this.extractStaffData(payload);
        const lastStaff = await Staff.findOne({}).sort({
            createdAt: -1,
        });
        if (lastStaff) {
            const lastId = lastStaff.staff_id;
            data.staff_id = 'S' + (parseInt(lastId.substr(1)) + 1);
        } else {
            data.staff_id = 'S1001';
        }
        const accountData = {
            account_id: data.staff_id,
            account_password: Helper.generateRandomString(8),
        };
        const staff = await Staff.create(data);
        const account = await accountService.create(accountData);
        return {
            staff,
            account: {
                ...accountData,
            },
        };
    }
    async update(staffId, payload) {
        const filter = {
            staff_id: staffId,
        };
        const data = this.extractStaffData(payload);
        const staff = await Staff.findOneAndUpdate(
            filter,
            {
                $set: data,
            },
            {
                returnDocument: 'after',
                runValidators: true,
                upsert: true,
            },
        );
        return staff;
    }
    async delete(staffId) {
        const filter = {
            staff_id: staffId,
        };
        const staff = await Staff.findOneAndDelete(filter);
        return staff;
    }
}

export default StaffService;
