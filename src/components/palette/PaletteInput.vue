<script setup>
import { onMounted, ref } from 'vue';

const input = ref(null);

onMounted(() => {
    input.value.focus();
})
</script>

<template>
    <div>
        <input ref="input" type="text" placeholder="Type a command or search..."
            class="w-full p-4 border-none outline-none focus:outline-none bg-background text-lg" />
    </div>
</template>