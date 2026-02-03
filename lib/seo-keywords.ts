/**
 * SEO 키워드 전략 정의
 */

// 1️⃣ 메인 허브 키워드 (최상위 트래픽)
export const MAIN_HUB_KEYWORDS = [
  '이혼준비',
  '이혼 준비',
  '이혼 절차',
  '이혼 방법',
  '이혼 과정',
  '이혼 전 준비',
  '이혼 준비 방법',
] as const;

// 2️⃣ 이혼준비 롱테일 키워드 (SEO 안정권)
export const LONG_TAIL_KEYWORDS = [
  '이혼준비 체크리스트',
  '이혼 준비 순서',
  '이혼 준비 단계',
  '이혼 준비해야 할 것',
  '이혼 준비 기간',
  '이혼 준비 비용',
  '이혼 준비 서류',
  '이혼 준비 시 주의사항',
] as const;

// 3️⃣ 고민·상황형 키워드 (초기 유입 핵심)
export const CONCERN_KEYWORDS = [
  '이혼 고민',
  '이혼 고민 상담',
  '이혼 생각 중',
  '이혼 결심 전',
  '이혼해야 할지 고민',
  '이혼 준비 중',
  '이혼 전 체크사항',
] as const;

// 4️⃣ 이혼 유형 진단 키워드 (체류시간 최강)
export const DIAGNOSIS_KEYWORDS = [
  '이혼 유형',
  '이혼 유형 진단',
  '이혼 유형 테스트',
  '이혼 방법 진단',
  '협의이혼 재판이혼 차이',
  '협의이혼 가능할까',
  '이혼 소송 해야 하나',
  '나는 협의이혼이 가능한가',
] as const;

// 5️⃣ 협의이혼 / 재판이혼 키워드 (법률 분기)
export const DIVORCE_TYPE_KEYWORDS = [
  '협의이혼',
  '협의이혼 절차',
  '협의이혼 준비',
  '협의이혼 서류',
  '재판이혼',
  '재판이혼 절차',
  '이혼 소송',
  '이혼 소송 준비',
  '이혼 소송 기간',
] as const;

// 6️⃣ 양육권 · 양육비 키워드 (전환 핵심)
export const CUSTODY_KEYWORDS = [
  '양육권',
  '양육권 기준',
  '친권 양육권 차이',
  '양육권 분쟁',
  '양육권 준비',
  '양육비',
  '양육비 계산기',
  '양육비 기준',
  '양육비 산정',
  '양육비 계산 방법',
  '양육비 얼마',
  '양육비 기준표',
  '이혼 양육비 계산기',
] as const;

// 7️⃣ 재산·비용 관련 키워드 (상담 직결)
export const ASSET_COST_KEYWORDS = [
  '이혼 재산분할',
  '재산분할 기준',
  '이혼 위자료',
  '위자료 기준',
  '이혼 비용',
  '이혼 소송 비용',
  '이혼 변호사 비용',
  '이혼시 재산분할',
] as const;

// 8️⃣ 대상별 키워드 (정확한 타게팅)
export const TARGET_KEYWORDS = {
  women: [
    '여성 이혼 준비',
    '주부 이혼 준비',
    '이혼 준비하는 아내',
  ] as const,

  men: [
    '이혼 준비하는 남편',
    '남편 이혼 준비',
  ] as const,

  withChildren: [
    '아이 있는 이혼 준비',
    '자녀 있는 이혼',
    '이혼 시 아이 문제',
  ] as const,
} as const;

// 9️⃣ 상담 신청 키워드 (최종 전환)
export const CONSULTATION_KEYWORDS = [
  '이혼 상담',
  '이혼 무료 상담',
  '이혼 상담 신청',
  '이혼 전문 상담',
  '이혼 법률 상담',
  '이혼 변호사 상담',
  '온라인 이혼 상담',
] as const;

/**
 * 페이지별 키워드 조합
 */
export const PAGE_KEYWORDS = {
  home: [
    ...MAIN_HUB_KEYWORDS,
    ...LONG_TAIL_KEYWORDS,
    ...CONCERN_KEYWORDS,
    '이혼 준비',
    '이혼 가이드',
    '이혼 정보',
  ],

  diagnosis: [
    ...DIAGNOSIS_KEYWORDS,
    ...CONCERN_KEYWORDS,
    '이혼 진단',
    '이혼 테스트',
    '협의이혼 가능 여부',
  ],

  calculator: [
    ...CUSTODY_KEYWORDS,
    ...ASSET_COST_KEYWORDS,
    '양육비',
    '양육비 계산',
    '재산분할',
    '위자료',
  ],

  consultation: [
    ...CONSULTATION_KEYWORDS,
    ...CONCERN_KEYWORDS,
    '이혼 상담',
    '법률 상담',
    '변호사 상담',
  ],

  blog: [
    ...MAIN_HUB_KEYWORDS,
    ...LONG_TAIL_KEYWORDS,
    ...DIVORCE_TYPE_KEYWORDS,
    ...CUSTODY_KEYWORDS,
    ...ASSET_COST_KEYWORDS,
    '이혼 정보',
    '법률 상식',
    '이혼 팁',
  ],
} as const;
