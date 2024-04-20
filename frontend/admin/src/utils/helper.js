class Helper {
    static formatImageUrl(url) {
        return `${import.meta.env.VITE_UPLOADED_URL}/${url.split('/uploads/')[1]}`;
    }
}

export default Helper;
