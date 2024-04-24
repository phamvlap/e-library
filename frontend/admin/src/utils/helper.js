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

    static isValidStatus(oldStatus, newStatus) {
        switch (oldStatus) {
            case 'PENDING':
                return newStatus === 'CONFIRMED' || newStatus === 'CANCELLED';
            case 'CONFIRMED':
                return newStatus === 'BORROWED' || newStatus === 'CANCELLED';
            case 'BORROWED':
                return newStatus === 'RETURNED';
            default:
                return false;
        }
    }

    static getStatusError(status) {
        switch (status) {
            case 'PENDING':
                return 'Đơn hàng đang chờ xác nhận và cần phải được xác nhận trước khi mượn hoặc hủy nếu có lỗi.';
            case 'CONFIRMED':
                return 'Đơn hàng đã được xác nhận và có thể mượn hoặc hủy nếu có lỗi.';
            case 'BORROWED':
                return 'Đơn hàng đã được mượn và phải là trả lại ở trạng thái kế tiếp.';
            default:
                return 'Trạng thái không hợp lệ.';
        }
    }
}

export default Helper;
