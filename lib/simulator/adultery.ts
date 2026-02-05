/**
 * 상간녀 소송 시뮬레이터 핵심 계산 로직
 * Adultery Lawsuit Simulator Core Calculation Logic
 *
 * 민법 제806조 (부정행위), 제840조 (이혼 사유) 기준
 * 2020년대 판례 및 실무 기준 반영
 */

import type {
  AdulterySimulatorInput,
  AdulterySimulatorResult,
  RequirementsCheck,
  EvidenceAssessment,
  CompensationEstimate,
  ProcedureInfo,
  RiskAssessment,
  FeasibilityAssessment,
  RecommendationLevel,
  RiskLevel,
  OverallReliability,
  EvidenceItem,
} from '@/types/adulterySimulator';

import {
  EVIDENCE_WEIGHTS,
  ACQUISITION_PENALTIES,
  EVIDENCE_SYNERGY,
  COMPENSATION_BASE,
  MARRIAGE_DURATION_MULTIPLIER,
  ADULTERY_DURATION_MULTIPLIER,
  FREQUENCY_MULTIPLIER,
  CHILDREN_MULTIPLIER,
  EMOTIONAL_DISTRESS_MULTIPLIER,
  SOCIAL_IMPACT_MULTIPLIER,
  RECOMMENDATION_THRESHOLDS,
  SCORE_WEIGHTS,
  PROCEDURE_STEPS,
  LITIGATION_COST,
  ILLEGAL_EVIDENCE_WARNING,
  DEFAMATION_WARNING,
  NOT_LEGAL_ADVICE,
  STATUTE_OF_LIMITATIONS_WARNING,
  EVIDENCE_SUGGESTIONS,
} from '@/data/adulteryRules';

// ============================================
// 1. 성립요건 검증
// ============================================

/**
 * 상간 소송 성립요건 검증
 *
 * 민법 제806조에 따른 4가지 요건:
 * 1. 혼인 관계 존재
 * 2. 고의적 부정행위
 * 3. 상간자의 혼인 인식
 * 4. 인과관계 (혼인 파탄에 기여)
 *
 * @param input - 시뮬레이터 입력 데이터
 * @returns 성립요건 충족 여부
 */
export function validateRequirements(
  input: AdulterySimulatorInput
): RequirementsCheck {
  // 1. 혼인 관계 존재 확인
  const maritalBondExists =
    input.maritalStatus === 'married' ||
    input.maritalStatus === 'separated' ||
    input.maritalStatus === 'registered_partner';

  // 2. 고의성 판단 - 부정행위 유형에 따라
  const intentionalAct =
    input.adulteryType === 'physical' ||
    input.adulteryType === 'both' ||
    (input.adulteryType === 'emotional' && input.duration >= 3);

  // 3. 혼인 인식 확인
  const knowledgeOfMarriage = input.knewMaritalStatus;

  // 4. 인과관계 판단
  // - 혼인 중이거나 별거 중인 경우 인과관계 인정
  // - 이미 이혼한 경우 인과관계 약함
  // - 부정행위 기간과 빈도도 고려
  const causalRelation =
    (input.maritalStatus === 'married' ||
      input.maritalStatus === 'separated') &&
    (input.duration >= 1 || input.frequency === 'ongoing');

  // 전체 충족 여부
  const overallMet =
    maritalBondExists &&
    intentionalAct &&
    knowledgeOfMarriage &&
    causalRelation;

  return {
    maritalBondExists,
    intentionalAct,
    knowledgeOfMarriage,
    causalRelation,
    overallMet,
  };
}

// ============================================
// 2. 증거 평가
// ============================================

/**
 * 증거의 신뢰도 및 법적 유효성 평가
 *
 * - 증거 타입별 가중치 적용
 * - 획득 방법에 따른 패널티 적용
 * - 증거 조합 시너지 보너스 계산
 * - 불법 증거 감지 및 경고
 *
 * @param evidences - 증거 목록
 * @returns 증거 평가 결과
 */
