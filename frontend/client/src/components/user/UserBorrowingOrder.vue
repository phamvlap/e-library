<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
</script>
<template>
    <div class="p-2">
        <h2 class="text-center">Xác nhận mượn sách</h2>
        <div class="row m-mt-3">
            <div class="col col-md-6">
                <h3 class="text-center title">Thông tin sách</h3>
                <div class="d-flex justify-content-center align-item-center mt-3">
                    <img src="@/assets/images/truyen_kieu_1.jpeg" alt="book" class="image" />
                </div>
                <h3 class="fw-bold book-name mt-3">Truyện Kiều</h3>
                <div class="p-2 mt-2 text">
                    <span class="fw-bold">Tác giả: </span>
                    <span> Nguyễn Du </span>
                </div>
                <div class="p-2 mt-2 text">
                    <span class="fw-bold">Chủ đề: </span>
                    <span>Thơ ca </span>
                </div>
                <div class="p-2 mt-2 text">
                    <span class="fw-bold">Nhà xuất bản: </span>
                    <span> NXB Văn Học </span>
                </div>
            </div>
            <div class="col col-md-6">
                <h3 class="text-center title">Thông tin độc giả</h3>
                <div>
                    <div class="p-2 mt-2 text">
                        <span class="fw-bold">Họ tên: </span>
                        <span> Nguyễn Du </span>
                    </div>
                    <div class="p-2 mt-2 text">
                        <span class="fw-bold">Số điện thoại: </span>
                        <span>Thơ ca </span>
                    </div>
                    <div class="p-2 mt-2 text">
                        <span class="fw-bold">Địa chỉ: </span>
                        <span> NXB Văn Học </span>
                    </div>
                </div>
                <div class="">
                    <h3 class="text-center title">Thông tin mượn</h3>
                    <div class="p-2 mt-2 text">
                        <span class="fw-bold">Số lượng: </span>
                        <div class="d-inline-block ms-4 border rounded-2">
                            <button class="p-2" type="button">-</button>
                            <span class="p-3">1</span>
                            <button class="p-2" type="button">+</button>
                        </div>
                    </div>
                </div>
                <div class="mt-4 text-center">
                    <button class="btn btn-success">
                        <FontAwesomeIcon :icon="faCheck" />
                        <span class="ms-1">Xác nhận mượn</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.title {
    font-size: 2rem;
}
.text {
    line-height: 1.4;
}
.image {
    width: 180px;
    height: 260px;
    object-fit: cover;
}
</style>
