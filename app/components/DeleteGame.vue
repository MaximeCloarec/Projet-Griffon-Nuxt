<template>
    <UButton label="Supprimer" color="error" size="xl" @click="deleteGame" />
</template>

<script lang="ts" setup>
const props = defineProps<{
    roomCode: string | null;
}>();
const toast = useToast();

const deleteGame = async () => {
    const roomCode = props.roomCode;

    if (!roomCode) {
        toast.add({
            title: "Une erreur est survenu",
            description: "La partie ne possède pas de code",
            color: "error",
        });
    }
    try {
        const data = await $fetch<Game>(
            `http://localhost:3001/api/games/${roomCode}`,
            {
                method: "DELETE",
            }
        );
        toast.add({
            title: "Succès",
            description: `Vous avez supprimer la partie.`,
            color: "success",
        });
        console.log(data);
    } catch (error: any) {
        toast.add({
            title: "Erreur",
            description: "Impossible de supprimer partie.",
            color: "error",
        });
    }
};
</script>

<style></style>
