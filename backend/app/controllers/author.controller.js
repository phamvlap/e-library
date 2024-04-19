import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from './../errors/index.js';
import AuthorService from './../services/author.service.js';

const authorService = new AuthorService();

class AuthorController {
    async get(req, res, next) {
        try {
            const filter = {
                author_name: req.query.author_name,
            };
            const authors = await authorService.find(filter);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: authors,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async getById(req, res, next) {
        try {
            const author = await authorService.findById(req.params.id);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: author,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async create(req, res, next) {
        try {
            const payload = {
                author_name: req.body.author_name,
            };
            const author = await authorService.create(payload);
            return res.status(StatusCodes.CREATED).json({
                status: 'success',
                data: author,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async update(req, res, next) {
        try {
            const payload = {
                author_name: req.body.author_name,
            };
            const author = await authorService.update(req.params.id, payload);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: author,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async delete(req, res, next) {
        try {
            const author = await authorService.delete(req.params.id);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: author,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
}

export default new AuthorController();
