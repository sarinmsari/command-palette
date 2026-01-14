# Command Palette (Vue 3 + Vite)

A lightweight, local example of a keyboard-driven command palette built with Vue 3, Vite and Tailwind. It demonstrates a composable-driven palette with nested sub-menus, search, keyboard shortcuts and confirmable actions.

## Features

- Keyboard-activated command palette UI
- Search and debounce filtering
- Nested sub-menus and view stack navigation
- Command metadata (icons, shortcuts, descriptions, confirmations)
- Tailwind-based styling and Heroicons for icons

## Quick Start

Prerequisites: Node.js (16+ recommended) and npm.

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Usage

- Open the app (default Vite URL printed in the terminal) and press the configured keyboard shortcut (or open the palette UI) to activate the command palette.
- Type to filter commands. Use arrow keys or shortcuts to navigate. Commands can open sub-menus, perform actions, or require confirmation.

Key implementation files:

- `useCommandPalette` composable: [src/composables/useCommandPalette.js](src/composables/useCommandPalette.js)
- Command definitions & sub-menus: [src/constants/commands.js](src/constants/commands.js)
- App entry: [src/main.js](src/main.js)
- Main UI components (palette and items): [src/components/palette/](src/components/palette/)

## Commands & Structure

The initial command set and nested sub-menus are defined in [src/constants/commands.js](src/constants/commands.js). Commands include fields such as `label`, `description`, `icon`, `shortcut`, `children`, and `confirm` for dangerous actions.

The palette keeps a `viewStack` for nested navigation and a debounced search to filter active commands — see the `useCommandPalette` composable for logic.

## Development notes

- This project uses Vite + Vue 3 single-file components.
- Styling is handled by Tailwind CSS (`tailwind.config.js` and `postcss.config.js`).
- Icons are from `@heroicons/vue` and utility functions use `lodash`.

If you change command metadata, update [src/constants/commands.js](src/constants/commands.js).

## Project Structure

- `index.html` — app HTML
- `src/main.js` — Vue app bootstrap
- `src/App.vue` — root component
- `src/components/palette/` — palette UI components
- `src/composables/` — composable hooks (e.g., `useCommandPalette`)
- `src/constants/commands.js` — command definitions
- `style.css`, `tailwind.config.js`, `postcss.config.js` — styling

