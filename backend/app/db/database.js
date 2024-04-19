import mongoose from 'mongoose';

class Database {
    static async connect(uri) {
        try {
            const connection = await mongoose.connect(uri);
            return connection;
        } catch (error) {
            console.error('Database connection failed', error);
        }
    }
}

export default Database;
