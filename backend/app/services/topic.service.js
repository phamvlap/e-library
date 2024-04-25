import mongoose from 'mongoose';
import Helper from './../utils/helper.util.js';
import Topic from './../models/topic.model.js';

class TopicService {
    extractTopicData(payload) {
        const topic = {
            topic_name: payload.topic_name,
        };
        return Helper.extractData(topic);
    }
    async find(filter) {
        let conditions = {};
        if (filter.topic_name) {
            conditions.topic_name = {
                $regex: filter.topic_name,
                $options: 'i',
            };
        }
        const topics = await Topic.find(conditions);
        return topics;
    }
    async findById(_id) {
        const filter = {
            _id: mongoose.isValidObjectId(_id) ? new mongoose.Types.ObjectId(_id) : null,
        };
        const topic = await Topic.findOne(filter);
        return topic;
    }
    async create(payload) {
        const data = this.extractTopicData(payload);
        const topic = await Topic.create(data);
        return topic;
    }
    async update(_id, payload) {
        const filter = {
            _id: mongoose.isValidObjectId(_id) ? new mongoose.Types.ObjectId(_id) : null,
        };
        const data = this.extractTopicData(payload);
        const topic = await Topic.findOneAndUpdate(
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
        return topic;
    }
    async delete(_id) {
        console.log(_id)
        const filter = {
            _id: new mongoose.Types.ObjectId(_id),
        };
        const topic = await Topic.findOneAndDelete(filter);
        return topic;
    }
}

export default TopicService;
