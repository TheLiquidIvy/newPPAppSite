import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth } from '@devvai/devv-code-backend';

interface User {
  projectId: string;
  uid: string;
  name: string;
  email: string;
  createdTime: number;
  lastLoginTime: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: async () => {
        try {
          await auth.logout();
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
      checkAuth: () => {
        const sid = localStorage.getItem('DEVV_CODE_SID');
        return !!sid && !!get().user;
      },
    }),
    {
      name: 'pixelplaque-auth',
    }
  )
);
