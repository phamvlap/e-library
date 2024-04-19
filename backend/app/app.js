import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// routes
import accountRoutes from './routes/account.route.js';
import authorRoutes from './routes/author.route.js';
import bookRoutes from './routes/book.route.js';
import borrowingDetailRoutes from './routes/borrowingDetail.route.js';
import readerRoutes from './routes/reader.route.js';
import publisherRoutes from './routes/publisher.route.js';
import staffRoutes from './routes/staff.route.js';
import topicRoutes from './routes/topic.route.js';
// middlewares
import { errorHandler, notFoundHandler } from './middlewares/index.js';

const app = express();

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(express.static('public'));

// use routes
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/authors', authorRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/borrowing-details', borrowingDetailRoutes);
app.use('/api/v1/readers', readerRoutes);
app.use('/api/v1/publishers', publisherRoutes);
app.use('/api/v1/staffs', staffRoutes);
app.use('/api/v1/topics', topicRoutes);

// errors
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
