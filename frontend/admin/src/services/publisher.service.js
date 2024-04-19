import createApiClient from './api.service.js';

class PublisherService {
    constructor(baseUrl = '/api/v1/publishers', customHeaders = {}) {
        this.api = createApiClient(baseUrl, customHeaders);
    }

    async getPublishers(filter) {
        if (filter) {
            const query = Object.keys(filter)
                .map((key) => `${key}=${filter[key]}`)
                .join('&');
            return (await this.api.get(`/?${query}`)).data;
        }
        return (await this.api.get('/')).data;
    }

    async getPublisher(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async createPublisher(data) {
        return (await this.api.post('/', data)).data;
    }

    async updatePublisher(id, data) {
        return (await this.api.patch(`/${id}`, data)).data;
    }

    async deletePublisher(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default PublisherService;
