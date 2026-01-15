<script setup>
    import { ref } from 'vue';
    const pressed = ref(false);
</script>
<template>
    <button @mousedown="pressed = true" @mouseup="pressed = false" @mouseleave="pressed = false"
        @touchstart="pressed = true" @touchend="pressed = false"
        class="transform-gpu transition-transform duration-100 ease-in-out cursor-pointer outline-none"
        :class="pressed ? 'scale-[0.98]' : 'scale-100'">
        <slot />
    </button>
</template>
