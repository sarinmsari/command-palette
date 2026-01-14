<script setup>
import { ref } from 'vue';
import PaletteModal from './components/palette/PaletteModal.vue';
import { useKeyboardShortcut } from './composables/useKeyboardShortcut'

const isPaletteOpen = ref(false);
const cmdPaletteShortcut = ['⌘', 'k'];

useKeyboardShortcut({
  k: { mod: true, handler: () => { isPaletteOpen.value = !isPaletteOpen.value; } }
},{
  isEnabled: isPaletteOpen.value,
});
</script>

<template>
  <div class="flex gap-10">
    Open command palette
    <div class="flex gap-1">
      <span v-for="(key, index) in cmdPaletteShortcut" :key="index"
        class="bg-background py-1 px-2 rounded-md text-xs">{{
          key }}</span>
    </div>
  </div>
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
