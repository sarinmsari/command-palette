<script setup>
defineProps({
    confirmationData: {
        type: Object,
        required: true
    }
});

defineEmits(['close', 'confirm']);
</script>

<template>
    <div class="flex flex-col items-start justify-center h-full p-8 text-white">
        <h3 class="text-sm md:text-lg">{{ confirmationData?.title }}</h3>
        <p v-if="confirmationData?.message" class="text-xs md:text-base mt-2">{{ confirmationData.message }}</p>
        <div class="mt-8 w-full flex justify-end gap-2 text-xs md:text-base">
            <button @click="$emit('close')"
                class="px-4 py-2 bg-muted text-white rounded-md hover:bg-gray-600 transition transform-gpu">Cancel</button>
            <button @click="$emit('confirm')"
                class="px-4 py-2 bg-danger text-white rounded-md hover:bg-red-700 transition transform-gpu">{{
                    confirmationData.actionText ?? 'Confirm' }}</button>
        </div>
    </div>
</template>