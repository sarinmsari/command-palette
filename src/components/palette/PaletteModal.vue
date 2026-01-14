<script setup>
import PaletteInput from './PaletteInput.vue';
import PaletteList from './PaletteList.vue';
import {COMMANDS} from '../../constants/commands'
import { ref } from 'vue';
import { useKeyboardShortcut } from '../../composables/useKeyboardShortcut';

const listRef = ref(null);
const modalRef = ref(null);

const emit = defineEmits(['close']);

useKeyboardShortcut({
  escape: {
    mod: false,
    handler: () => {
      emit('close');
    }
  },
  arrowdown: {
    mod: false,
    handler: () => {
      listRef.value?.selectNext();
    }
  },
  arrowup: {
    mod: false,
    handler: () => {
      listRef.value?.selectPrev();
    }
  },
  enter: {
    mod: false,
    handler: () => {
      listRef.value?.executeSelected();
    }
  }
},{
  isEnabled: true,
});

const handleExecute = (command) => {
  console.log('Executing command:', command);
}

</script>

<template>
    <div @click.self="$emit('close')" class="w-screen h-[100dvh] absolute top-0 left-0 bg-background/30 flex items-center justify-center">
        <div class="bg-background w-[600px] rounded-2xl p-4" ref="modalRef">
            <PaletteInput/>
            <PaletteList ref="listRef" :commands="COMMANDS" @execute="handleExecute"/>
        </div>
    </div>
</template>