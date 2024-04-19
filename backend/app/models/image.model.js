import mongoose from 'mongoose';

const ImageSchema = mongoose.Schema({
    image_url: {
        type: String,
        required: [true, 'Please provide a image url'],
        trim: true,
    },
    image_owner: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide a id this image owner.'],
    },
});

export default mongoose.model('Image', ImageSchema);
