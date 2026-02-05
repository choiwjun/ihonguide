/**
 * 상간녀 소송 시뮬레이터 API
 * POST /api/simulator/adultery - 상간 소송 가능성 분석 및 결과 반환
 */

import { NextRequest, NextResponse } from 'next/server';
import { calculateAdulteryLawsuit } from '@/lib/simulator/adultery';
import type {
  AdulterySimulatorInput,
  AdulterySimulatorResult,
  MaritalStatus,
  AdulteryType,
  LawsuitGoal,
  EvidenceItem,
  EvidenceType,
  EvidenceReliability,
  EvidenceAcquisitionMethod,
  FamilyImpact,
} from '@/types/adulterySimulator';

// ============================================
// 유효값 상수 정의
// ============================================

const VALID_MARITAL_STATUSES: MaritalStatus[] = [
  'married',
  'separated',
  'divorced',
  'registered_partner',
];

const VALID_ADULTERY_TYPES: AdulteryType[] = [
  'physical',
  'emotional',
  'both',
  'suspected',
];

const VALID_FREQUENCIES = ['once', 'occasional', 'frequent', 'ongoing'] as const;

const VALID_LAWSUIT_GOALS: LawsuitGoal[] = [
  'compensation',
  'divorce',
  'both',
  'public_apology',
];

const VALID_EVIDENCE_TYPES: EvidenceType[] = [
  'messages',
  'photos',
  'videos',
  'witness',
  'financial_records',
  'confession',
  'detective_report',
  'other',
];

const VALID_EVIDENCE_RELIABILITIES: EvidenceReliability[] = [
  'high',
  'medium',
  'low',
];

const VALID_ACQUISITION_METHODS: EvidenceAcquisitionMethod[] = [
  'legal',
  'questionable',
  'illegal',
];

// ============================================
// 입력값 검증 함수
// ============================================

/**
 * 증거 항목 검증
 */
function validateEvidenceItem(evidence: unknown): evidence is EvidenceItem {
  if (typeof evidence !== 'object' || evidence === null) {
    return false;
  }

  const item = evidence as Record<string, unknown>;

  return (
    typeof item.type === 'string' &&
    VALID_EVIDENCE_TYPES.includes(item.type as EvidenceType) &&
    typeof item.reliability === 'string' &&
    VALID_EVIDENCE_RELIABILITIES.includes(item.reliability as EvidenceReliability) &&
    typeof item.acquisitionMethod === 'string' &&
    VALID_ACQUISITION_METHODS.includes(item.acquisitionMethod as EvidenceAcquisitionMethod) &&
    typeof item.description === 'string' &&
    item.description.length > 0
  );
}

/**
 * 가정 영향 검증
 */
function validateFamilyImpact(impact: unknown): impact is FamilyImpact {
  if (typeof impact !== 'object' || impact === null) {
    return false;
  }

  const data = impact as Record<string, unknown>;

  return (
    typeof data.emotionalDistress === 'number' &&
    data.emotionalDistress >= 1 &&
    data.emotionalDistress <= 5 &&
    typeof data.financialLoss === 'number' &&
    data.financialLoss >= 0 &&
    typeof data.socialImpact === 'number' &&
    data.socialImpact >= 1 &&
    data.socialImpact <= 5
  );
}

/**
 * 전체 입력값 검증
 */
