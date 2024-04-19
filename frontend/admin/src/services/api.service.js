import axios from 'axios';

const commonConfig = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

export default (baseURL, customHeaders) => {
    const config = {
        baseURL,
        ...commonConfig,
        headers: {
            ...commonConfig.headers,
            ...customHeaders,
        },
    };
    return axios.create(config);
};
