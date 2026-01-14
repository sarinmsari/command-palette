<script setup>
const props = defineProps({
    command: { type: Object, required: true },
    isActive: { type: Boolean, default: false },
})
</script>

<template>
    <li :class="{'is-active bg-highlight':isActive}" class="text-start flex justify-between gap-4 p-4 rounded-xl cursor-pointer">
        <div class="flex items-start gap-2">
            <div>
                <component :is="command.icon" class="w-4 h-4 mt-[3px]" />
            </div>
            <div>
                <h3 class="text-sm">{{ command.name }}</h3>
                <p class="text-xs text-white/50" v-if="command.description">{{ command.description }}</p>
            </div>
        </div>
        <div v-if="command.shortcut?.length" class="flex gap-1">
            <span v-for="(key,index) in command.shortcut" :key="index" class="bg-highlight py-1 px-2 rounded-md text-xs">{{ key }}</span>
        </div>
    </li>
</template>