export function assessEvidence(
  evidences: EvidenceItem[]
): EvidenceAssessment {
  if (evidences.length === 0) {
    return {
      overallReliability: 'weak',
      legalIssues: ['증거가 전혀 제출되지 않았습니다.'],
      additionalEvidenceNeeded: [
        ...EVIDENCE_SUGGESTIONS.adultery,
        ...EVIDENCE_SUGGESTIONS.awareness,
      ],
    };
  }

  let totalScore = 0;
  const legalIssues: string[] = [];
  const evidenceTypes = new Set<string>();

  // 각 증거의 점수 계산
  for (const evidence of evidences) {
    // 기본 가중치
    const baseWeight =
      EVIDENCE_WEIGHTS[evidence.type][evidence.reliability];

    // 획득 방법에 따른 패널티
    const acquisitionPenalty =
      ACQUISITION_PENALTIES[evidence.acquisitionMethod];

    // 최종 점수
    const score = baseWeight * acquisitionPenalty;
    totalScore += score;

    // 증거 타입 기록
    evidenceTypes.add(evidence.type);

    // 불법 증거 감지
    if (evidence.acquisitionMethod === 'illegal') {
      legalIssues.push(
        `"${evidence.description}" - 불법적으로 수집된 증거로 증거능력이 부정될 수 있습니다.`
      );
    } else if (evidence.acquisitionMethod === 'questionable') {
      legalIssues.push(
        `"${evidence.description}" - 증거 획득 방법의 적법성에 논란이 있을 수 있습니다.`
      );
    }
  }

  // 증거 조합 시너지 보너스
  const synergyBonus = calculateEvidenceSynergy(evidenceTypes);
  totalScore += synergyBonus;

  // 평균 점수 계산 (0-1 범위)
  const averageScore = Math.min(totalScore / evidences.length, 1);

  // 종합 신뢰도 판정
  let overallReliability: OverallReliability;
  if (averageScore >= 0.7) {
    overallReliability = 'strong';
  } else if (averageScore >= 0.4) {
    overallReliability = 'moderate';
  } else {
    overallReliability = 'weak';
  }

  // 추가 필요 증거 제안
  const additionalEvidenceNeeded: string[] = [];
  if (!evidenceTypes.has('messages') && !evidenceTypes.has('confession')) {
    additionalEvidenceNeeded.push(
      '메시지나 대화 기록 등 직접적인 소통 증거가 필요합니다.'
    );
  }
  if (
    !evidenceTypes.has('photos') &&
    !evidenceTypes.has('videos') &&
    !evidenceTypes.has('detective_report')
  ) {
    additionalEvidenceNeeded.push(
      '사진, 영상 또는 전문 탐정 보고서가 있으면 증거력이 강화됩니다.'
    );
  }
  if (overallReliability === 'weak') {
    additionalEvidenceNeeded.push(...EVIDENCE_SUGGESTIONS.adultery);
  }

  return {
    overallReliability,
    legalIssues,
    additionalEvidenceNeeded,
  };
}

/**
 * 증거 조합 시너지 보너스 계산
 *
 * @param evidenceTypes - 증거 타입 집합
 * @returns 시너지 보너스 점수
 */
function calculateEvidenceSynergy(evidenceTypes: Set<string>): number {
  let bonus = 0;

  for (const [combo, bonusValue] of Object.entries(EVIDENCE_SYNERGY)) {
    const [type1, type2] = combo.split('+');
    if (evidenceTypes.has(type1) && evidenceTypes.has(type2)) {
      bonus += bonusValue;
    }
  }

  return bonus;
}

// ============================================
// 3. 소송 가능성 점수 계산
// ============================================

