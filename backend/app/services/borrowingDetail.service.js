import Helper from './../utils/helper.util.js';
import BorrowingDetail from './../models/borrowingDetail.model.js';
import BookService from './book.service.js';
import ReaderService from './reader.service.js';
import StaffService from './staff.service.js';

class BorrowingDetailService {
    extractBorrowingDetailData(payload) {
        const borrowingDetail = {
            reader_id: payload.reader_id,
            book_id: payload.book_id,
            borrowed_date: payload.borrowed_date,
            returned_date: payload.returned_date,
            borrowing_quantity: payload.borrowing_quantity,
            status: payload.status,
            status_updated_by: payload.status_updated_by,
        };
        return Helper.extractData(borrowingDetail);
    }
    async find(filter) {
        const bookService = new BookService();
        const readerService = new ReaderService();
        const staffService = new StaffService();

        let conditions = {};
        if (filter.reader_id) {
            conditions.reader_id = filter.reader_id;
        }
        if (filter.book_id) {
            conditions.book_id = filter.book_id;
        }
        if (filter.borrowed_date) {
            conditions.borrowed_date = filter.borrowed_date;
        }
        if (filter.status) {
            conditions.status = filter.status;
        }
        const borrowingDetails = await BorrowingDetail.find(conditions);
        let result = [];
        for (let borrowingDetail of borrowingDetails) {
            const book = await bookService.findById(borrowingDetail.book_id);
            const reader = await readerService.findById(borrowingDetail.reader_id);
            let updatedBy = null;
            if (borrowingDetail.status_updated_by.startsWith('S')) {
                updatedBy = await staffService.findById(borrowingDetail.status_updated_by);
            } else if (borrowingDetail.status_updated_by.startsWith('R')) {
                updatedBy = await readerService.findById(borrowingDetail.status_updated_by);
            }
            result.push({
                reader,
                book,
                borrowingDetail,
                updatedBy,
            });
        }
        return result;
    }
    async create(payload) {
        const data = this.extractBorrowingDetailData(payload);
        const borrowingDetail = await BorrowingDetail.create(data);
        return borrowingDetail;
    }
    async update(readerId, bookId, borrowedDate, payload) {
        const filter = {
            reader_id: readerId,
            book_id: bookId,
            borrowed_date: borrowedDate,
        };
        const data = this.extractBorrowingDetailData(payload);
        const borrowingDetail = await BorrowingDetail.findOneAndUpdate(
            filter,
            {
                $set: data,
            },
            {
                returnDocument: 'after',
                runValidators: true,
                upsert: true,
            },
        );
        return borrowingDetail;
    }
    async delete(readerId, bookId, borrowedDate) {
        const filter = {
            reader_id: readerId,
            book_id: bookId,
            borrowed_date: borrowedDate,
        };
        const borrowingDetail = await BorrowingDetail.findOneAndDelete(filter);
        return borrowingDetail;
    }
}

export default BorrowingDetailService;
