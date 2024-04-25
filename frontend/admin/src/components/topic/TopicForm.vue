<script setup>
import { ref, watch } from 'vue';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

const props = defineProps({
    topic: {
        type: Object,
        required: true,
    },
    isUpdating: {
        type: Boolean,
    },
});
const $emits = defineEmits(['submit:topic']);
let localTopic = ref({
    ...props.topic,
});
const topicSchema = yup.object().shape({
    topic_name: yup.string().required('Tên chủ đề không được để trống').min(2, 'Tên chủ đề phải có ít nhất 2 ký tự'),
});
const handleSubmit = () => {
    $emits('submit:topic', localTopic.value);
};
watch(
    () => props.topic,
    (newValue) => {
        localTopic.value = {
            ...newValue,
        };
    },
);
</script>

<template>
    <Form @submit="handleSubmit" :validation-schema="topicSchema">
        <div class="form-group">
            <label for="topic_name">Tên chủ đề:</label>
            <Field
                name="topic_name"
                type="text"
                id="topic_name"
                class="form-control mt-3"
                v-model="localTopic.topic_name"
            />
            <ErrorMessage name="topic_name" class="error-feedback" />
        </div>
        <div class="form-group mt-4 text-center">
            <button type="submit" class="btn btn-primary">
                {{ isUpdating ? 'Cập nhật' : 'Thêm mới' }}
            </button>
        </div>
    </Form>
</template>

<style scoped></style>
