import fs from 'fs';
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
            book_authors: payload.book_authors,
            publisher_id: payload.publisher_id,
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
            conditions.book_released_year = Number(filter.book_released_year);
        }
        if (filter.book_topic) {
            conditions.topic_id = mongoose.isValidObjectId(filter.book_topic)
                ? new mongoose.Types.ObjectId(filter.book_topic)
                : null;
        }
        let query = Book.aggregate([
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
        if (filter.created_at_sort) {
            query = query.sort({
                createdAt: Number(filter.created_at_sort),
            });
        }
        if(filter.limit) {
            query = query.limit(Number(filter.limit));
        }
        const books = await query;
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
    async findRealeasedYears() {
        const years = await Book.find({}).select('book_released_year').distinct('book_released_year');
        return years;
    }
    async create(payload) {
        const imageService = new ImageService();
        const data = this.extractBookData(payload);
        if (payload.book_images && payload.book_images.length === 0) {
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
            _id:  new mongoose.Types.ObjectId(_id),
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
            const oldImages = await imageService.find({
                image_owner: book._id,
            });
            if (oldImages.length > 0) {
                oldImages.forEach(async (image) => {
                    if(fs.existsSync(image.image_url)) {
                        try {
                            await unlink(image.image_url);
                        } catch (err) {
                            throw new BadRequestError(err.message);
                        }
                    }
                });
                for (const image of oldImages) {
                    await imageService.delete(image._id);
                }
            }
            const images = payload.book_images.map((image) => {
                return {
                    image_url: image.path,
                    image_owner: book._id,
                };
            });
            for (const image of images) {
                await imageService.create(image);
            }
        }
        return book;
    }
    async delete(_id) {
        const imageService = new ImageService();
        const oldImages = await imageService.find({
            image_owner: _id,
        });
        if (oldImages.length > 0) {
            for (const image in oldImages) {
                await imageService.delete(image._id);
            }
            oldImages.forEach(async (image) => {
                if(fs.existsSync(image.image_url)) {
                    try {
                        await unlink(image.image_url);
                    } catch (err) {
                        throw new BadRequestError(err.message);
                    }
                }
            });
        }
        const filter = {
            _id: mongoose.isValidObjectId(_id) ? new mongoose.Types.ObjectId(_id) : null,
        };
        const book = await Book.findOneAndDelete(filter);
        return book;
    }
}

export default BookService;
