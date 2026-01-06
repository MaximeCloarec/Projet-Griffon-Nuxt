<template>
    <div class="board">
        <img
            class="token"
            src="https://picsum.photos/200"
            draggable="true"
            @dragstart="onDragStart"
            :style="{
                left: posX + 'px',
                top: posY + 'px',
            }"
        />
    </div>
</template>

<script lang="ts" setup>
const { $socket } = useNuxtApp();
import { ref, onMounted, onBeforeUnmount } from "vue";

const posX = ref(0);
const posY = ref(0);

const offsetX = ref(0);
const offsetY = ref(0);
const isDragging = ref(false);
const tokenWidth = 100;
const tokenHeight = 100;
const board = ref<HTMLElement | null>(null);

const onDragStart = (event: DragEvent) => {
    if (event.dataTransfer) {
        event.dataTransfer.setDragImage(new Image(), 0, 0);
    }
    offsetX.value = event.clientX - posX.value;
    offsetY.value = event.clientY - posY.value;
    isDragging.value = true;
};

const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    if (isDragging.value) {
        posX.value = event.clientX - offsetX.value;
        posY.value = event.clientY - offsetY.value;
        $socket.emit("token:moved", { x: posX.value, y: posY.value });
        console.log(posX.value,posY.value);
        
        $socket.on("token:update", (data: { x: number; y: number }) => {
            posX.value = data.x;
            posY.value = data.y;
        });

        // Constrain within board boundaries
        const boardRect = board.value?.getBoundingClientRect();
        if (boardRect) {
            posX.value = Math.max(
                0,
                Math.min(posX.value, boardRect.width - tokenWidth)
            );
            posY.value = Math.max(
                0,
                Math.min(posY.value, boardRect.height - tokenHeight)
            );
        }
    }
};

const onDragEnd = () => {
    isDragging.value = false;
};

onMounted(() => {
    board.value = document.querySelector(".board");
    board.value?.addEventListener("dragover", onDragOver);
    board.value?.addEventListener("dragend", onDragEnd);
});

onBeforeUnmount(() => {
    board.value?.removeEventListener("dragover", onDragOver);
    board.value?.removeEventListener("dragend", onDragEnd);
});
</script>

<style>
.board {
    position: relative;
    width: 100vw;
    height: 100vh;
}

.token {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid #000;
    cursor: grab;
}
</style>