/**
 * 소송 가능성 점수 계산 (0-100점)
 *
 * 가중치:
 * - 성립요건 충족도: 40%
 * - 증거 신뢰도: 35%
 * - 가정 피해 정도: 15%
 * - 상대방 인식: 10%
 *
 * @param requirements - 성립요건 검증 결과
 * @param evidenceAssessment - 증거 평가 결과
 * @param input - 시뮬레이터 입력 데이터
 * @returns 소송 가능성 점수 (0-100)
 */
export function calculateFeasibilityScore(
  requirements: RequirementsCheck,
  evidenceAssessment: EvidenceAssessment,
  input: AdulterySimulatorInput
): number {
  // 1. 성립요건 점수 (0-100)
  let requirementsScore = 0;
  if (requirements.maritalBondExists) requirementsScore += 25;
  if (requirements.intentionalAct) requirementsScore += 25;
  if (requirements.knowledgeOfMarriage) requirementsScore += 25;
  if (requirements.causalRelation) requirementsScore += 25;

  // 2. 증거 점수 (0-100)
  let evidenceScore = 0;
  switch (evidenceAssessment.overallReliability) {
    case 'strong':
      evidenceScore = 90;
      break;
    case 'moderate':
      evidenceScore = 60;
      break;
    case 'weak':
      evidenceScore = 30;
      break;
  }

  // 불법 증거가 있으면 감점
  if (evidenceAssessment.legalIssues.length > 0) {
    evidenceScore -= evidenceAssessment.legalIssues.length * 10;
  }

  // 3. 가정 피해 점수 (0-100)
  const impactScore =
    ((input.familyImpact.emotionalDistress +
      input.familyImpact.socialImpact) /
      10) *
    100;

  // 4. 상대방 인식 점수 (0-100)
  const awarenessScore = input.knewMaritalStatus ? 100 : 0;

  // 가중 평균 계산
  const totalScore =
    requirementsScore * SCORE_WEIGHTS.requirements +
    evidenceScore * SCORE_WEIGHTS.evidence +
    impactScore * SCORE_WEIGHTS.impact +
    awarenessScore * SCORE_WEIGHTS.awareness;

  return Math.max(0, Math.min(100, Math.round(totalScore)));
}

// ============================================
// 4. 위자료 산정
// ============================================

/**
 * 위자료 예상 금액 계산
 *
 * 기준:
 * - 기본 위자료: 500만~3000만원
 * - 혼인 기간, 부정행위 기간, 빈도, 자녀, 정신적 피해, 사회적 영향 고려
 *
 * @param input - 시뮬레이터 입력 데이터
 * @param feasibilityScore - 소송 가능성 점수
 * @returns 위자료 예상 범위
 */
