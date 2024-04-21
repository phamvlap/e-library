<script setup>
import { ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faTrash,
    faSearch,
    faAngleLeft,
    faAngleRight,
    faArrowDownAZ,
    faArrowDownZA,
} from '@fortawesome/free-solid-svg-icons';
import ReaderService from '@/services/reader.service.js';
import Helper from '@/utils/helper.js';
import Gender from '@/enums/genders.js';
import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';

const readers = ref([]);
let filter = ref({
    reader_name: '',
    sort_name: 0,
});

const fetchReaders = async (filter = {}) => {
    try {
        const readerService = new ReaderService();
        const customFilter = {};
        if (filter.reader_name) {
            customFilter.reader_first_name = filter.reader_name;
            customFilter.reader_last_name = filter.reader_name;
        }
        if (filter.sort_name) {
            customFilter.sort_name = filter.sort_name;
        }
        const response = await readerService.getReaders(customFilter);
        if (response.status === 'success') {
            readers.value = response.data;
        }
    } catch (error) {
        readers.value = [];
    }
};
const submitSearchForm = async (event) => {
    event.preventDefault();

    if (filter.value.reader_name === '') {
        toast.error('Vui lòng nhập tên độc giả cần tìm', {
            duration: 1000,
        });
        return;
    }
    await fetchReaders(filter.value);
};
const handleSortName = async () => {
    if (filter.value.sort_name === 0 || filter.value.sort_name === -1) {
        filter.value.sort_name = 1;
    } else if (filter.value.sort_name === 1) {
        filter.value.sort_name = -1;
    }
    await fetchReaders(filter.value);
};
const handleDelete = async (readerId) => {
    const confirm = await Swal.fire({
        title: 'Xác nhận xóa',
        text: 'Bạn có chắc chắn muốn xóa độc giả này không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
    });
    if (confirm.isConfirmed) {
        try {
            const readerService = new ReaderService();
            const response = await readerService.deleteReader(readerId);
            if (response.status === 'success') {
                toast.success('Xóa độc giả thành công', {
                    duration: 1000,
                });
                await fetchReaders();
            }
        } catch (error) {
            toast.error('Xóa độc giả thất bại', {
                duration: 1000,
            });
        }
    }
};

onMounted(async () => {
    await fetchReaders();
});
</script>

<template>
    <div class="p-2">
        <h1 class="p-2 text-center">Danh sách độc giả</h1>
        <div class="p-2 d-flex border justify-content-between align-items-center">
            <!-- filter -->
            <div class="d-flex"></div>
            <!-- search -->
            <div>
                <form class="input-group" @submit="submitSearchForm">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Nhập tên độc giả cần tìm"
                        aria-describedby="search-book"
                        v-model="filter.reader_name"
                    />
                    <button class="btn btn-outline-secondary" type="button" id="search-book">
                        <FontAwesomeIcon :icon="faSearch" />
                    </button>
                </form>
            </div>
        </div>
        <!-- table -->
        <table class="table table-striped table-hover border mt-2">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Mã độc giả</th>
                    <th scope="col">Họ</th>
                    <th scope="col d-flex align-items-center">
                        <span>Tên</span>
                        <FontAwesomeIcon
                            :icon="filter.sort_name === 1 ? faArrowDownZA : faArrowDownAZ"
                            class="p-1 ms-3 sort-icon"
                            @click="handleSortName"
                        />
                    </th>
                    <th scope="col">Ngày sinh</th>
                    <th scope="col">Giới tính</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="reader in readers" :key="reader._id">
                    <th scope="row">1</th>
                    <td>{{ reader.reader_id }}</td>
                    <td>{{ reader.reader_first_name }}</td>
                    <td>{{ reader.reader_last_name }}</td>
                    <td>{{ Helper.formatDateTime(reader.reader_dob) }}</td>
                    <td>{{ Gender.retrieveGender(reader.reader_gender) }}</td>
                    <td>{{ reader.reader_address }}</td>
                    <td>{{ reader.reader_phone }}</td>
                    <td>
                        <button class="btn btn-warning ms-3" @click="handleDelete(reader.reader_id)">
                            <FontAwesomeIcon :icon="faTrash" />
                            <span class="ms-2">Xóa</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav class="mt-5">
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
        </nav>
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
    width: 200px;
}
.select {
    font-size: 1.6rem;
}
#select-topic,
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
.sort-icon:hover {
    cursor: pointer;
}
</style>
