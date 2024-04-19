import createApiClient from './api.service.js';

class TopicService {
    constructor(baseUrl = '/api/v1/topics', customHeaders = {}) {
        this.api = createApiClient(baseUrl, customHeaders);
    }

    async getTopics(filter) {
        if (filter) {
            const query = Object.keys(filter)
                .map((key) => `${key}=${filter[key]}`)
                .join('&');
            return (await this.api.get(`/?${query}`)).data;
        }
        return (await this.api.get('/')).data;
    }

    async getTopic(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async createTopic(data) {
        return (await this.api.post('/', data)).data;
    }

    async updateTopic(id, data) {
        return (await this.api.patch(`/${id}`, data)).data;
    }

    async deleteTopic(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default TopicService;
