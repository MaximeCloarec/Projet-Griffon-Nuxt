<template>
    <UInput v-model="email" />
    <UInput v-model="password" />
    <UButton @click="sendData">Envoyer</UButton>

    <div>Réponse : {{ data }}</div>
</template>

<script lang="ts" setup>
const { data, status, error, refresh, clear } = useAsyncData("usersInfo", () =>
    $fetch("http://localhost:3000/api/users")
);
import { ref } from "vue";
const email = ref("");
const password = ref("");

const result = ref(null);

async function sendData() {
    result.value = await $fetch("http://localhost:3000/api/register", {
        method: "POST",
        body: { email: email.value, password: password.value },
    });
    await refresh();
}
console.log(data.value);
</script>

<style></style>
