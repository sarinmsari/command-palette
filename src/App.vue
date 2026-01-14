<script setup>
import { ref } from 'vue';
import PaletteModal from './components/palette/PaletteModal.vue';
import { useKeyboardShortcut } from './composables/useKeyboardShortcut'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const isPaletteOpen = ref(false);
const cmdPaletteShortcut = ['⌘', 'k'];

useKeyboardShortcut({
  k: { mod: true, handler: (event) => { event.preventDefault(); isPaletteOpen.value = !isPaletteOpen.value; } }
}, {
  isEnabled: isPaletteOpen.value,
});
</script>

<template>
  <!-- Searchbar -->
  <div @click="isPaletteOpen = true"
    class="absolute top-4 left-0 right-0 m-auto w-fit text-muted text-xs md:text-sm px-4 py-2 bg-background hover:bg-highlight group/searchbar transform-gpu duration-100 ease-in-out rounded-full flex items-center gap-4 cursor-pointer">
    <MagnifyingGlassIcon class="w-4 h-4" />
    Type a command or serach...
    <div class="flex gap-1">
      <span v-for="(key, index) in cmdPaletteShortcut" :key="index"
        class="bg-highlight group-hover/searchbar:bg-background py-0.5 px-2 rounded-md text-[10px]">{{
          key }}</span>
    </div>
  </div>

  <!-- Command Palette Trigger Indicator -->
  <div class="flex gap-4 md:gap-6 text-sm md:text-base">
    Open command palette
    <div class="flex gap-1">
      <span v-for="(key, index) in cmdPaletteShortcut" :key="index"
        class="bg-background py-1 px-2 rounded-md text-xs">{{
          key }}</span>
    </div>
  </div>

  <!-- Command Palette Modal -->
  <Transition name="fade-slide">
    <PaletteModal v-if="isPaletteOpen" @close="isPaletteOpen = false" />
  </Transition>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 100ms ease, transform 100ms ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>
