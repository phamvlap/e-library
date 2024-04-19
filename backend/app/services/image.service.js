import mongoose from 'mongoose';
import Helper from './../utils/helper.util.js';
import Image from './../models/image.model.js';

class ImageService {
    extractImageData(payload) {
        const image = {
            image_url: payload.image_url,
            image_owner: payload.image_owner,
        };
        return Helper.extractData(image);
    }
    async find(filter) {
        const images = await Image.find(filter);
        return images;
    }
    async create(payload) {
        const data = this.extractImageData(payload);
        const image = await Image.create(data);
        return image;
    }
    async update(_id, payload) {
        const filter = {
            _id: mongoose.isValidObjectId(_id) ? new mongoose.Types.ObjectId(_id) : null,
        };
        const data = this.extractImageData(payload);
        const image = await Image.findOneAndUpdate(
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
        return image;
    }
    async delete(_id) {
        const filter = {
            _id: mongoose.isValidObjectId(_id) ? new mongoose.Types.ObjectId(_id) : null,
        };
        const image = await Image.findOneAndDelete(filter);
        return image;
    }
}

export default ImageService;