export function calculateCompensation(
  input: AdulterySimulatorInput,
  feasibilityScore: number
): CompensationEstimate {
  const factors: string[] = [];

  // 1. 혼인 기간 가중치
  let marriageMultiplier: number;
  if (input.marriageDuration < 3) {
    marriageMultiplier = MARRIAGE_DURATION_MULTIPLIER.short;
    factors.push('혼인 기간이 짧아 위자료가 다소 낮을 수 있습니다.');
  } else if (input.marriageDuration < 10) {
    marriageMultiplier = MARRIAGE_DURATION_MULTIPLIER.medium;
    factors.push('평균적인 혼인 기간입니다.');
  } else if (input.marriageDuration < 20) {
    marriageMultiplier = MARRIAGE_DURATION_MULTIPLIER.long;
    factors.push('오랜 혼인 기간으로 위자료가 증액될 수 있습니다.');
  } else {
    marriageMultiplier = MARRIAGE_DURATION_MULTIPLIER.veryLong;
    factors.push('매우 오랜 혼인 기간으로 위자료가 크게 증액될 수 있습니다.');
  }

  // 2. 부정행위 기간 가중치
  let adulteryMultiplier: number;
  if (input.duration < 3) {
    adulteryMultiplier = ADULTERY_DURATION_MULTIPLIER.short;
    factors.push('부정행위 기간이 짧습니다.');
  } else if (input.duration < 12) {
    adulteryMultiplier = ADULTERY_DURATION_MULTIPLIER.medium;
    factors.push('부정행위가 일정 기간 지속되었습니다.');
  } else if (input.duration < 24) {
    adulteryMultiplier = ADULTERY_DURATION_MULTIPLIER.long;
    factors.push('부정행위가 장기간 지속되어 위자료가 증액될 수 있습니다.');
  } else {
    adulteryMultiplier = ADULTERY_DURATION_MULTIPLIER.veryLong;
    factors.push('부정행위가 매우 오랫동안 지속되어 위자료가 크게 증액될 수 있습니다.');
  }

  // 3. 빈도 가중치
  const frequencyMultiplier = FREQUENCY_MULTIPLIER[input.frequency];
  if (input.frequency === 'ongoing') {
    factors.push('부정행위가 지속적으로 발생하여 위자료가 증액될 수 있습니다.');
  } else if (input.frequency === 'frequent') {
    factors.push('부정행위가 자주 발생하여 위자료가 증액될 수 있습니다.');
  }

  // 4. 자녀 가중치
  let childrenMultiplier: number;
  if (!input.hasChildren) {
    childrenMultiplier = CHILDREN_MULTIPLIER.none;
  } else if (!input.childrenAges || input.childrenAges.length === 1) {
    childrenMultiplier = CHILDREN_MULTIPLIER.one;
    factors.push('자녀가 있어 가정 파탄의 영향이 큽니다.');
  } else if (input.childrenAges.length === 2) {
    childrenMultiplier = CHILDREN_MULTIPLIER.two;
    factors.push('여러 자녀가 있어 위자료가 증액될 수 있습니다.');
  } else {
    childrenMultiplier = CHILDREN_MULTIPLIER.threeOrMore;
    factors.push('다수의 자녀가 있어 위자료가 증액될 수 있습니다.');
  }

  // 5. 정신적 피해 가중치
  const emotionalMultiplier =
    EMOTIONAL_DISTRESS_MULTIPLIER[input.familyImpact.emotionalDistress];
  if (input.familyImpact.emotionalDistress >= 4) {
    factors.push('극심한 정신적 피해로 위자료가 증액될 수 있습니다.');
  } else if (input.familyImpact.emotionalDistress >= 3) {
    factors.push('상당한 정신적 피해가 인정됩니다.');
  }

  // 6. 사회적 영향 가중치
  const socialMultiplier =
    SOCIAL_IMPACT_MULTIPLIER[input.familyImpact.socialImpact];
  if (input.familyImpact.socialImpact >= 4) {
    factors.push('심각한 사회적 영향으로 위자료가 증액될 수 있습니다.');
  }

  // 7. 소송 가능성 점수에 따른 조정
  const feasibilityMultiplier = 0.5 + (feasibilityScore / 100) * 0.5; // 0.5 ~ 1.0

  // 전체 가중치 계산
  const totalMultiplier =
    marriageMultiplier *
    adulteryMultiplier *
    frequencyMultiplier *
    childrenMultiplier *
    emotionalMultiplier *
    socialMultiplier *
    feasibilityMultiplier;

  // 위자료 계산
  const estimatedMin = Math.round(
    COMPENSATION_BASE.min * totalMultiplier / 100000
  ) * 100000;
  const estimatedMax = Math.round(
    COMPENSATION_BASE.max * totalMultiplier / 100000
  ) * 100000;
  const averageAmount = Math.round(
    ((estimatedMin + estimatedMax) / 2) / 100000
  ) * 100000;

  // 최소값 보정
  const finalMin = Math.max(estimatedMin, 2_000_000);
  const finalMax = Math.max(estimatedMax, 5_000_000);
  const finalAverage = Math.max(averageAmount, 3_000_000);

  return {
    estimatedMin: finalMin,
    estimatedMax: finalMax,
    averageAmount: finalAverage,
    factors,
  };
}

// ============================================
// 5. 리스크 분석
// ============================================

