<template>
    <UBlogPost
        orientation="horizontal"
        :date="date"
        :title="title"
        :description="description"
        class="m-8"
        image="https://nuxt.com/assets/blog/nuxt-icon/cover.png"
        :to="`/game/${link}`"
    />
</template>

<script lang="ts" setup>
defineProps({
    title: String,
    description: String,
    date: Date,
    link: String,
});
</script>

<style></style>
