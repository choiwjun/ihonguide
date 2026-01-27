/**
 * 양육비 계산기 API
 * POST /api/calculator - 양육비 계산 및 저장
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { calculateChildSupport } from '@/lib/calculator';
import type { ChildSupportInput, ChildAgeGroup, ChildSupportResult } from '@/types/calculator';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

interface CalculatorRequestBody extends Partial<ChildSupportInput> {
  sessionId?: string;
}

const VALID_AGE_GROUPS: ChildAgeGroup[] = ['0-2', '3-5', '6-11', '12-14', '15-17', '18+'];

/**
 * 세션 ID 생성
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * 입력값 검증
 */
function validateInput(body: CalculatorRequestBody): { valid: boolean; error?: string } {
  const { parent1Income, parent2Income, childrenCount, childrenAgeGroup, custodialParent } = body;

  // 필수 필드 확인
  if (parent1Income === undefined || parent2Income === undefined) {
    return { valid: false, error: '부모 소득 정보가 필요합니다.' };
  }

  if (childrenCount === undefined) {
    return { valid: false, error: '자녀 수가 필요합니다.' };
  }

  if (!childrenAgeGroup) {
    return { valid: false, error: '자녀 연령대가 필요합니다.' };
  }

  if (custodialParent === undefined) {
    return { valid: false, error: '양육 부모 정보가 필요합니다.' };
  }

  // 소득 범위 검증
  if (typeof parent1Income !== 'number' || parent1Income < 0) {
    return { valid: false, error: '부모1 소득이 유효하지 않습니다.' };
  }

  if (typeof parent2Income !== 'number' || parent2Income < 0) {
    return { valid: false, error: '부모2 소득이 유효하지 않습니다.' };
  }

  // 자녀 수 검증
  if (typeof childrenCount !== 'number' || childrenCount < 1 || childrenCount > 10) {
    return { valid: false, error: '자녀 수는 1명 이상 10명 이하여야 합니다.' };
  }

  // 연령대 검증
  if (!VALID_AGE_GROUPS.includes(childrenAgeGroup as ChildAgeGroup)) {
    return { valid: false, error: '유효하지 않은 자녀 연령대입니다.' };
  }

  // 양육 부모 검증
  if (custodialParent !== 1 && custodialParent !== 2) {
    return { valid: false, error: '양육 부모는 1 또는 2여야 합니다.' };
  }

  return { valid: true };
}

/**
 * 계산 결과 저장
 */
async function saveCalculatorResult(
  supabase: SupabaseClient<Database>,
  data: {
    userId: string | null;
    sessionId: string;
    input: ChildSupportInput;
    result: ChildSupportResult;
  }
): Promise<string | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: savedResult, error: saveError } = await (supabase as any)
      .from('calculator_results')
      .insert({
        user_id: data.userId,
        session_id: data.sessionId,
        calculator_type: '양육비',
        input_data: data.input,
        result_data: data.result,
      })
      .select('id')
      .single();

    if (saveError) {
      console.error('Failed to save calculator result:', saveError.message);
      return null;
    }

    return savedResult?.id ?? null;
  } catch (error) {
    console.error('Error saving calculator result:', error);
    return null;
  }
}

/**
 * POST /api/calculator
 * 양육비 계산 요청 처리
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CalculatorRequestBody;
    const { sessionId: providedSessionId, additionalCosts, ...inputFields } = body;

    // 입력값 검증
    const validation = validateInput(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // 계산 입력값 구성
    const input: ChildSupportInput = {
      parent1Income: inputFields.parent1Income!,
      parent2Income: inputFields.parent2Income!,
      childrenCount: inputFields.childrenCount!,
      childrenAgeGroup: inputFields.childrenAgeGroup as ChildAgeGroup,
      custodialParent: inputFields.custodialParent as 1 | 2,
      additionalCosts,
    };

    // 양육비 계산
    const result = calculateChildSupport(input);

    // Supabase 클라이언트 생성
    const supabase = await createClient();

    // 사용자 정보 확인
    let userId: string | null = null;
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id ?? null;
    }

    // 세션 ID 결정
    const sessionId = providedSessionId || generateSessionId();

    // 결과 저장 (Supabase 클라이언트가 있는 경우)
    let savedId: string | null = null;
    if (supabase) {
      savedId = await saveCalculatorResult(supabase, {
        userId,
        sessionId,
        input,
        result,
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
    console.error('Calculator API error:', error);
    return NextResponse.json(
      { error: '계산 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
