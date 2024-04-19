import Helper from './../utils/helper.util.js';
import Reader from './../models/reader.model.js';
import AccountService from './account.service.js';

class ReaderService {
    extractReaderData(payload) {
        const reader = {
            reader_id: payload.reader_id,
            reader_first_name: payload.reader_first_name,
            reader_last_name: payload.reader_last_name,
            reader_dob: payload.reader_dob,
            reader_gender: payload.reader_gender,
            reader_address: payload.reader_address,
            reader_phone: payload.reader_phone,
        };
        return Helper.extractData(reader);
    }
    async find(filter) {
        let conditions = {};
        if (filter.reader_first_name) {
            conditions.reader_first_name = {
                $regex: filter.reader_first_name,
                $options: 'i',
            };
        }
        if (filter.reader_last_name) {
            conditions.reader_last_name = {
                $regex: filter.reader_last_name,
                $options: 'i',
            };
        }
        const readers = await Reader.find(conditions);
        return readers;
    }
    async findById(readerId) {
        const filter = {
            reader_id: readerId,
        };
        const reader = await Reader.findOne(filter);
        return reader;
    }
    async create(payload) {
        const accountService = new AccountService();
        const data = this.extractReaderData(payload);
        const lastReader = await Reader.findOne({}).sort({
            createdAt: -1,
        });
        if (lastReader) {
            const lastId = lastReader.reader_id;
            data.reader_id = 'R' + (parseInt(lastId.substr(1)) + 1);
        } else {
            data.reader_id = 'R1001';
        }
        const reader = await Reader.create(data);
        const account = await accountService.create({
            account_id: data.reader_id,
            account_password: payload.reader_password,
        });
        return reader;
    }
    async update(readerId, payload) {
        const filter = {
            readerId,
        };
        const data = this.extractReaderData(payload);
        const reader = await Reader.findOneAndUpdate(
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
        return reader;
    }
    async delete(readerId) {
        const filter = {
            reader_id: readerId,
        };
        const reader = await Reader.findOneAndDelete(filter);
        return reader;
    }
}

export default ReaderService;
