import createApiClient from './api.service.js';

class AccountService {
    constructor(baseUrl = '/api/v1/accounts', customHeaders = {}) {
        this.api = createApiClient(baseUrl, customHeaders);
    }

    async login(data) {
        return (await this.api.post('/login', data)).data;
    }

    async getMe() {
        const token = localStorage.getItem('staff-token');
        if (!token) {
            throw new Error('Token not found.');
        }
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const privateApi = createApiClient('/api/v1/accounts', headers);
        return (await privateApi.get('/me')).data;
    }
}

export default AccountService;
