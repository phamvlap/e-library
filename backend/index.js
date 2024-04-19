import app from './app/app.js';
import config from './app/config/index.js';
import Database from './app/db/database.js';

const PORT = config.app.port;
const URI = config.db.uri;

const startServer = async () => {
    try {
        const connection = await Database.connect(URI);
        if (connection) {
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
    } catch (error) {
        console.error('Server failed to start', error);
    }
};

startServer();
