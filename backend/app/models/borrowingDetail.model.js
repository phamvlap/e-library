import mongoose from 'mongoose';

const BorrowingDetailSchema = mongoose.Schema(
    {
        reader_id: {
            type: String,
            ref: 'Reader',
            required: [true, 'Please provide a reader id'],
        },
        book_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Book',
            required: [true, 'Please provide a book id'],
        },
        borrowed_date: {
            type: Date,
            required: [true, 'Please provide a borrowed date'],
        },
        returned_date: {
            type: Date,
        },
        borrowing_quantity: {
            type: Number,
            required: [true, 'Please provide a borrowing quantity'],
        },
        status: {
            type: String,
            enum: {
                values: ['pending', 'confirmed', 'borrowed', 'returned', 'cancelled'],
                messaege: '{VALUE} is not supported.',
            },
            default: 'pending',
        },
        status_updated_by: {
            type: String,
            ref: 'Staff',
            required: [true, 'Please provide a staff id'],
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('BorrowingDetail', BorrowingDetailSchema);