function validateInput(body: unknown): { valid: boolean; error?: string } {
  if (typeof body !== 'object' || body === null) {
    return { valid: false, error: '요청 본문이 유효하지 않습니다.' };
  }

  const input = body as Record<string, unknown>;

  // 필수 필드: maritalStatus
  if (
    typeof input.maritalStatus !== 'string' ||
    !VALID_MARITAL_STATUSES.includes(input.maritalStatus as MaritalStatus)
  ) {
    return {
      valid: false,
      error: '유효하지 않은 혼인 상태입니다. (married, separated, divorced, registered_partner 중 선택)',
    };
  }

  // 필수 필드: marriageDuration
  if (
    typeof input.marriageDuration !== 'number' ||
    input.marriageDuration < 0 ||
    input.marriageDuration > 100
  ) {
    return {
      valid: false,
      error: '혼인 기간은 0 이상 100 이하의 숫자여야 합니다.',
    };
  }

  // 필수 필드: hasChildren
  if (typeof input.hasChildren !== 'boolean') {
    return { valid: false, error: '자녀 유무(hasChildren)가 필요합니다.' };
  }

  // 선택 필드: childrenAges (hasChildren이 true일 때)
  if (input.hasChildren === true && input.childrenAges !== undefined) {
    if (!Array.isArray(input.childrenAges)) {
      return { valid: false, error: '자녀 연령(childrenAges)은 배열이어야 합니다.' };
    }
    const invalidAge = input.childrenAges.find(
      (age) => typeof age !== 'number' || age < 0 || age > 100
    );
    if (invalidAge !== undefined) {
      return { valid: false, error: '자녀 연령은 0 이상 100 이하의 숫자여야 합니다.' };
    }
  }

  // 필수 필드: adulteryType
  if (
    typeof input.adulteryType !== 'string' ||
    !VALID_ADULTERY_TYPES.includes(input.adulteryType as AdulteryType)
  ) {
    return {
      valid: false,
      error: '유효하지 않은 부정행위 유형입니다. (physical, emotional, both, suspected 중 선택)',
    };
  }

  // 필수 필드: knewMaritalStatus
  if (typeof input.knewMaritalStatus !== 'boolean') {
    return {
      valid: false,
      error: '상간자의 기혼 인식 여부(knewMaritalStatus)가 필요합니다.',
    };
  }

  // 필수 필드: duration (부정행위 기간, 월 단위)
  if (
    typeof input.duration !== 'number' ||
    input.duration < 0 ||
    input.duration > 600
  ) {
    return {
      valid: false,
      error: '부정행위 기간(duration)은 0 이상 600 이하의 숫자여야 합니다. (월 단위)',
    };
  }

  // 필수 필드: frequency
  if (
    typeof input.frequency !== 'string' ||
    !VALID_FREQUENCIES.includes(input.frequency as typeof VALID_FREQUENCIES[number])
  ) {
    return {
      valid: false,
      error: '유효하지 않은 만남 빈도입니다. (once, occasional, frequent, ongoing 중 선택)',
    };
  }

  // 필수 필드: evidences
  if (!Array.isArray(input.evidences)) {
    return { valid: false, error: '증거 목록(evidences)은 배열이어야 합니다.' };
  }

  // 증거 항목 개별 검증
  for (let i = 0; i < input.evidences.length; i++) {
    if (!validateEvidenceItem(input.evidences[i])) {
      return {
        valid: false,
        error: `${i + 1}번째 증거 항목이 유효하지 않습니다. (type, reliability, acquisitionMethod, description 필요)`,
      };
    }
  }

  // 필수 필드: familyImpact
  if (!validateFamilyImpact(input.familyImpact)) {
    return {
      valid: false,
      error: '가정 영향(familyImpact) 정보가 유효하지 않습니다. (emotionalDistress: 1-5, financialLoss: 0+, socialImpact: 1-5)',
    };
  }

  // 필수 필드: goal
  if (
    typeof input.goal !== 'string' ||
    !VALID_LAWSUIT_GOALS.includes(input.goal as LawsuitGoal)
  ) {
    return {
      valid: false,
      error: '유효하지 않은 소송 목표입니다. (compensation, divorce, both, public_apology 중 선택)',
    };
  }

  // 선택 필드: expectedCompensation
  if (
    input.expectedCompensation !== undefined &&
    (typeof input.expectedCompensation !== 'number' || input.expectedCompensation < 0)
  ) {
    return {
      valid: false,
      error: '희망 위자료(expectedCompensation)는 0 이상의 숫자여야 합니다.',
    };
  }

  return { valid: true };
}

// ============================================
// API 핸들러
// ============================================

/**
 * POST /api/simulator/adultery
 * 상간녀 소송 시뮬레이션 요청 처리
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 요청 본문 파싱
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: '유효하지 않은 JSON 형식입니다.' },
        { status: 400 }
      );
    }

    // 입력값 검증
    const validation = validateInput(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // 타입 캐스팅 (검증 완료 후)
    const input = body as AdulterySimulatorInput;

    // 시뮬레이션 계산 실행
    const result: AdulterySimulatorResult = calculateAdulteryLawsuit(input);

    // 성공 응답
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    // 예상치 못한 오류 로깅
    console.error('Adultery simulator API error:', error);

    return NextResponse.json(
      { error: '시뮬레이션 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
