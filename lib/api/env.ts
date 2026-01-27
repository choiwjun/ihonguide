/**
 * 환경 변수 검증
 * 앱 시작 시 필수 환경 변수 존재 확인
 */

interface EnvConfig {
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const;

/**
 * 환경 변수 검증
 * 필수 환경 변수가 누락된 경우 에러 목록 반환
 */
export function validateEnv(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      errors.push(`Missing required environment variable: ${envVar}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * 환경 변수 가져오기 (타입 안전)
 */
export function getEnvConfig(): EnvConfig {
  return {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

/**
 * 개발/프로덕션 환경 확인
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * 안전한 에러 메시지 반환 (프로덕션에서 스택 트레이스 숨김)
 */
export function getSafeErrorMessage(error: unknown): string {
  if (isProduction()) {
    return '서버 오류가 발생했습니다.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
