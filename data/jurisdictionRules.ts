/**
 * 국제이혼 시뮬레이터 관할 규칙 데이터
 * International Divorce Jurisdiction Rules
 *
 * 참고: 국제사법 제37조 (이혼 관할), 제39조 (이혼 준거법)
 * 헤이그 협약, 양국 간 조약 등
 */

import type { CountryCode } from '@/types/internationalDivorceSimulator';

// ============================================
// 국가 정보 타입
// ============================================

export interface CountryInfo {
  /** 국가 코드 */
  code: CountryCode;
  /** 국가명 (한글) */
  nameKo: string;
  /** 국가명 (영문) */
  nameEn: string;
  /** 관할 기준 */
  jurisdictionBases: string[];
  /** 거주 요건 */
  residenceRequirement: string;
  /** 언어 장벽 */
  languageBarrier: 'none' | 'low' | 'medium' | 'high';
  /** 평균 소요 기간 (개월) */
  averageDuration: { min: number; max: number };
  /** 평균 변호사 비용 (KRW) */
  averageLegalCost: { min: number; max: number };
  /** 조약 가입 */
  treaties: string[];
  /** 특징 */
  features: string[];
  /** 장점 */
  advantages: string[];
  /** 단점 */
  disadvantages: string[];
}

// ============================================
// 주요 국가 정보
// ============================================

