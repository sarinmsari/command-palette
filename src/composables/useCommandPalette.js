import { ref, computed, watch } from "vue";
import _ from "lodash";
import { INITIAL_COMMANDS, SUB_MENUS } from "../constants/commands";

export function useCommandPalette() {
  const viewStack = ref(["root"]);
  const searchQuery = ref("");
  const filteredCommands = ref([...INITIAL_COMMANDS]);

  const currentView = computed(
    () => viewStack.value[viewStack.value.length - 1]
  );

  const updateFilteredList = _.debounce(() => {
    const query = searchQuery.value.toLowerCase().trim();

    const activeSource =
      currentView.value === "root"
        ? INITIAL_COMMANDS
        : SUB_MENUS[currentView.value] || [];

    if (!query) {
      filteredCommands.value = activeSource;
    } else {
      filteredCommands.value = activeSource.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query) ||
          (cmd.description && cmd.description.toLowerCase().includes(query))
      );
    }
  }, 300); // debounce for 250ms

  watch([searchQuery, currentView], () => {
    updateFilteredList();
  });

  // push submenu view onto the stack
  const pushView = (viewId) => {
    viewStack.value.push(viewId);
    searchQuery.value = "";
  };

  const popView = () => {
    if (viewStack.value.length > 1) {
      viewStack.value.pop();
      searchQuery.value = "";
    }
  };

  return {
    searchQuery,
    filteredCommands,
    currentView,
    pushView,
    popView,
  };
}
