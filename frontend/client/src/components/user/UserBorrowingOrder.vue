<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';
import BookService from '@/services/book.service.js';
import Helper from '@/utils/helper.js';
import { useReaderStore } from '@/stores/reader.js';
import BorrowingDetailService from '@/services/borrowingDetail.service.js';

const route = useRoute();
const router = useRouter();
const bookId = route.params.id;
const store = useReaderStore();
let reader = store.reader;
const MAX_BORROWING_QUANTITY = 5;

let book = ref({});
let selectedQuantity = ref(1);
let isMounted = ref(false);

const fetchBook = async (bookId) => {
    try {
        const bookService = new BookService();
        const response = await bookService.getBook(bookId);
        if (response.status === 'success') {
            const data = response.data[0];
            book.value = {
                _id: data._id,
                book_name: data.book_name,
                book_authors: data.book_authors,
                book_quantity: data.book_quantity,
                book_borrowed_quantity: data.book_borrowed_quantity,
                publisher_name: data.publisher[0].publisher_name,
                topic_id: data.topic[0]._id,
                topic_name: data.topic[0].topic_name,
                book_image: Helper.formatImageUrl(data.images[0].image_url),
            };
        }
    } catch (error) {
        console.log(error);
    }
};
const increaseQuantity = () => {
    if (selectedQuantity.value === MAX_BORROWING_QUANTITY) {
        toast.error(`Số lượng sách tối đa của mỗi lần mượn là ${MAX_BORROWING_QUANTITY}`, {
            duration: 1500,
        });
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
const handleOrderBorrowing = async () => {
    Swal.fire({
        title: 'Xác nhận mượn sách',
        text: 'Bạn có chắc chắn muốn mượn sách này?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const data = {
                    book_id: book.value._id,
                    reader_id: reader.reader_id,
                    borrowing_quantity: selectedQuantity.value,
                    borrowed_date: new Date().toISOString(),
                    status_updated_by: reader.reader_id,
                };
                const borrowingDetailService = new BorrowingDetailService();
                const response = await borrowingDetailService.createBorrowingDetail(data);
                if (response.status === 'success') {
                    toast.success('Đặt mượn sách thành công', {
                        duration: 1500,
                        onClose: () => {
                            router.push({
                                name: 'user.borrowed-books',
                            });
                        },
                    });
                } else {
                    throw new Error('Đặt mượn sách thất bại.');
                }
            } catch (error) {
                toast.error(error.messag || 'Đặt mượn sách thất bại.', {
                    duration: 1500,
                });
            }
        }
    });
};
const handleCancelBorrowing = () => {
    Swal.fire({
        title: 'Hủy mượn sách',
        text: 'Bạn có chắc chắn muốn hủy mượn sách này?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
    }).then((result) => {
        if (result.isConfirmed) {
            router.push({
                name: 'books.list',
            });
        }
    });
};

onMounted(async () => {
    await fetchBook(bookId);
    isMounted.value = true;
});
</script>
<template>
    <div class="p-2">
        <h2 class="text-center">Xác nhận mượn sách</h2>
        <div class="row mt-4" v-if="isMounted">
            <div class="col col-md-7">
                <h3 class="text-center title">Thông tin sách</h3>
                <div class="row mt-4">
                    <div class="col col-md-3 d-flex justify-content-center align-item-center">
                        <img :src="Helper.formatImageUrl(book.book_image)" alt="book" class="image" />
                    </div>
                    <div class="col col-md-9">
                        <h3 class="fw-bold book-name">{{ book.book_name }}</h3>
                        <div class="p-2 mt-2 text">
                            <span class="fw-bold">Tác giả: </span>
                            <span>{{ book.book_authors }}</span>
                        </div>
                        <div class="p-2 mt-2 text">
                            <span class="fw-bold">Chủ đề: </span>
                            <span>{{ book.topic_name }}</span>
                        </div>
                        <div class="p-2 mt-2 text">
                            <span class="fw-bold">Nhà xuất bản: </span>
                            <span>{{ book.publisher_name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-md-5">
                <h3 class="text-center title">Thông tin độc giả</h3>
                <div>
                    <div class="p-2 mt-2 text">
                        <span class="fw-bold">Họ tên: </span>
                        <span>{{ reader.reader_first_name + ' ' + reader.reader_last_name }}</span>
                    </div>
                    <div class="p-2 mt-2 text">
                        <span class="fw-bold">Số điện thoại: </span>
                        <span>{{ reader.reader_phone }}</span>
                    </div>
                    <div class="p-2 mt-2 text">
                        <span class="fw-bold">Địa chỉ: </span>
                        <span>{{ reader.reader_address }}</span>
                    </div>
                </div>
                <div class="">
                    <h3 class="text-center title">Thông tin mượn</h3>
                    <div class="p-2 mt-2 text">
                        <span class="fw-bold">Số lượng: </span>
                        <div class="d-inline-block ms-4 border rounded-2">
                            <button class="py-2 px-3" type="button" @click="decreaseQuantity">-</button>
                            <span class="p-3">{{ selectedQuantity }}</span>
                            <button class="py-2 px-3" type="button" @click="increaseQuantity">+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-4 text-center">
                <button class="btn btn-danger" @click="handleCancelBorrowing">
                    <FontAwesomeIcon :icon="faXmark" />
                    <span class="ms-1">Hủy mượn</span>
                </button>
                <button class="btn btn-success ms-3" @click="handleOrderBorrowing">
                    <FontAwesomeIcon :icon="faCheck" />
                    <span class="ms-2">Xác nhận mượn</span>
                </button>
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
    width: 100%;
    max-height: 180px;
    object-fit: cover;
}
</style>
