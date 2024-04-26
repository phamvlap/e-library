<script setup>
import { ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPen, faRotate } from '@fortawesome/free-solid-svg-icons';
import PublisherService from '@/services/publisher.service.js';
import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';
import PublisherForm from './PublisherForm.vue';

const publishers = ref([]);
let publisher = ref({
    publisher_name: '',
    publisher_address: '',
});
let isUpdating = ref(false);
let isMounted = ref(false);

const handleRefresh = async () => {
    await fetchPublishers();
    publisher.value = {
        publisher_name: '',
        publisher_address: '',
    };
    isUpdating.value = false;
};
const fetchPublishers = async () => {
    try {
        const publisherService = new PublisherService();
        const response = await publisherService.getPublishers();
        if (response.status === 'success') {
            publishers.value = response.data;
        }
    } catch (error) {
        publishers.value = [];
    }
};
const handleSubmit = async (data) => {
    try {
        const publisherService = new PublisherService();
        let response = null;
        if (data._id) {
            response = await publisherService.updatePublisher(data._id, data);
        } else {
            response = await publisherService.createPublisher(data);
        }
        if (response.status === 'success') {
            await fetchPublishers();
            toast.success(`${data._id ? 'Cật nhật nhà xuất bản thành công' : 'Thêm nhà xuất bản mới thành công'}`, {
                duration: 1000,
                onClose: async () => {
                    await handleRefresh();
                },
            });
        } else {
            toast.error(`${data._id ? 'Cật nhật nhà xuất bản thất bại' : 'Thêm nhà xuất bản mới thất bại'}`, {
                duration: 1000,
            });
        }
    } catch (error) {
        toast.error('Có lỗi xảy ra', {
            duration: 1000,
        });
    }
};
const handleDelete = async (publisherId) => {
    Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa nhà xuất bản này không?',
        text: 'Dữ liệu sẽ không thể khôi phục sau khi xóa',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const publisherService = new PublisherService();
                const response = await publisherService.deletePublisher(publisherId);
                if (response.status === 'success') {
                    await fetchPublishers();
                    toast.success('Xóa nhà xuất bản thành công', {
                        duration: 1000,
                    });
                } else {
                    toast.error('Xóa nhà xuất bản thất bại', {
                        duration: 1000,
                    });
                }
            } catch (error) {
                toast.error('Có lỗi xảy ra', {
                    duration: 1000,
                });
            }
        }
    });
};
const handleUpdate = async (id) => {
    const publisherService = new PublisherService();
    const response = await publisherService.getPublisher(id);
    if (response.status === 'success') {
        publisher.value = response.data;
        isUpdating.value = true;
    }
};

onMounted(async () => {
    await fetchPublishers();
    isMounted.value = true;
});
</script>

<template>
    <div class="p-2">
        <h1 class="p-2 text-center">Danh sách nhà xuất bản</h1>
        <div class="row">
            <div class="col col-md-7 p-3">
                <!-- table -->
                <table class="table table-striped table-hover border mt-2" v-if="isMounted">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên nhà xuất bản</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(publisher, index) in publishers" :key="publisher._id">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ publisher.publisher_name }}</td>
                            <td>{{ publisher.publisher_address }}</td>
                            <td>
                                <button class="btn btn-warning" @click="handleUpdate(publisher._id)">
                                    <FontAwesomeIcon :icon="faPen" />
                                    <span class="ms-2">Chỉnh sửa</span>
                                </button>
                                <button class="btn btn-danger ms-3" @click="handleDelete(publisher._id)">
                                    <FontAwesomeIcon :icon="faTrash" />
                                    <span class="ms-2">Xóa</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="">
                    <button class="btn btn-secondary" type="button" @click="handleRefresh">
                        <FontAwesomeIcon :icon="faRotate" />
                        <span class="ms-2">Làm mới</span>
                    </button>
                </div>
            </div>
            <div class="col col-md-5 p-3">
                <h2 class="text-center">{{ isUpdating ? 'Cập nhật nhà xuất bản' : 'Thêm nhà xuất bản mới' }}</h2>
                <div class="p-3 mt-3" v-if="isMounted">
                    <PublisherForm :publisher="publisher" @submit:publisher="handleSubmit" :isUpdating="isUpdating" />
                </div>
            </div>
        </div>
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
#select-publisher,
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
