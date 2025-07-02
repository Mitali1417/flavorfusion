import { create } from 'zustand';

interface AuthState {
  user: string | null;
  login: () => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: localStorage.getItem('authUser') || null,
  login: () => {
    set({ user: 'guest' });
    localStorage.setItem('authUser', 'guest');
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem('authUser');
  },
  isAuthenticated: () => get().user === 'guest',
})); 