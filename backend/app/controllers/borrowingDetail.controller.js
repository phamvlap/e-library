import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from './../errors/index.js';
import BorrowingDetailService from './../services/borrowingDetail.service.js';

const borrowingDetailService = new BorrowingDetailService();

class BorrowingDetailController {
    async get(req, res, next) {
        try {
            const filter = {
                reader_id: req.query.reader_id,
                book_id: req.query.book_id,
                borrowed_date: req.query.borrowed_date,
                status: req.query.status,
            };
            const borrowingDetails = await borrowingDetailService.find(filter);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: borrowingDetails,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async create(req, res, next) {
        try {
            const payload = {
                reader_id: req.body.reader_id,
                book_id: req.body.book_id,
                borrowed_date: req.body.borrowed_date,
                borrowing_quantity: req.body.borrowing_quantity,
                status: req.body.status,
                status_updated_by: req.body.status_updated_by,
            };
            const borrowingDetail = await borrowingDetailService.create(payload);
            return res.status(StatusCodes.CREATED).json({
                status: 'success',
                data: borrowingDetail,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async update(req, res, next) {
        try {
            const payload = {
                reader_id: req.body.reader_id,
                book_id: req.body.book_id,
                borrowed_date: req.body.borrowed_date,
                borrowing_quantity: req.body.borrowing_quantity,
                status: req.body.status,
                status_updated_by: req.body.status_updated_by,
            };
            const borrowingDetail = await borrowingDetailService.update(req.params.id, payload);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: borrowingDetail,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async delete(req, res, next) {
        try {
            const conditions = {
                reader_id: req.body.reader_id,
                book_id: req.body.book_id,
                borrowed_date: req.body.borrowed_date,
            };
            const borrowingDetail = await borrowingDetailService.delete(conditions);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: borrowingDetail,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
}

export default new BorrowingDetailController();
