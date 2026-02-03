/**
 * 관리자 인증 유틸리티
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_TOKEN_NAME = 'admin_token';
const TOKEN_MAX_AGE = 4 * 60 * 60; // 4시간 (초 단위)

/**
 * 관리자 토큰 생성
 */
export function generateAdminToken(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  const secret = process.env.ADMIN_PASSWORD || '';
  // 간단한 해시 생성
  const hash = Buffer.from(`${timestamp}:${random}:${secret}`).toString('base64');
  return `${timestamp}.${random}.${hash}`;
}

/**
 * 관리자 토큰 검증
 */
export function verifyAdminToken(token: string): boolean {
  if (!token) return false;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const [timestamp] = parts;
    const tokenTime = parseInt(timestamp, 36);
    const elapsed = Date.now() - tokenTime;

    // 4시간 초과 시 만료
    if (elapsed > TOKEN_MAX_AGE * 1000) return false;

    return true;
  } catch {
    return false;
  }
}

/**
 * 관리자 인증 쿠키 설정
 */
export async function setAdminAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: TOKEN_MAX_AGE,
    path: '/',
  });
}

/**
 * 관리자 인증 쿠키 삭제
 */
export async function clearAdminAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_TOKEN_NAME);
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
