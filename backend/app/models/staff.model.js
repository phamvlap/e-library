import mongoose from 'mongoose';

const StaffSchema = mongoose.Schema(
    {
        staff_id: {
            type: String,
            required: [true, 'Please provide a staff id'],
            trim: true,
        },
        staff_name: {
            type: String,
            required: [true, 'Please provide a staff name'],
            trim: true,
        },
        staff_role: {
            type: String,
            enum: {
                values: ['admin', 'staff', 'manager'], // enum validator
                message: '{VALUE} is not supported', // error message
            },
            required: [true, 'Please provide a staff role'],
            trim: true,
        },
        staff_address: {
            type: String,
            required: [true, 'Please provide a staff address'],
            trim: true,
        },
        staff_phone: {
            type: String,
            required: [true, 'Please provide a staff phone'],
            length: [10, 'Please provide a valid phone number with length of 10'],
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Staff', StaffSchema);
