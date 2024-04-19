class Helper {
    // generate random string
    static generateRandomString(length = 0) {
        let alphabet = '';
        for (let i = 'a'.charCodeAt(); i <= 'z'.charCodeAt(); ++i) {
            alphabet += String.fromCharCode(i);
        }
        for (let i = 'A'.charCodeAt(); i <= 'Z'.charCodeAt(); ++i) {
            alphabet += String.fromCharCode(i);
        }
        for (let i = '0'.charCodeAt(); i <= '9'.charCodeAt(); ++i) {
            alphabet += String.fromCharCode(i);
        }
        const alphabetLength = alphabet.length;
        let result = '';
        for (let i = 0; i < length; ++i) {
            result += alphabet[Math.floor(Math.random() * alphabetLength)];
        }
        return result;
    }
    // formate date
    static formatDate(stringDate = '') {
        let date = new Date();
        if (stringDate.length > 0) {
            date = new Date(stringDate);
        }
        return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${
            date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        } ${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${
            date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        }:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`;
    }
    // extract data
    static extractData(payload) {
        const data = {};
        if (payload) {
            Object.keys(payload).forEach((key) => {
                if (payload[key] !== undefined) {
                    data[key] = payload[key];
                }
            });
        }
        return data;
    }
    // escape data
    static escapseData(data, exceptions = []) {
        const escapedData = {};
        if (data) {
            Object.keys(data).forEach((key) => {
                if (!exceptions.includes(key)) {
                    escapedData[key] = data[key];
                }
            });
        }
        return escapedData;
    }
}

export default Helper;
