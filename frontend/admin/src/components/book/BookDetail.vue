<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronLeft, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import BookService from '@/services/book.service.js';
import Helper from '@/utils/helper.js';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();
const bookId = route.params.id;
let book = ref({});

const getOneBook = async (id) => {
    try {
        const bookService = new BookService();
        const response = await bookService.getBook(id);
        if (response.status === 'success') {
            const data = response.data[0];
            book.value = {
                _id: data._id,
                book_name: data.book_name,
                book_price: data.book_price,
                book_quantity: data.book_quantity,
                book_borrowed_quantity: data.book_borrowed_quantity,
                book_released_year: data.book_released_year,
                book_authors: data.book_authors,
                book_description: data.book_description,
                publisher_name: data.publisher[0].publisher_name,
                topic_name: data.topic[0].topic_name,
                images: data.images,
            };
        }
    } catch (error) {
        book.value = {};
    }
};
const redirectToBookModify = (id) => {
    router.push({
        name: 'book.edit',
        params: {
            id,
        },
    });
};
const handleDelete = () => {
    Swal.fire({
        title: 'Xác nhận xóa',
        text: 'Bạn có chắc chắn muốn xóa sách này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const bookService = new BookService();
                const response = await bookService.deleteBook(bookId);
                if (response.status === 'success') {
                    Swal.fire('Đã xóa!', 'Sách đã được xóa thành công.', 'success');
                    router.push('/admin/books');
                }
            } catch (error) {
                Swal.fire('Lỗi!', 'Đã có lỗi xảy ra.', 'error');
            }
        }
    });
};

onMounted(async () => {
    await getOneBook(bookId);
});
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
                <button class="btn btn-warning" @click="redirectToBookModify(bookId)">
                    <FontAwesomeIcon :icon="faPen" />
                    <span class="ms-2">Hiệu chỉnh</span>
                </button>
                <button class="btn btn-danger ms-3" @click="handleDelete">
                    <FontAwesomeIcon :icon="faTrash" />
                    <span class="ms-2">Xóa</span>
                </button>
            </div>
        </div>
        <div class="p-2">
            <div class="row">
                <div class="col col-md-6">
                    <div class="mb-3 row">
                        <div class="col-sm-2 col-form-label">Tên sách:</div>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">{{ book.book_name }}</p>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <div class="col-sm-2 col-form-label">Giá sách:</div>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">{{ book.book_price }}</p>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <div class="col-sm-2 col-form-label">Số lượng:</div>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">{{ book.book_quantity }}</p>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <div class="col-sm-2 col-form-label">Đã mượn:</div>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">{{ book.book_borrowed_quantity }}</p>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <div class="col-sm-2 col-form-label">Năm xuất bản:</div>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">{{ book.book_released_year }}</p>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <div class="col-sm-2 col-form-label">Tác giả:</div>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">{{ book.book_authors }}</p>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <div class="col-sm-2 col-form-label">Nhà xuất bản:</div>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">{{ book.publisher_name }}</p>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <div class="col-sm-2 col-form-label">Chủ đề:</div>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">{{ book.topic_name }}</p>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <div class="col-sm-2 col-form-label">Mô tả:</div>
                        <div class="col-sm-10 d-flex align-items-center">
                            <p class="text">
                                {{ book.book_description }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col col-md-6">
                    <div class="mb-3 row">
                        <div class="col-sm-2 col-form-label">Hình ảnh:</div>
                        <div class="row">
                            <div class="col col-md-3 p-2" v-for="image in book.images" :key="image._id">
                                <img class="image-item" :src="Helper.formatImageUrl(image.image_url)" alt="" />
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
    height: 240px;
    object-fit: cover;
}
</style>
