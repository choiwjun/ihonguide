/**
 * 관리자 인증 API
 * POST /api/admin/auth - 로그인
 * DELETE /api/admin/auth - 로그아웃
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateAdminToken } from '@/lib/auth/admin';
import {
  getClientIP,
  isRateLimited,
  recordLoginAttempt,
  resetLoginAttempts,
  getRemainingAttempts,
} from '@/lib/auth/rate-limit';

// 환경변수에서 관리자 계정 정보 가져오기
const ADMIN_ID = process.env.ADMIN_ID;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const ADMIN_TOKEN_NAME = 'admin_token';
const TOKEN_MAX_AGE = 4 * 60 * 60; // 4시간 (초 단위)

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);

  // Rate limiting 확인
  if (isRateLimited(clientIP)) {
    return NextResponse.json(
      { error: '너무 많은 로그인 시도가 있었습니다. 15분 후 다시 시도해주세요.' },
      { status: 429 }
    );
  }

  try {
    // 환경변수 미설정 시 로그인 불가
    if (!ADMIN_ID || !ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { id, password } = body;

    if (!id || !password) {
      return NextResponse.json(
        { error: '아이디와 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 로그인 시도 기록
    recordLoginAttempt(clientIP);

    // 인증 확인
    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      // 성공 시 시도 횟수 초기화
      resetLoginAttempts(clientIP);

      // 토큰 생성 및 httpOnly 쿠키 설정
      const token = generateAdminToken();
      const response = NextResponse.json({ success: true });

      response.cookies.set(ADMIN_TOKEN_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: TOKEN_MAX_AGE,
        path: '/',
      });

      return response;
    }

    // 실패 시 남은 시도 횟수 안내
    const remaining = getRemainingAttempts(clientIP);
    const message =
      remaining > 0
        ? `아이디 또는 비밀번호가 올바르지 않습니다. (남은 시도: ${remaining}회)`
        : '너무 많은 로그인 시도가 있었습니다. 15분 후 다시 시도해주세요.';

    return NextResponse.json(
      { error: message },
      { status: remaining > 0 ? 401 : 429 }
    );
  } catch {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/auth - 로그아웃
 */
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(ADMIN_TOKEN_NAME);
  return response;
}
