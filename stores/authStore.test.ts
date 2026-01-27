import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';

describe('authStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useAuthStore.getState().reset();
  });

  describe('initial state', () => {
    it('should have null user by default', () => {
      const { user } = useAuthStore.getState();
      expect(user).toBeNull();
    });

    it('should have isAuthenticated as false by default', () => {
      const { isAuthenticated } = useAuthStore.getState();
      expect(isAuthenticated).toBe(false);
    });

    it('should have isLoading as false by default', () => {
      const { isLoading } = useAuthStore.getState();
      expect(isLoading).toBe(false);
    });

    it('should have null error by default', () => {
      const { error } = useAuthStore.getState();
      expect(error).toBeNull();
    });
  });

  describe('setUser', () => {
    it('should set user and update isAuthenticated to true', () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        name: '테스트 사용자',
      };

      useAuthStore.getState().setUser(mockUser);

      const { user, isAuthenticated } = useAuthStore.getState();
      expect(user).toEqual(mockUser);
      expect(isAuthenticated).toBe(true);
    });

    it('should clear user when null is passed', () => {
      const mockUser = { id: 'user-123', email: 'test@example.com' };
      useAuthStore.getState().setUser(mockUser);
      useAuthStore.getState().setUser(null);

      const { user, isAuthenticated } = useAuthStore.getState();
      expect(user).toBeNull();
      expect(isAuthenticated).toBe(false);
    });
  });

  describe('setLoading', () => {
    it('should set loading state', () => {
      useAuthStore.getState().setLoading(true);
      expect(useAuthStore.getState().isLoading).toBe(true);

      useAuthStore.getState().setLoading(false);
      expect(useAuthStore.getState().isLoading).toBe(false);
    });
  });

  describe('setError', () => {
    it('should set error message', () => {
      useAuthStore.getState().setError('인증 실패');
      expect(useAuthStore.getState().error).toBe('인증 실패');
    });

    it('should clear error when null is passed', () => {
      useAuthStore.getState().setError('인증 실패');
      useAuthStore.getState().setError(null);
      expect(useAuthStore.getState().error).toBeNull();
    });
  });

  describe('reset', () => {
    it('should reset all state to initial values', () => {
      // Set some state
      useAuthStore.getState().setUser({ id: 'user-123', email: 'test@example.com' });
      useAuthStore.getState().setLoading(true);
      useAuthStore.getState().setError('에러');

      // Reset
      useAuthStore.getState().reset();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });
  });
});
