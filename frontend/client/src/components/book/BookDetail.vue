<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import BookCard from './BookCard.vue';
</script>
<template>
    <div class="mt-3">
        <div class="container">
            <div class="position-relative text-center">
                <h1>Chi tiết sách</h1>
                <div class="d-flex align-items-center position-absolute back-btn">
                    <FontAwesomeIcon :icon="faAngleLeft" />
                    <RouterLink to="/books" class="ms-2">Quay lại</RouterLink>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col col-md-6 image-section">
                    <div class="row image-wrapper">
                        <div class="col col-md-3 h-100 image-list">
                            <img src="@/assets/images/truyen_kieu_1.jpeg" alt="" class="w-100 p-1 image-list__item" />
                            <img src="@/assets/images/truyen_kieu_1.jpeg" alt="" class="w-100 p-1 image-list__item" />
                            <img src="@/assets/images/truyen_kieu_1.jpeg" alt="" class="w-100 p-1 image-list__item" />
                        </div>
                        <div class="col col-md-9 h-100">
                            <div class="h-100 d-flex justify-content-center">
                                <img src="@/assets/images/truyen_kieu_1.jpeg" alt="" class="h-100" />
                            </div>
                        </div>
                    </div>
                    <div class="p-2 mt-3">
                        <h3>Mô tả sơ lược</h3>
                        <p class="text p-2">
                            Truyện Kiều là một tác phẩm văn học nổi tiếng của Việt Nam, được viết bởi Nguyễn Du. Truyện
                            Kiều được xem là một trong những kiệt tác của văn học Việt Nam, là một trong những tác phẩm
                            văn học có ảnh hưởng lớn nhất đến văn học Việt Nam.
                        </p>
                    </div>
                </div>
                <div class="col col-md-6">
                    <h2 class="book-name p-2">Truyen Kieu</h2>
                    <div class="px-2 py-3">
                        <span class="fw-bold">Tác giả: </span>
                        <span>Nguyen Du</span>
                    </div>
                    <div class="px-2 py-3">
                        <span class="fw-bold">Chủ đề: </span>
                        <span>Truyện cổ tích</span>
                    </div>
                    <div class="px-2 py-3">
                        <span class="fw-bold">Năm phát hành: </span>
                        <span>2023</span>
                    </div>
                    <div class="px-2 py-3">
                        <span class="fw-bold">Nhà xuất bản: </span>
                        <span>Truyện cổ tích</span>
                    </div>
                    <div class="px-2 py-3 d-flex align-items-center">
                        <span class="fw-bold">Số lượng:</span>
                        <div class="ms-4 border rounded-2">
                            <button class="p-2" type="button">-</button>
                            <span class="p-3">1</span>
                            <button class="p-2" type="button">+</button>
                        </div>
                    </div>
                    <div class="mt-5 d-flex flex-column">
                        <div class="p-2">
                            <button class="btn btn-outline-info">Đặt mượn</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <h2>Sách cùng chủ đề</h2>
                <div class="row mt-3">
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.back-btn {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    color: var(--dark-text-color);
    cursor: pointer;
}
.image-list {
    overflow: scroll;
}
.image-wrapper {
    height: 400px;
}
.image-list__item {
    height: 200px;
}
.book-name {
    font-size: 2.4rem;
}
.text {
    line-height: 1.4;
}
</style>
