import { UserCircleIcon } from '@heroicons/vue/24/outline'

export const COMMANDS = [
  { id: '1', name: 'Search Users', icon: UserCircleIcon, shortcut: ['⌘','U'] },
  { id: '2', name: 'Change Theme', icon: UserCircleIcon, children: 'theme_submenu' },
  { id: '2', name: 'Settings', icon: UserCircleIcon, description: "Update profile settings", children: 'settings_submenu' },
  { id: '3', name: 'Delete Project', icon: UserCircleIcon, dangerous: true }, 
];

export const SETTINGS_SUBMENU = [
  { id: 's1', name: 'Change Workspace Name', icon: UserCircleIcon },
  { id: 's2', name: 'Back to Main Menu', icon: UserCircleIcon, isBack: true },
];