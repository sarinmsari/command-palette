<script setup>
const props = defineProps({
  query: { type: String, default: '' }
});
</script>

<template>
    <div class="flex flex-col items-center justify-center h-full text-center p-4 text-gray-400">
        <p class="text-sm">No results found for "{{ query }}".</p>
    </div>
</template>