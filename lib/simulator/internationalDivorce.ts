/**
 * 국제이혼 시뮬레이터 핵심 계산 로직
 * International Divorce Simulator Core Calculation Logic
 *
 * 참고: 국제사법 제37조 (이혼 관할), 제39조 (이혼 준거법)
 */

import type {
  InternationalDivorceInput,
  InternationalDivorceResult,
  JurisdictionResult,
  JurisdictionCountry,
  JurisdictionPriority,
  ApplicableLaw,
  ComplexityAnalysis,
  ComplexityLevel,
  ProcedureEstimates,
  RequiredDocument,
  EnforcementInfo,
  DifficultyLevel,
  ChildCustodyInfo,
  RiskAssessment,
  RiskItem,
  RiskSeverity,
  ProcedureInfo,
  ProcedureStep,
  CountryCode,
  ResidenceDuration,
} from '@/types/internationalDivorceSimulator';

import {
  COUNTRY_DATA,
  HAGUE_CHILD_ABDUCTION_COUNTRIES,
  HAGUE_SERVICE_CONVENTION_COUNTRIES,
  APOSTILLE_CONVENTION_COUNTRIES,
  COMMON_REQUIRED_DOCUMENTS,
  CHILD_RELATED_DOCUMENTS,
  ASSET_RELATED_DOCUMENTS,
  TRANSLATION_COST_PER_PAGE,
  APOSTILLE_COST,
  TRAVEL_COST_ESTIMATE,
  CHILD_CUSTODY_WARNINGS,
  ASSET_WARNINGS,
  JURISDICTION_WARNINGS,
} from '@/data/jurisdictionRules';

// ============================================
// 유틸리티 함수
// ============================================

/**
 * 거주 기간을 년수로 변환
 */
function getResidenceYears(duration: ResidenceDuration): number {
  switch (duration) {
    case 'less_than_1_year':
      return 0.5;
    case '1_to_3_years':
      return 2;
    case '3_to_5_years':
      return 4;
    case 'more_than_5_years':
      return 6;
  }
}

/**
 * 거주 요건 충족 여부 확인
 */
function meetsResidenceRequirement(
  country: CountryCode,
  residenceDuration: ResidenceDuration
): boolean {
  const countryInfo = COUNTRY_DATA[country];
  const years = getResidenceYears(residenceDuration);

  // 거주 요건 파싱
  const requirement = countryInfo.residenceRequirement;

  if (requirement.includes('제한 없음')) {
    return true;
  }

  if (requirement.includes('6개월')) {
    return years >= 0.5;
  }

  if (requirement.includes('1년')) {
    return years >= 1;
  }

  if (requirement.includes('12개월')) {
    return years >= 1;
  }

  return false;
}

/**
 * 관련 국가 목록 추출
 */
function getInvolvedCountries(input: InternationalDivorceInput): CountryCode[] {
  const countries = new Set<CountryCode>();

  countries.add(input.petitioner.nationality);
  countries.add(input.petitioner.currentResidence);
  countries.add(input.respondent.nationality);
  countries.add(input.respondent.currentResidence);
  countries.add(input.marriage.marriageCountry);

  if (input.children) {
    countries.add(input.children.currentResidence);
  }

  input.assets.forEach((asset) => {
    countries.add(asset.location);
  });

  return Array.from(countries).filter((c) => c !== 'OTHER');
}

// ============================================
// 1. 관할 판단
// ============================================

/**
 * 관할 가능 국가 판단
 *
 * 국제사법 제37조에 따른 이혼 관할 판단:
 * - 피고의 주소지
 * - 원고의 주소지 (피고의 주소를 알 수 없는 경우 등)
 * - 당사자의 최후 공동거소지
 * - 기타 밀접한 관련이 있는 곳
 */
