<script setup>
import Header from '@/components/partials/Header.vue';
import Footer from '@/components/partials/Footer.vue';
import UserSideBar from '@/components/partials/UserSideBar.vue';
</script>
<template>
    <div class="d-flex flex-column h-100">
        <Header />
        <div class="container mt-3">
            <div class="row p-0 m-0">
                <div class="col-2 p-0">
                    <UserSideBar />
                </div>
                <div class="col-10 p-0">
                    <RouterView />
                </div>
            </div>
        </div>
        <Footer class="mt-auto" />
    </div>
</template>
<style scoped></style>
