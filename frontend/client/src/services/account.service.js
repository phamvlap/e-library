import createApiClient from './api.service.js';

class AccountService {
    constructor(baseUrl = '/api/v1/accounts', customHeaders = {}) {
        this.api = createApiClient(baseUrl, customHeaders);
    }

    async login(data) {
        return (await this.api.post('/login', data)).data;
    }
}

export default AccountService;
