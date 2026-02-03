/**
 * 관리자 인증 API
 * POST /api/admin/auth - 로그인
 * DELETE /api/admin/auth - 로그아웃
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateAdminToken } from '@/lib/auth/admin';

// 환경변수에서 관리자 계정 정보 가져오기
const ADMIN_ID = process.env.ADMIN_ID;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const ADMIN_TOKEN_NAME = 'admin_token';
const TOKEN_MAX_AGE = 4 * 60 * 60; // 4시간 (초 단위)

export async function POST(request: NextRequest) {
  try {
    // 환경변수 미설정 시 로그인 불가
    if (!ADMIN_ID || !ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: '관리자 계정이 설정되지 않았습니다.' },
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

    // 인증 확인
    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
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

    return NextResponse.json(
      { error: '아이디 또는 비밀번호가 올바르지 않습니다.' },
      { status: 401 }
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
