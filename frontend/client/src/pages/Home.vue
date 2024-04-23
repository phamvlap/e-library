<script setup>
import BookCard from './../components/book/BookCard.vue';
</script>
<template>
    <div>
        <div class="container">
            <div class="position-relative">
                <img src="@/assets/images/background.jpg" alt="" class="w-100" />
                <div class="position-absolute greeting">
                    <h1 class="fw-bold message-title">Chào mừng bạn đến với E-library</h1>
                    <RouterLink to="/books" class="d-inline-block mt-3 py-4 px-5 bg-light link rounded-2 fw-bold"
                        >Khám phá ngay</RouterLink
                    >
                </div>
            </div>
            <div class="mt-4">
                <h2 class="section-title">Sách mới</h2>
                <div class="row mt-3">
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                </div>
                <div class="d-flex justify-content-center mt-2">
                    <RouterLink to="/books" class="d-inline-block p-1">Xem tất cả</RouterLink>
                </div>
            </div>
            <div class="mt-4">
                <h2 class="section-title">Sách đươc mượn nhiều</h2>
                <div class="row mt-3">
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                    <div class="col col-md-2">
                        <BookCard />
                    </div>
                </div>
                <div class="d-flex justify-content-center mt-2">
                    <RouterLink to="/books" class="d-inline-block p-1">Xem tất cả</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.greeting {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
}
.message-title {
    font-size: 3.4rem;
    text-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
}
.link {
    color: var(--dark-text-color);
    font-size: 2rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}
.link:hover {
    opacity: 0.95;
}
.section-title {
    font-size: 2.2rem;
    font-weight: bold;
}
</style>
