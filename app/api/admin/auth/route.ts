/**
 * 관리자 인증 API
 * POST /api/admin/auth - 로그인
 */

import { NextRequest, NextResponse } from 'next/server';

// 환경변수에서 관리자 계정 정보 가져오기
const ADMIN_ID = process.env.ADMIN_ID || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin1234';

export async function POST(request: NextRequest) {
  try {
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
      return NextResponse.json({ success: true });
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
