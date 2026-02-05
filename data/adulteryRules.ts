/**
 * 상간녀 소송 시뮬레이터 규칙 및 가중치 데이터
 * Adultery Lawsuit Simulator Rules and Weights
 *
 * 참고: 민법 제806조 (부정행위), 제840조 (이혼 사유)
 * 2020년대 판례 기준 반영
 */

import type {
  EvidenceType,
  EvidenceReliability,
  EvidenceAcquisitionMethod,
} from '@/types/adulterySimulator';

// ============================================
// 증거 가중치
// ============================================

/** 증거 타입별 신뢰도 가중치 */
export const EVIDENCE_WEIGHTS: Record<
  EvidenceType,
  Record<EvidenceReliability, number>
> = {
  messages: { high: 0.9, medium: 0.6, low: 0.3 },
  photos: { high: 0.95, medium: 0.7, low: 0.4 },
  videos: { high: 1.0, medium: 0.8, low: 0.5 },
  witness: { high: 0.85, medium: 0.6, low: 0.3 },
  financial_records: { high: 0.8, medium: 0.5, low: 0.3 },
  confession: { high: 1.0, medium: 0.9, low: 0.6 },
  detective_report: { high: 0.9, medium: 0.7, low: 0.4 },
  other: { high: 0.5, medium: 0.3, low: 0.1 },
};

/** 증거 획득 방법에 따른 패널티 */
export const ACQUISITION_PENALTIES: Record<EvidenceAcquisitionMethod, number> = {
  legal: 1.0,           // 패널티 없음
  questionable: 0.7,    // 30% 감소
  illegal: 0.0,         // 증거능력 없음
};

/** 증거 조합 시너지 보너스 (특정 증거가 함께 있을 때 가산점) */
export const EVIDENCE_SYNERGY: Record<string, number> = {
  'messages+photos': 0.15,              // 메시지 + 사진
  'messages+financial_records': 0.1,   // 메시지 + 재무기록
  'photos+witness': 0.2,               // 사진 + 목격담
  'videos+witness': 0.25,              // 영상 + 목격담
  'confession+messages': 0.3,          // 자백 + 메시지
};

// ============================================
// 위자료 기준
// ============================================

/** 기본 위자료 범위 (원) */
export const COMPENSATION_BASE = {
  /** 최소 금액 */
  min: 5_000_000,
  /** 최대 금액 */
  max: 30_000_000,
  /** 평균 금액 */
  average: 15_000_000,
} as const;

/** 혼인 기간별 가중치 */
export const MARRIAGE_DURATION_MULTIPLIER = {
  short: 0.8,    // 3년 미만
  medium: 1.0,   // 3-10년
  long: 1.2,     // 10-20년
  veryLong: 1.4, // 20년 이상
} as const;

/** 부정행위 기간별 가중치 */
export const ADULTERY_DURATION_MULTIPLIER = {
  short: 0.9,    // 3개월 미만
  medium: 1.0,   // 3-12개월
  long: 1.3,     // 12-24개월
  veryLong: 1.5, // 24개월 이상
} as const;

/** 부정행위 빈도별 가중치 */
export const FREQUENCY_MULTIPLIER = {
  once: 0.7,       // 1회
  occasional: 0.9, // 가끔
  frequent: 1.2,   // 자주
  ongoing: 1.4,    // 지속적
} as const;

/** 자녀 유무에 따른 가중치 */
export const CHILDREN_MULTIPLIER = {
  none: 0.9,     // 자녀 없음
  one: 1.0,      // 자녀 1명
  two: 1.1,      // 자녀 2명
  threeOrMore: 1.2, // 자녀 3명 이상
} as const;

/** 정신적 피해 정도에 따른 가중치 */
export const EMOTIONAL_DISTRESS_MULTIPLIER = {
  1: 0.7,  // 경미
  2: 0.85,
  3: 1.0,  // 보통
  4: 1.15,
  5: 1.3,  // 극심
} as const;

