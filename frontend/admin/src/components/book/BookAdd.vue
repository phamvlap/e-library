<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import BookForm from './BookForm.vue';
import FormData from 'form-data';
import BookService from '@/services/book.service.js';
import { toast } from 'vue3-toastify';

const headers = {
    'Content-Type': 'multipart/form-data',
};
const router = useRouter();
const route = useRoute();
const bookId = route.params.id;
const isUpdating = !!bookId;

let book = ref({
    book_name: '',
    book_price: '',
    book_quantity: '',
    book_released_year: '',
    book_description: '',
    book_authors: '',
    publisher_id: '',
    topic_id: '',
    book_images: [],
    uploaded_images: [],
});

const submitBook = async (data) => {
    try {
        const bookService = new BookService('/api/v1/books', headers);
        const formData = new FormData();

        formData.append('book_name', data.book_name);
        formData.append('book_price', data.book_price);
        formData.append('book_quantity', data.book_quantity);
        formData.append('book_released_year', data.book_released_year);
        formData.append('book_description', data.book_description);
        formData.append('book_authors', data.book_authors);
        formData.append('publisher_id', data.publisher_id);
        formData.append('topic_id', data.topic_id);
        if (data.uploaded_images.length > 0) {
            data.uploaded_images.forEach((image) => {
                formData.append('book_images', image);
            });
        }
        if (isUpdating) {
            await bookService.updateBook(bookId, formData);
        } else {
            await bookService.createBook(formData);
        }
        toast.success(`${isUpdating ? 'Cập nhật' : 'Thêm'} sách thành công`, {
            duration: 2500,
            onClose: () => {
                router.push('/admin/books');
            },
        });
    } catch (error) {
        toast.error(`${isUpdating ? 'Cập nhật' : 'Thêm'} sách thất bại`, {
            duration: 2500,
        });
    }
};
const getOneBook = async (id) => {
    try {
        const bookService = new BookService();
        const response = await bookService.getBook(id);
        if (response.status === 'success') {
            const data = response.data[0];
            book.value = {
                ...book.value,
                _id: data._id,
                book_name: data.book_name,
                book_price: data.book_price,
                book_quantity: data.book_quantity,
                book_released_year: data.book_released_year,
                book_authors: data.book_authors,
                book_description: data.book_description,
                publisher_id: data.publisher[0]._id,
                topic_id: data.topic[0]._id,
                book_images: data.images,
            };
        }
    } catch (error) {
        book.value = {};
    }
};
onMounted(async () => {
    if (bookId) {
        await getOneBook(bookId);
    }
});
</script>

<template>
    <div class="p-2">
        <h1 class="p-2 text-center">
            {{ isUpdating ? 'Hiệu chỉnh sách' : 'Thêm sách mới' }}
        </h1>
        <div class="p-2">
            <RouterLink to="/admin/books" class="btn btn-outline-secondary btn-back">
                <FontAwesomeIcon :icon="faChevronLeft" />
                <span class="ms-2">Quay lại</span>
            </RouterLink>
        </div>
        <!-- form -->
        <div class="p-2">
            <BookForm :book="book" :isUpdating="isUpdating" @submit:book="submitBook" />
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
</style>
