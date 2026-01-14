import { onMounted, onUnmounted, unref } from 'vue';

/**
 * @param {Object} keyMap - Map of keys to handlers
 * mod: boolean - whether Cmd/Ctrl key is required
 * handler: function - function to execute on key press
 * Example: { 'k': { mod: true, handler: () => {} } }
 *
 * @param {Object} options - Additional options
 * isEnabled: boolean - whether shortcuts are enabled
 */

export function useKeyboardShortcut(keyMap, options = {}) {
  const handleKeyDown = (event) => {
    const isMod = event.metaKey || event.ctrlKey;
    const key = event.key.toLowerCase();

    const isGlobalKey = key === 'k' && isMod; // Key to toggle globally

    if (!isGlobalKey && !options.isEnabled) return; // Do not process if not enabled and not global key
    
    if (keyMap[key]) {
      const { mod, handler } = keyMap[key];

      if (mod && !isMod) return; // Require mod key but it's not pressed
      if (!mod && isMod) return; // Do not require mod key but it's pressed

      handler(event); // Execute the handler
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
}