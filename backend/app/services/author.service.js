import mongoose from 'mongoose';
import Helper from './../utils/helper.util.js';
import Author from './../models/author.model.js';

class AuthorService {
    extractAuthorData(payload) {
        const author = {
            author_name: payload.author_name,
        };
        return Helper.extractData(author);
    }
    async find(filter) {
        let conditions = {};
        if (filter.author_name) {
            conditions.author_name = {
                $regex: filter.author_name,
                $options: 'i',
            };
        }
        const authors = await Author.find(conditions);
        return authors;
    }
    async findById(_id) {
        const filter = {
            _id: mongoose.isValidObjectId(_id) ? new mongoose.Types.ObjectId(_id) : null,
        };
        const author = await Author.findOne(filter);
        return author;
    }
    async create(payload) {
        const data = this.extractAuthorData(payload);
        const author = await Author.create(data);
        return author;
    }
    async update(_id, payload) {
        const filter = {
            _id: mongoose.isValidObjectId(_id) ? new mongoose.Types.ObjectId(_id) : null,
        };
        const data = this.extractAuthorData(payload);
        const author = await Author.findOneAndUpdate(
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
        return author;
    }
    async delete(_id) {
        const filter = {
            _id: mongoose.isValidObjectId(_id) ? new mongoose.Types.ObjectId(_id) : null,
        };
        const author = await Author.findOneAndDelete(filter);
        return author;
    }
}

export default AuthorService;
