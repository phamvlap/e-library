import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from './../errors/index.js';
import ReaderService from './../services/reader.service.js';

const readerService = new ReaderService();

class ReaderController {
    async get(req, res, next) {
        try {
            const filter = {
                reader_first_name: req.query.reader_first_name,
                reader_last_name: req.query.reader_last_name,
                sort_name: req.query.sort_name,
            };
            const readers = await readerService.find(filter);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: readers,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async getById(req, res, next) {
        try {
            const reader = await readerService.findById(req.params.id);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: reader,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async register(req, res, next) {
        try {
            const payload = {
                reader_first_name: req.body.reader_first_name,
                reader_last_name: req.body.reader_last_name,
                reader_dob: req.body.reader_dob,
                reader_gender: req.body.reader_gender,
                reader_address: req.body.reader_address,
                reader_phone: req.body.reader_phone,
                reader_password: req.body.reader_password,
            };
            const reader = await readerService.create(payload);
            return res.status(StatusCodes.CREATED).json({
                status: 'success',
                data: reader,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async update(req, res, next) {
        try {
            const payload = {
                reader_first_name: req.body.reader_first_name,
                reader_last_name: req.body.reader_last_name,
                reader_dob: req.body.reader_dob,
                reader_gender: req.body.reader_gender,
                reader_address: req.body.reader_address,
                reader_phone: req.body.reader_phone,
            };
            const reader = await readerService.update(req.params.id, payload);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: reader,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async delete(req, res, next) {
        try {
            const reader = await readerService.delete(req.params.id);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: reader,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
}

export default new ReaderController();
