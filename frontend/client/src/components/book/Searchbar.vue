<script setup>
import { ref, onMounted, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import TopicService from '@/services/topic.service.js';

const props = defineProps({
    search_name: String,
    topic_id: String,
});
const $emits = defineEmits(['submit:filter']);
let localSearchName = ref(props.search_name);
let localTopicId = ref(props.topic_id);
let topics = ref([]);

const getTopics = async () => {
    try {
        const topicService = new TopicService();
        const response = await topicService.getTopics();
        if (response.status === 'success') {
            topics.value = response.data;
        }
    } catch (error) {
        console.log(error);
    }
};
const clearSearchInput = () => {
    localSearchName.value = '';
};

watch(localSearchName, (newValue) => {
    $emits('submit:filter', localSearchName.value, localTopicId.value);
});
watch(localTopicId, (newValue) => {
    $emits('submit:filter', localSearchName.value, localTopicId.value);
});

onMounted(async () => {
    await getTopics();
});
</script>

<template>
    <div class="d-flex justify-content-center my-5">
        <div>
            <form class="rounded-pill border d-flex over-flow-hidden search-bar align-items-center" @submit.prevent>
                <input
                    type="text"
                    class="search-input p-3 flex-grow-1"
                    placeholder="Nhập tên sách cần tìm"
                    v-model="localSearchName"
                />
                <FontAwesomeIcon
                    :icon="faXmarkCircle"
                    v-if="localSearchName.length > 0"
                    @click="clearSearchInput"
                    class="clear-search-icon me-2"
                />
                <button class="btn search-btn ms-auto" type="submit">
                    <FontAwesomeIcon :icon="faSearch" />
                </button>
            </form>
        </div>
        <div class="ms-4">
            <select class="form-select rounded-pill h-100 select-input" v-model="localTopicId">
                <option selected value="">Chọn chủ đề</option>
                <option v-for="topic in topics" :value="topic._id">{{ topic.topic_name }}</option>
            </select>
        </div>
    </div>
</template>

<style scoped>
.search-bar {
    width: 520px;
}
.search-input {
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
}
.search-btn {
    border: none;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    color: var(--dark-text-color);
}
.select-input {
    font-size: 1.6rem;
    color: var(--dark-text-color);
    width: 300px;
}
.clear-search-icon:hover {
    cursor: pointer;
}
</style>