/** 사회적 영향에 따른 가중치 */
export const SOCIAL_IMPACT_MULTIPLIER = {
  1: 0.9,  // 낮음
  2: 0.95,
  3: 1.0,  // 보통
  4: 1.05,
  5: 1.1,  // 높음
} as const;

// ============================================
// 소송 가능성 점수 기준
// ============================================

/** 소송 추천 기준 점수 */
export const RECOMMENDATION_THRESHOLDS = {
  /** 소송 추천 (70점 이상) */
  proceed: 70,
  /** 소송 가능, 보강 필요 (50-69점) */
  consider: 50,
  /** 소송 보류 (30-49점) */
  notRecommended: 30,
  /** 소송 어려움 (30점 미만) */
  notFeasible: 0,
} as const;

/** 점수 산정 가중치 */
export const SCORE_WEIGHTS = {
  /** 성립요건 충족도 */
  requirements: 0.4,
  /** 증거 신뢰도 */
  evidence: 0.35,
  /** 가정 피해 정도 */
  impact: 0.15,
  /** 상대방 인지도 */
  awareness: 0.1,
} as const;

// ============================================
// 성립 요건
// ============================================

/** 기혼 인식 추정 근거 */
export const AWARENESS_EVIDENCE_ITEMS = [
  '결혼반지 착용',
  'SNS 가족 사진',
  '배우자 직접 언급',
  '자녀 이야기',
  '주거지 방문',
  '공동 지인 소개',
  '회사 동료 인지',
  '기혼자 모임 참석',
] as const;

// ============================================
// 소송 절차 정보
// ============================================

/** 소송 목표별 절차 */
export const PROCEDURE_STEPS = {
  /** 위자료만 청구 */
  compensation: [
    {
      order: 1,
      title: '증거 수집 및 정리',
      description: '확보한 증거를 체계적으로 정리하고 추가 증거 수집',
      estimatedDuration: '1-2개월',
    },
    {
      order: 2,
      title: '내용증명 발송',
      description: '상간녀에게 부정행위 사실 통보 및 합의 요구',
      estimatedDuration: '1-2주',
    },
    {
      order: 3,
      title: '합의 또는 소장 작성',
      description: '합의 불가 시 손해배상 청구 소장 작성 및 제출',
      estimatedDuration: '2-4주',
    },
    {
      order: 4,
      title: '소송 진행',
      description: '변론기일 진행, 증거 제출, 증인 신문',
      estimatedDuration: '6-12개월',
    },
    {
      order: 5,
      title: '판결 및 집행',
      description: '판결 확정 후 강제집행 (필요시)',
      estimatedDuration: '1-3개월',
    },
  ],
  /** 이혼과 함께 진행 */
  divorce: [
    {
      order: 1,
      title: '이혼 소송 제기',
      description: '배우자를 상대로 이혼 소송 제기',
      estimatedDuration: '1개월',
    },
    {
      order: 2,
      title: '상간녀 손해배상 청구',
      description: '별도 또는 병합하여 상간녀 손해배상 청구',
      estimatedDuration: '1개월',
    },
    {
      order: 3,
      title: '이혼 소송 진행',
      description: '재산분할, 양육권 등 이혼 관련 쟁점 해결',
      estimatedDuration: '12-18개월',
    },
    {
      order: 4,
      title: '손해배상 소송 진행',
      description: '상간녀 대상 손해배상 소송 진행',
      estimatedDuration: '6-12개월',
    },
    {
      order: 5,
      title: '판결 및 집행',
      description: '이혼 확정 및 위자료 강제집행',
      estimatedDuration: '2-4개월',
    },
  ],
  /** 둘 다 */
  both: [
    {
      order: 1,
      title: '전략 수립',
      description: '이혼과 손해배상 청구 전략 수립',
      estimatedDuration: '2-4주',
    },
    {
      order: 2,
      title: '이혼 및 손해배상 소송 제기',
      description: '배우자 이혼, 상간녀 손해배상 동시 진행',
      estimatedDuration: '1-2개월',
    },
    {
      order: 3,
      title: '소송 진행',
      description: '복수 소송 병행 진행',
      estimatedDuration: '12-18개월',
    },
    {
      order: 4,
      title: '판결 및 집행',
      description: '판결 확정 및 집행',
      estimatedDuration: '2-4개월',
    },
  ],
  /** 공개 사과 */
  public_apology: [
    {
      order: 1,
      title: '증거 수집',
      description: '부정행위 및 명예훼손 증거 확보',
      estimatedDuration: '1-2개월',
    },
    {
      order: 2,
      title: '내용증명 및 협상',
      description: '공개 사과 및 위자료 협상',
      estimatedDuration: '1-2개월',
    },
    {
      order: 3,
      title: '소송 제기 (합의 실패 시)',
      description: '손해배상 및 명예회복 청구',
      estimatedDuration: '6-12개월',
    },
    {
      order: 4,
      title: '판결 및 이행',
      description: '공개 사과문 게시 등 판결 이행',
      estimatedDuration: '1-3개월',
    },
  ],
} as const;

