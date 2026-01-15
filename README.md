# Command Palette (Vue 3 + Vite)

A high-performance, keyboard-first command palette built with **Vue 3**, **Vite**, and **Tailwind CSS**. This project focuses on micro-interactions, progressive disclosure, and robust focus management.


### Deployment
The project is automatically deployed via Vercel and can be accessed live at:


[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://command-palette-lovat.vercel.app/)  
**[https://command-palette-lovat.vercel.app/](https://command-palette-lovat.vercel.app/)**


## Technical Rationale: Why Vue 3?

Vue 3 enables a focus on interaction quality and state clarity within this implementation.

While React is a common choice, Vue’s fine-grained reactivity system felt more natural for this specific UI feature. It allows for highly synchronized updates between the search input, the filtered list, and the active selection without the complexity of manual render optimizations.

The resul is a fast, keyboard-first command palette built for modern web apps.


## Keyboard Navigation

The interaction model is designed to be intuitive for "power users," heavily inspired by high-productivity tools like **Linear**.

| Shortcut | Action |
| :--- | :--- |
| **Cmd + K** | Toggle Palette (Open / Close) |
| **Esc** | Close Palette |
| **Arrows Up / Down** | Navigate through command items |
| **Arrows Right** | Enter submenu / Push view (only when search input is empty) |
| **Arrow Left / Backspace** | Go back one step (only when search input is empty) |
| **Enter** | Execute command or enter sub-menu |



## Technical Tradeoffs & Decisions

### Architecture: View Stack vs. Multi-Modal
Implemented a `viewStack` array within the `useCommandPalette` composable rather than using separate modal states. 
- **The Tradeoff:** This requires more complex state management to track navigation history.
- **The Benefit:** It enables a fluid "breadcrumb" style history. It allows for infinite nesting of sub-menus and confirmation views while keeping the user’s focus locked in a single UI context.



### Performance: Debounced Watcher vs. Computed Filtering
While a `computed` property is the Vue standard, the search logic employs a **debounced watcher**.
- **The Tradeoff:** The list updates with a slight (~300ms) delay.
- **The Benefit:** In a "realistic" environment with high command density, instant filtering on every keystroke can cause the main thread to stutter. Debouncing prioritizes **input fluidity**, ensuring the typing feel remains 100% responsive.



### Directional View Navigation (Arrow Keys)
"Finder-style" navigation is enabled via **Left** and **Right** arrow keys.
- **The Tradeoff:** To prevent "shortcut collision," these keys are only active for navigation when the search input is empty.
- **The Benefit:**Users can drill into submenus and pop back to the root menu instantly without moving their hands to the "Enter" or "Backspace" keys. This creates a spatial mental model (moving "into" and "out of" folders).



### UX: Global Keyboard Engine & Contextual Keys
Instead of binding events strictly to the input field, built a global window listener via `useKeyboardShortcut`.
- **Stability:** Navigation remains functional even if focus accidentally shifts, providing a robust "pro-tool" feel.
- **Contextual Intelligence:** The **Backspace** key is "double-purpose"—it deletes text normally, but acts as a "Go Back" trigger for the menu stack when the input is empty.


## Project Structure

- `src/composables/useCommandPalette.js`: The "brain" of the palette. Manages the navigation stack and debounced filtering logic.
- `src/composables/useKeyboardShortcut.js`: A reusable event listener that handles global triggers and internal modal navigation.
- `src/constants/commands.js`: A centralized, flat data structure for all actions and nested sub-menus.

## Roadmap (Future Improvements)

1. **TypeScript Migration:** Introduce strict typing for command structures and view states to improve long-term maintainability.
2. **OS-Aware Shortcuts:** Automatically update UI shortcut suggestions (e.g., swapping `Cmd` for `Ctrl`) based on the user's detected operating system.
3. **Categorization:** Implement visual groupings and headers within the list to better organize large sets of diverse commands.
4. **React Port:** Migrate the core logic to React to demonstrate cross-framework proficiency and compare performance overhead.

---

## Quick Start

```bash
# Install dependencies
npm install

# Run the development server
npm run dev