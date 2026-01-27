/**
 * 환경 변수 검증 테스트
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { validateEnv, getEnvConfig, isProduction, getSafeErrorMessage } from './env';

describe('validateEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return valid when all required env vars exist', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';

    const result = validateEnv();

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should return errors for missing SUPABASE_URL', () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';

    const result = validateEnv();

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL');
  });

  it('should return errors for missing SUPABASE_ANON_KEY', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const result = validateEnv();

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Missing required environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
  });

  it('should return multiple errors when multiple vars are missing', () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const result = validateEnv();

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(2);
  });
});

describe('getEnvConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return env config object', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';

    const config = getEnvConfig();

    expect(config.NEXT_PUBLIC_SUPABASE_URL).toBe('https://test.supabase.co');
    expect(config.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe('test-key');
  });

  it('should return empty strings for missing vars', () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const config = getEnvConfig();

    expect(config.NEXT_PUBLIC_SUPABASE_URL).toBe('');
    expect(config.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe('');
  });
});

describe('isProduction', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return true in production', () => {
    process.env.NODE_ENV = 'production';
    expect(isProduction()).toBe(true);
  });

  it('should return false in development', () => {
    process.env.NODE_ENV = 'development';
    expect(isProduction()).toBe(false);
  });

  it('should return false in test', () => {
    process.env.NODE_ENV = 'test';
    expect(isProduction()).toBe(false);
  });
});

describe('getSafeErrorMessage', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return generic message in production', () => {
    process.env.NODE_ENV = 'production';
    const error = new Error('Sensitive database error');

    const message = getSafeErrorMessage(error);

    expect(message).toBe('서버 오류가 발생했습니다.');
  });

  it('should return actual error message in development', () => {
    process.env.NODE_ENV = 'development';
    const error = new Error('Database connection failed');

    const message = getSafeErrorMessage(error);

    expect(message).toBe('Database connection failed');
  });

  it('should handle non-Error objects', () => {
    process.env.NODE_ENV = 'development';

    expect(getSafeErrorMessage('string error')).toBe('string error');
    expect(getSafeErrorMessage(123)).toBe('123');
  });
});
