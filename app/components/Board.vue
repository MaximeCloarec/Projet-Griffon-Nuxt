<template>
    <div>
        <h2>Playing Board</h2>
        <div class="board">
            <Token />
            <!-- Board content goes here -->
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style>
.board {
    width: 600px;
    height: 400px;
    border: 2px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
}
</style>
