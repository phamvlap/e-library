import createApiClient from './api.service.js';

class BorrowingDetailService {
    constructor(baseUrl = '/api/v1/borrowing-details', customHeaders = {}) {
        this.api = createApiClient(baseUrl, customHeaders);
    }

    async getBorrowingDetails(filter) {
        if (filter) {
            const query = Object.keys(filter)
                .map((key) => `${key}=${filter[key]}`)
                .join('&');
            return (await this.api.get(`/?${query}`)).data;
        }
        return (await this.api.get('/')).data;
    }

    async createBorrowingDetail(data) {
        return (await this.api.post('/', data)).data;
    }

    async updateBorrowingDetail(id, data) {
        return (await this.api.patch(`/${id}`, data)).data;
    }

    async deleteBorrowingDetail(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default BorrowingDetailService;