export const COUNTRY_DATA: Record<CountryCode, CountryInfo> = {
  KR: {
    code: 'KR',
    nameKo: '대한민국',
    nameEn: 'South Korea',
    jurisdictionBases: ['당사자 일방의 국적', '당사자 일방의 주소', '최후 공동거소'],
    residenceRequirement: '거주 기간 제한 없음 (한국인의 경우)',
    languageBarrier: 'none',
    averageDuration: { min: 6, max: 18 },
    averageLegalCost: { min: 6_500_000, max: 26_000_000 },
    treaties: ['헤이그 아동탈취 협약', '일본-한국 사법공조 조약'],
    features: [
      '재산분할 50% 기준',
      '양육비 산정 기준 보수적',
      '협의이혼 가능 (단, 외국인 배우자 동의 필요)',
    ],
    advantages: ['한국어 사용', '빠른 처리', '비용 상대적으로 저렴'],
    disadvantages: ['위자료 금액 낮음', '외국 판결 집행 어려움'],
  },

  US: {
    code: 'US',
    nameKo: '미국',
    nameEn: 'United States',
    jurisdictionBases: ['거주지 (주마다 다름)'],
    residenceRequirement: '6개월 ~ 1년 (주에 따라 다름)',
    languageBarrier: 'medium',
    averageDuration: { min: 12, max: 36 },
    averageLegalCost: { min: 13_000_000, max: 65_000_000 },
    treaties: ['헤이그 아동탈취 협약', '헤이그 송달협약'],
    features: [
      '주마다 법이 다름 (Community Property vs Equitable Distribution)',
      '위자료(Alimony) 금액 높음',
      '양육비 명확한 산정 기준',
      '재산 공개 의무 철저',
    ],
    advantages: ['위자료 및 양육비 높음', '재산분할 명확', '집행 강력'],
    disadvantages: ['비용 매우 높음', '소송 기간 길음', '언어 장벽', '거주 요건 있음'],
  },

  JP: {
    code: 'JP',
    nameKo: '일본',
    nameEn: 'Japan',
    jurisdictionBases: ['국적', '주소', '최후 공동거소'],
    residenceRequirement: '거주 기간 제한 없음',
    languageBarrier: 'high',
    averageDuration: { min: 6, max: 24 },
    averageLegalCost: { min: 3_900_000, max: 19_500_000 },
    treaties: ['헤이그 아동탈취 협약', '한-일 사법공조 조약'],
    features: [
      '협의이혼 가능 (조정 이혼)',
      '단독 양육권 원칙',
      '면접교섭 제한적',
      '재산분할 50% 기준',
    ],
    advantages: ['협의이혼 가능', '빠른 처리', '비용 낮음'],
    disadvantages: ['언어 장벽 높음', '단독 양육권으로 양육권 분쟁 어려움', '면접교섭 제한'],
  },

  CN: {
    code: 'CN',
    nameKo: '중국',
    nameEn: 'China',
    jurisdictionBases: ['거주지', '국적'],
    residenceRequirement: '1년 이상 거주',
    languageBarrier: 'high',
    averageDuration: { min: 6, max: 18 },
    averageLegalCost: { min: 2_600_000, max: 13_000_000 },
    treaties: ['헤이그 송달협약'],
    features: [
      '협의이혼 가능 (단, 외국인은 소송 이혼 필요)',
      '재산분할 명확하지 않음',
      '양육비 산정 기준 낮음',
    ],
    advantages: ['비용 저렴', '협의이혼 가능 (중국인 간)'],
    disadvantages: ['언어 장벽 매우 높음', '재산분할 불명확', '외국 판결 집행 어려움'],
  },

  GB: {
    code: 'GB',
    nameKo: '영국',
    nameEn: 'United Kingdom',
    jurisdictionBases: ['거주지 (1년 이상)', '국적'],
    residenceRequirement: '1년 이상 거주',
    languageBarrier: 'low',
    averageDuration: { min: 12, max: 24 },
    averageLegalCost: { min: 19_500_000, max: 52_000_000 },
    treaties: ['헤이그 아동탈취 협약', '헤이그 송달협약'],
    features: [
      '무과실 이혼 가능',
      '재산분할 유연함',
      '양육비 높음',
    ],
    advantages: ['무과실 이혼', '재산분할 유리', '양육비 높음'],
    disadvantages: ['비용 높음', '거주 요건 엄격', '소송 기간 김'],
  },

  CA: {
    code: 'CA',
    nameKo: '캐나다',
    nameEn: 'Canada',
    jurisdictionBases: ['거주지 (1년 이상)'],
    residenceRequirement: '1년 이상 거주',
    languageBarrier: 'low',
    averageDuration: { min: 12, max: 24 },
    averageLegalCost: { min: 10_400_000, max: 39_000_000 },
    treaties: ['헤이그 아동탈취 협약'],
    features: [
      '재산분할 50% 기준 (주마다 다름)',
      '양육비 명확',
      '별거 기간 필요 (1년)',
    ],
    advantages: ['재산분할 명확', '양육비 높음'],
    disadvantages: ['별거 기간 필요', '비용 높음'],
  },

  AU: {
    code: 'AU',
    nameKo: '호주',
    nameEn: 'Australia',
    jurisdictionBases: ['거주지 (12개월 이상)', '국적'],
    residenceRequirement: '12개월 이상 거주',
    languageBarrier: 'low',
    averageDuration: { min: 12, max: 24 },
    averageLegalCost: { min: 13_000_000, max: 45_500_000 },
    treaties: ['헤이그 아동탈취 협약'],
    features: [
      '별거 기간 필요 (12개월)',
      '재산분할 유연',
      '양육비 명확',
    ],
    advantages: ['재산분할 유연', '양육비 높음'],
    disadvantages: ['별거 기간 필요', '비용 높음'],
  },

  FR: {
    code: 'FR',
    nameKo: '프랑스',
    nameEn: 'France',
    jurisdictionBases: ['거주지', '국적'],
    residenceRequirement: '6개월 이상 거주',
    languageBarrier: 'high',
    averageDuration: { min: 12, max: 30 },
    averageLegalCost: { min: 10_400_000, max: 32_500_000 },
    treaties: ['헤이그 아동탈취 협약', '헤이그 송달협약'],
    features: [
      '협의이혼 가능',
      '재산분할 50% 기준',
    ],
    advantages: ['협의이혼 가능'],
    disadvantages: ['언어 장벽 높음', '소송 기간 김'],
  },

  DE: {
    code: 'DE',
    nameKo: '독일',
    nameEn: 'Germany',
    jurisdictionBases: ['거주지', '국적'],
    residenceRequirement: '6개월 이상 거주',
    languageBarrier: 'high',
    averageDuration: { min: 12, max: 24 },
    averageLegalCost: { min: 9_100_000, max: 26_000_000 },
    treaties: ['헤이그 아동탈취 협약', '헤이그 송달협약'],
    features: [
      '별거 기간 필요 (1년)',
      '재산분할 50% 기준',
    ],
    advantages: ['재산분할 명확'],
    disadvantages: ['언어 장벽 높음', '별거 기간 필요'],
  },

  VN: {
    code: 'VN',
    nameKo: '베트남',
    nameEn: 'Vietnam',
    jurisdictionBases: ['거주지', '국적'],
    residenceRequirement: '거주 기간 제한 없음',
    languageBarrier: 'high',
    averageDuration: { min: 6, max: 18 },
    averageLegalCost: { min: 1_300_000, max: 6_500_000 },
    treaties: [],
    features: [
      '협의이혼 가능',
      '재산분할 불명확',
    ],
    advantages: ['비용 저렴', '협의이혼 가능'],
    disadvantages: ['언어 장벽 매우 높음', '재산분할 불명확', '외국 판결 집행 어려움'],
  },

  PH: {
    code: 'PH',
    nameKo: '필리핀',
    nameEn: 'Philippines',
    jurisdictionBases: ['거주지'],
    residenceRequirement: '거주 기간 제한 없음',
    languageBarrier: 'medium',
    averageDuration: { min: 12, max: 36 },
    averageLegalCost: { min: 2_600_000, max: 10_400_000 },
    treaties: ['헤이그 송달협약'],
    features: [
      '이혼 불가 (혼인무효 또는 별거만 가능)',
      '외국에서 이혼 후 필리핀에서 승인 절차 필요',
    ],
    advantages: ['비용 저렴'],
    disadvantages: ['이혼 불가 (혼인무효만)', '절차 복잡', '외국 이혼 필요'],
  },

  TH: {
    code: 'TH',
    nameKo: '태국',
    nameEn: 'Thailand',
    jurisdictionBases: ['거주지', '국적'],
    residenceRequirement: '거주 기간 제한 없음',
    languageBarrier: 'high',
    averageDuration: { min: 6, max: 18 },
    averageLegalCost: { min: 1_950_000, max: 7_800_000 },
    treaties: [],
    features: [
      '협의이혼 가능',
      '재산분할 50% 기준',
    ],
    advantages: ['비용 저렴', '협의이혼 가능'],
    disadvantages: ['언어 장벽 높음', '외국 판결 집행 어려움'],
  },

  OTHER: {
    code: 'OTHER',
    nameKo: '기타',
    nameEn: 'Other',
    jurisdictionBases: ['국가마다 다름'],
    residenceRequirement: '국가마다 다름',
    languageBarrier: 'high',
    averageDuration: { min: 12, max: 36 },
    averageLegalCost: { min: 6_500_000, max: 39_000_000 },
    treaties: [],
    features: ['국가마다 법이 다름'],
    advantages: [],
    disadvantages: ['정보 부족', '전문가 상담 필수'],
  },
};

