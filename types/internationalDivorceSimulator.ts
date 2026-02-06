/**
 * 국제이혼 시뮬레이터 타입 정의
 * International Divorce Simulator Types
 */

// ============================================
// 기본 타입 정의
// ============================================

/** 국가 코드 */
export type CountryCode =
  | 'KR'     // 한국
  | 'US'     // 미국
  | 'JP'     // 일본
  | 'CN'     // 중국
  | 'GB'     // 영국
  | 'CA'     // 캐나다
  | 'AU'     // 호주
  | 'FR'     // 프랑스
  | 'DE'     // 독일
  | 'VN'     // 베트남
  | 'PH'     // 필리핀
  | 'TH'     // 태국
  | 'OTHER'; // 기타

/** 거주 기간 */
export type ResidenceDuration =
  | 'less_than_1_year'    // 1년 미만
  | '1_to_3_years'        // 1-3년
  | '3_to_5_years'        // 3-5년
  | 'more_than_5_years';  // 5년 이상

/** 혼인 형태 */
export type MarriageType =
  | 'civil'        // 민사혼
  | 'religious'    // 종교혼
  | 'both'         // 둘 다
  | 'common_law';  // 사실혼

/** 협조 가능성 */
export type CooperationLevel =
  | 'cooperative'    // 협조적
  | 'neutral'        // 중립적
  | 'uncooperative'  // 비협조적
  | 'hostile';       // 적대적

/** 관할 우선순위 */
export type JurisdictionPriority =
  | 'primary'    // 최우선
  | 'secondary'  // 차선
  | 'possible';  // 가능

/** 복잡도 수준 */
export type ComplexityLevel =
  | 'simple'         // 단순
  | 'moderate'       // 보통
  | 'complex'        // 복잡
  | 'very_complex';  // 매우 복잡

/** 난이도 수준 */
export type DifficultyLevel =
  | 'easy'           // 쉬움
  | 'moderate'       // 보통
  | 'difficult'      // 어려움
  | 'very_difficult' // 매우 어려움

/** 리스크 심각도 */
export type RiskSeverity =
  | 'low'       // 낮음
  | 'medium'    // 보통
  | 'high'      // 높음
  | 'very_high' // 매우 높음

/** 리스크 타입 */
export type RiskType =
  | 'custody'       // 양육권
  | 'asset'         // 재산
  | 'jurisdiction'  // 관할
  | 'enforcement';  // 집행

/** 재산 유형 */
export type AssetType =
  | 'real_estate'  // 부동산
  | 'financial'    // 금융자산
  | 'business'     // 사업체
  | 'other';       // 기타

// ============================================
// 입력 데이터 타입
// ============================================

/** 당사자 정보 */
export interface PartyInfo {
  /** 국적 */
  nationality: CountryCode;
  /** 현재 거주 국가 */
  currentResidence: CountryCode;
  /** 거주 기간 */
  residenceDuration: ResidenceDuration;
}

/** 혼인 정보 */
export interface MarriageInfo {
  /** 혼인 국가 */
  marriageCountry: CountryCode;
  /** 혼인 형태 */
  marriageType: MarriageType;
  /** 혼인 기간 (년) */
  duration: number;
  /** 한국에 혼인 신고 여부 */
  registeredInKorea: boolean;
}

/** 자녀 정보 */
export interface ChildrenInfo {
  /** 자녀 수 */
  count: number;
  /** 자녀 연령 */
  ages: number[];
  /** 현재 거주 국가 */
  currentResidence: CountryCode;
  /** 양육권 */
  custody: 'petitioner' | 'respondent' | 'shared' | 'undecided';
}

/** 재산 정보 */
export interface AssetInfo {
  /** 재산 유형 */
  type: AssetType;
  /** 재산 소재지 */
  location: CountryCode;
  /** 추정 가치 (KRW) */
  estimatedValue: number;
}

/** 협조 상황 */
export interface CooperationInfo {
  /** 협조 수준 */
  level: CooperationLevel;
  /** 연락 가능 여부 */
  communicationPossible: boolean;
  /** 협상 의사 */
  willingToNegotiate: boolean;
}

/** 국제이혼 시뮬레이터 입력 */
export interface InternationalDivorceInput {
  /** 청구인 (이혼 신청자) 정보 */
  petitioner: PartyInfo;
  /** 피청구인 (배우자) 정보 */
  respondent: PartyInfo;
  /** 혼인 정보 */
  marriage: MarriageInfo;
  /** 자녀 정보 (선택) */
  children?: ChildrenInfo;
  /** 재산 목록 */
  assets: AssetInfo[];
  /** 협조 상황 */
  cooperation: CooperationInfo;
  /** 선호하는 관할국 (선택) */
  preferredJurisdiction?: CountryCode;
}

