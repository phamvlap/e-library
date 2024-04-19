<script setup>
import Header from '@/components/partials/Header.vue';
import Footer from '@/components/partials/Footer.vue';
import SideBar from '@/components/partials/SideBar.vue';
</script>

<template>
    <div class="d-flex flex-column h-100">
        <Header />
        <div class="container-fluid flex-grow-1 p-0">
            <div class="row m-0 h-100">
                <div class="col-md-2 p-0">
                    <SideBar />
                </div>
                <div class="col-md-10 p-0">
                    <RouterView />
                </div>
            </div>
        </div>
        <Footer class="mt-auto" />
    </div>
</template>

<style scoped></style>