// ============================================
// 헤이그 협약 가입국
// ============================================

/** 헤이그 아동탈취 협약 가입국 */
export const HAGUE_CHILD_ABDUCTION_COUNTRIES: CountryCode[] = [
  'KR', 'US', 'JP', 'GB', 'CA', 'AU', 'FR', 'DE',
];

/** 헤이그 송달협약 가입국 */
export const HAGUE_SERVICE_CONVENTION_COUNTRIES: CountryCode[] = [
  'KR', 'US', 'JP', 'CN', 'GB', 'CA', 'AU', 'FR', 'DE', 'PH',
];

/** 아포스티유 협약 가입국 */
export const APOSTILLE_CONVENTION_COUNTRIES: CountryCode[] = [
  'KR', 'US', 'JP', 'CN', 'GB', 'CA', 'AU', 'FR', 'DE', 'VN', 'PH', 'TH',
];

// ============================================
// 필수 서류 템플릿
// ============================================

/** 공통 필수 서류 */
export const COMMON_REQUIRED_DOCUMENTS = [
  {
    category: '신분 관련',
    documents: ['여권 사본', '주민등록등본 (한국인)', '외국인등록증 (해당시)'],
    apostilleRequired: false,
    translationRequired: false,
  },
  {
    category: '혼인 관련',
    documents: ['혼인관계증명서', '가족관계증명서'],
    apostilleRequired: true,
    translationRequired: true,
  },
  {
    category: '거주 증명',
    documents: ['거주지 증명서', '임대차 계약서', '공과금 납부 영수증'],
    apostilleRequired: false,
    translationRequired: true,
  },
];

