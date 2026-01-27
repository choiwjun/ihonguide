/**
 * 이혼 유형 진단 점수 계산 및 결과 생성
 */

import type {
  DiagnosisAnswer,
  DiagnosisResult,
  DiagnosisResultType,
  DiagnosisResultDetail,
} from '@/types/diagnosis';
import { DIAGNOSIS_SCORE_RANGES } from '@/types/diagnosis';
import { diagnosisQuestions } from '@/data/diagnosisQuestions';

/**
 * 총 점수 계산
 */
export function calculateTotalScore(answers: DiagnosisAnswer[]): number {
  return answers.reduce((sum, answer) => sum + answer.score, 0);
}

/**
 * 점수에 따른 이혼 유형 결정
 * - 25점 이상: 협의이혼
 * - 15-24점: 조정이혼
 * - 14점 이하: 소송이혼
 */
export function determineResultType(score: number): DiagnosisResultType {
  if (score >= DIAGNOSIS_SCORE_RANGES.협의.min) {
    return '협의';
  }
  if (score >= DIAGNOSIS_SCORE_RANGES.조정.min) {
    return '조정';
  }
  return '소송';
}

/**
 * 협의이혼 결과 상세 생성
 */
function generateConsensusDetail(answers: DiagnosisAnswer[]): DiagnosisResultDetail {
  const reasons: string[] = [];
  const nextSteps: string[] = [];

  // 의사소통 점수 확인
  const communicationAnswer = answers.find((a) => a.questionId === 'q1');
  if (communicationAnswer && communicationAnswer.score >= 2) {
    reasons.push('배우자와 원활한 의사소통이 가능합니다');
  }

  // 이혼 동의 확인
  const agreementAnswer = answers.find((a) => a.questionId === 'q2');
  if (agreementAnswer && agreementAnswer.score >= 2) {
    reasons.push('양측이 이혼에 대해 동의하고 있습니다');
  }

  // 재산분할 확인
  const propertyAnswer = answers.find((a) => a.questionId === 'q3');
  if (propertyAnswer && propertyAnswer.score >= 2) {
    reasons.push('재산분할에 대한 합의가 가능합니다');
  }

  // 기본 사유 추가
  if (reasons.length === 0) {
    reasons.push('전반적으로 합의 가능성이 높습니다');
  }

  nextSteps.push('협의이혼 의사 확인서 작성');
  nextSteps.push('관할 가정법원에 협의이혼 의사 확인 신청');
  nextSteps.push('이혼 숙려 기간 대기 (자녀 유무에 따라 1~3개월)');
  nextSteps.push('가정법원 출석하여 이혼 의사 확인');

  return {
    recommendation: '협의',
    reasons,
    nextSteps,
    estimatedDuration: '1-3개월',
    additionalInfo: '협의이혼은 가장 빠르고 비용이 적게 드는 방법입니다.',
  };
}

/**
 * 조정이혼 결과 상세 생성
 */
function generateMediationDetail(answers: DiagnosisAnswer[]): DiagnosisResultDetail {
  const reasons: string[] = [];
  const nextSteps: string[] = [];

  // 재산분할 이견 확인
  const propertyAnswer = answers.find((a) => a.questionId === 'q3');
  if (propertyAnswer && propertyAnswer.score === 2) {
    reasons.push('재산분할에 대해 일부 조율이 필요합니다');
  }

  // 양육권 관련 확인
  const childrenAnswer = answers.find((a) => a.questionId === 'q4');
  if (childrenAnswer && childrenAnswer.score === 2) {
    reasons.push('자녀 양육에 대한 조율이 필요합니다');
  }

  // 양육비 관련 확인
  const supportAnswer = answers.find((a) => a.questionId === 'q5');
  if (supportAnswer && supportAnswer.score === 2) {
    reasons.push('양육비 금액에 대한 협의가 필요합니다');
  }

  // 위자료 관련 확인
  const alimonyAnswer = answers.find((a) => a.questionId === 'q7');
  if (alimonyAnswer && alimonyAnswer.score === 2) {
    reasons.push('위자료에 대한 조율이 필요합니다');
  }

  // 기본 사유 추가
  if (reasons.length === 0) {
    reasons.push('일부 사안에 대해 제3자의 중재가 도움이 될 수 있습니다');
  }

  nextSteps.push('가정법원에 이혼 조정 신청');
  nextSteps.push('조정위원회 참석 (1-3회)');
  nextSteps.push('조정안에 양측 합의 시 조정 성립');
  nextSteps.push('합의되지 않을 경우 소송으로 전환 가능');

  return {
    recommendation: '조정',
    reasons,
    nextSteps,
    estimatedDuration: '3-6개월',
    additionalInfo: '조정이혼의 성공률은 약 70%입니다. 조정을 통해 양측이 만족하는 합의점을 찾을 수 있습니다.',
  };
}

