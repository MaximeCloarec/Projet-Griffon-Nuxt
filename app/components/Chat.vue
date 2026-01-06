<template>
    <div class="chat">
        <div class="messages">
            <div v-for="(msg, i) in messages" :key="i">
                <strong>{{ msg.username }}</strong> :
                {{ msg.message }}
            </div>
        </div>

        <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            placeholder="Écrire un message..."
        />
    </div>
</template>

<script setup lang="ts">

const { $socket } = useNuxtApp();

// Props
const props = defineProps<{
    roomCode: string;
    username: string | null;
}>();

const messages = ref<any[]>([]);
const newMessage = ref("");

onMounted(() => {
    $socket.emit("joinRoom", { roomCode: props.roomCode, username: props.username });

    $socket.on("chat:message", (data) => {
        messages.value.push(data);
    });

    $socket.on("chat:system", (data) => {
        messages.value.push({
            username: "SYSTEM",
            message: data.message,
        });
    });
});

function sendMessage() {
    if (!newMessage.value.trim()) return;

    $socket.emit("chat:message", {
        roomCode: props.roomCode,
        username: props.username,
        message: newMessage.value,
    });

    newMessage.value = "";
}
</script>
