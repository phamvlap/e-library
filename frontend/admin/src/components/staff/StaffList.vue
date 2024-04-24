<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faSearch, faPlus, faPen, faRotate } from '@fortawesome/free-solid-svg-icons';
import StaffRole from '@/enums/staffRoles.js';
import StaffService from '@/services/staff.service.js';
import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';

const router = useRouter();
const staffRoles = StaffRole.getKeys();
let staffs = ref([]);
let filter = ref({
    staff_role: '',
    staff_name: '',
});

const fetchStaffs = async (filter = {}) => {
    try {
        const staffService = new StaffService();
        const customFilter = {};
        Object.keys(filter).forEach((key) => {
            if (filter[key] !== '') {
                customFilter[key] = filter[key];
            }
        });
        const response = await staffService.getStaffs(customFilter);
        if (response.status === 'success') {
            staffs.value = response.data;
        }
    } catch (error) {
        staffs.value = [];
    }
};
const redirecToStaffAdd = () => {
    router.push({
        name: 'staff.add',
    });
};
const redirectToStaffModify = (staffId) => {
    router.push({
        name: 'staff.edit',
        params: {
            id: staffId,
        },
    });
};
const handleDelete = async (staffId) => {
    Swal.fire({
        title: 'Xác nhận xóa',
        text: 'Bạn có chắc chắn muốn xóa nhân viên này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        confirmButtonColor: '#dc3545',
        cancelButtonText: 'Hủy',
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const staffService = new StaffService();
                await staffService.deleteStaff(staffId);
                toast.success('Xóa nhân viên thành công', {
                    duration: 2500,
                });
                await fetchStaffs();
            } catch (error) {
                toast.error('Xóa nhân viên thất bại', {
                    duration: 2500,
                });
            }
        }
    });
};
const handleFilter = async () => {
    filter.value.name = '';
    await fetchStaffs(filter.value);
};
const handleSearchForm = async (event) => {
    event.preventDefault();
    filter.value.staff_role = '';
    await fetchStaffs(filter.value);
};
const handleRefresh = async () => {
    filter.value = {
        staff_role: '',
        staff_name: '',
    };
    await fetchStaffs();
};

onMounted(async () => {
    await fetchStaffs();
});
</script>

<template>
    <div class="p-2">
        <h1 class="p-2 text-center">Danh sách nhân viên</h1>
        <div class="p-2">
            <button class="btn btn-outline-secondary" @click="redirecToStaffAdd">
                <FontAwesomeIcon :icon="faPlus" />
                <span class="ms-2">Thêm nhân viên mới</span>
            </button>
        </div>
        <div class="p-2 d-flex border justify-content-between align-items-center">
            <!-- filter -->
            <div class="d-flex">
                <div class="d-flex align-items-center justify-content-center">
                    <div class="input-group m-0">
                        <label class="input-group-text label" for="select-topic">Vai trò</label>
                        <select class="form-select" id="select-topic" v-model="filter.staff_role">
                            <option class="select-item" selected value="">-- Chọn --</option>
                            <option class="select-item" v-for="(role, index) in staffRoles" :value="role" :key="index">
                                {{ StaffRole.retrieveRole(role) }}
                            </option>
                        </select>
                    </div>
                </div>
                <button class="btn btn-primary ms-3" @click="handleFilter">Áp dụng</button>
            </div>
            <!-- search -->
            <div class="d-flex">
                <form class="input-group" @submit="handleSearchForm">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Nhập tên nhân viên cần tìm"
                        aria-describedby="search-book"
                        v-model="filter.staff_name"
                    />
                    <button class="btn btn-outline-secondary" type="submit" id="search-book">
                        <FontAwesomeIcon :icon="faSearch" />
                    </button>
                </form>
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
                    <th scope="col">Mã nhân viên</th>
                    <th scope="col">Họ tên</th>
                    <th scope="col">Vai trò</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(staff, index) in staffs" :key="staff._id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ staff.staff_id }}</td>
                    <td>{{ staff.staff_name }}</td>
                    <td>{{ StaffRole.retrieveRole(staff.staff_role) }}</td>
                    <td>{{ staff.staff_address }}</td>
                    <td>{{ staff.staff_phone }}</td>
                    <td>
                        <button class="btn btn-warning" @click="redirectToStaffModify(staff.staff_id)">
                            <FontAwesomeIcon :icon="faPen" />
                            <span class="ms-2">Cập nhật</span>
                        </button>
                        <button class="btn btn-danger ms-3" @click="handleDelete(staff.staff_id)">
                            <FontAwesomeIcon :icon="faTrash" />
                            <span class="ms-2">Xóa</span>
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
</style>
