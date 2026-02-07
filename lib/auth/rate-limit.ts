/**
 * 간단한 Rate Limiting 유틸리티
 * 무차별 대입 공격 방지
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// IP별 로그인 시도 추적 (메모리 기반)
const loginAttempts = new Map<string, RateLimitEntry>();

// 설정
const MAX_ATTEMPTS = 5; // 최대 시도 횟수
const WINDOW_MS = 15 * 60 * 1000; // 15분 윈도우
const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5분마다 정리
const MAX_ENTRIES = 10_000; // Map 최대 항목 수 (메모리 보호)

// 오래된 항목 정리 (메모리 누수 방지)
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of loginAttempts.entries()) {
    if (now > entry.resetTime) {
      loginAttempts.delete(ip);
    }
  }
}, CLEANUP_INTERVAL);

/**
 * IP 주소 추출
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  return 'unknown';
}

/**
 * Rate limit 확인
 * @returns true if rate limited (should block), false if allowed
 */
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (!entry) {
    return false;
  }

  // 윈도우가 지났으면 리셋
  if (now > entry.resetTime) {
    loginAttempts.delete(ip);
    return false;
  }

  return entry.count >= MAX_ATTEMPTS;
}

/**
 * 로그인 시도 기록
 */
export function recordLoginAttempt(ip: string): void {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (!entry || now > entry.resetTime) {
    // 메모리 보호: 최대 항목 수 초과 시 만료된 항목 정리
    if (loginAttempts.size >= MAX_ENTRIES) {
      for (const [key, val] of loginAttempts.entries()) {
        if (now > val.resetTime) loginAttempts.delete(key);
      }
      // 정리 후에도 초과면 가장 오래된 항목 제거
      if (loginAttempts.size >= MAX_ENTRIES) {
        const firstKey = loginAttempts.keys().next().value;
        if (firstKey) loginAttempts.delete(firstKey);
      }
    }
    loginAttempts.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
  } else {
    entry.count += 1;
  }
}

/**
 * 로그인 성공 시 시도 횟수 초기화
 */
export function resetLoginAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

/**
 * 남은 시도 횟수 반환
 */
export function getRemainingAttempts(ip: string): number {
  const entry = loginAttempts.get(ip);
  if (!entry || Date.now() > entry.resetTime) {
    return MAX_ATTEMPTS;
  }
  return Math.max(0, MAX_ATTEMPTS - entry.count);
}
