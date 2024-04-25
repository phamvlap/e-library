<script setup>
import { ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPen, faRotate } from '@fortawesome/free-solid-svg-icons';
import TopicService from '@/services/topic.service.js';
import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';
import TopicForm from './TopicForm.vue';

const topics = ref([]);
let topic = ref({
    topic_name: '',
});
let isUpdating = ref(false);

const handleRefresh = async () => {
    await fetchTopics();
    topic.value = {
        topic_name: '',
    };
    isUpdating.value = false;
};
const fetchTopics = async () => {
    try {
        const topicService = new TopicService();
        const response = await topicService.getTopics();
        if (response.status === 'success') {
            topics.value = response.data;
        }
    } catch (error) {
        topics.value = [];
    }
};
const handleSubmit = async (data) => {
    try {
        const topicService = new TopicService();
        let response = null;
        if (data._id) {
            response = await topicService.updateTopic(data._id, data);
        } else {
            response = await topicService.createTopic(data);
        }
        if (response.status === 'success') {
            await fetchTopics();
            toast.success(`${data._id ? 'Cật nhật chủ đề thành công' : 'Thêm chủ đề mới thành công'}`, {
                duration: 1000,
            });
            handleRefresh();
        } else {
            toast.error(`${data._id ? 'Cật nhật chủ đề thất bại' : 'Thêm chủ đề mới thất bại'}`, {
                duration: 1000,
            });
        }
    } catch (error) {
        toast.error('Có lỗi xảy ra', {
            duration: 1000,
        });
    }
};
const handleDelete = async (topicId) => {
    Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa chủ đề này không?',
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
                const topicService = new TopicService();
                const response = await topicService.deleteTopic(topicId);
                if (response.status === 'success') {
                    await fetchTopics();
                    toast.success('Xóa chủ đề thành công', {
                        duration: 1000,
                    });
                } else {
                    toast.error('Xóa chủ đề thất bại', {
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
    const topicService = new TopicService();
    const response = await topicService.getTopic(id);
    if (response.status === 'success') {
        topic.value = response.data;
        isUpdating.value = true;
    }
};

onMounted(async () => {
    await fetchTopics();
});
</script>

<template>
    <div class="p-2">
        <h1 class="p-2 text-center">Danh sách chủ đề</h1>
        <div class="row">
            <div class="col col-md-6 p-3">
                <!-- table -->
                <table class="table table-striped table-hover border mt-2">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên chủ đề</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(topic, index) in topics" :key="topic._id">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ topic.topic_name }}</td>
                            <td>
                                <button class="btn btn-warning" @click="handleUpdate(topic._id)">
                                    <FontAwesomeIcon :icon="faPen" />
                                    <span class="ms-2">Chỉnh sửa</span>
                                </button>
                                <button class="btn btn-danger ms-3" @click="handleDelete(topic._id)">
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
            <div class="col col-md-6 p-3">
                <h2 class="text-center">{{ isUpdating ? 'Cập nhật chủ đề' : 'Thêm chủ đề mới' }}</h2>
                <div class="p-3 mt-3">
                    <TopicForm :topic="topic" @submit:topic="handleSubmit" :isUpdating="isUpdating" />
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
