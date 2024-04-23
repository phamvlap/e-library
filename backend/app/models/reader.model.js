import mongoose from 'mongoose';

const ReaderSchema = mongoose.Schema(
    {
        reader_id: {
            type: String,
            required: [true, 'Please provide a reader id'],
            trim: true,
        },
        reader_first_name: {
            type: String,
            required: [true, 'Please provide a reader first name'],
            trim: true,
        },
        reader_last_name: {
            type: String,
            required: [true, 'Please provide a reader last name'],
            trim: true,
        },
        reader_dob: {
            type: Date,
            required: [true, 'Please provide a reader date of birth'],
        },
        reader_gender: {
            type: String,
            enum: {
                values: ['MALE', 'FEMALE', 'OTHER'],
            },
            required: [true, 'Please provide a reader gender'],
        },
        reader_address: {
            type: String,
            required: [true, 'Please provide a reader address'],
            trim: true,
        },
        reader_phone: {
            type: String,
            required: [true, 'Please provide a reader phone'],
            length: [10, 'Please provide a valid phone number with length of 10'],
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Reader', ReaderSchema);
