import mongoose from 'mongoose';
import Helper from './../utils/helper.util.js';
import Publisher from './../models/publisher.model.js';

class PublisherService {
    extractPublisherData(payload) {
        const publisher = {
            publisher_name: payload.publisher_name,
            publisher_address: payload.publisher_address,
        };
        return Helper.extractData(publisher);
    }
    async find(filter) {
        let conditions = {};
        if (filter.publisher_name) {
            conditions.publisher_name = {
                $regex: filter.publisher_name,
                $options: 'i',
            };
        }
        const publishers = await Publisher.find(conditions);
        return publishers;
    }
    async findById(_id) {
        const filter = {
            _id: mongoose.isValidObjectId(_id) ? new mongoose.Types.ObjectId(_id) : null,
        };
        const publisher = await Publisher.findOne(filter);
        return publisher;
    }
    async create(payload) {
        const data = this.extractPublisherData(payload);
        const publisher = await Publisher.create(data);
        return publisher;
    }
    async update(_id, payload) {
        const filter = {
            _id: mongoose.isValidObjectId(_id) ? new mongoose.Types.ObjectId(_id) : null,
        };
        const data = this.extractPublisherData(payload);
        const publisher = await Publisher.findOneAndUpdate(
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
        return publisher;
    }
    async delete(_id) {
        const filter = {
            _id: mongoose.isValidObjectId(_id) ? new mongoose.Types.ObjectId(_id) : null,
        };
        const publisher = await Publisher.findOneAndDelete(filter);
        return publisher;
    }
}

export default PublisherService;
