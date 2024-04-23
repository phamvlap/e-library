<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import BookCard from './BookCard.vue';
import BookService from '@/services/book.service.js';
import Helper from '@/utils/helper.js';
import { toast } from 'vue3-toastify';

const route = useRoute();
const router = useRouter();
const bookId = ref(route.params.id);
let book = ref({});
let similarBooks = ref([]);
let activeImage = ref({});
let isMounted = ref(false);
let selectedQuantity = ref(0);

const fetchBook = async (bookId) => {
    try {
        const bookService = new BookService();
        const response = await bookService.getBook(bookId);
        if (response.status === 'success') {
            const data = response.data[0];
            book.value = {
                _id: data._id,
                book_name: data.book_name,
                book_released_year: data.book_released_year,
                book_authors: data.book_authors,
                book_quantity: data.book_quantity,
                book_borrowed_quantity: data.book_borrowed_quantity,
                book_description: data.book_description,
                publisher_name: data.publisher[0].publisher_name,
                topic_id: data.topic[0]._id,
                topic_name: data.topic[0].topic_name,
                images: data.images,
            };
            activeImage.value = data.images[0];
        }
    } catch (error) {
        console.log(error);
    }
};
const getSimilarBooks = async (topicId = null) => {
    try {
        const bookService = new BookService();
        const response = await bookService.getBooks({
            book_topic: topicId,
        });
        if (response.status === 'success') {
            const data = response.data.map((book) => {
                return {
                    _id: book._id,
                    book_image: Helper.formatImageUrl(book.images[0]?.image_url),
                    book_name: book.book_name,
                    book_authors: book.book_authors,
                    book_topic: book.topic[0].topic_name,
                };
            });
            similarBooks.value = data;
        }
    } catch (error) {
        console.log(error);
    }
};
const goToBorrowingOrder = (bookId) => {
    router.push({
        name: 'user.borrowing-order',
        params: {
            id: bookId,
        },
    });
};
const increaseQuantity = () => {
    if (selectedQuantity.value === book.value.book_quantity - book.value.book_borrowed_quantity) {
        toast.error('Số lượng sách đã hết');
        return;
    } else {
        selectedQuantity.value += 1;
    }
};
const decreaseQuantity = () => {
    if (selectedQuantity.value > 0) {
        selectedQuantity.value -= 1;
    }
};

onMounted(async () => {
    await fetchBook(bookId.value);
    await getSimilarBooks(book.value.topic_id);
    isMounted.value = true;
    console.log(book.value);
});
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
            <div class="row mt-4" v-if="isMounted">
                <div class="col col-md-6 image-section">
                    <div class="row image-wrapper">
                        <div class="col col-md-3 h-100 image-list">
                            <img
                                v-for="image in book.images"
                                :key="image._id"
                                :src="Helper.formatImageUrl(image.image_url)"
                                alt=""
                                class="w-100 p-1 image-list__item"
                                @click="
                                    activeImage = {
                                        ...image,
                                    }
                                "
                            />
                        </div>
                        <div class="col col-md-9 h-100">
                            <div class="h-100 d-flex justify-content-center">
                                <img :src="Helper.formatImageUrl(activeImage.image_url)" alt="" class="h-100" />
                            </div>
                        </div>
                    </div>
                    <div class="p-2 mt-3">
                        <h3>Mô tả sơ lược</h3>
                        <p class="text p-2">
                            {{ book.book_description }}
                        </p>
                    </div>
                </div>
                <div class="col col-md-6">
                    <h2 class="book-name p-2">{{ book.book_name }}</h2>
                    <div class="px-2 py-3">
                        <span class="fw-bold">Tác giả: </span>
                        <span>{{ book.book_authors }}</span>
                    </div>
                    <div class="px-2 py-3">
                        <span class="fw-bold">Chủ đề: </span>
                        <span>{{ book.topic_name }}</span>
                    </div>
                    <div class="px-2 py-3">
                        <span class="fw-bold">Năm phát hành: </span>
                        <span>{{ book.book_released_year }}</span>
                    </div>
                    <div class="px-2 py-3">
                        <span class="fw-bold">Nhà xuất bản: </span>
                        <span>{{ book.publisher_name }}</span>
                    </div>
                    <div class="px-2 py-3 d-flex align-items-center">
                        <span class="fw-bold">Số lượng:</span>
                        <div class="ms-4 border rounded-2">
                            <button class="p-2" type="button" @click="decreaseQuantity">-</button>
                            <span class="p-3">{{ selectedQuantity }}</span>
                            <button class="p-2" type="button" @click="increaseQuantity">+</button>
                        </div>
                    </div>
                    <div class="mt-5 d-flex flex-column">
                        <div class="p-2">
                            <button class="btn btn-outline-info" @click="goToBorrowingOrder(book.book_id)">
                                Đặt mượn
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <h2>Sách cùng chủ đề</h2>
                <div class="row mt-3">
                    <div class="col col-md-2" v-for="book in similarBooks" :key="book._id">
                        <BookCard :book="book" />
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
    height: 150px;
}
.image-list__item:hover {
    cursor: pointer;
}
.book-name {
    font-size: 2.4rem;
}
.text {
    line-height: 1.4;
}
</style>