/**
 * 소송이혼 결과 상세 생성
 */
function generateLitigationDetail(answers: DiagnosisAnswer[]): DiagnosisResultDetail {
  const reasons: string[] = [];
  const nextSteps: string[] = [];

  // 이혼 동의 여부 확인
  const agreementAnswer = answers.find((a) => a.questionId === 'q2');
  if (agreementAnswer && agreementAnswer.score === 1) {
    reasons.push('배우자가 이혼에 동의하지 않습니다');
  }

  // 의사소통 문제 확인
  const communicationAnswer = answers.find((a) => a.questionId === 'q1');
  if (communicationAnswer && communicationAnswer.score === 1) {
    reasons.push('배우자와 대화가 어려운 상황입니다');
  }

  // 재산분할 분쟁 확인
  const propertyAnswer = answers.find((a) => a.questionId === 'q3');
  if (propertyAnswer && propertyAnswer.score === 1) {
    reasons.push('재산분할에 대한 합의가 어렵습니다');
  }

  // 유책사유 확인
  const faultAnswer = answers.find((a) => a.questionId === 'q6');
  if (faultAnswer && faultAnswer.score === 1) {
    reasons.push('법적 이혼 사유가 존재합니다');
  }

  // 양육권 분쟁 확인
  const childrenAnswer = answers.find((a) => a.questionId === 'q4');
  if (childrenAnswer && childrenAnswer.score === 1) {
    reasons.push('양육권에 대한 분쟁이 예상됩니다');
  }

  // 기본 사유 추가
  if (reasons.length === 0) {
    reasons.push('협의나 조정으로 해결이 어려운 상황입니다');
  }

  nextSteps.push('전문 변호사 상담 권장');
  nextSteps.push('이혼 소장 작성 및 제출');
  nextSteps.push('법원 심리 참석 (수회)');
  nextSteps.push('판결 또는 화해 권고');

  return {
    recommendation: '소송',
    reasons,
    nextSteps,
    estimatedDuration: '6-12개월',
    additionalInfo: '소송이혼은 시간과 비용이 가장 많이 소요되지만, 법원의 판단에 따라 공정한 결과를 얻을 수 있습니다.',
  };
}

/**
 * 결과 상세 생성
 */
export function generateResultDetail(
  resultType: DiagnosisResultType,
  answers: DiagnosisAnswer[]
): DiagnosisResultDetail {
  switch (resultType) {
    case '협의':
      return generateConsensusDetail(answers);
    case '조정':
      return generateMediationDetail(answers);
    case '소송':
      return generateLitigationDetail(answers);
    default:
      throw new Error(`Unknown result type: ${resultType}`);
  }
}

/**
 * 진단 결과 계산
 */
export function calculateDiagnosisResult(answers: DiagnosisAnswer[]): DiagnosisResult {
  const score = calculateTotalScore(answers);
  const resultType = determineResultType(score);
  const detail = generateResultDetail(resultType, answers);

  return {
    resultType,
    score,
    totalQuestions: diagnosisQuestions.length,
    answeredQuestions: answers.length,
    detail,
    createdAt: new Date(),
  };
}