// ============================================
// 결과 데이터 타입
// ============================================

/** 관할 가능 국가 */
export interface JurisdictionCountry {
  /** 국가 코드 */
  country: CountryCode;
  /** 국가명 */
  countryName: string;
  /** 관할 근거 */
  basis: string[];
  /** 우선순위 */
  priority: JurisdictionPriority;
  /** 유리한지 여부 */
  advantageous: boolean;
}

/** 관할 판단 결과 */
export interface JurisdictionResult {
  /** 관할 가능한 국가 목록 */
  possibleCountries: JurisdictionCountry[];
  /** 추천 국가 */
  recommended: CountryCode;
  /** 추천 이유 */
  reasoning: string[];
}

/** 준거법 정보 */
export interface ApplicableLaw {
  /** 국가 코드 */
  country: CountryCode;
  /** 법 이름 */
  lawName: string;
  /** 주요 특징 */
  keyFeatures: string[];
  /** 실무상 시사점 */
  implications: string[];
}

/** 복잡도 분석 */
export interface ComplexityAnalysis {
  /** 복잡도 수준 */
  level: ComplexityLevel;
  /** 복잡도 요인 */
  factors: string[];
}

/** 예상 시간 */
export interface DurationEstimate {
  /** 최소 (개월) */
  min: number;
  /** 최대 (개월) */
  max: number;
  /** 평균 (개월) */
  average: number;
}

/** 예상 비용 */
export interface CostEstimate {
  /** 변호사 비용 (KRW) */
  legal: { min: number; max: number };
  /** 번역 비용 (KRW) */
  translation: { min: number; max: number };
  /** 여행 비용 (KRW) */
  travel: { min: number; max: number };
  /** 기타 비용 (KRW) */
  other: { min: number; max: number };
  /** 총 비용 (KRW) */
  total: { min: number; max: number };
}

/** 예상 소요 시간 및 비용 */
export interface ProcedureEstimates {
  /** 예상 기간 */
  duration: DurationEstimate;
  /** 예상 비용 */
  costs: CostEstimate;
}

/** 필수 서류 항목 */
export interface RequiredDocument {
  /** 카테고리 */
  category: string;
  /** 서류 목록 */
  documents: string[];
  /** 아포스티유 필요 여부 */
  apostilleRequired: boolean;
  /** 번역 필요 여부 */
  translationRequired: boolean;
}

/** 송달 및 집행 정보 */
export interface EnforcementInfo {
  /** 송달 난이도 */
  serviceDifficulty: DifficultyLevel;
  /** 집행 가능성 */
  enforcementPossible: boolean;
  /** 적용 가능한 조약 */
  treaties: string[];
}

/** 자녀 양육권 정보 */
export interface ChildCustodyInfo {
  /** 적용 가능한 협약 */
  applicableConvention: string | null;
  /** 복잡도 */
  complexityLevel: 'low' | 'medium' | 'high';
  /** 경고사항 */
  warnings: string[];
}

/** 리스크 항목 */
export interface RiskItem {
  /** 리스크 타입 */
  type: RiskType;
  /** 심각도 */
  severity: RiskSeverity;
  /** 설명 */
  description: string;
  /** 완화 방안 */
  mitigation: string;
}

/** 리스크 평가 */
export interface RiskAssessment {
  /** 전체 리스크 수준 */
  level: RiskSeverity;
  /** 리스크 항목 */
  items: RiskItem[];
}

/** 절차 단계 */
export interface ProcedureStep {
  /** 순서 */
  order: number;
  /** 제목 */
  title: string;
  /** 설명 */
  description: string;
  /** 예상 소요 시간 */
  estimatedDuration: string;
}

/** 절차 정보 */
export interface ProcedureInfo {
  /** 절차 단계 */
  steps: ProcedureStep[];
}

/** 국제이혼 시뮬레이터 결과 */
export interface InternationalDivorceResult {
  /** 관할 판단 */
  jurisdiction: JurisdictionResult;
  /** 준거법 */
  applicableLaw: ApplicableLaw;
  /** 절차 복잡도 */
  complexity: ComplexityAnalysis;
  /** 예상 소요 시간 및 비용 */
  estimates: ProcedureEstimates;
  /** 필수 서류 */
  requiredDocuments: RequiredDocument[];
  /** 송달 및 집행 */
  enforcement: EnforcementInfo;
  /** 자녀 관련 (있는 경우) */
  childCustody?: ChildCustodyInfo;
  /** 리스크 */
  risks: RiskAssessment;
  /** 절차 */
  procedure: ProcedureInfo;
  /** 권고사항 */
  recommendations: string[];
  /** 경고사항 */
  warnings: string[];
}
