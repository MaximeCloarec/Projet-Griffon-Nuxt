<template>
    <div v-if="pending">Chargement...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else>
        <h1>{{ data.game.name }}</h1>
        <p>{{ data.game.description }}</p>

        <div v-if="isCreator">
            <h2>Vue Créateur</h2>
            <!-- <p>Liste des joueurs :</p>
            <ul>
                <li v-for="player in data.game.players" :key="player.id">
                    {{ player.email }}
                </li>
            </ul> -->
        </div>
        <div v-else>
            <h2>Vue Joueur</h2>
            <!-- <p>Bienvenue dans la partie de {{ data.game.creator.email }}</p> -->
        </div>
        <UButton @click="test()">Test</UButton>
        <UButton @click="joinRoom()">Join Room</UButton>
        <Chat :roomCode="route.params.roomCode" :username="userStore.email"></Chat>
        <Board/>
    </div>
</template>

<script setup lang="ts">
import Chat from '~/components/Chat.vue';

const { $socket } = useNuxtApp();

definePageMeta({
    middleware: "auth",
});

const route = useRoute();
const userStore = useUserStore();

const { data, pending, error } = await useFetch(
    `http://localhost:3001/api/games/${route.params.roomCode}`
);
console.log(data.value);

const isCreator = computed(() => {
    if (!data.value) return false;
    return data.value.game.creatorId === userStore.id;
});

</script>
