/**
 * 관리자 인증 유틸리티
 */

import { NextRequest, NextResponse } from 'next/server';
import { createHmac, randomBytes } from 'crypto';

const ADMIN_TOKEN_NAME = 'admin_token';
const TOKEN_MAX_AGE = 4 * 60 * 60; // 4시간 (초 단위)

/**
 * 토큰 서명 생성 (HMAC-SHA256)
 */
function createSignature(data: string): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error('ADMIN_PASSWORD 환경 변수가 설정되지 않았습니다.');
  }
  return createHmac('sha256', secret).update(data).digest('hex');
}

/**
 * 관리자 토큰 생성
 */
export function generateAdminToken(): string {
  const timestamp = Date.now().toString(36);
  const random = randomBytes(16).toString('hex'); // 암호학적으로 안전한 난수
  const payload = `${timestamp}.${random}`;
  const signature = createSignature(payload);
  return `${payload}.${signature}`;
}

/**
 * 관리자 토큰 검증
 */
export function verifyAdminToken(token: string): boolean {
  if (!token) return false;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const [timestamp, random, signature] = parts;

    // 1. 만료 시간 확인
    const tokenTime = parseInt(timestamp, 36);
    const elapsed = Date.now() - tokenTime;
    if (elapsed > TOKEN_MAX_AGE * 1000) return false;

    // 2. 서명 검증
    const payload = `${timestamp}.${random}`;
    const expectedSignature = createSignature(payload);

    // 타이밍 공격 방지를 위한 상수 시간 비교
    if (signature.length !== expectedSignature.length) return false;

    let result = 0;
    for (let i = 0; i < signature.length; i++) {
      result |= signature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
    }

    return result === 0;
  } catch {
    return false;
  }
}

/**
 * 요청에서 관리자 인증 확인
 */
export async function verifyAdminAuth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_TOKEN_NAME)?.value;
  return verifyAdminToken(token || '');
}

/**
 * 인증되지 않은 응답 반환
 */
export function unauthorizedResponse(): NextResponse {
  return NextResponse.json(
    { error: '인증이 필요합니다.' },
    { status: 401 }
  );
}
