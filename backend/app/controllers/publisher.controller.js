import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from './../errors/index.js';
import PublisherService from './../services/publisher.service.js';

const publisherService = new PublisherService();

class PublisherController {
    async get(req, res, next) {
        try {
            const filter = {
                publisher_name: req.query.publisher_name,
            };
            const publishers = await publisherService.find(filter);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: publishers,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async getById(req, res, next) {
        try {
            const publisher = await publisherService.findById(req.params.id);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: publisher,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async create(req, res, next) {
        try {
            const payload = {
                publisher_name: req.body.publisher_name,
                publisher_address: req.body.publisher_address,
            };
            const publisher = await publisherService.create(payload);
            return res.status(StatusCodes.CREATED).json({
                status: 'success',
                data: publisher,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async update(req, res, next) {
        try {
            const payload = {
                publisher_name: req.body.publisher_name,
                publisher_address: req.body.publisher_address,
            };
            const publisher = await publisherService.update(req.params.id, payload);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: publisher,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async delete(req, res, next) {
        try {
            const publisher = await publisherService.delete(req.params.id);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: publisher,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
}

export default new PublisherController();
