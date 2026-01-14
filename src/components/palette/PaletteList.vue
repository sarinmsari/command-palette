<script setup>
import { ref, watch, nextTick } from 'vue';
import PaletteItem from './PaletteItem.vue';
import PaletteEmpty from './PaletteEmpty.vue';

const props = defineProps({
  commands: { type: Array, required: true }
});

const emit = defineEmits(['execute']);

const selectedIndex = ref(0);
const listContainer = ref(null);
const pressedIndex = ref(0);

watch(() => props.commands, () => {
  selectedIndex.value = 0;
});

// Keep selected item in view during keyboard navigation
const scrollIntoView = () => {
  nextTick(() => {
    const activeItem = listContainer.value?.querySelector('.is-active');
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  });
};

// Exposed methods
const selectNext = () => {
  if (selectedIndex.value < props.commands.length - 1) {
    selectedIndex.value++;
    scrollIntoView();
  }
};

const selectPrev = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--;
    scrollIntoView();
  }
};

const executeSelected = () => {
  const selectedCommand = props.commands[selectedIndex.value];
  if (selectedCommand) {
    emit('execute', selectedCommand);
    pressedIndex.value = selectedIndex.value

    setTimeout(() => {
      pressedIndex.value = null
    }, 60)
  }
};

defineExpose({
  selectNext,
  selectPrev,
  executeSelected,
});
</script>

<template>
  <div
    class="palette-list-container relative h-[400px] w-full overflow-x-hidden overflow-y-auto scroll-smooth p-2 outline-none focus:outline-none"
    ref="listContainer" tabindex="0">
    <TransitionGroup name="list" tag="ul" class="flex relative list-none flex-col">

      <PaletteItem v-for="(command, index) in commands" :key="command.id" :command="command"
        :isActive="index === selectedIndex" @click="$emit('execute', command)" @mouseenter="selectedIndex = index"
        :class="[pressedIndex === index ? 'scale-[0.99]' : '']" />

      <li>
        <PaletteEmpty v-if="commands.length === 0" key="empty" />
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.list-move {
  transition: transform 150ms ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(10impx);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.list-leave-active {
  position: absolute;
  width: calc(100% - 1rem);
  z-index: 0;
}
</style>