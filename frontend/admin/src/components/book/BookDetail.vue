<script setup>
import { useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronLeft, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const route = useRoute();

const bookId = route.params.id;
</script>

<template>
    <div class="p-2">
        <h1 class="p-2 text-center">Chi tiết sách</h1>
        <div class="p-2 d-flex justify-content-between">
            <RouterLink to="/admin/books" class="btn btn-outline-secondary btn-back">
                <FontAwesomeIcon :icon="faChevronLeft" />
                <span class="ms-2">Quay lại</span>
            </RouterLink>
            <div>
                <button class="btn btn-warning">
                    <FontAwesomeIcon :icon="faPen" />
                    <span class="ms-2">Hiệu chỉnh</span>
                </button>
                <button class="btn btn-danger ms-3">
                    <FontAwesomeIcon :icon="faTrash" />
                    <span class="ms-2">Xóa</span>
                </button>
            </div>
        </div>
        <!-- form -->
        <div class="p-2">
            <div class="row">
                <div class="col col-md-6">
                    <div class="mb-3 row">
                        <label for="book_name" class="col-sm-2 col-form-label">Tên sách: </label>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">Truyện kiều</p>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="book_price" class="col-sm-2 col-form-label">Giá sách: </label>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">100.000</p>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="book_quantity" class="col-sm-2 col-form-label">Số lượng: </label>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">100</p>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="book_quantity" class="col-sm-2 col-form-label">Đã mượn: </label>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">10</p>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="book_released_year" class="col-sm-2 col-form-label">Năm xuất bản: </label>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">2021</p>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="book_authors" class="col-sm-2 col-form-label">Tác giả: </label>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">Nguyễn Du</p>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="publisher_id" class="col-sm-2 col-form-label">Nhà xuất bản: </label>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">Kim Đồng</p>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="topic_id" class="col-sm-2 col-form-label">Chủ đề: </label>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">Văn học</p>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="book_description" class="col-sm-2 col-form-label">Mô tả: </label>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">
                                Truyện Kiều là một tác phẩm văn học nổi tiếng của Việt Nam, được viết bởi Nguyễn Du. Tác
                                phẩm được viết bằng chữ Nôm, xuất bản lần đầu vào năm 1820. Truyện Kiều được xem là một
                                trong những tác phẩm văn học lớn của Việt Nam, là một trong những tác phẩm văn học nổi
                                tiếng nhất của Việt Nam.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col col-md-6">
                    <div class="mb-3 row">
                        <label for="book_description" class="col-sm-2 col-form-label">Hình ảnh: </label>
                        <div class="row">
                            <div class="col col-md-3 p-2">
                                <img class="image-item" src="@/assets/images/truyen_kieu_1.jpeg" alt="" />
                            </div>
                            <div class="col col-md-3 p-2">
                                <img class="image-item" src="@/assets/images/truyen_kieu_1.jpeg" alt="" />
                            </div>

                            <div class="col col-md-3 p-2">
                                <img class="image-item" src="@/assets/images/truyen_kieu_1.jpeg" alt="" />
                            </div>
                            <div class="col col-md-3 p-2">
                                <img class="image-item" src="@/assets/images/truyen_kieu_1.jpeg" alt="" />
                            </div>
                            <div class="col col-md-3 p-2">
                                <img class="image-item" src="@/assets/images/truyen_kieu_1.jpeg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-back {
    font-size: 1.6rem;
}
.select,
.textarea-input {
    font-size: 1.6rem;
}
.text {
    line-height: 1.4;
}
.image-item {
    width: 100%;
    max-height: 280px;
    object-fit: cover;
}
</style>
