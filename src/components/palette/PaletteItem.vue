<script setup>
import { ref } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    command: { type: Object, required: true },
    isActive: { type: Boolean, default: false },
})

const pressed = ref(false);
</script>

<template>
    <li :class="{ 'is-active': isActive }" class="py-1">
        <div tabindex="0" role="button" @mousedown="pressed = true" @mouseup="pressed = false"
            @mouseleave="pressed = false" :class="[isActive ? 'bg-highlight' : '', pressed ? 'scale-[0.99]' : '']"
            class="text-start flex justify-between gap-4 px-4 py-2 rounded-xl cursor-pointer outline-none focus:outline-none transform-gpu duration-100 ease-in-out">
            <div :class="[command?.dangerous ? 'text-danger' : 'text-white']" class="flex items-start gap-4">
                <div>
                    <component :is="command.icon" class="w-4 h-4 mt-[3px]" />
                </div>
                <div>
                    <h3 class="text-xs md:text-sm">{{ command.label }}</h3>
                    <p class="text-xs opacity-50" v-if="command.description">{{ command.description }}</p>
                </div>
            </div>
            <div v-if="command.shortcut?.length" class="flex gap-1">
                <span v-for="(key, index) in command.shortcut" :key="index"
                    :class="[isActive ? 'bg-background' : 'bg-highlight']"
                    class="h-fit w-fit py-1 px-2 rounded-md text-[10px] md:text-xs">{{ key }}</span>
            </div>
            <div v-else-if="command.children" class="flex items-center">
                <ChevronRightIcon :class="[isActive ? 'text-white' : 'text-white/50']" class="w-3 h-3 md:w-4 md:h-4" />
            </div>
        </div>
    </li>
</template>
