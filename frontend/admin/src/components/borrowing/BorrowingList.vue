<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faPen, faSearch, faAngleLeft, faAngleRight, faRotate } from '@fortawesome/free-solid-svg-icons';
import BorrowingStatus from '@/enums/borrowingStatus.js';
import BorrowingDetailService from '@/services/borrowingDetail.service.js';
import Helper from '@/utils/helper.js';
import { toast } from 'vue3-toastify';

const router = useRouter();
const status = BorrowingStatus.getKeys();
let filter = ref({
    status: '',
    start_date: '',
    end_date: '',
    book_name: '',
});

const goToBorrowingDetail = (reader_id, book_id, borrowed_date) => {
    router.push({
        name: 'borrowing.detail',
        params: {
            reader_id,
            book_id,
            borrowed_date,
        },
    });
};
let borrowingDetails = ref([]);
const fetchBorrowingDetail = async (filter = {}) => {
    try {
        const borrowingDetailService = new BorrowingDetailService();
        const customFilter = {};
        Object.keys(filter).forEach((key) => {
            if (filter[key] !== '') {
                customFilter[key] = filter[key];
            }
        });
        const response = await borrowingDetailService.getBorrowingDetails(customFilter);
        if (response.status === 'success') {
            let result = [];
            if (customFilter.status) {
                for (const item of response.data) {
                    const itemDetails = await borrowingDetailService.getBorrowingDetails({
                        reader_id: item.borrowingDetail.reader_id,
                        book_id: item.borrowingDetail.book_id,
                        borrowed_date: item.borrowingDetail.borrowed_date,
                    });
                    if (item.borrowingDetail.status === itemDetails.data[0].borrowingDetail.status) {
                        result.push({
                            ...item,
                        });
                    }
                }
            } else {
                result = response.data;
            }

            let data = [];

            let detail = {};
            for (const item of result) {
                detail = {
                    reader_id: item.borrowingDetail.reader_id,
                    book_id: item.borrowingDetail.book_id,
                    borrowed_date: item.borrowingDetail.borrowed_date,
                };
                let isExists = false;
                for (const i of data) {
                    if (
                        i.reader_id === detail.reader_id &&
                        i.book_id === detail.book_id &&
                        i.borrowed_date === detail.borrowed_date
                    ) {
                        isExists = true;
                        break;
                    }
                }
                if (!isExists) {
                    data.push({
                        ...detail,
                        reader_name: item.reader.reader_first_name + ' ' + item.reader.reader_last_name,
                        book_name: item.book[0].book_name,
                        borrowing_quantity: item.borrowingDetail.borrowing_quantity,
                        status: item.borrowingDetail.status,
                    });
                }
            }
            borrowingDetails.value = data;
        }
    } catch (error) {
        borrowingDetails.value = [];
    }
};
const handleFilter = async () => {
    if (filter.value.start_date) {
        if (filter.value.start_date > new Date().toISOString().split('T')[0]) {
            toast.error('Ngày bắt đầu không thể lớn hơn ngày hiện tại', {
                onClose: () => {
                    filter.value.start_date = '';
                },
            });
            return;
        }
    }
    if (filter.value.end_date) {
        if (filter.value.end_date > new Date().toISOString().split('T')[0]) {
            toast.error('Ngày kết thúc không thể lớn hơn ngày hiện tại', {
                onClose: () => {
                    filter.value.end_date = '';
                },
            });
            return;
        }
    }
    if (filter.value.start_date && filter.value.end_date) {
        if (filter.value.start_date > filter.value.end_date) {
            toast.error('Ngày bắt đầu không thể lớn hơn ngày kết thúc', {
                onClose: () => {
                    filter.value.start_date = '';
                    filter.value.end_date = '';
                },
            });
            return;
        }
    }
    await fetchBorrowingDetail(filter.value);
};
const handleRefresh = async () => {
    filter.value = {
        status: '',
        start_date: '',
        end_date: '',
        book_name: '',
    };
    await fetchBorrowingDetail();
};

