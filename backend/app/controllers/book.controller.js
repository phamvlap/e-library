import slugify from 'slugify';
import multer from 'multer';
import { unlink } from 'fs/promises';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from './../errors/index.js';
import uploadBookImages from './../utils/uploadBookImages.util.js';
import BookService from './../services/book.service.js';

const bookService = new BookService();

class BookController {
    async get(req, res, next) {
        try {
            const filter = {
                book_name: req.query.book_name,
                book_released_year: req.query.book_released_year,
                book_topic: req.query.book_topic,
                created_at_sort: req.query.created_at_sort,
                borrowed_quantity_sort: req.query.borrowed_quantity_sort,
                limit: req.query.limit,
            };
            const books = await bookService.find(filter);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: books,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async getById(req, res, next) {
        try {
            const book = await bookService.findById(req.params.id);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: book,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async getReleasedYears(req, res, next) {
        try {
            const years = await bookService.findRealeasedYears();
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: years,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
    async create(req, res, next) {
        uploadBookImages(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                if (req.files?.length > 0) {
                    req.files.forEach(async (file) => {
                        try {
                            await unlink(file.path);
                        } catch (err) {
                            return next(new BadRequestError(err.message));
                        }
                    });
                }
                return next(new BadRequestError(err.message));
            } else if (err) {
                req.files.forEach(async (file) => {
                    try {
                        await unlink(file.path);
                    } catch (err) {
                        return next(new BadRequestError(err.message));
                    }
                });
                return next(new BadRequestError(err.message));
            }
            if (req.files?.length > 0) {
                req.body['book_images'] = [...req.files];
            }
            try {
                const payload = {
                    book_name: req.body.book_name,
                    book_price: req.body.book_price,
                    book_quantity: req.body.book_quantity,
                    book_released_year: req.body.book_released_year,
                    book_description: req.body.book_description,
                    book_slug: slugify(req.body.book_name, {
                        replacement: '_',
                        lower: true,
                        trim: true,
                    }),
                    book_authors: req.body.book_authors,
                    publisher_id: req.body.publisher_id,
                    topic_id: req.body.topic_id,
                    book_images: req.body.book_images,
                };
                const book = await bookService.create(payload);
                return res.status(StatusCodes.CREATED).json({
                    status: 'success',
                    data: book,
                });
            } catch (error) {
                if (req.files?.length > 0) {
                    req.files.forEach(async (file) => {
                        try {
                            await unlink(file.path);
                        } catch (err) {
                            return next(new BadRequestError(err.message));
                        }
                    });
                }
                next(new BadRequestError(error.message));
            }
        });
    }
    async update(req, res, next) {
        uploadBookImages(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                if (req.files?.length > 0) {
                    req.files.forEach(async (file) => {
                        try {
                            await unlink(file.path);
                        } catch (err) {
                            return next(new BadRequestError(err.message));
                        }
                    });
                }
                return next(new BadRequestError(err.message));
            } else if (err) {
                req.files.forEach(async (file) => {
                    try {
                        await unlink(file.path);
                    } catch (err) {
                        return next(new BadRequestError(err.message));
                    }
                });
                return next(new BadRequestError(err.message));
            }
            if (req.files?.length > 0) {
                req.body['book_images'] = [...req.files];
            }
            try {
                const payload = {
                    book_name: req.body.book_name,
                    book_price: req.body.book_price,
                    book_quantity: req.body.book_quantity,
                    book_released_year: req.body.book_released_year,
                    book_description: req.body.book_description,
                    book_slugify: slugify(req.body.book_name, {
                        replacement: '_',
                        lower: true,
                        trim: true,
                    }),
                    book_authors: req.body.book_authors,
                    publisher_id: req.body.publisher_id,
                    topic_id: req.body.topic_id,
                    book_images: req.body.book_images,
                };
                const book = await bookService.update(req.params.id, payload);
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    data: book,
                });
            } catch (error) {
                if (req.files?.length > 0) {
                    req.files.forEach(async (file) => {
                        try {
                            await unlink(file.path);
                        } catch (err) {
                            return next(new BadRequestError(err.message));
                        }
                    });
                }
                next(new BadRequestError(error.message));
            }
        });
    }
    async delete(req, res, next) {
        try {
            const book = await bookService.delete(req.params.id);
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: book,
            });
        } catch (err) {
            next(new BadRequestError(err.message));
        }
    }
}

export default new BookController();
