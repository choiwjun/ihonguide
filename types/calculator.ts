/**
 * 양육비 계산기 관련 타입 정의
 */

/**
 * 양육비 계산기 입력값
 */
export interface ChildSupportInput {
  /** 부모1 월 소득 (원) */
  parent1Income: number;
  /** 부모2 월 소득 (원) */
  parent2Income: number;
  /** 미성년 자녀 수 */
  childrenCount: number;
  /** 자녀 연령대 */
  childrenAgeGroup: ChildAgeGroup;
  /** 양육 부모 (1 또는 2) */
  custodialParent: 1 | 2;
  /** 추가 비용 (선택) */
  additionalCosts?: AdditionalCosts;
}

/**
 * 자녀 연령대
 */
export type ChildAgeGroup = '0-2' | '3-5' | '6-11' | '12-14' | '15-17' | '18+';

/**
 * 추가 비용 항목
 */
export interface AdditionalCosts {
  /** 교육비 (원/월) */
  education?: number;
  /** 의료비 (원/월) */
  medical?: number;
  /** 기타 비용 (원/월) */
  other?: number;
}

/**
 * 양육비 계산 결과
 */
export interface ChildSupportResult {
  /** 기본 양육비 (원/월) */
  baseAmount: number;
  /** 추가 비용 합계 (원/월) */
  additionalAmount: number;
  /** 총 양육비 (원/월) */
  totalAmount: number;
  /** 비양육 부모 부담액 (원/월) */
  nonCustodialPayment: number;
  /** 부모1 소득 비율 (%) */
  parent1Ratio: number;
  /** 부모2 소득 비율 (%) */
  parent2Ratio: number;
  /** 합산 소득 (원) */
  combinedIncome: number;
  /** 계산 근거 */
  breakdown: CalculationBreakdown;
}

/**
 * 계산 근거 상세
 */
export interface CalculationBreakdown {
  /** 적용 기준표 구간 */
  incomeRange: string;
  /** 자녀 수 가산율 (%) */
  childrenMultiplier: number;
  /** 연령대 가산율 (%) */
  ageMultiplier: number;
  /** 기준표 금액 (원) */
  tableAmount: number;
  /** 설명 */
  explanation: string;
}

/**
 * 저장용 계산기 결과 (DB 스키마와 매핑)
 */
export interface SavedCalculatorResult {
  id: string;
  userId?: string;
  sessionId: string;
  calculatorType: '양육비' | '재산분할';
  inputData: ChildSupportInput;
  resultData: ChildSupportResult;
  createdAt: Date;
}

/**
 * 소득 구간 정의
 */
export interface IncomeRange {
  min: number;
  max: number;
  label: string;
}

/**
 * 양육비 기준표 항목
 */
export interface ChildSupportTableEntry {
  /** 합산 소득 구간 */
  incomeRange: IncomeRange;
  /** 자녀 1명 기준 양육비 (원/월) */
  baseAmount: number;
}

/**
 * 연령대별 가산율
 */
export const AGE_GROUP_MULTIPLIERS: Record<ChildAgeGroup, number> = {
  '0-2': 0.9,    // 영아 (양육비 약간 낮음)
  '3-5': 1.0,    // 유아 (기준)
  '6-11': 1.1,   // 초등학생 (10% 가산)
  '12-14': 1.2,  // 중학생 (20% 가산)
  '15-17': 1.3,  // 고등학생 (30% 가산)
  '18+': 1.4,    // 대학생 (40% 가산)
};

/**
 * 자녀 수별 가산율
 */
export const CHILDREN_COUNT_MULTIPLIERS: Record<number, number> = {
  1: 1.0,    // 1명 (기준)
  2: 1.8,    // 2명 (80% 추가, 총 180%)
  3: 2.5,    // 3명 (150% 추가, 총 250%)
  4: 3.1,    // 4명 이상
};

/**
 * 연령대 라벨
 */
export const AGE_GROUP_LABELS: Record<ChildAgeGroup, string> = {
  '0-2': '0~2세 (영아)',
  '3-5': '3~5세 (유아)',
  '6-11': '6~11세 (초등)',
  '12-14': '12~14세 (중등)',
  '15-17': '15~17세 (고등)',
  '18+': '18세 이상 (대학)',
};