/**
 * 소송 진행 시 리스크 분석
 *
 * - 불법 증거 리스크
 * - 명예훼손 역소송 리스크
 * - 패소 리스크
 *
 * @param input - 시뮬레이터 입력 데이터
 * @param evidenceAssessment - 증거 평가 결과
 * @returns 리스크 평가
 */
export function analyzeRisks(
  input: AdulterySimulatorInput,
  evidenceAssessment: EvidenceAssessment
): RiskAssessment {
  const items: string[] = [];
  let riskCount = 0;

  // 1. 불법 증거 리스크
  const illegalEvidenceCount = evidenceAssessment.legalIssues.filter((issue) =>
    issue.includes('불법')
  ).length;
  if (illegalEvidenceCount > 0) {
    items.push(
      `불법 증거 ${illegalEvidenceCount}건이 있어 증거능력이 부정되거나 역고소당할 위험이 있습니다.`
    );
    riskCount += 2;
  }

  // 2. 증거 부족 리스크
  if (evidenceAssessment.overallReliability === 'weak') {
    items.push(
      '증거가 약하여 패소하거나 낮은 위자료가 인정될 위험이 있습니다.'
    );
    riskCount += 2;
  } else if (evidenceAssessment.overallReliability === 'moderate') {
    items.push(
      '증거가 충분하지 않아 예상보다 낮은 위자료가 인정될 수 있습니다.'
    );
    riskCount += 1;
  }

  // 3. 명예훼손 역소송 리스크
  if (input.goal === 'public_apology') {
    items.push(
      '공개 사과를 요구하는 경우, 과도한 명예훼손으로 역소송당할 위험이 있습니다.'
    );
    riskCount += 1;
  }

  // 4. 혼인 인식 불명확 리스크
  if (!input.knewMaritalStatus) {
    items.push(
      '상간자가 기혼 사실을 몰랐다고 주장할 경우 소송이 기각될 위험이 높습니다.'
    );
    riskCount += 3;
  }

  // 5. 이미 이혼한 경우
  if (input.maritalStatus === 'divorced') {
    items.push(
      '이미 이혼한 경우, 인과관계 입증이 어려워 패소 위험이 있습니다.'
    );
    riskCount += 2;
  }

  // 6. 시효 리스크
  if (input.duration > 36) {
    items.push(
      '부정행위 발생 후 3년이 경과하면 소멸시효가 완성되어 청구권이 소멸될 수 있습니다.'
    );
    riskCount += 2;
  }

  // 리스크 수준 판정
  let level: RiskLevel;
  if (riskCount >= 5) {
    level = 'high';
  } else if (riskCount >= 2) {
    level = 'medium';
  } else {
    level = 'low';
  }

  return { level, items };
}

// ============================================
// 6. 절차 정보 생성
// ============================================

/**
 * 소송 절차 정보 생성
 *
 * @param goal - 소송 목표
 * @returns 소송 절차 정보
 */
export function generateProcedureInfo(
  goal: AdulterySimulatorInput['goal']
): ProcedureInfo {
  // 목표에 따른 단계 선택
  let steps = PROCEDURE_STEPS.compensation;
  let estimatedDuration = '9-18개월';

  if (goal === 'divorce') {
    steps = PROCEDURE_STEPS.divorce;
    estimatedDuration = '12-24개월';
  } else if (goal === 'both') {
    steps = PROCEDURE_STEPS.both;
    estimatedDuration = '15-24개월';
  } else if (goal === 'public_apology') {
    steps = PROCEDURE_STEPS.public_apology;
    estimatedDuration = '8-15개월';
  }

  return {
    estimatedDuration,
    estimatedCost: { min: LITIGATION_COST.min, max: LITIGATION_COST.max },
    steps,
  };
}

// ============================================
// 7. 경고 생성
// ============================================

