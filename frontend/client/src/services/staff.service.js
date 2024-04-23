import createApiClient from './api.service.js';

class StaffService {
    constructor(baseUrl = '/api/v1/staffs', customHeaders = {}) {
        this.api = createApiClient(baseUrl, customHeaders);
    }

    async getStaffs(filter) {
        if (filter) {
            const query = Object.keys(filter)
                .map((key) => `${key}=${filter[key]}`)
                .join('&');
            return (await this.api.get(`/?${query}`)).data;
        }
        return (await this.api.get('/')).data;
    }

    async getStaff(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async createStaff(data) {
        return (await this.api.post('/', data)).data;
    }

    async updateStaff(id, data) {
        return (await this.api.patch(`/${id}`, data)).data;
    }

    async deleteStaff(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default StaffService;
