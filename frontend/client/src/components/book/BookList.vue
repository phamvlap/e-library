<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import BookCard from './BookCard.vue';
</script>
<template>
    <div>
        <div class="container">
            <div class="d-flex justify-content-center my-5">
                <div>
                    <div class="rounded-pill border d-flex over-flow-hidden search-bar">
                        <input type="text" class="search-input p-3 flex-grow-1" placeholder="Nhập tên sách cần tìm" />
                        <button class="btn search-btn ms-auto" type="button">
                            <FontAwesomeIcon :icon="faSearch" />
                        </button>
                    </div>
                </div>
                <div class="ms-4">
                    <select class="form-select rounded-pill h-100 select-input" aria-label="Default select example">
                        <option selected value="">Chọn chủ đề</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>

            <div>
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
            </div>
            <div>
                <h2 class="section-title">Dành cho bạn</h2>
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
            </div>
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
</style>
