<script setup>
import { ref, onMounted } from 'vue';
import BookService from '@/services/book.service.js';
import ReaderService from '@/services/reader.service.js';
import StaffService from '@/services/staff.service.js';
import BorrowingService from '@/services/borrowingDetail.service.js';

let totalBooks = ref(0);
let totalReaders = ref(0);
let totalStaffs = ref(0);
let totalBorrowings = ref(0);
let totalPendingBorrowings = ref(0);
let mostBorrowedBook = ref(null);
let isMounted = ref(false);

const getTotalBooks = async () => {
    try {
        const bookService = new BookService();
        const response = await bookService.getBooks();
        if (response.status === 'success') {
            totalBooks.value = response.data.length;
        }
    } catch (error) {
        console.log(error);
    }
};
const getTotalReaders = async () => {
    try {
        const bookService = new ReaderService();
        const response = await bookService.getReaders();
        if (response.status === 'success') {
            totalReaders.value = response.data.length;
        }
    } catch (error) {
        console.log(error);
    }
};
const getTotalStaffs = async () => {
    try {
        const bookService = new StaffService();
        const response = await bookService.getStaffs();
        if (response.status === 'success') {
            totalStaffs.value = response.data.length;
        }
    } catch (error) {
        console.log(error);
    }
};
const getTotalBorrowings = async () => {
    try {
        const borrowingService = new BorrowingService();
        const response = await borrowingService.getBorrowingDetails();
        if (response.status === 'success') {
            totalBorrowings.value = response.data.length;
        }
    } catch (error) {
        console.log(error);
    }
};
const getTotalPedingBorrowings = async () => {
    try {
        const borrowingService = new BorrowingService();
        const response = await borrowingService.getBorrowingDetails({
            status: 'PENDING',
        });
        if (response.status === 'success') {
            totalPendingBorrowings.value = response.data.length;
        }
    } catch (error) {
        console.log(error);
    }
};
const getMostPopularBook = async () => {
    try {
        const bookService = new BookService();
        const response = await bookService.getPopularBooks(1);
        if (response.status === 'success') {
            mostBorrowedBook.value = {
                _id: response.data[0]._id,
                book_name: response.data[0].book_name,
                book_borrowed_quantity: response.data[0].book_borrowed_quantity,
                book_authors: response.data[0].book_authors,
                book_topic: response.data[0].topic[0].topic_name,
            };
        }
    } catch (error) {
        console.log(error);
    }
};

onMounted(async () => {
    await getTotalBooks();
    await getTotalReaders();
    await getTotalStaffs();
    await getTotalBorrowings();
    await getTotalPedingBorrowings();
    await getMostPopularBook();
    console.log(mostBorrowedBook.value);
    isMounted.value = true;
});
</script>

<template>
    <div class="p-2">
        <h1 class="text-center">Thông tin tổng quan</h1>
        <div class="row p-0 m-0 mt-5">
            <div class="row col col-md-10 offset-md-1" v-if="isMounted">
                <div class="col col-md-6">
                    <div class="p-4 mb-4 border rounded-4 item">
                        <p class="p-3 fw-bold item-title">
                            <span>Tổng số sách hiện có trong thư viện:</span>
                            <span class="d-inline-block ms-3">{{ totalBooks }}</span>
                        </p>
                        <RouterLink
                            :to="{
                                name: 'book.list',
                            }"
                            class="d-inline-block p-3 item-link"
                        >
                            Xem chi tiết
                        </RouterLink>
                    </div>
                    <div class="p-4 mb-4 border rounded-4 item">
                        <p class="p-3 fw-bold item-title">
                            <span>Tổng số độc giả đã đăng ký tài khoản:</span>
                            <span class="d-inline-block ms-3">{{ totalReaders }}</span>
                        </p>
                        <RouterLink
                            :to="{
                                name: 'reader.list',
                            }"
                            class="d-inline-block p-3 item-link"
                        >
                            Xem chi tiết
                        </RouterLink>
                    </div>
                    <div class="p-4 mb-4 border rounded-4 item">
                        <p class="p-3 fw-bold item-title">
                            <span>Tổng số nhân viên trong thư viện:</span>
                            <span class="d-inline-block ms-3">{{ totalStaffs }}</span>
                        </p>
                        <RouterLink
                            :to="{
                                name: 'staff.list',
                            }"
                            class="d-inline-block p-3 item-link"
                        >
                            Xem chi tiết
                        </RouterLink>
                    </div>
                </div>
                <div class="col col-md-6">
                    <div class="p-4 mb-4 border rounded-4 item">
                        <p class="p-3 fw-bold item-title">
                            <span>Tổng số lượt mượn sách:</span>
                            <span class="d-inline-block ms-3">{{ totalBorrowings }}</span>
                        </p>
                        <RouterLink
                            :to="{
                                name: 'book.list',
                            }"
                            class="d-inline-block p-3 item-link"
                        >
                            Xem chi tiết
                        </RouterLink>
                    </div>
                    <div class="p-4 mb-4 border rounded-4 item">
                        <p class="p-3 fw-bold item-title">
                            <span>Tổng số đơn mượn đang chờ xác nhận:</span>
                            <span class="d-inline-block ms-3">{{ totalPendingBorrowings }}</span>
                        </p>
                        <RouterLink
                            :to="{
                                name: 'book.list',
                            }"
                            class="d-inline-block p-3 item-link"
                        >
                            Xem chi tiết
                        </RouterLink>
                    </div>
                    <div class="p-4 mb-4 border rounded-4 item">
                        <p class="p-3 fw-bold item-title">
                            <p>Sách được mượn nhiều nhất:</p>
                            <p class="py-3">
                                <span class="d-inline-block me-2">{{ mostBorrowedBook.book_name }}</span>
                                <span>-</span>
                                <span class="d-inline-block mx-2">{{ mostBorrowedBook.book_borrowed_quantity }}</span>
                                <span>lượt</span>
                            </p>
                        </p>
                        <RouterLink
                            :to="{
                                name: 'book.list',
                            }"
                            class="d-inline-block p-3 item-link"
                        >
                            Xem chi tiết
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.item-title {
    font-size: 2rem;
}

</style>