onMounted(async () => {
    await fetchBorrowingDetail();
});
</script>

<template>
    <div class="p-2">
        <h1 class="p-2 text-center">Danh sách mượn trả</h1>
        <div class="p-2 d-flex border justify-content-between align-items-center">
            <!-- filter -->
            <div class="d-flex">
                <div class="d-flex align-items-center justify-content-center">
                    <div class="input-group m-0">
                        <label class="input-group-text label" for="select-status">Trạng thái:</label>
                        <select class="form-select" id="select-status" v-model="filter.status">
                            <option class="select-item" selected value="">-- Chọn --</option>
                            <option class="select-item" v-for="(item, index) in status" :key="index" :value="item">
                                {{ BorrowingStatus.retrieveStatus(item) }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="d-flex align-items-center ms-2">
                    <div class="input-group m-0">
                        <div class="input-group m-0">
                            <label class="input-group-text label">Ngày bắt đầu:</label>
                            <input type="date" class="border p-2" v-model="filter.start_date" />
                        </div>
                    </div>
                </div>
                <div class="d-flex align-items-center ms-2">
                    <div class="input-group m-0">
                        <label class="input-group-text label">Ngày kết thúc:</label>
                        <input type="date" class="border p-2" v-model="filter.end_date" />
                    </div>
                </div>
                <button class="btn btn-primary ms-3" @click="handleFilter">Áp dụng</button>
            </div>
            <div class="d-flex">
                <div class="ms-4">
                    <button class="btn btn-secondary" type="button" id="search-book" @click="handleRefresh">
                        <FontAwesomeIcon :icon="faRotate" />
                    </button>
                </div>
            </div>
        </div>
        <!-- table -->
        <table class="table table-striped table-hover border mt-2">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Độc giả</th>
                    <th scope="col">Tên sách</th>
                    <th scope="col">Ngày mượn</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Trạng thái hiện tại</th>
                    <th scope="col">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(detail, index) in borrowingDetails" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ detail.reader_name }}</td>
                    <td>{{ detail.book_name }}</td>
                    <td>{{ Helper.formatDateTime(detail.borrowed_date) }}</td>
                    <td>{{ detail.borrowing_quantity }}</td>
                    <td>{{ BorrowingStatus.retrieveStatus(detail.status) }}</td>
                    <td>
                        <button
                            class="btn btn-primary"
                            @click="goToBorrowingDetail(detail.reader_id, detail.book_id, detail.borrowed_date)"
                        >
                            <FontAwesomeIcon :icon="faEye" />
                            <span class="ms-2">Chi tiết</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- <nav class="mt-5">
            <ul class="pagination justify-content-end custom-pagination">
                <li class="page-item custom-pagination__item disabled">
                    <a class="page-link custom-pagination__link p-3">
                        <FontAwesomeIcon :icon="faAngleLeft" class="custom-pagination__icon" />
                    </a>
                </li>
                <li class="page-item"><a class="page-link custom-pagination__link p-3" href="#">1</a></li>
                <li class="page-item"><a class="page-link custom-pagination__link p-3" href="#">2</a></li>
                <li class="page-item"><a class="page-link custom-pagination__link p-3" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link custom-pagination__link p-3" href="#">
                        <FontAwesomeIcon :icon="faAngleRight" class="custom-pagination__icon" />
                    </a>
                </li>
            </ul>
        </nav> -->
    </div>
</template>

<style scoped>
th,
td {
    color: var(--dark-text-color);
    padding: 8px;
}
.cell-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
}
th:last-child,
td:last-child {
    width: 240px;
}
.select {
    font-size: 1.6rem;
}
#select-status,
.label,
.select-item {
    font-size: 1.6rem;
}
.custom-pagination__link {
    font-size: 1.6rem;
    color: var(--dark-text-color);
}
.custom-pagination__icon {
    font-size: 1.4rem;
}
</style>
