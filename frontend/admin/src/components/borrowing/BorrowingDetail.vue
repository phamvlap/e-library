<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
</script>

<template>
    <div class="p-2">
        <h1 class="p-2 text-center">Chi tiết mượn trả</h1>
        <div class="p-2 d-flex justify-content-between">
            <RouterLink to="/admin/borrowings" class="btn btn-outline-secondary btn-back">
                <FontAwesomeIcon :icon="faChevronLeft" />
                <span class="ms-2">Quay lại</span>
            </RouterLink>
        </div>
        <!-- info -->
        <div class="row p-2">
            <div class="col col-md-6">
                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Tên độc giả:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">Nguyen Van A</p>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Tên sách mượn:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">Truyện kiều</p>
                    </div>
                </div>

                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Ngày mượn:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">17:56 18-04-2024</p>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Số lượng mượn:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">10</p>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Trạng thái hiện tại:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">Chưa trả</p>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Ngày trả:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">17:56 18-05-2024</p>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Nhà xuất bản:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">Kim Đồng</p>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Chủ đề:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">Văn học</p>
                    </div>
                </div>
                <div class="d-flex justify-content-center mt-2">
                    <button class="btn btn-success">
                        <FontAwesomeIcon :icon="faCheck" />
                        <span class="ms-2">Duyệt đơn mượn</span>
                    </button>
                    <button class="btn btn-danger ms-3">
                        <FontAwesomeIcon :icon="faTrash" />
                        <span class="ms-2">Xóa</span>
                    </button>
                </div>
            </div>
            <div class="col col-md-6">
                <h2>Chi tiết trạng thái</h2>
                <div class="my-3 row">
                    <div class="col-sm-3 py-2 px-3">Trạng thái</div>
                    <div class="col-sm-3 py-2 px-3">Thời gian</div>
                    <div class="col-sm-6 py-2 px-3">Người cập nhật</div>
                </div>
                <div class="my-3 row">
                    <div class="col-sm-3 py-2 px-3">Trạng thái</div>
                    <div class="col-sm-3 py-2 px-3">Thời gian</div>
                    <div class="col-sm-6 py-2 px-3">Người cập nhật</div>
                </div>
                <div class="my-3 row">
                    <div class="col-sm-3 py-2 px-3">Trạng thái</div>
                    <div class="col-sm-3 py-2 px-3">Thời gian</div>
                    <div class="col-sm-6 py-2 px-3">Người cập nhật</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-back {
    font-size: 1.6rem;
}
th,
td {
    color: var(--dark-text-color);
    padding: 8px;
}
.cell-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
}
th:last-child,
td:last-child {
    width: 280px;
}
.select {
    font-size: 1.6rem;
}
#select-status,
.label,
.select-item {
    font-size: 1.6rem;
}
.custom-pagination__link {
    font-size: 1.6rem;
    color: var(--dark-text-color);
}
.custom-pagination__icon {
    font-size: 1.4rem;
}
</style>
