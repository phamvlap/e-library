<script setup></script>

<template>
    <div>
        <div class="container">
            <div class="d-flex flex-column justify-content-center align-items-center mt-5">
                <h1 class="p-3">Đường dẫn không tồn tại</h1>
                <p class="p-3">
                    Địa chỉ bạn truy cập không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại đường dẫn hoặc quay về
                    <RouterLink
                        :to="{
                            name: 'home',
                        }"
                        class="fw-bold link"
                    >
                        trang chủ
                    </RouterLink>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
