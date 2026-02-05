/**
 * 상간녀 소송 시뮬레이터 타입 정의
 * Adultery Lawsuit Simulator Types
 */

// ============================================
// 기본 타입 정의
// ============================================

/** 혼인 상태 */
export type MaritalStatus =
  | 'married'             // 혼인 중
  | 'separated'           // 별거 중
  | 'divorced'            // 이혼
  | 'registered_partner'; // 사실혼

/** 부정행위 유형 */
export type AdulteryType =
  | 'physical'    // 육체적 관계
  | 'emotional'   // 정서적 외도
  | 'both'        // 둘 다
  | 'suspected';  // 의심되는 상황

/** 증거 타입 */
export type EvidenceType =
  | 'messages'            // 메시지, 카톡, 라인
  | 'photos'              // 사진
  | 'videos'              // 영상
  | 'witness'             // 목격담, 진술서
  | 'financial_records'   // 재무 기록 (호텔, 선물 결제 등)
  | 'confession'          // 자백
  | 'detective_report'    // 탐정 보고서
  | 'other';              // 기타

/** 증거 신뢰도 */
export type EvidenceReliability =
  | 'high'    // 높음 (직접 증거)
  | 'medium'  // 보통 (정황 증거)
  | 'low';    // 낮음 (불확실)

/** 증거 획득 방법 */
export type EvidenceAcquisitionMethod =
  | 'legal'         // 합법적
  | 'questionable'  // 회색지대
  | 'illegal';      // 불법 (도청, 해킹 등)

/** 소송 목표 */
export type LawsuitGoal =
  | 'compensation'     // 위자료
  | 'divorce'          // 이혼
  | 'both'             // 둘 다
  | 'public_apology';  // 공개 사과

/** 소송 추천 수준 */
export type RecommendationLevel =
  | 'proceed'           // 소송 추천
  | 'consider'          // 소송 가능 (보강 필요)
  | 'not_recommended'   // 소송 보류
  | 'not_feasible';     // 소송 어려움

/** 리스크 수준 */
export type RiskLevel =
  | 'low'       // 낮음
  | 'medium'    // 보통
  | 'high';     // 높음

/** 종합 신뢰도 */
export type OverallReliability =
  | 'strong'    // 강력
  | 'moderate'  // 보통
  | 'weak';     // 약함

// ============================================
// 입력 데이터 타입
// ============================================

/** 증거 항목 */
export interface EvidenceItem {
  /** 증거 타입 */
  type: EvidenceType;
  /** 신뢰도 */
  reliability: EvidenceReliability;
  /** 획득 방법 */
  acquisitionMethod: EvidenceAcquisitionMethod;
  /** 증거 설명 */
  description: string;
}

/** 가정 영향 정도 */
export interface FamilyImpact {
  /** 정신적 피해 정도 (1-5) */
  emotionalDistress: 1 | 2 | 3 | 4 | 5;
  /** 금전적 손실 (원) */
  financialLoss: number;
  /** 사회적 영향 (1-5) */
  socialImpact: 1 | 2 | 3 | 4 | 5;
}

/** 상간녀 소송 시뮬레이터 입력 */
export interface AdulterySimulatorInput {
  // 기본 정보
  /** 혼인 상태 */
  maritalStatus: MaritalStatus;
  /** 혼인 기간 (년) */
  marriageDuration: number;
  /** 자녀 유무 */
  hasChildren: boolean;
  /** 자녀 연령 (자녀 있을 경우) */
  childrenAges?: number[];

  // 부정행위 정황
  /** 부정행위 유형 */
  adulteryType: AdulteryType;
  /** 상간녀가 기혼 사실을 알았는지 */
  knewMaritalStatus: boolean;
  /** 부정행위 기간 (월) */
  duration: number;
  /** 만남 빈도 */
  frequency: 'once' | 'occasional' | 'frequent' | 'ongoing';

  // 증거
  /** 증거 목록 */
  evidences: EvidenceItem[];

  // 가정 상황
  /** 가정에 미친 영향 */
  familyImpact: FamilyImpact;

  // 목표
  /** 소송 목표 */
  goal: LawsuitGoal;
  /** 희망 위자료 (원, 선택사항) */
  expectedCompensation?: number;
}

// ============================================
// 결과 데이터 타입
// ============================================

/** 소송 가능성 평가 */
export interface FeasibilityAssessment {
  /** 점수 (0-100) */
  score: number;
  /** 추천 수준 */
  recommendation: RecommendationLevel;
  /** 유리한 점 */
  strengths: string[];
  /** 불리한 점 */
  weaknesses: string[];
}

/** 성립 요건 충족도 */
export interface RequirementsCheck {
  /** 혼인 관계 존재 */
  maritalBondExists: boolean;
  /** 고의성 */
  intentionalAct: boolean;
  /** 혼인 인식 (상간녀가 기혼 사실을 알았는지) */
  knowledgeOfMarriage: boolean;
  /** 인과관계 */
  causalRelation: boolean;
  /** 전체 충족 여부 */
  overallMet: boolean;
}

/** 증거 평가 */
export interface EvidenceAssessment {
  /** 종합 신뢰도 */
  overallReliability: OverallReliability;
  /** 증거 법적 문제점 */
  legalIssues: string[];
  /** 추가로 필요한 증거 */
  additionalEvidenceNeeded: string[];
}

/** 위자료 예상 */
export interface CompensationEstimate {
  /** 최소 금액 (원) */
  estimatedMin: number;
  /** 최대 금액 (원) */
  estimatedMax: number;
  /** 평균 금액 (원) */
  averageAmount: number;
  /** 산정 근거 */
  factors: string[];
}

/** 소송 진행 정보 */
export interface ProcedureInfo {
  /** 예상 기간 */
  estimatedDuration: string;
  /** 예상 비용 */
  estimatedCost: { min: number; max: number };
  /** 진행 단계 */
  steps: Array<{
    order: number;
    title: string;
    description: string;
    estimatedDuration: string;
  }>;
}

/** 리스크 평가 */
export interface RiskAssessment {
  /** 리스크 수준 */
  level: RiskLevel;
  /** 리스크 항목 */
  items: string[];
}

/** 상간녀 소송 시뮬레이터 결과 */
export interface AdulterySimulatorResult {
  /** 소송 가능성 평가 */
  feasibility: FeasibilityAssessment;
  /** 성립 요건 충족도 */
  requirements: RequirementsCheck;
  /** 증거 평가 */
  evidenceAssessment: EvidenceAssessment;
  /** 위자료 예상 */
  compensation: CompensationEstimate;
  /** 소송 진행 정보 */
  procedure: ProcedureInfo;
  /** 리스크 */
  risks: RiskAssessment;
  /** 경고사항 */
  warnings: string[];
  /** 권고사항 */
  recommendations: string[];
}
