<template>
    <div v-if="pending">Chargement...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else>
        <h1>{{ game.name }}</h1>
        <p>{{ game.description }}</p>

        <div v-if="isCreator">
            <h2>Vue Créateur</h2>
            <p>Liste des joueurs :</p>
            <!-- <ul>
                <li v-for="player in game.players" :key="player.id">
                    {{ player.email }}
                </li>
            </ul> -->
        </div>

        <div v-else>
            <h2>Vue Joueur</h2>
            <p>Bienvenue dans la partie de {{ game.game.creator.email }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: "auth",
});

const route = useRoute();
const userStore = useUserStore();

const {
    data: game,
    pending,
    error,
} = await useFetch(`http://localhost:3001/api/games/${route.params.roomCode}`);
console.log(game.value);
console.log();

const isCreator = computed(() => {
    return game.value?.game.creatorId === userStore.id;
});
</script>
