<script setup>
import { onMounted, ref } from 'vue';

defineProps({
    modelValue: {
        type: String,
        default: ''
    }
});
defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
    input.value.focus();
})
</script>

<template>
    <input ref="input" type="text" placeholder="Type a command or search..." :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full p-4 outline-none focus:outline-none bg-background text-lg" />
</template>