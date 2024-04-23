class Helper {
    static formatImageUrl(url) {
        return `${import.meta.env.VITE_UPLOADED_URL}/${url.split('/uploads/')[1]}`;
    }

    static formatDateTime(dateTime) {
        const date = new Date(dateTime);
        return `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${
            date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        } ${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}-${
            date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        }-${date.getFullYear()}`;
    }

    // format datetime to yyyy-mm-dd
    static formatDateStandard(dateTime) {
        const date = new Date(dateTime);
        return `${date.getFullYear()}-${date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${
            date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        }`;
    }
}

export default Helper;
