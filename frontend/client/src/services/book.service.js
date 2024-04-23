import createApiClient from './api.service.js';

class BookService {
    constructor(baseUrl = '/api/v1/books', customHeaders = {}) {
        this.api = createApiClient(baseUrl, customHeaders);
    }

    async getBooks(filter) {
        if (filter) {
            const query = Object.keys(filter)
                .map((key) => `${key}=${filter[key]}`)
                .join('&');
            return (await this.api.get(`/?${query}`)).data;
        }
        return (await this.api.get('/')).data;
    }

    async getNewBooks(quantity) {
        return await this.getBooks({
            created_at_sort: -1,
            limit: quantity,
        });
    }

    async getPopularBooks(quantity) {
        return await this.getBooks({
            borrowed_quantity_sort: -1,
            limit: quantity,
        });
    }

    async getBook(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async getReleasedYears() {
        return (await this.api.get('/years')).data;
    }

    async createBook(data) {
        return (await this.api.post('/', data)).data;
    }

    async updateBook(id, data) {
        return (await this.api.patch(`/${id}`, data)).data;
    }

    async deleteBook(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default BookService;
