import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark', // Default to dark for cyberpunk feel
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          // Update document class
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { theme: newTheme };
        }),
      setTheme: (theme) =>
        set(() => {
          // Update document class
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { theme };
        }),
    }),
    {
      name: 'pixelplaque-theme',
    }
  )
);

// Initialize theme on load
const storedTheme = localStorage.getItem('pixelplaque-theme');
if (storedTheme) {
  const theme = JSON.parse(storedTheme).state.theme;
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
} else {
  // Default to dark theme
  document.documentElement.classList.add('dark');
}
