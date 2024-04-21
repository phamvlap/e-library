<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import BorrowingDetailService from '@/services/borrowingDetail.service.js';
import Helper from '@/utils/helper.js';
import BorrowingStatus from '@/enums/borrowingStatus.js';
import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';

const router = useRouter();
const props = defineProps({
    reader_id: {
        type: String,
        required: true,
    },
    book_id: {
        type: String,
        required: true,
    },
    borrowed_date: {
        type: String,
        required: true,
    },
});
const updatedStatus = BorrowingStatus.getUpdatedKeys();
const readerId = ref(props.reader_id);
const bookId = ref(props.book_id);
const borrowedDate = ref(props.borrowed_date);
let detail = ref({});
let statusList = ref([]);
let form = ref({
    new_status: '',
});
let errors = ref({
    new_status: '',
});

const fetchBorrowingDetail = async (readerId, bookId, borrowedDate) => {
    try {
        const borrowingDetailService = new BorrowingDetailService();
        const response = await borrowingDetailService.getBorrowingDetails({
            reader_id: readerId,
            book_id: bookId,
            borrowed_date: borrowedDate,
        });
        if (response.status === 'success') {
            detail.value = {
                reader_name: response.data[0].reader.reader_first_name + ' ' + response.data[0].reader.reader_last_name,
                reader_phone: response.data[0].reader.reader_phone,
                book_name: response.data[0].book[0].book_name,
                borrowed_date: response.data[0].borrowingDetail.borrowed_date,
                borrowing_quantity: response.data[0].borrowingDetail.borrowing_quantity,
                current_status: response.data[0].borrowingDetail.status,
                returned_date: response.data[0].borrowingDetail.returned_date,
                publisher_name: response.data[0].book[0].publisher[0].publisher_name,
                topic_name: response.data[0].book[0].topic[0].topic_name,
            };
            let data = [];

            for (const item of response.data) {
                let updatedBy = {};
                if (item.borrowingDetail.status_updated_by.startsWith('S')) {
                    updatedBy = {
                        id: item.updatedBy.staff_id,
                        name: item.updatedBy.staff_name,
                    };
                } else if (item.borrowingDetail.status_updated_by.startsWith('R')) {
                    updatedBy = {
                        id: item.updatedBy.reader_id,
                        name: item.updatedBy.reader_first_name + ' ' + item.updatedBy.reader_last_name,
                    };
                }
                data.push({
                    status: item.borrowingDetail.status,
                    updatedAt: item.borrowingDetail.updatedAt,
                    updatedBy,
                });
            }
            statusList.value = data;
        }
    } catch (error) {
        detail.value = {};
    }
};
const handleUpdateStatus = async (event) => {
    event.preventDefault();

    if (!form.value.new_status) {
        errors.value.new_status = 'Trạng thái mới không được để trống';
        return;
    }

    try {
        const borrowingDetailService = new BorrowingDetailService();
        const data = {
            book_id: bookId.value,
            borrowed_date: borrowedDate.value,
            borrowing_quantity: detail.value.borrowing_quantity,
            reader_id: readerId.value,
            status: form.value.new_status,
            status_updated_by: 'S1002', // update staff id later
        };
        const response = await borrowingDetailService.createBorrowingDetail(data);
        if (response.status === 'success') {
            await fetchBorrowingDetail(readerId.value, bookId.value, borrowedDate.value);
            form.value.new_status = '';
            errors.value.new_status = '';
            toast.success('Cập nhật trạng thái thành công');
        }
    } catch (error) {
        toast.error('Cập nhật trạng thái thất bại');
    }
};
const handleDelete = async () => {
    Swal.fire({
        title: 'Xác nhận xóa',
        text: 'Bạn có chắc chắn muốn xóa đơn mượn này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const borrowingDetailService = new BorrowingDetailService();
                const response = await borrowingDetailService.deleteBorrowingDetail(
                    readerId.value,
                    bookId.value,
                    borrowedDate.value,
                );
                if (response.status === 'success') {
                    toast.success('Xóa đơn mượn thành công', {
                        onClose: () => {
                            router.push({
                                name: 'borrowing.list',
                            });
                        },
                    });
                }
            } catch (error) {
                toast.error('Xóa đơn mượn thất bại');
            }
        }
    });
};

