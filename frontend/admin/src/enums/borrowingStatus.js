class BorrowingStatus {
    static viewStatus = {
        PENDING: 'Đang chờ xác nhận',
        CONFIRMED: 'Đã xác nhận',
        BORROWED: 'Đang mượn',
        RETURNED: 'Đã trả',
        CANCELED: 'Đã hủy',
    };
    static updatedStatus = {
        CONFIRMED: 'Duyệt đơn mượn',
        BORROWED: 'Độc giả đã nhận sách',
        RETURNED: 'Độc giả đã trả sách',
        CANCELED: 'Hủy đơn mượn',
    };
    static getKeys() {
        return Object.keys(this.viewStatus);
    }
    static retrieveStatus(status) {
        return this.viewStatus[status];
    }
    static getUpdatedKeys() {
        return Object.keys(this.updatedStatus);
    }
    static retrieveUpdatedStatus(status) {
        return this.updatedStatus[status];
    }
}

export default BorrowingStatus;