/**
 * 법적 경고사항 생성
 *
 * @param input - 시뮬레이터 입력 데이터
 * @param evidenceAssessment - 증거 평가 결과
 * @returns 경고사항 목록
 */
export function generateWarnings(
  input: AdulterySimulatorInput,
  evidenceAssessment: EvidenceAssessment
): string[] {
  const warnings: string[] = [NOT_LEGAL_ADVICE];

  // 불법 증거 경고
  if (
    evidenceAssessment.legalIssues.some((issue) => issue.includes('불법'))
  ) {
    warnings.push(ILLEGAL_EVIDENCE_WARNING);
  }

  // 명예훼손 경고
  if (
    input.goal === 'public_apology' ||
    input.familyImpact.socialImpact >= 4
  ) {
    warnings.push(DEFAMATION_WARNING);
  }

  // 시효 경고
  if (input.duration >= 24) {
    warnings.push(STATUTE_OF_LIMITATIONS_WARNING);
  }

  return warnings;
}

// ============================================
// 8. 권고사항 생성
// ============================================

/**
 * 권고사항 생성
 *
 * @param feasibilityScore - 소송 가능성 점수
 * @param evidenceAssessment - 증거 평가 결과
 * @returns 권고사항 목록
 */
export function generateRecommendations(
  feasibilityScore: number,
  evidenceAssessment: EvidenceAssessment
): string[] {
  const recommendations: string[] = [];

  // 점수별 기본 권고
  if (feasibilityScore >= RECOMMENDATION_THRESHOLDS.proceed) {
    recommendations.push(
      '소송 가능성이 높습니다. 변호사 상담 후 소송 진행을 고려하세요.'
    );
  } else if (feasibilityScore >= RECOMMENDATION_THRESHOLDS.consider) {
    recommendations.push(
      '소송이 가능하나 증거 보강이 필요합니다. 추가 증거 확보 후 재검토하세요.'
    );
  } else if (feasibilityScore >= RECOMMENDATION_THRESHOLDS.notRecommended) {
    recommendations.push(
      '현재 상태로는 소송 보류를 권장합니다. 증거를 보강하거나 다른 해결 방법을 모색하세요.'
    );
  } else {
    recommendations.push(
      '소송이 어려운 상황입니다. 합의 또는 다른 법적 조치를 고려하세요.'
    );
  }

  // 증거 관련 권고
  if (evidenceAssessment.additionalEvidenceNeeded.length > 0) {
    recommendations.push(
      '다음 증거를 추가로 확보하면 승소 가능성이 높아집니다:'
    );
    recommendations.push(
      ...evidenceAssessment.additionalEvidenceNeeded.slice(0, 3)
    );
  }

  // 불법 증거 관련 권고
  if (
    evidenceAssessment.legalIssues.some((issue) => issue.includes('불법'))
  ) {
    recommendations.push(
      '불법 증거를 제외하고 합법적인 증거만으로 소송을 준비하세요.'
    );
  }

  // 일반적인 권고
  recommendations.push(
    '내용증명을 먼저 발송하여 합의를 시도하는 것이 시간과 비용 면에서 유리할 수 있습니다.'
  );
  recommendations.push(
    '소송 전 반드시 가정법률 전문 변호사와 상담하시기 바랍니다.'
  );

  return recommendations;
}

// ============================================
// 9. 메인 함수
// ============================================

/**
 * 상간녀 소송 시뮬레이터 메인 함수
 *
 * 모든 계산 로직을 통합하여 최종 결과 생성
 *
 * @param input - 시뮬레이터 입력 데이터
 * @returns 시뮬레이션 결과
 */
