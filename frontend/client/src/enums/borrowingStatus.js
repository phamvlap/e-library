class BorrowingStatus {
    static viewStatus = {
        PENDING: 'Đang chờ xác nhận',
        CONFIRMED: 'Đã xác nhận',
        BORROWED: 'Đang mượn',
        RETURNED: 'Đã trả',
        CANCELED: 'Đã hủy',
    };
    static getKeys() {
        return Object.keys(this.viewStatus);
    }
    static retrieveStatus(status) {
        return this.viewStatus[status];
    }
}

export default BorrowingStatus;
