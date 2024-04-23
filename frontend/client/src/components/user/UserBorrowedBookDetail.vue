<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
</script>
<template>
    <div class="border">
        <div>
            <div class="d-flex justify-content-center align-item-center">
                <img src="@/assets/images/truyen_kieu_1.jpeg" alt="book" class="image" />
            </div>
            <div class="p-2 border-bottom">
                <h3 class="fw-bold book-name">Truyện Kiều</h3>
                <div class="p-2 mt-2">
                    <span class="fw-bold">Tác giả: </span>
                    <span> Nguyễn Du </span>
                </div>
                <div class="p-2 mt-2">
                    <span class="fw-bold">Chủ đề: </span>
                    <span>Thơ ca </span>
                </div>
                <div class="p-2 mt-2">
                    <span class="fw-bold">Ngày mượn: </span>
                    <span>2021-09-01</span>
                </div>
                <div class="p-2 mt-2">
                    <span class="fw-bold">Số lượng mượn: </span>
                    <span>20</span>
                </div>
                <div class="p-2 mt-2">
                    <span class="fw-bold">Trạng thái hiện tại: </span>
                    <span>Chưa trả</span>
                </div>
            </div>
            <div class="p-2 mt-2">
                <h3 class="mb-3">Chi tiết trạng thái mượn trả</h3>
                <div class="row p-2 fw-bold">
                    <div class="col col-md-6">Thời gian</div>
                    <div class="col col-md-6">Trạng thái</div>
                </div>
                <div class="row p-2">
                    <div class="col col-md-6">06:31 21-04-2024</div>
                    <div class="col col-md-6">Đã trả</div>
                </div>
                <div class="row p-2">
                    <div class="col col-md-6">06:31 21-04-2024</div>
                    <div class="col col-md-6">Đã trả</div>
                </div>
            </div>
            <div class="p-2 mt-2 text-center">
                <button class="btn btn-danger">
                    <FontAwesomeIcon :icon="faXmark" />
                    <span class="ms-1">Hủy mượn</span>
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.image {
    width: 160px;
    height: 260px;
    object-fit: cover;
}
.book-name {
    font-size: 2rem;
}
</style>
