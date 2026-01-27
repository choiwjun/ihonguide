/**
 * 인증 액션 테스트
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Supabase client
const mockSignInWithOAuth = vi.fn();
const mockSignOut = vi.fn();
const mockGetSession = vi.fn();
const mockGetUser = vi.fn();

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signInWithOAuth: mockSignInWithOAuth,
      signOut: mockSignOut,
      getSession: mockGetSession,
      getUser: mockGetUser,
    },
  }),
}));

import { signInWithKakao, signInWithNaver, signOut, getSession, getUser } from './actions';

describe('Auth Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });
  });

  describe('signInWithKakao', () => {
    it('should call signInWithOAuth with kakao provider', async () => {
      mockSignInWithOAuth.mockResolvedValue({ data: { url: 'https://kakao.com/oauth' }, error: null });

      const result = await signInWithKakao();

      expect(mockSignInWithOAuth).toHaveBeenCalledWith({
        provider: 'kakao',
        options: {
          redirectTo: expect.stringContaining('/auth/callback'),
        },
      });
      expect(result.data).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it('should return error when OAuth fails', async () => {
      mockSignInWithOAuth.mockResolvedValue({ data: null, error: { message: 'OAuth failed' } });

      const result = await signInWithKakao();

      expect(result.error).toBe('OAuth failed');
    });
  });

  describe('signInWithNaver', () => {
    it('should call signInWithOAuth for naver login', async () => {
      mockSignInWithOAuth.mockResolvedValue({ data: { url: 'https://naver.com/oauth' }, error: null });

      const result = await signInWithNaver();

      expect(mockSignInWithOAuth).toHaveBeenCalled();
      expect(result.data).toBeDefined();
    });
  });

  describe('signOut', () => {
    it('should call supabase signOut', async () => {
      mockSignOut.mockResolvedValue({ error: null });

      const result = await signOut();

      expect(mockSignOut).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });

    it('should return error when signOut fails', async () => {
      mockSignOut.mockResolvedValue({ error: { message: 'Sign out failed' } });

      const result = await signOut();

      expect(result.error).toBe('Sign out failed');
    });
  });

  describe('getSession', () => {
    it('should return session when available', async () => {
      const mockSession = { access_token: 'token', user: { id: '123' } };
      mockGetSession.mockResolvedValue({ data: { session: mockSession }, error: null });

      const result = await getSession();

      expect(result.session).toEqual(mockSession);
      expect(result.error).toBeNull();
    });

    it('should return null session and error when failed', async () => {
      mockGetSession.mockResolvedValue({ data: { session: null }, error: { message: 'Session error' } });

      const result = await getSession();

      expect(result.session).toBeNull();
      expect(result.error).toBe('Session error');
    });
  });

  describe('getUser', () => {
    it('should return user when available', async () => {
      const mockUser = { id: '123', email: 'test@example.com' };
      mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });

      const result = await getUser();

      expect(result.user).toEqual(mockUser);
      expect(result.error).toBeNull();
    });
  });
});
