import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from './../errors/index.js';
import StaffService from './../services/staff.service.js';

const staffService = new StaffService();

class StaffController {
    async get(req, res, next) {
        try {
            const filter = {
                staff_name: req.query.staff_name,
                staff_role: req.query.staff_role,
            };
            const staffs = await staffService.find(filter);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: staffs,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async getById(req, res, next) {
        try {
            const staff = await staffService.findById(req.params.id);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: staff,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async create(req, res, next) {
        try {
            const payload = {
                staff_name: req.body.staff_name,
                staff_role: req.body.staff_role,
                staff_address: req.body.staff_address,
                staff_phone: req.body.staff_phone,
                staff_password: req.body.staff_password,
            };
            const staff = await staffService.create(payload);
            return res.status(StatusCodes.CREATED).json({
                status: 'success',
                data: staff,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async update(req, res, next) {
        try {
            const payload = {
                staff_name: req.body.staff_name,
                staff_role: req.body.staff_role,
                staff_address: req.body.staff_address,
                staff_phone: req.body.staff_phone,
            };
            const staff = await staffService.update(req.params.id, payload);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: staff,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async delete(req, res, next) {
        try {
            const staff = await staffService.delete(req.params.id);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: staff,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
}

export default new StaffController();
