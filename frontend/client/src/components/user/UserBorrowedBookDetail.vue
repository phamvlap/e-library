<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import BorrowingDetailService from '@/services/borrowingDetail.service.js';
import { useReaderStore } from '@/stores/reader.js';
import Helper from '@/utils/helper.js';
import BorrowingStatus from '@/enums/borrowingStatus.js';
import Swal from 'sweetalert2';
import { toast } from 'vue3-toastify';

const route = useRoute();
const store = useReaderStore();
let reader = store.reader;
const bookId = route.params.id;
let book = ref({});
let statusList = ref([]);
let isMounted = ref(false);

const fetchBorrowingDetail = async (bookId) => {
    try {
        const borrowingDetailService = new BorrowingDetailService();
        const response = await borrowingDetailService.getBorrowingDetails({
            reader_id: reader.reader_id,
            book_id: bookId,
        });
        if (response.status === 'success') {
            const borrowedBook = response.data[0];
            book.value = {
                book_id: borrowedBook.book[0]._id,
                book_name: borrowedBook.book[0].book_name,
                book_authors: borrowedBook.book[0].book_authors,
                borrowed_date: borrowedBook.borrowingDetail.borrowed_date,
                borrowing_quantity: borrowedBook.borrowingDetail.borrowing_quantity,
                book_image: Helper.formatImageUrl(borrowedBook.book[0].images[0].image_url),
                topic_name: borrowedBook.book[0].topic[0].topic_name,
            };

            statusList.value = response.data.map((item) => {
                return {
                    status: item.borrowingDetail.status,
                    status_updated_at: item.borrowingDetail.updatedAt,
                };
            });
        }
    } catch (error) {
        console.log(error);
    }
};
const handleCancelOrder = async () => {
    Swal.fire({
        title: 'Hủy mượn sách',
        text: 'Bạn có chắc chắn muốn hủy mượn sách này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const borrowingDetailService = new BorrowingDetailService();
                const data = {
                    book_id: book.value.book_id,
                    reader_id: reader.reader_id,
                    borrowing_quantity: book.value.borrowing_quantity,
                    borrowed_date: book.value.borrowed_date,
                    status: 'CANCELED',
                    status_updated_by: reader.reader_id,
                };
                const response = await borrowingDetailService.createBorrowingDetail(data);
                if (response.status === 'success') {
                    toast.success('Hủy mượn sách thành công.', {
                        duration: 1500,
                    });
                    await fetchBorrowingDetail(bookId);
                }
            } catch (error) {
                console.log(error);
            }
        }
    });
};

onMounted(async () => {
    await fetchBorrowingDetail(bookId);
    isMounted.value = true;
});
</script>
<template>
    <div class="mt-3">
        <div v-if="isMounted">
            <div class="d-flex justify-content-center align-item-center">
                <img :src="book.book_image" alt="book" class="image" />
            </div>
            <div class="p-2 border-bottom mt-3">
                <h3 class="fw-bold book-name">{{ book.book_name }}</h3>
                <div class="p-2 mt-2">
                    <span class="fw-bold">Tác giả: </span>
                    <span>{{ book.book_authors }}</span>
                </div>
                <div class="p-2 mt-2">
                    <span class="fw-bold">Chủ đề: </span>
                    <span>{{ book.topic_name }}</span>
                </div>
                <div class="p-2 mt-2">
                    <span class="fw-bold">Ngày mượn: </span>
                    <span>{{ Helper.formatDateTime(book.borrowed_date) }}</span>
                </div>
                <div class="p-2 mt-2">
                    <span class="fw-bold">Số lượng mượn: </span>
                    <span>{{ book.borrowing_quantity }}</span>
                </div>
                <div class="p-2 mt-2">
                    <span class="fw-bold">Trạng thái hiện tại: </span>
                    <span>{{ BorrowingStatus.retrieveStatus(statusList[0].status) }}</span>
                </div>
            </div>
            <div class="p-2 mt-2">
                <h3 class="mb-3">Chi tiết trạng thái mượn trả</h3>
                <div class="row p-2 fw-bold">
                    <div class="col col-md-6">Thời gian</div>
                    <div class="col col-md-6">Trạng thái</div>
                </div>
                <div class="row p-2" v-for="(status, index) in statusList" :key="index">
                    <div class="col col-md-6">{{ Helper.formatDateTime(status.status_updated_at) }}</div>
                    <div class="col col-md-6">{{ BorrowingStatus.retrieveStatus(status.status) }}</div>
                </div>
            </div>
            <div class="p-2 mt-2 text-center" v-if="statusList[0].status === BorrowingStatus.getKeys()[0]">
                <button class="btn btn-danger" @click="handleCancelOrder">
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
