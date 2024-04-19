import mongoose from 'mongoose';

const TopicSchema = mongoose.Schema({
    topic_name: {
        type: String,
        required: [true, 'Please provide a topic name'],
        trim: true,
    },
});

export default mongoose.model('Topic', TopicSchema);