/** 자녀 있는 경우 추가 서류 */
export const CHILD_RELATED_DOCUMENTS = [
  {
    category: '자녀 관련',
    documents: ['자녀 출생증명서', '여권 사본', '학교 재학증명서'],
    apostilleRequired: true,
    translationRequired: true,
  },
];

/** 재산 관련 서류 */
export const ASSET_RELATED_DOCUMENTS = [
  {
    category: '재산 관련',
    documents: [
      '부동산 등기부등본',
      '금융거래 내역',
      '급여명세서',
      '사업자등록증 (해당시)',
      '재산세 납부 영수증',
    ],
    apostilleRequired: false,
    translationRequired: true,
  },
];

// ============================================
// 비용 산정 기준
// ============================================

/** 번역 비용 (KRW/페이지) */
export const TRANSLATION_COST_PER_PAGE = {
  simple: 39_000,    // 간단한 서류
  complex: 65_000,   // 복잡한 서류
} as const;

/** 아포스티유/영사확인 비용 (KRW) */
export const APOSTILLE_COST = {
  apostille: 65_000,            // 아포스티유
  consularConfirmation: 104_000, // 영사확인
} as const;

/** 여행 비용 기준 (KRW) */
export const TRAVEL_COST_ESTIMATE = {
  nearby: { min: 650_000, max: 1_950_000 },       // 인근 국가 (일본, 중국 등)
  medium: { min: 1_950_000, max: 3_900_000 },     // 중거리 (동남아)
  far: { min: 3_900_000, max: 7_800_000 },        // 장거리 (미주, 유럽)
} as const;

// ============================================
// 경고 메시지
// ============================================

/** 자녀 관련 경고 */
export const CHILD_CUSTODY_WARNINGS = {
  haagueConvention: '⚠️ 헤이그 아동탈취 협약 가입국입니다. 상대방 동의 없이 자녀를 국경 밖으로 데려가면 불법 탈취로 간주될 수 있습니다.',
  singleCustody: '⚠️ 해당 국가는 단독 양육권 원칙을 따릅니다. 공동 양육을 원하시면 다른 국가에서 이혼하는 것이 유리할 수 있습니다.',
  visitation: '⚠️ 면접교섭권이 제한적일 수 있습니다. 실질적인 면회가 어려울 수 있으니 신중히 검토하세요.',
};

/** 재산 관련 경고 */
export const ASSET_WARNINGS = {
  enforcement: '⚠️ 재산이 여러 국가에 분산되어 있습니다. 판결 집행이 어려울 수 있으니 협의이혼을 권장합니다.',
  hiding: '⚠️ 상대방이 재산을 은닉할 가능성이 있습니다. 이혼 전에 재산 목록을 확보하세요.',
};

/** 관할 경고 */
export const JURISDICTION_WARNINGS = {
  conflict: '⚠️ 여러 국가에서 동시에 이혼 소송이 제기될 경우, 관할 경합이 발생할 수 있습니다.',
  noJurisdiction: '⚠️ 어느 국가에서도 명확한 관할을 확보하기 어려운 상황입니다. 전문가 상담이 필수입니다.',
};
