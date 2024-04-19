import mongoose from 'mongoose';

const BookSchema = mongoose.Schema({
    book_name: {
        type: String,
        required: [true, 'Please provide a book name'],
        trim: true,
    },
    book_price: {
        type: Number,
        required: [true, 'Please provide a book price'],
    },
    book_quantity: {
        type: Number,
        required: [true, 'Please provide a book quantity'],
    },
    book_borrowed_quantity: {
        type: Number,
        default: 0,
    },
    book_released_year: {
        type: Number,
        required: [true, 'Please provide a book released year'],
    },
    book_description: {
        type: String,
        required: [true, 'Please provide a book description'],
    },
    book_slug: {
        type: String,
        required: [true, 'Please provide a book slug'],
    },
    publisher_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Publisher',
        required: [true, 'Please provide a publisher id'],
    },
    author_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Author',
        required: [true, 'Please provide a author id'],
    },
    topic_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Topic',
        required: [true, 'Please provide a topic id'],
    },
});

export default mongoose.model('Book', BookSchema);