onMounted(async () => {
    await fetchBorrowingDetail(readerId.value, bookId.value, borrowedDate.value);
});
</script>

<template>
    <div class="p-2">
        <h1 class="p-2 text-center">Chi tiết mượn trả</h1>
        <div class="p-2 d-flex justify-content-between">
            <RouterLink to="/admin/borrowings" class="btn btn-outline-secondary btn-back">
                <FontAwesomeIcon :icon="faChevronLeft" />
                <span class="ms-2">Quay lại</span>
            </RouterLink>
            <button class="btn btn-danger ms-3" @click="handleDelete">
                <FontAwesomeIcon :icon="faTrash" />
                <span class="ms-2">Xóa</span>
            </button>
        </div>
        <!-- info -->
        <div class="row p-2">
            <div class="col col-md-5">
                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Tên độc giả:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">{{ detail.reader_name }}</p>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Số điện thoại:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">{{ detail.reader_phone }}</p>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Tên sách mượn:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">{{ detail.book_name }}</p>
                    </div>
                </div>

                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Ngày mượn:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">{{ Helper.formatDateTime(detail.borrowed_date) }}</p>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Số lượng mượn:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">{{ detail.borrowing_quantity }}</p>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Trạng thái hiện tại:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">{{ BorrowingStatus.retreiveStatus(detail.current_status) }}</p>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Ngày trả:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">
                            {{ detail.returned_date ? Helper.formatDateTime(detail.returned_date) : 'Chưa trả' }}
                        </p>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Nhà xuất bản:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">{{ detail.publisher_name }}</p>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-3 py-2 px-3">Chủ đề:</div>
                    <div class="col-sm-9 d-flex align-items-center">
                        <p class="text">{{ detail.topic_name }}</p>
                    </div>
                </div>
            </div>
            <div class="col col-md-7">
                <div>
                    <h2>Chi tiết trạng thái</h2>
                    <div class="my-3 row">
                        <div class="col-sm-1 py-2 px-3">STT</div>
                        <div class="col-sm-2 py-2 px-3">Thời gian</div>
                        <div class="col-sm-3 py-2 px-3">Trạng thái</div>
                        <div class="col-sm-3 py-2 px-3">Người cập nhật</div>
                        <div class="col-sm-3 py-2 px-3">Vai trò</div>
                    </div>
                    <div class="my-3 row" v-for="(item, index) in statusList" :key="index">
                        <div class="col-sm-1 py-2 px-3">{{ index + 1 }}</div>
                        <div class="col-sm-2 py-2 px-3">{{ Helper.formatDateTime(item.updatedAt) }}</div>
                        <div class="col-sm-3 py-2 px-3">{{ BorrowingStatus.retreiveStatus(item.status) }}</div>
                        <div class="col-sm-3 py-2 px-3">{{ item.updatedBy.name }}</div>
                        <div class="col-sm-3 py-2 px-3">
                            {{ item.updatedBy.id.startsWith('S') ? 'Nhân viên' : 'Độc giả' }}
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <h2>Cập nhật trạng thái đơn mượn</h2>
                    <div class="mt-3">
                        <form @submit="handleUpdateStatus">
                            <div class="input-group m-0">
                                <label class="input-group-text label" for="new-status">Trạng thái mới:</label>
                                <select class="form-select" id="new-status" name="new_status" v-model="form.new_status">
                                    <option class="select-item" disabled value="">-- Chọn --</option>
                                    <option
                                        class="select-item"
                                        v-for="(item, index) in updatedStatus"
                                        :key="index"
                                        :value="item"
                                        :disabled="
                                            statusList.map((status) => status.status).includes(item) ||
                                            (item === 'CANCELED' &&
                                                statusList.map((status) => status.status).includes('PENDING'))
                                        "
                                    >
                                        {{ BorrowingStatus.retreiveUpdatedStatus(item) }}
                                    </option>
                                </select>
                            </div>
                            <span class="error-feedback">{{ errors.new_status }}</span>
                            <div class="mt-4 d-flex justify-content-center">
                                <button type="submit" class="btn btn-outline-success">Cập nhật</button>
                            </div>
                        </form>
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
    width: 280px;
}
.select {
    font-size: 1.6rem;
}
#new-status,
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
