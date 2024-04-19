import mongoose from 'mongoose';

const PublisherSchema = mongoose.Schema({
    publisher_name: {
        type: String,
        required: [true, 'Please provide a publisher name'],
        trim: true,
    },
    publisher_address: {
        type: String,
        required: [true, 'Please provide a publisher address'],
        trim: true,
    },
});

export default mongoose.model('Publisher', PublisherSchema);
