import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from './../errors/index.js';
import TopicService from './../services/topic.service.js';

const topicService = new TopicService();

class TopicController {
    async get(req, res, next) {
        try {
            const filter = {
                topic_name: req.query.topic_name,
            };
            const topics = await topicService.find(filter);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: topics,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async getById(req, res, next) {
        try {
            const topic = await topicService.findById(req.params.id);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: topic,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async create(req, res, next) {
        try {
            const payload = {
                topic_name: req.body.topic_name,
            };
            const topic = await topicService.create(payload);
            return res.status(StatusCodes.CREATED).json({
                status: 'success',
                data: topic,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async update(req, res, next) {
        try {
            const payload = {
                topic_name: req.body.topic_name,
            };
            const topic = await topicService.update(req.params.id, payload);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: topic,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async delete(req, res, next) {
        try {
            const topic = await topicService.delete(req.params.id);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: topic,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
}

export default new TopicController();
