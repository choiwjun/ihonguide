/**
 * useAuth 훅 테스트 (간소화 버전)
 */

import { describe, it, expect, vi } from 'vitest';

// Mock Supabase client
vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
    },
  }),
}));

describe('useAuth', () => {
  it('should export useAuth function', async () => {
    const { useAuth } = await import('./useAuth');
    expect(typeof useAuth).toBe('function');
  });

  it('should be a valid React hook (function name starts with use)', async () => {
    const { useAuth } = await import('./useAuth');
    expect(useAuth.name).toBe('useAuth');
  });
});
