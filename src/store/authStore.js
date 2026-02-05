import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set) => ({
  user: authService.getStoredUser(),
  workspace: authService.getStoredWorkspace(),
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { user, workspace } = await authService.login(email, password);
      set({ user, workspace, isAuthenticated: true, isLoading: false });
      return { user, workspace };
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message || 'Login failed';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
    } finally {
      set({ user: null, workspace: null, isAuthenticated: false, isLoading: false, error: null });
    }
  },

  createWorkspace: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const { user, workspace } = await authService.createWorkspace(data);
      set({ user, workspace, isAuthenticated: true, isLoading: false });
      return { user, workspace };
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message || 'Workspace creation failed';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  updateUser: (userData) => {
    set({ user: userData });
    localStorage.setItem('user', JSON.stringify(userData));
  },

  clearError: () => set({ error: null }),
}));
