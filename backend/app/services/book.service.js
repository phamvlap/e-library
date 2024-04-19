import { unlink } from 'fs/promises';
import mongoose from 'mongoose';
import Book from './../models/book.model.js';
import ImageService from './../services/image.service.js';
import Helper from './../utils/helper.util.js';
import { BadRequestError } from './../errors/index.js';

class BookService {
    extractBookData(payload) {
        const book = {
            book_name: payload.book_name,
            book_price: payload.book_price,
            book_quantity: payload.book_quantity,
            book_borrowed_quantity: payload.book_borrowed_quantity,
            book_released_year: payload.book_released_year,
            book_description: payload.book_description,
            book_slug: payload.book_slug,
            publisher_id: payload.publisher_id,
            author_id: payload.author_id,
            topic_id: payload.topic_id,
        };
        return Helper.extractData(book);
    }
    async find(filter) {
        const conditions = {};
        if (filter.book_name) {
            conditions.book_name = {
                $regex: filter.book_name,
                $options: 'i',
            };
        }
        if (filter.book_released_year) {
            conditions.book_released_year = filter.book_released_year;
        }
        const books = await Book.aggregate([
            {
                $match: conditions,
            },
        ])
            .lookup({
                from: 'images',
                localField: '_id',
                foreignField: 'image_owner',
                as: 'images',
            })
            .lookup({
                from: 'authors',
                localField: 'author_id',
                foreignField: '_id',
                as: 'author',
            })
            .lookup({
                from: 'publishers',
                localField: 'publisher_id',
                foreignField: '_id',
                as: 'publisher',
            })
            .lookup({
                from: 'topics',
                localField: 'topic_id',
                foreignField: '_id',
                as: 'topic',
            });
        return books;
    }
    async findById(_id) {
        const filter = {
            _id: mongoose.isValidObjectId(_id) ? new mongoose.Types.ObjectId(_id) : null,
        };
        const book = await Book.aggregate([
            {
                $match: filter,
            },
        ])
            .lookup({
                from: 'images',
                localField: '_id',
                foreignField: 'image_owner',
                as: 'images',
            })
            .lookup({
                from: 'authors',
                localField: 'author_id',
                foreignField: '_id',
                as: 'author',
            })
            .lookup({
                from: 'publishers',
                localField: 'publisher_id',
                foreignField: '_id',
                as: 'publisher',
            })
            .lookup({
                from: 'topics',
                localField: 'topic_id',
                foreignField: '_id',
                as: 'topic',
            });
        return book;
    }
    async create(payload) {
        const imageService = new ImageService();
        const data = this.extractBookData(payload);
        if (payload.images && payload.book_images.length === 0) {
            throw new BadRequestError('Book images are required');
        }
        const book = await Book.create(data);
        const images = payload.book_images.map((image) => {
            return {
                image_url: image.path,
                image_owner: book._id,
            };
        });
        for (const image of images) {
            await imageService.create(image);
        }
        return book;
    }
    async update(_id, payload) {
        const imageService = new ImageService();
        const filter = {
            _id: mongoose.isValidObjectId(_id) ? new mongoose.Types.ObjectId(_id) : null,
        };
        const data = this.extractBookData(payload);
        const book = await Book.findOneAndUpdate(
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
        if (payload.book_images?.length > 0) {
            const oldImages = await Image.find({
                image_owner: book._id,
            });
            if (oldImages.length > 0) {
                for (const image in oldImages) {
                    await imageService.delete(image._id);
                }
                oldImages.forEach(async (image) => {
                    try {
                        await unlink(image.image_url);
                    } catch (err) {
                        throw new BadRequestError(err.message);
                    }
                });
            }
            const images = payload.book_images.map((image) => {
                return {
                    image_url: image.path,
                    image_owner: book._id,
                };
            });
            for (const image in images) {
                await imageService.create(image);
            }
        }
        return book;
    }
    async delete(_id) {
        const filter = {
            _id: mongoose.isValidObjectId(_id) ? new mongoose.Types.ObjectId(_id) : null,
        };
        const book = await Book.findOneAndDelete(filter);
        return book;
    }
}

export default BookService;