/** 예상 소송 비용 (원) */
export const LITIGATION_COST = {
  /** 최소 비용 */
  min: 3_000_000,
  /** 최대 비용 */
  max: 15_000_000,
} as const;

// ============================================
// 경고 메시지
// ============================================

/** 불법 증거 수집 경고 */
export const ILLEGAL_EVIDENCE_WARNING =
  '⚠️ 불법적으로 수집된 증거는 법정에서 증거능력이 부정될 수 있습니다. ' +
  '도청, 위치추적기 설치, 계정 해킹, 무단 녹음/녹화 등은 불법입니다. ' +
  '반드시 합법적인 방법으로 증거를 수집하세요.';

/** 명예훼손 주의 */
export const DEFAMATION_WARNING =
  '⚠️ 부정행위 사실을 무분별하게 공개하거나 유포하는 경우, ' +
  '오히려 명예훼손으로 역고소당할 수 있습니다. ' +
  '증거는 소송 목적으로만 사용하고, 제3자에게 유포하지 마세요.';

/** 법률 자문 아님 고지 */
export const NOT_LEGAL_ADVICE =
  'ℹ️ 본 시뮬레이션 결과는 일반적인 정보 제공 목적이며, ' +
  '법률 자문이 아닙니다. 실제 소송 진행 전 반드시 변호사 상담을 받으시기 바랍니다.';

/** 시효 주의 */
export const STATUTE_OF_LIMITATIONS_WARNING =
  '⚠️ 부정행위에 대한 손해배상 청구권은 손해 및 가해자를 안 날로부터 3년, ' +
  '불법행위가 있은 날로부터 10년 이내에 행사해야 합니다. ' +
  '시효가 지나면 청구권이 소멸하니 주의하세요.';

// ============================================
// 추가 증거 제안 템플릿
// ============================================

/** 취약점별 추가 증거 제안 */
export const EVIDENCE_SUGGESTIONS = {
  /** 기혼 인식 입증 부족 */
  awareness: [
    '상간녀와의 대화 내용 중 배우자나 가정에 대한 언급',
    '결혼반지 착용 사진 또는 목격담',
    'SNS에 게시된 가족 사진을 본 증거',
    '공동 지인의 진술서',
    '주거지를 방문한 기록 (CCTV, 방문 목적 등)',
  ],
  /** 부정행위 입증 부족 */
  adultery: [
    '호텔 또는 모텔 이용 영수증',
    '함께 있는 사진 또는 영상',
    '친밀한 대화 내용 (메시지, 카톡)',
    '목격자 진술서',
    '탐정 조사 보고서',
    '선물 구매 기록 및 영수증',
  ],
  /** 인과관계 입증 부족 */
  causation: [
    '부정행위 이후 가정 파탄 증거',
    '정신과 진료 기록 (우울증, 불안장애 등)',
    '이혼 상담 기록',
    '별거 시작 시점과 부정행위 시점 연관성',
  ],
} as const;
