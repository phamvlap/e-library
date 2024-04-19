<script setup>
import Header from '@/components/partials/Header.vue';
import Footer from '@/components/partials/Footer.vue';
import SideBar from '@/components/partials/SideBar.vue';
</script>

<template>
    <div class="d-flex flex-column h-100">
        <Header />
        <RouterView />
        <Footer class="mt-auto" />
    </div>
</template>

<style scoped></style>