export function determineJurisdiction(
  input: InternationalDivorceInput
): JurisdictionResult {
  const possibleCountries: JurisdictionCountry[] = [];
  const involvedCountries = getInvolvedCountries(input);

  // 각 관련 국가 검토
  involvedCountries.forEach((country) => {
    const bases: string[] = [];
    let priority: JurisdictionPriority = 'possible';
    let advantageous = false;

    const countryInfo = COUNTRY_DATA[country];

    // 1. 한국 관할 체크 (한국인인 경우 항상 관할 가능)
    if (country === 'KR') {
      if (
        input.petitioner.nationality === 'KR' ||
        input.respondent.nationality === 'KR'
      ) {
        bases.push('당사자 일방이 한국 국적 보유');
        priority = 'primary';
      }

      if (input.marriage.registeredInKorea) {
        bases.push('한국에 혼인 신고');
        if (priority === 'possible') priority = 'secondary';
      }

      if (
        input.petitioner.currentResidence === 'KR' ||
        input.respondent.currentResidence === 'KR'
      ) {
        bases.push('당사자 일방이 한국 거주');
        if (priority === 'possible') priority = 'secondary';
      }

      advantageous = input.petitioner.nationality === 'KR';
    }

    // 2. 피청구인 거주지 관할 (최우선)
    if (input.respondent.currentResidence === country) {
      bases.push('피청구인의 현재 거주지');
      if (meetsResidenceRequirement(country, input.respondent.residenceDuration)) {
        priority = 'primary';
      } else {
        bases.push('(단, 거주 요건 미충족)');
        priority = 'secondary';
      }
    }

    // 3. 청구인 거주지 관할
    if (input.petitioner.currentResidence === country) {
      bases.push('청구인의 현재 거주지');
      if (meetsResidenceRequirement(country, input.petitioner.residenceDuration)) {
        if (priority === 'possible') priority = 'secondary';
      } else {
        bases.push('(단, 거주 요건 미충족)');
      }
    }

    // 4. 국적 관할
    if (
      input.petitioner.nationality === country ||
      input.respondent.nationality === country
    ) {
      bases.push('당사자 일방의 국적');
      if (priority === 'possible') priority = 'secondary';
    }

    // 5. 혼인지 관할
    if (input.marriage.marriageCountry === country) {
      bases.push('혼인 신고 국가');
      if (priority === 'possible') priority = 'possible';
    }

    // 6. 자녀 거주지 (고려 사항)
    if (input.children && input.children.currentResidence === country) {
      bases.push('자녀의 현재 거주지 (양육권 관련 중요)');
      advantageous = true;
    }

    // 7. 재산 소재지 (고려 사항)
    const assetsInCountry = input.assets.filter((a) => a.location === country);
    if (assetsInCountry.length > 0) {
      const totalValue = assetsInCountry.reduce((sum, a) => sum + a.estimatedValue, 0);
      bases.push(`재산 소재지 (약 ${totalValue.toLocaleString()}원)`);
    }

    if (bases.length > 0) {
      possibleCountries.push({
        country,
        countryName: countryInfo.nameKo,
        basis: bases,
        priority,
        advantageous,
      });
    }
  });

  // 우선순위 정렬
  possibleCountries.sort((a, b) => {
    const priorityOrder = { primary: 0, secondary: 1, possible: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // 추천 국가 결정
  let recommended = possibleCountries[0]?.country || 'KR';
  const reasoning: string[] = [];

  // 한국인이면서 한국 거주인 경우 한국 추천
  if (
    input.petitioner.nationality === 'KR' &&
    input.petitioner.currentResidence === 'KR'
  ) {
    recommended = 'KR';
    reasoning.push('청구인이 한국 국적이며 한국 거주 중');
    reasoning.push('언어 장벽 없음, 비용 상대적으로 저렴');
  }

  // 선호 관할이 있고 가능한 경우
  if (input.preferredJurisdiction) {
    const preferredExists = possibleCountries.find(
      (c) => c.country === input.preferredJurisdiction
    );
    if (preferredExists) {
      recommended = input.preferredJurisdiction;
      reasoning.push('청구인이 선호하는 관할국');
    }
  }

  // 피청구인 거주지가 primary인 경우
  const respondentCountry = possibleCountries.find(
    (c) => c.country === input.respondent.currentResidence && c.priority === 'primary'
  );
  if (respondentCountry && !reasoning.length) {
    recommended = respondentCountry.country;
    reasoning.push('피청구인의 거주지 - 송달 및 집행 용이');
  }

  // 자녀가 있는 경우 자녀 거주지 고려
  if (input.children && input.children.count > 0) {
    const childCountry = possibleCountries.find(
      (c) => c.country === input.children?.currentResidence
    );
    if (childCountry) {
      if (!reasoning.length) {
        recommended = childCountry.country;
      }
      reasoning.push('자녀 거주지 - 양육권 관련 절차 용이');
    }
  }

  // 협조적이지 않은 경우 집행 가능한 국가 우선
  if (input.cooperation.level === 'uncooperative' || input.cooperation.level === 'hostile') {
    reasoning.push('상대방이 비협조적 - 집행력 강한 국가 선택 필요');
  }

  if (!reasoning.length) {
    reasoning.push('관할 근거가 가장 명확한 국가');
  }

  return {
    possibleCountries,
    recommended,
    reasoning,
  };
}

// ============================================
// 2. 준거법 결정
// ============================================

/**
 * 준거법 결정
 *
 * 국제사법 제39조 (이혼의 준거법):
 * - 부부의 동일 본국법
 * - 부부의 상거소지법
 * - 부부에게 가장 밀접한 관련이 있는 곳의 법
 */
export function determineApplicableLaw(
  input: InternationalDivorceInput,
  jurisdiction: JurisdictionResult
): ApplicableLaw {
  const recommendedCountry = jurisdiction.recommended;
  const countryInfo = COUNTRY_DATA[recommendedCountry];

  // 1. 동일 본국법
  if (input.petitioner.nationality === input.respondent.nationality) {
    const nationalityCountry = input.petitioner.nationality;
    const nationalityInfo = COUNTRY_DATA[nationalityCountry];

    return {
      country: nationalityCountry,
      lawName: `${nationalityInfo.nameKo} 민법 (동일 본국법)`,
      keyFeatures: nationalityInfo.features,
      implications: [
        '부부가 동일한 국적을 가지므로 본국법 적용',
        ...nationalityInfo.advantages.map((a) => `장점: ${a}`),
        ...nationalityInfo.disadvantages.map((d) => `단점: ${d}`),
      ],
    };
  }

  // 2. 공동 상거소지법
  if (
    input.petitioner.currentResidence === input.respondent.currentResidence &&
    meetsResidenceRequirement(
      input.petitioner.currentResidence,
      input.petitioner.residenceDuration
    ) &&
    meetsResidenceRequirement(
      input.respondent.currentResidence,
      input.respondent.residenceDuration
    )
  ) {
    const residenceCountry = input.petitioner.currentResidence;
    const residenceInfo = COUNTRY_DATA[residenceCountry];

    return {
      country: residenceCountry,
      lawName: `${residenceInfo.nameKo} 민법 (상거소지법)`,
      keyFeatures: residenceInfo.features,
      implications: [
        '부부가 동일한 거주지를 가지므로 상거소지법 적용',
        ...residenceInfo.advantages.map((a) => `장점: ${a}`),
        ...residenceInfo.disadvantages.map((d) => `단점: ${d}`),
      ],
    };
  }

  // 3. 법정지법 (관할 국가의 법)
  return {
    country: recommendedCountry,
    lawName: `${countryInfo.nameKo} 민법 (법정지법)`,
    keyFeatures: countryInfo.features,
    implications: [
      '가장 밀접한 관련이 있는 국가의 법 적용',
      '관할 국가의 법이 적용되므로 절차 진행 원활',
      ...countryInfo.advantages.map((a) => `장점: ${a}`),
      ...countryInfo.disadvantages.map((d) => `단점: ${d}`),
    ],
  };
}

// ============================================
// 3. 복잡도 분석
// ============================================

/**
 * 절차 복잡도 분석
 */
export function analyzeComplexity(
  input: InternationalDivorceInput,
  jurisdiction: JurisdictionResult
): ComplexityAnalysis {
  const factors: string[] = [];
  let complexityScore = 0;

  // 1. 관련 국가 수
  const involvedCountries = getInvolvedCountries(input);
  complexityScore += involvedCountries.length * 5;
  factors.push(`관련 국가 수: ${involvedCountries.length}개국`);

  // 2. 언어 장벽
  const recommendedCountryInfo = COUNTRY_DATA[jurisdiction.recommended];
  const languageBarrierLevel = recommendedCountryInfo.languageBarrier;
  const languageBarrierScore = {
    none: 0,
    low: 5,
    medium: 10,
    high: 20,
  }[languageBarrierLevel];
  complexityScore += languageBarrierScore;

  if (languageBarrierLevel !== 'none') {
    factors.push(
      `언어 장벽: ${
        {
          low: '낮음',
          medium: '보통',
          high: '높음',
        }[languageBarrierLevel]
      } (번역 필요)`
    );
  }

  // 3. 법체계 차이
  if (input.petitioner.nationality !== jurisdiction.recommended) {
    complexityScore += 10;
    factors.push('청구인 국적과 관할국 법체계 상이');
  }

  // 4. 자녀 있음
  if (input.children && input.children.count > 0) {
    complexityScore += 15;
    factors.push(`자녀 ${input.children.count}명 - 양육권 및 양육비 결정 필요`);

    // 자녀가 다른 국가에 있음
    if (input.children.currentResidence !== jurisdiction.recommended) {
      complexityScore += 10;
      factors.push('자녀가 관할국과 다른 국가에 거주');
    }
  }

  // 5. 재산 분할
  if (input.assets.length > 0) {
    complexityScore += 10;
    const totalValue = input.assets.reduce((sum, a) => sum + a.estimatedValue, 0);
    factors.push(`재산 분할 필요 (총 ${totalValue.toLocaleString()}원)`);

    // 재산이 여러 국가에 분산
    const assetCountries = new Set(input.assets.map((a) => a.location));
    if (assetCountries.size > 1) {
      complexityScore += 15;
      factors.push(`재산이 ${assetCountries.size}개국에 분산`);
    }
  }

  // 6. 협조 수준
  const cooperationScore = {
    cooperative: 0,
    neutral: 10,
    uncooperative: 20,
    hostile: 30,
  }[input.cooperation.level];
  complexityScore += cooperationScore;

  if (input.cooperation.level !== 'cooperative') {
    factors.push(
      `배우자 협조도: ${
        {
          neutral: '중립적',
          uncooperative: '비협조적',
          hostile: '적대적',
        }[input.cooperation.level]
      }`
    );
  }

  // 7. 조약 미가입
  const respondentCountry = input.respondent.currentResidence;
  if (
    !HAGUE_SERVICE_CONVENTION_COUNTRIES.includes(respondentCountry) &&
    respondentCountry !== jurisdiction.recommended
  ) {
    complexityScore += 15;
    factors.push('송달 조약 미가입국 - 송달 절차 복잡');
  }

  // 8. 특수 상황
  if (input.marriage.marriageType === 'religious' || input.marriage.marriageType === 'both') {
    complexityScore += 5;
    factors.push('종교혼 포함 - 종교법 고려 필요');
  }

  // 필리핀 특수 사례
  if (
    input.petitioner.nationality === 'PH' ||
    input.respondent.nationality === 'PH'
  ) {
    complexityScore += 20;
    factors.push('필리핀 국적 - 이혼 불가국가, 별도 승인 절차 필요');
  }

  // 복잡도 수준 결정
  let level: ComplexityLevel;
  if (complexityScore < 30) {
    level = 'simple';
  } else if (complexityScore < 60) {
    level = 'moderate';
  } else if (complexityScore < 90) {
    level = 'complex';
  } else {
    level = 'very_complex';
  }

  return {
    level,
    factors,
  };
}

// ============================================
// 4. 시간 및 비용 산정
// ============================================

/**
 * 예상 시간 및 비용 산정
 */
export function estimateTimeAndCost(
  input: InternationalDivorceInput,
  jurisdiction: JurisdictionResult,
  complexity: ComplexityAnalysis
): ProcedureEstimates {
  const countryInfo = COUNTRY_DATA[jurisdiction.recommended];

  // 기본 기간 (국가별)
  let minDuration = countryInfo.averageDuration.min;
  let maxDuration = countryInfo.averageDuration.max;

  // 복잡도에 따른 기간 증가
  const complexityMultiplier = {
    simple: 1.0,
    moderate: 1.3,
    complex: 1.6,
    very_complex: 2.0,
  }[complexity.level];

  minDuration = Math.round(minDuration * complexityMultiplier);
  maxDuration = Math.round(maxDuration * complexityMultiplier);

  // 비협조적인 경우 기간 증가
  if (input.cooperation.level === 'uncooperative') {
    minDuration += 3;
    maxDuration += 6;
  } else if (input.cooperation.level === 'hostile') {
    minDuration += 6;
    maxDuration += 12;
  }

  // 기본 변호사 비용
  let legalMin = countryInfo.averageLegalCost.min;
  let legalMax = countryInfo.averageLegalCost.max;

  // 복잡도에 따른 비용 증가
  legalMin = Math.round(legalMin * complexityMultiplier);
  legalMax = Math.round(legalMax * complexityMultiplier);

  // 번역 비용 산정
  let translationMin = 0;
  let translationMax = 0;

  if (countryInfo.languageBarrier !== 'none') {
    // 기본 서류: 약 20-30 페이지
    const basicPages = 25;
    translationMin = basicPages * TRANSLATION_COST_PER_PAGE.simple;
    translationMax = basicPages * TRANSLATION_COST_PER_PAGE.complex;

    // 자녀 있으면 추가
    if (input.children) {
      translationMin += 10 * TRANSLATION_COST_PER_PAGE.simple;
      translationMax += 15 * TRANSLATION_COST_PER_PAGE.complex;
    }

    // 재산 많으면 추가
    if (input.assets.length > 0) {
      const assetPages = input.assets.length * 5;
      translationMin += assetPages * TRANSLATION_COST_PER_PAGE.simple;
      translationMax += assetPages * TRANSLATION_COST_PER_PAGE.complex;
    }
  }

  // 여행 비용
  let travelMin = 0;
  let travelMax = 0;

  if (input.petitioner.currentResidence !== jurisdiction.recommended) {
    const petitionerCountry = input.petitioner.currentResidence;
    const jurisdictionCountry = jurisdiction.recommended;

    // 지역별 여행 비용 산정
    if (
      ['JP', 'CN'].includes(petitionerCountry) ||
      ['JP', 'CN'].includes(jurisdictionCountry)
    ) {
      travelMin = TRAVEL_COST_ESTIMATE.nearby.min;
      travelMax = TRAVEL_COST_ESTIMATE.nearby.max;
    } else if (
      ['VN', 'PH', 'TH'].includes(petitionerCountry) ||
      ['VN', 'PH', 'TH'].includes(jurisdictionCountry)
    ) {
      travelMin = TRAVEL_COST_ESTIMATE.medium.min;
      travelMax = TRAVEL_COST_ESTIMATE.medium.max;
    } else {
      travelMin = TRAVEL_COST_ESTIMATE.far.min;
      travelMax = TRAVEL_COST_ESTIMATE.far.max;
    }

    // 여러 번 방문 필요한 경우
    if (complexity.level === 'complex' || complexity.level === 'very_complex') {
      travelMin *= 2;
      travelMax *= 3;
    }
  }

  // 기타 비용 (아포스티유, 공증, 송달 등)
  let otherMin = 0;
  let otherMax = 0;

  // 아포스티유 비용
  const apostilleCount = 5; // 기본 서류
  if (APOSTILLE_CONVENTION_COUNTRIES.includes(jurisdiction.recommended)) {
    otherMin += apostilleCount * APOSTILLE_COST.apostille;
    otherMax += apostilleCount * APOSTILLE_COST.apostille * 1.5;
  } else {
    otherMin += apostilleCount * APOSTILLE_COST.consularConfirmation;
    otherMax += apostilleCount * APOSTILLE_COST.consularConfirmation * 1.5;
  }

  // 송달 비용
  if (!HAGUE_SERVICE_CONVENTION_COUNTRIES.includes(input.respondent.currentResidence)) {
    otherMin += 650_000;
    otherMax += 1_950_000;
  }

  // 공증 및 기타 행정 비용
  otherMin += 650_000;
  otherMax += 1_300_000;

  return {
    duration: {
      min: minDuration,
      max: maxDuration,
      average: Math.round((minDuration + maxDuration) / 2),
    },
    costs: {
      legal: { min: legalMin, max: legalMax },
      translation: { min: translationMin, max: translationMax },
      travel: { min: travelMin, max: travelMax },
      other: { min: otherMin, max: otherMax },
      total: {
        min: legalMin + translationMin + travelMin + otherMin,
        max: legalMax + translationMax + travelMax + otherMax,
      },
    },
  };
}

// ============================================
// 5. 필수 서류 생성
// ============================================

/**
 * 필수 서류 목록 생성
 */
export function generateRequiredDocuments(
  input: InternationalDivorceInput,
  jurisdiction: JurisdictionResult,
  applicableLaw: ApplicableLaw
): RequiredDocument[] {
  const documents: RequiredDocument[] = [];

  // 공통 필수 서류
  COMMON_REQUIRED_DOCUMENTS.forEach((doc) => {
    const needsApostille =
      doc.apostilleRequired &&
      input.petitioner.nationality !== jurisdiction.recommended;

    const needsTranslation =
      doc.translationRequired &&
      COUNTRY_DATA[jurisdiction.recommended].languageBarrier !== 'none';

    documents.push({
      ...doc,
      apostilleRequired: needsApostille,
      translationRequired: needsTranslation,
    });
  });

  // 자녀 관련 서류
  if (input.children && input.children.count > 0) {
    CHILD_RELATED_DOCUMENTS.forEach((doc) => {
      const needsApostille = true;
      const needsTranslation =
        COUNTRY_DATA[jurisdiction.recommended].languageBarrier !== 'none';

      documents.push({
        ...doc,
        apostilleRequired: needsApostille,
        translationRequired: needsTranslation,
      });
    });

    // 양육권 관련 추가 서류
    documents.push({
      category: '양육권 관련',
      documents: [
        '양육 계획서',
        '주거 환경 증명',
        '소득 증명서',
        '자녀와의 관계 진술서',
      ],
      apostilleRequired: false,
      translationRequired: true,
    });
  }

  // 재산 관련 서류
  if (input.assets.length > 0) {
    ASSET_RELATED_DOCUMENTS.forEach((doc) => {
      documents.push({
        ...doc,
        translationRequired:
          COUNTRY_DATA[jurisdiction.recommended].languageBarrier !== 'none',
      });
    });

    // 재산별 세부 서류
    const hasRealEstate = input.assets.some((a) => a.type === 'real_estate');
    const hasBusiness = input.assets.some((a) => a.type === 'business');

    if (hasRealEstate) {
      documents.push({
        category: '부동산 관련',
        documents: ['부동산 등기부등본', '감정평가서', '대출 잔액 증명'],
        apostilleRequired: true,
        translationRequired: true,
      });
    }

    if (hasBusiness) {
      documents.push({
        category: '사업체 관련',
        documents: ['사업자등록증', '재무제표', '회사 정관', '주식 보유 증명'],
        apostilleRequired: true,
        translationRequired: true,
      });
    }
  }

  // 이혼 사유 입증 서류
  documents.push({
    category: '이혼 사유',
    documents: [
      '진술서',
      '증인 진술서 (필요시)',
      '증거 자료 (필요시)',
      '상담 기록 (필요시)',
    ],
    apostilleRequired: false,
    translationRequired: true,
  });

  return documents;
}

// ============================================
// 6. 송달 및 집행 평가
// ============================================

/**
 * 송달 및 집행 가능성 평가
 */
export function assessEnforcement(
  input: InternationalDivorceInput,
  jurisdiction: JurisdictionResult
): EnforcementInfo {
  const respondentCountry = input.respondent.currentResidence;
  const jurisdictionCountry = jurisdiction.recommended;

  const treaties: string[] = [];
  let serviceDifficulty: DifficultyLevel = 'moderate';
  let enforcementPossible = true;

  // 헤이그 송달협약 가입 여부
  if (HAGUE_SERVICE_CONVENTION_COUNTRIES.includes(respondentCountry)) {
    treaties.push('헤이그 송달협약');
    serviceDifficulty = 'easy';
  } else {
    serviceDifficulty = 'difficult';
  }

  // 동일 국가 내 송달
  if (respondentCountry === jurisdictionCountry) {
    serviceDifficulty = 'easy';
  }

  // 적대적인 경우 (연락 불가능 체크 전에 처리)
  if (input.cooperation.level === 'hostile') {
    if (serviceDifficulty === 'easy') serviceDifficulty = 'moderate';
    else if (serviceDifficulty === 'difficult') serviceDifficulty = 'very_difficult';
  }

  // 연락 불가능한 경우 (최우선 - 무조건 very_difficult)
  if (!input.cooperation.communicationPossible) {
    serviceDifficulty = 'very_difficult';
    treaties.push('공시송달 필요 가능성');
  }

  // 집행 가능성 평가
  if (respondentCountry !== jurisdictionCountry) {
    // 조약 확인
    const respondentInfo = COUNTRY_DATA[respondentCountry];

    if (
      respondentInfo.treaties.includes('헤이그 송달협약') ||
      respondentInfo.treaties.includes('일본-한국 사법공조 조약')
    ) {
      enforcementPossible = true;
    } else {
      enforcementPossible = false;
      treaties.push('외국 판결 승인 절차 필요');
    }
  }

  // 특수 국가
  if (['CN', 'VN', 'TH'].includes(respondentCountry)) {
    enforcementPossible = false;
    treaties.push('외국 판결 집행 어려움 - 현지 소송 재진행 필요 가능성');
  }

  return {
    serviceDifficulty,
    enforcementPossible,
    treaties,
  };
}

// ============================================
// 7. 자녀 양육권 처리
// ============================================

/**
 * 자녀 양육권 관련 분석
 */
export function processChildCustody(
  input: InternationalDivorceInput,
  jurisdiction: JurisdictionResult
): ChildCustodyInfo | undefined {
  if (!input.children || input.children.count === 0) {
    return undefined;
  }

  const childCountry = input.children.currentResidence;
  const jurisdictionCountry = jurisdiction.recommended;

  const warnings: string[] = [];
  let applicableConvention: string | null = null;
  let complexityLevel: 'low' | 'medium' | 'high' = 'low';

  // 헤이그 아동탈취 협약
  if (HAGUE_CHILD_ABDUCTION_COUNTRIES.includes(childCountry)) {
    applicableConvention = '헤이그 국제 아동탈취 협약';
    warnings.push(CHILD_CUSTODY_WARNINGS.haagueConvention);
    complexityLevel = 'high';
  }

  // 자녀가 관할국과 다른 국가에 있음
  if (childCountry !== jurisdictionCountry) {
    warnings.push('자녀가 관할국과 다른 국가에 거주 - 양육권 결정 및 집행 복잡');
    if (complexityLevel === 'low') complexityLevel = 'medium';
  }

  // 일본 특수 사례
  if (childCountry === 'JP' || jurisdictionCountry === 'JP') {
    warnings.push(CHILD_CUSTODY_WARNINGS.singleCustody);
    warnings.push(CHILD_CUSTODY_WARNINGS.visitation);
    complexityLevel = 'high';
  }

  // 양육권 미결정
  if (input.children.custody === 'undecided') {
    warnings.push('양육권이 아직 결정되지 않음 - 양육권 분쟁 가능성');
    if (complexityLevel === 'low') complexityLevel = 'medium';
  }

  // 공동 양육권
  if (input.children.custody === 'shared') {
    warnings.push('공동 양육권 - 국제 간 공동 양육은 실무상 어려움');
    if (complexityLevel === 'low') complexityLevel = 'medium';
  }

  // 자녀 연령 고려
  const hasYoungChildren = input.children.ages.some((age) => age < 7);
  if (hasYoungChildren) {
    warnings.push('7세 미만 자녀 - 주양육자(대부분 모) 우선 고려 가능성');
  }

  return {
    applicableConvention,
    complexityLevel,
    warnings,
  };
}

// ============================================
// 8. 리스크 분석
// ============================================

/**
 * 리스크 평가 및 분석
 */
export function analyzeRisks(
  input: InternationalDivorceInput,
  jurisdiction: JurisdictionResult,
  enforcement: EnforcementInfo
): RiskAssessment {
  const items: RiskItem[] = [];

  // 1. 양육권 리스크
  if (input.children && input.children.count > 0) {
    let custodySeverity: RiskSeverity = 'low';
    let custodyDescription = '양육권 관련 분쟁 가능성';
    let custodyMitigation = '양육 계획서 사전 작성 및 협의 권장';

    if (input.cooperation.level === 'hostile') {
      custodySeverity = 'very_high';
      custodyDescription = '양육권 분쟁 가능성 매우 높음 - 자녀 무단 이동 위험';
      custodyMitigation =
        '긴급 양육권 가처분 신청 검토, 여권 압류 신청, 출국금지 요청';
    } else if (input.children.custody === 'undecided') {
      custodySeverity = 'high';
      custodyDescription = '양육권 미결정 - 장기 분쟁 가능성';
      custodyMitigation = '조기 조정 또는 협의 권장';
    } else if (
      HAGUE_CHILD_ABDUCTION_COUNTRIES.includes(input.children.currentResidence)
    ) {
      custodySeverity = 'medium';
      custodyDescription = '헤이그 협약 적용 - 자녀 이동 제한';
      custodyMitigation = '상대방 동의서 확보 또는 법원 허가 필요';
    }

    items.push({
      type: 'custody',
      severity: custodySeverity,
      description: custodyDescription,
      mitigation: custodyMitigation,
    });
  }

  // 2. 재산 리스크
  if (input.assets.length > 0) {
    let assetSeverity: RiskSeverity = 'low';
    let assetDescription = '재산분할 관련 분쟁 가능성';
    let assetMitigation = '재산 목록 사전 확보 및 증거 자료 준비';

    const assetCountries = new Set(input.assets.map((a) => a.location));
    const totalValue = input.assets.reduce((sum, a) => sum + a.estimatedValue, 0);

    if (assetCountries.size > 2) {
      assetSeverity = 'high';
      assetDescription = `재산이 ${assetCountries.size}개국에 분산 - 집행 어려움`;
      assetMitigation = ASSET_WARNINGS.enforcement.replace('⚠️ ', '');
    } else if (input.cooperation.level === 'uncooperative' || input.cooperation.level === 'hostile') {
      assetSeverity = 'high';
      assetDescription = '재산 은닉 위험';
      assetMitigation = ASSET_WARNINGS.hiding.replace('⚠️ ', '');
    } else if (totalValue > 650_000_000) {
      assetSeverity = 'medium';
      assetDescription = '고액 재산 분할 - 정밀한 평가 필요';
      assetMitigation = '전문 감정평가 및 세무 자문 필요';
    }

    items.push({
      type: 'asset',
      severity: assetSeverity,
      description: assetDescription,
      mitigation: assetMitigation,
    });
  }

  // 3. 관할 리스크
  if (jurisdiction.possibleCountries.length > 2) {
    let jurisdictionSeverity: RiskSeverity = 'medium';
    let jurisdictionDescription = '다수 관할 가능국 - 관할 경합 가능성';
    let jurisdictionMitigation = '신속한 소송 제기로 관할 선점 권장';

    if (input.cooperation.level === 'hostile') {
      jurisdictionSeverity = 'high';
      jurisdictionDescription = '상대방이 다른 국가에서 소송 제기 가능성';
      jurisdictionMitigation = JURISDICTION_WARNINGS.conflict.replace('⚠️ ', '');
    }

    items.push({
      type: 'jurisdiction',
      severity: jurisdictionSeverity,
      description: jurisdictionDescription,
      mitigation: jurisdictionMitigation,
    });
  } else if (jurisdiction.possibleCountries.length === 0) {
    items.push({
      type: 'jurisdiction',
      severity: 'very_high',
      description: '명확한 관할 확보 어려움',
      mitigation: JURISDICTION_WARNINGS.noJurisdiction.replace('⚠️ ', ''),
    });
  }

  // 4. 집행 리스크
  if (!enforcement.enforcementPossible) {
    items.push({
      type: 'enforcement',
      severity: 'high',
      description: '판결 집행 어려움',
      mitigation: '협의이혼 또는 현지 소송 검토, 재산 가압류 선행',
    });
  } else if (enforcement.serviceDifficulty === 'very_difficult') {
    items.push({
      type: 'enforcement',
      severity: 'medium',
      description: '송달 어려움',
      mitigation: '공시송달 또는 대체 송달 방법 검토',
    });
  }

  // 전체 리스크 수준 결정
  const severityScores = {
    low: 1,
    medium: 2,
    high: 3,
    very_high: 4,
  };

  const maxSeverityScore = Math.max(...items.map((i) => severityScores[i.severity]));
  const level: RiskSeverity =
    maxSeverityScore === 4
      ? 'very_high'
      : maxSeverityScore === 3
      ? 'high'
      : maxSeverityScore === 2
      ? 'medium'
      : 'low';

  return {
    level,
    items,
  };
}

// ============================================
// 9. 절차 생성
// ============================================

/**
 * 이혼 절차 단계 생성
 */
export function generateProcedure(
  jurisdiction: JurisdictionResult,
  complexity: ComplexityAnalysis
): ProcedureInfo {
  const steps: ProcedureStep[] = [];
  const countryInfo = COUNTRY_DATA[jurisdiction.recommended];

  // 기본 절차 (한국 기준)
  if (jurisdiction.recommended === 'KR') {
    steps.push(
      {
        order: 1,
        title: '전문가 상담 및 준비',
        description:
          '국제이혼 전문 변호사 상담, 관할 및 준거법 확인, 필수 서류 목록 확보',
        estimatedDuration: '1-2주',
      },
      {
        order: 2,
        title: '서류 준비 및 번역',
        description:
          '필수 서류 수집, 아포스티유/영사확인 발급, 번역 공증, 증거 자료 정리',
        estimatedDuration: '2-4주',
      },
      {
        order: 3,
        title: '이혼 청구 제기',
        description:
          '가정법원에 이혼 소장 제출, 인지대 납부, 사건 접수 및 사건번호 부여',
        estimatedDuration: '1주',
      },
      {
        order: 4,
        title: '송달',
        description:
          '피고(배우자)에게 소장 및 출석요구서 송달, 국제 송달 절차 진행',
        estimatedDuration: '1-3개월',
      },
      {
        order: 5,
        title: '조정 절차',
        description:
          '법원 조정 기일 진행, 조정 성립 시 조정 이혼 성립, 불성립 시 소송 진행',
        estimatedDuration: '1-2개월',
      },
      {
        order: 6,
        title: '소송 절차',
        description:
          '변론 기일 진행, 증거 제출, 증인 신문, 양육권 및 재산분할 심리',
        estimatedDuration: '3-6개월',
      },
      {
        order: 7,
        title: '판결 및 확정',
        description:
          '이혼 판결 선고, 항소 기간 경과 후 확정, 확정 증명원 발급',
        estimatedDuration: '1-2개월',
      },
      {
        order: 8,
        title: '이혼 신고 및 사후 처리',
        description:
          '가족관계등록부에 이혼 신고, 재산 이전 절차, 양육비 집행 등',
        estimatedDuration: '1개월',
      }
    );
  } else {
    // 외국 절차 (일반적)
    steps.push(
      {
        order: 1,
        title: '전문가 상담 및 준비',
        description: `${countryInfo.nameKo} 이혼 전문 변호사 선임, 관할 및 거주 요건 확인`,
        estimatedDuration: '1-2주',
      },
      {
        order: 2,
        title: '서류 준비',
        description:
          '필수 서류 수집, 아포스티유 발급, 번역 공증, 현지 서류 형식에 맞게 준비',
        estimatedDuration: '3-6주',
      },
      {
        order: 3,
        title: '이혼 청구 제기',
        description: `${countryInfo.nameKo} 법원에 이혼 청구(Petition) 제출, 접수비 납부`,
        estimatedDuration: '1-2주',
      },
      {
        order: 4,
        title: '송달 및 답변',
        description:
          '배우자에게 송달, 배우자 답변서 제출 기간 (보통 30일), 송달 증명 확보',
        estimatedDuration: '1-2개월',
      },
      {
        order: 5,
        title: '디스커버리 (증거개시)',
        description:
          '양측 재산 목록 교환, 증거 자료 공개, 증인 명단 제출 (미국, 영국 등)',
        estimatedDuration: '2-4개월',
      },
      {
        order: 6,
        title: '조정/협상',
        description:
          '법원 또는 중재를 통한 조정 시도, 합의 시 합의 이혼(Consent Order)',
        estimatedDuration: '1-3개월',
      },
      {
        order: 7,
        title: '재판 및 판결',
        description:
          '재판 진행, 증인 신문, 최종 변론, 판결 선고, 항소 기간 경과 후 확정',
        estimatedDuration: '3-8개월',
      },
      {
        order: 8,
        title: '사후 처리',
        description:
          '판결 등본 발급, 한국 가족관계등록부에 이혼 신고, 재산 이전 등',
        estimatedDuration: '1-2개월',
      }
    );
  }

  // 복잡도에 따라 추가 단계
  if (complexity.level === 'complex' || complexity.level === 'very_complex') {
    steps.push({
      order: steps.length + 1,
      title: '외국 판결 승인',
      description:
        '외국 이혼 판결을 다른 국가에서 승인받기 위한 별도 절차 (필요시)',
      estimatedDuration: '2-6개월',
    });
  }

  return {
    steps,
  };
}

// ============================================
// 10. 권고사항 및 경고
// ============================================

/**
 * 권고사항 및 경고 생성
 */
export function generateRecommendationsAndWarnings(
  input: InternationalDivorceInput,
  jurisdiction: JurisdictionResult,
  risks: RiskAssessment
): { recommendations: string[]; warnings: string[] } {
  const recommendations: string[] = [];
  const warnings: string[] = [];

  // 권고사항
  recommendations.push('국제이혼 전문 변호사와 상담하여 정확한 법률 자문을 받으세요.');

  if (input.cooperation.level === 'cooperative' || input.cooperation.willingToNegotiate) {
    recommendations.push(
      '협의이혼이 가능한 상황입니다. 협의이혼은 시간과 비용을 절약할 수 있으며, 양측 모두에게 유리한 결과를 도출할 수 있습니다.'
    );
  }

  if (input.children && input.children.count > 0) {
    recommendations.push(
      '자녀의 이익을 최우선으로 고려하여 양육권 및 양육비를 결정하세요. 자녀와의 면접교섭권도 구체적으로 정하는 것이 좋습니다.'
    );
  }

  if (input.assets.length > 0) {
    recommendations.push(
      '재산 목록을 정확히 파악하고 증빙 자료를 확보하세요. 가능하면 이혼 소송 전에 재산 가압류를 고려하세요.'
    );
  }

  if (COUNTRY_DATA[jurisdiction.recommended].languageBarrier !== 'none') {
    recommendations.push(
      '언어 장벽이 있으므로 공인 번역사를 통해 모든 서류를 정확히 번역하세요. 법률 용어의 정확한 번역이 중요합니다.'
    );
  }

  if (jurisdiction.possibleCountries.length > 1) {
    recommendations.push(
      '여러 국가에서 관할이 가능합니다. 각 국가의 법과 절차를 비교하여 가장 유리한 관할을 선택하세요.'
    );
  }

  recommendations.push(
    '이혼 절차 중 발생하는 모든 문서와 대화 내용을 기록으로 남기세요. 향후 증거로 활용될 수 있습니다.'
  );

  // 경고사항
  if (risks.level === 'high' || risks.level === 'very_high') {
    warnings.push(
      '⚠️ 전체적으로 리스크 수준이 높습니다. 신중한 전략 수립과 전문가의 도움이 필수적입니다.'
    );
  }

  risks.items.forEach((risk) => {
    if (risk.severity === 'high' || risk.severity === 'very_high') {
      warnings.push(`⚠️ ${risk.description}`);
    }
  });

  if (input.children && input.children.count > 0) {
    if (HAGUE_CHILD_ABDUCTION_COUNTRIES.includes(input.children.currentResidence)) {
      warnings.push(CHILD_CUSTODY_WARNINGS.haagueConvention);
    }
  }

  if (input.assets.length > 0) {
    const assetCountries = new Set(input.assets.map((a) => a.location));
    if (assetCountries.size > 1) {
      warnings.push(ASSET_WARNINGS.enforcement);
    }
    if (input.cooperation.level === 'uncooperative' || input.cooperation.level === 'hostile') {
      warnings.push(ASSET_WARNINGS.hiding);
    }
  }

  if (jurisdiction.possibleCountries.length > 2) {
    warnings.push(JURISDICTION_WARNINGS.conflict);
  }

  if (jurisdiction.possibleCountries.length === 0) {
    warnings.push(JURISDICTION_WARNINGS.noJurisdiction);
  }

  if (input.petitioner.nationality === 'PH' || input.respondent.nationality === 'PH') {
    warnings.push(
      '⚠️ 필리핀은 이혼이 금지된 국가입니다. 외국에서 이혼 후 필리핀에서 별도의 승인 절차가 필요하며, 매우 복잡하고 시간이 오래 걸립니다.'
    );
  }

  if (!HAGUE_SERVICE_CONVENTION_COUNTRIES.includes(input.respondent.currentResidence)) {
    warnings.push(
      '⚠️ 배우자가 헤이그 송달협약 미가입국에 거주하고 있어 송달이 어려울 수 있습니다. 공시송달 등 대체 방법을 검토해야 합니다.'
    );
  }

  return {
    recommendations,
    warnings,
  };
}

// ============================================
// 메인 함수
// ============================================

/**
 * 국제이혼 시뮬레이터 메인 함수
 *
 * 입력받은 정보를 바탕으로 관할, 준거법, 절차, 비용, 리스크 등을 종합적으로 분석
 *
 * @param input 국제이혼 시뮬레이터 입력 정보
 * @returns 국제이혼 시뮬레이터 결과
 */
export function calculateInternationalDivorce(
  input: InternationalDivorceInput
): InternationalDivorceResult {
  // 1. 관할 판단
  const jurisdiction = determineJurisdiction(input);

  // 2. 준거법 결정
  const applicableLaw = determineApplicableLaw(input, jurisdiction);

  // 3. 복잡도 분석
  const complexity = analyzeComplexity(input, jurisdiction);

  // 4. 시간 및 비용 산정
  const estimates = estimateTimeAndCost(input, jurisdiction, complexity);

  // 5. 필수 서류 생성
  const requiredDocuments = generateRequiredDocuments(input, jurisdiction, applicableLaw);

  // 6. 송달 및 집행 평가
  const enforcement = assessEnforcement(input, jurisdiction);

  // 7. 자녀 양육권 처리
  const childCustody = processChildCustody(input, jurisdiction);

  // 8. 리스크 분석
  const risks = analyzeRisks(input, jurisdiction, enforcement);

  // 9. 절차 생성
  const procedure = generateProcedure(jurisdiction, complexity);

  // 10. 권고사항 및 경고
  const { recommendations, warnings } = generateRecommendationsAndWarnings(
    input,
    jurisdiction,
    risks
  );

  return {
    jurisdiction,
    applicableLaw,
    complexity,
    estimates,
    requiredDocuments,
    enforcement,
    childCustody,
    risks,
    procedure,
    recommendations,
    warnings,
  };
}
