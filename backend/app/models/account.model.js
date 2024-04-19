import mongoose from 'mongoose';

const AccountSchema = mongoose.Schema({
    account_id: {
        type: String,
        required: [true, 'Please provide a reader or staff id'],
    },
    account_password: {
        type: String,
        required: [true, 'Please provide a reader or staff password'],
    },
});

export default mongoose.model('Account', AccountSchema);