export function calculateAdulteryLawsuit(
  input: AdulterySimulatorInput
): AdulterySimulatorResult {
  // 1. 성립요건 검증
  const requirements = validateRequirements(input);

  // 2. 증거 평가
  const evidenceAssessment = assessEvidence(input.evidences);

  // 3. 소송 가능성 점수 계산
  const feasibilityScore = calculateFeasibilityScore(
    requirements,
    evidenceAssessment,
    input
  );

  // 4. 위자료 산정
  const compensation = calculateCompensation(input, feasibilityScore);

  // 5. 리스크 분석
  const risks = analyzeRisks(input, evidenceAssessment);

  // 6. 절차 정보 생성
  const procedure = generateProcedureInfo(input.goal);

  // 7. 경고 생성
  const warnings = generateWarnings(input, evidenceAssessment);

  // 8. 권고사항 생성
  const recommendations = generateRecommendations(
    feasibilityScore,
    evidenceAssessment
  );

  // 9. 소송 가능성 평가 생성
  const feasibility = generateFeasibilityAssessment(
    feasibilityScore,
    requirements,
    evidenceAssessment,
    input
  );

  return {
    feasibility,
    requirements,
    evidenceAssessment,
    compensation,
    procedure,
    risks,
    warnings,
    recommendations,
  };
}

/**
 * 소송 가능성 평가 생성
 *
 * @param score - 소송 가능성 점수
 * @param requirements - 성립요건 검증 결과
 * @param evidenceAssessment - 증거 평가 결과
 * @param input - 시뮬레이터 입력 데이터
 * @returns 소송 가능성 평가
 */
function generateFeasibilityAssessment(
  score: number,
  requirements: RequirementsCheck,
  evidenceAssessment: EvidenceAssessment,
  input: AdulterySimulatorInput
): FeasibilityAssessment {
  // 추천 수준 결정
  let recommendation: RecommendationLevel;
  if (score >= RECOMMENDATION_THRESHOLDS.proceed) {
    recommendation = 'proceed';
  } else if (score >= RECOMMENDATION_THRESHOLDS.consider) {
    recommendation = 'consider';
  } else if (score >= RECOMMENDATION_THRESHOLDS.notRecommended) {
    recommendation = 'not_recommended';
  } else {
    recommendation = 'not_feasible';
  }

  // 유리한 점 도출
  const strengths: string[] = [];
  if (requirements.maritalBondExists) {
    strengths.push('유효한 혼인 관계가 존재합니다.');
  }
  if (requirements.knowledgeOfMarriage) {
    strengths.push('상간자가 기혼 사실을 알고 있었습니다.');
  }
  if (evidenceAssessment.overallReliability === 'strong') {
    strengths.push('강력한 증거를 보유하고 있습니다.');
  }
  if (input.adulteryType === 'physical' || input.adulteryType === 'both') {
    strengths.push('육체적 부정행위가 입증 가능합니다.');
  }
  if (input.frequency === 'ongoing' || input.frequency === 'frequent') {
    strengths.push('반복적이고 지속적인 부정행위가 있었습니다.');
  }
  if (input.familyImpact.emotionalDistress >= 4) {
    strengths.push('심각한 정신적 피해가 발생했습니다.');
  }

  // 불리한 점 도출
  const weaknesses: string[] = [];
  if (!requirements.maritalBondExists) {
    weaknesses.push('혼인 관계가 존재하지 않거나 약합니다.');
  }
  if (!requirements.knowledgeOfMarriage) {
    weaknesses.push('상간자가 기혼 사실을 몰랐을 가능성이 있습니다.');
  }
  if (evidenceAssessment.overallReliability === 'weak') {
    weaknesses.push('증거가 부족하거나 신뢰도가 낮습니다.');
  }
  if (evidenceAssessment.legalIssues.length > 0) {
    weaknesses.push('증거 수집 방법에 법적 문제가 있을 수 있습니다.');
  }
  if (!requirements.causalRelation) {
    weaknesses.push('부정행위와 혼인 파탄의 인과관계가 명확하지 않습니다.');
  }
  if (input.maritalStatus === 'divorced') {
    weaknesses.push('이미 이혼한 상태로 소송이 어려울 수 있습니다.');
  }

  return {
    score,
    recommendation,
    strengths,
    weaknesses,
  };
}
