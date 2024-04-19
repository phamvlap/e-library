import mongoose from 'mongoose';

const AuthorSchema = mongoose.Schema({
    author_name: {
        type: String,
        required: [true, 'Please provide a author name'],
        trim: true,
    },
});

export default mongoose.model('Author', AuthorSchema);
