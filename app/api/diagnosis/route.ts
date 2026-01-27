/**
 * 이혼 유형 진단 API
 * POST /api/diagnosis - 진단 결과 계산 및 저장
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { calculateDiagnosisResult } from '@/lib/diagnosis';
import { diagnosisQuestions } from '@/data/diagnosisQuestions';
import type { DiagnosisAnswer, DiagnosisResultDetail, DiagnosisResultType } from '@/types/diagnosis';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database, Json } from '@/types/database';

interface DiagnosisRequestBody {
  answers: DiagnosisAnswer[];
  sessionId?: string;
}

/**
 * 세션 ID 생성 (비로그인 사용자용)
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * 응답 검증
 */
function validateAnswers(answers: unknown): answers is DiagnosisAnswer[] {
  if (!Array.isArray(answers)) {
    return false;
  }

  return answers.every((answer) => {
    if (typeof answer !== 'object' || answer === null) {
      return false;
    }

    const { questionId, optionId, score } = answer as Record<string, unknown>;

    return (
      typeof questionId === 'string' &&
      typeof optionId === 'string' &&
      typeof score === 'number' &&
      score >= 1 &&
      score <= 3
    );
  });
}

/**
 * 질문 ID 검증
 */
function validateQuestionIds(answers: DiagnosisAnswer[]): boolean {
  const validQuestionIds = new Set(diagnosisQuestions.map((q) => q.id));
  return answers.every((answer) => validQuestionIds.has(answer.questionId));
}

/**
 * 진단 결과 저장
 */
async function saveDiagnosisResult(
  supabase: SupabaseClient<Database>,
  data: {
    userId: string | null;
    sessionId: string;
    answers: Record<string, DiagnosisAnswer>;
    resultType: DiagnosisResultType;
    score: number;
    detail: DiagnosisResultDetail;
  }
): Promise<string | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: savedResult, error: saveError } = await (supabase as any)
      .from('diagnosis_results')
      .insert({
        user_id: data.userId,
        session_id: data.sessionId,
        answers: data.answers,
        result_type: data.resultType,
        score: data.score,
        result_detail: data.detail,
      })
      .select('id')
      .single();

    if (saveError) {
      console.error('Failed to save diagnosis result:', saveError.message);
      return null;
    }

    return savedResult?.id ?? null;
  } catch (error) {
    console.error('Error saving diagnosis result:', error);
    return null;
  }
}

/**
 * POST /api/diagnosis
 * 진단 응답을 받아 결과를 계산하고 저장
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DiagnosisRequestBody;
    const { answers, sessionId: providedSessionId } = body;

    // 응답 검증
    if (!validateAnswers(answers)) {
      return NextResponse.json(
        { error: '유효하지 않은 응답 형식입니다.' },
        { status: 400 }
      );
    }

    // 질문 ID 검증
    if (!validateQuestionIds(answers)) {
      return NextResponse.json(
        { error: '유효하지 않은 질문 ID가 포함되어 있습니다.' },
        { status: 400 }
      );
    }

    // 최소 응답 수 검증 (최소 5개 이상)
    if (answers.length < 5) {
      return NextResponse.json(
        { error: '최소 5개 이상의 질문에 응답해야 합니다.' },
        { status: 400 }
      );
    }

    // 진단 결과 계산
    const result = calculateDiagnosisResult(answers);

    // Supabase 클라이언트 생성
    const supabase = await createClient();

    // 사용자 정보 확인
    let userId: string | null = null;
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id ?? null;
    }

    // 세션 ID 결정 (제공된 것 사용 또는 새로 생성)
    const sessionId = providedSessionId || generateSessionId();

    // 응답 기록 생성
    const answersRecord: Record<string, DiagnosisAnswer> = {};
    answers.forEach((answer) => {
      answersRecord[answer.questionId] = answer;
    });

    // Supabase에 결과 저장 (클라이언트가 있는 경우에만)
    let savedId: string | null = null;
    if (supabase) {
      savedId = await saveDiagnosisResult(supabase, {
        userId,
        sessionId,
        answers: answersRecord,
        resultType: result.resultType,
        score: result.score,
        detail: result.detail,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: savedId,
        sessionId,
        ...result,
      },
    });
  } catch (error) {
    console.error('Diagnosis API error:', error);
    return NextResponse.json(
      { error: '진단 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
