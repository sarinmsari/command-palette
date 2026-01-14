<script setup>
import PaletteInput from './PaletteInput.vue';
import PaletteList from './PaletteList.vue';
import { ref } from 'vue';
import { useKeyboardShortcut } from '../../composables/useKeyboardShortcut';
import { useCommandPalette } from '../../composables/useCommandPalette';
import _ from 'lodash';
import ConfirmModal from '../ConfirmModal.vue';

const emit = defineEmits(['close']);

const {
    searchQuery,
    filteredCommands,
    currentView,
    pushView,
    popView
} = useCommandPalette();

const listRef = ref(null);
const showConfirmModal = ref(false);
const confirmModalData = ref({
    title: 'Are you sure?',
    message: 'This action cannot be undone.',
    actionText: 'Confirm'
});

useKeyboardShortcut({
    arrowdown: {
        mod: false,
        handler: (event) => {
            event.preventDefault();
            listRef.value?.selectNext();
        }
    },
    arrowup: {
        mod: false,
        handler: (event) => {
            event.preventDefault();
            listRef.value?.selectPrev();
        }
    },
    enter: {
        mod: false,
        handler: (event) => {
            event.preventDefault();
            listRef.value?.executeSelected();
        }
    },
    escape: {
        mod: false,
        handler: (event) => {
            event.preventDefault();
            emit('close');
        }
    },
    backspace: {
        mod: false,
        handler: (event) => {
            if (searchQuery.value === '' && currentView.value !== 'root') {
                event.preventDefault();
                popView();
            }
        }
    }
}, {
    isEnabled: true,
});

const handleConfirmationModal = (type) => {
    switch (type) {
        case 'delete-workspace':
            confirmModalData.value = {
                title: 'Delete Workspace?',
                message: 'Are you sure you want to delete this workspace? This action cannot be undone.',
                actionText: 'Delete'
            };
            break;
        case 'regenerate-key':
            confirmModalData.value = {
                title: 'Regenerate API Key?',
                message: 'Are you sure you want to regenerate the API key? The old key will no longer work.',
                actionText: 'Regenerate'
            };
            break;
        case 'logout':
            confirmModalData.value = {
                title: 'Log Out?',
                message: 'Are you sure you want to log out of your account?',
                actionText: 'Log Out'
            };
            break;
        default:
            confirmModalData.value = {
                title: 'Are you sure?',
                message: 'This action cannot be undone.',
                actionText: 'Confirm'
            };
    }
    showConfirmModal.value = true;
};

const handleExecution = (command) => {
    // push submenu
    if (command.children) {
        pushView(command.children);
        return;
    }

    // pop submenu
    if (command.isBack) {
        popView();
        return;
    }

    // handle confirmation
    if (command.confirm) {
        handleConfirmationModal(command.confirm);
    } else {
        // default action execution
        console.log('Executing:', command.name);
        emit('close');
    }
};

const handleConfimation = () => {
    console.log('Confirmed action executed.');
    showConfirmModal.value = false;
    emit('close');
};

</script>

<template>
    <div @click.self="$emit('close')"
        class="w-screen h-[100dvh] p-4 absolute top-0 left-0 bg-background/30 flex items-center justify-center z-1000">

        <!-- confirmation modal -->
        <div v-if="showConfirmModal" key="confirm_modal"
            class="bg-background w-full md:w-[480px] rounded-2xl overflow-hidden border border-highlight">
            <ConfirmModal :confirmationData="confirmModalData" @confirm="handleConfimation"
                @close="showConfirmModal = false" />
        </div>

        <!-- command palette modal -->
        <div v-else key="command_palette"
            class="bg-background w-full md:w-[600px] rounded-2xl overflow-hidden border border-highlight">
            <PaletteInput v-model="searchQuery" class="border-b-2 border-solid border-highlight" />
            <PaletteList ref="listRef" :commands="filteredCommands" @execute="handleExecution" />
        </div>
    </div>
</template>