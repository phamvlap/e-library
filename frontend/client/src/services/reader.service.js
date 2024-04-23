import createApiClient from './api.service.js';

class ReaderService {
    constructor(baseUrl = '/api/v1/readers', customHeaders = {}) {
        this.api = createApiClient(baseUrl, customHeaders);
    }

    async getReaders(filter) {
        if (filter) {
            const query = Object.keys(filter)
                .map((key) => `${key}=${filter[key]}`)
                .join('&');
            return (await this.api.get(`/?${query}`)).data;
        }
        return (await this.api.get('/')).data;
    }

    async getReader(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async createReader(data) {
        return (await this.api.post('/', data)).data;
    }

    async updateReader(id, data) {
        return (await this.api.patch(`/${id}`, data)).data;
    }

    async deleteReader(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default ReaderService;
