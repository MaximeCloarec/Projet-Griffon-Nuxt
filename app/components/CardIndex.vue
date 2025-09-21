<template>
    <div class="card" :style="{ borderColor: borderColor }">
        <div
            class="cardContainer"
            :style="{
                backgroundImage: `linear-gradient(0.25turn, rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(${bgImage})`,
            }"
        >
            <div class="textContainer">
                <h2>{{ title }}</h2>
                <p>{{ description }}</p>
                <slot name="extra"></slot>
                <button v-if="buttonText">{{ buttonText }}</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: String,
    description: String,
    buttonText: String,
    bgImage: String,
    borderColor: {
        type: String,
        default: "#000",
    },
});
</script>

<style scoped>
.card {
    border: solid 1px;
    border-radius: 45px;
    padding: 25px;
    margin: 25px;
    max-width: 960px;
}

.cardContainer {
    display: flex;
    align-items: flex-end;
    border-radius: 20px;
    background-position: center;
    background-size: cover;
    min-height: 480px;
}

.textContainer {
    height: fit-content;
    margin: 30px;
}

h2 {
    font-family: UnifrakturMaguntia;
    font-size: 62px;
    margin: 10px;
}

p {
    font-family: Space Grotesk;
    font: 16px;
    margin: 10px;
}


</style>
