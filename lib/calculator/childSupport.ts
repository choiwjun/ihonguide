/**
 * 양육비 계산 로직
 */

import type {
  ChildSupportInput,
  ChildSupportResult,
  CalculationBreakdown,
} from '@/types/calculator';
import {
  AGE_GROUP_MULTIPLIERS,
  CHILDREN_COUNT_MULTIPLIERS,
} from '@/types/calculator';
import { findTableEntry, getBaseAmount } from '@/data/childSupportTable';

/**
 * 양육비 계산
 * @param input 계산기 입력값
 * @returns 양육비 계산 결과
 */
export function calculateChildSupport(input: ChildSupportInput): ChildSupportResult {
  const {
    parent1Income,
    parent2Income,
    childrenCount,
    childrenAgeGroup,
    custodialParent,
    additionalCosts,
  } = input;

  // 합산 소득 계산
  const combinedIncome = parent1Income + parent2Income;

  // 소득 비율 계산
  const parent1Ratio = combinedIncome > 0
    ? Math.round((parent1Income / combinedIncome) * 10000) / 100
    : 50;
  const parent2Ratio = combinedIncome > 0
    ? Math.round((parent2Income / combinedIncome) * 10000) / 100
    : 50;

  // 기준표에서 기본 양육비 조회
  const tableEntry = findTableEntry(combinedIncome);
  const tableAmount = tableEntry.baseAmount;

  // 자녀 수 가산율 적용
  const effectiveChildrenCount = Math.min(childrenCount, 4); // 최대 4명까지 적용
  const childrenMultiplier = CHILDREN_COUNT_MULTIPLIERS[effectiveChildrenCount] || 1;

  // 연령대 가산율 적용
  const ageMultiplier = AGE_GROUP_MULTIPLIERS[childrenAgeGroup] || 1;

  // 기본 양육비 계산 (기준표 금액 × 자녀 수 가산율 × 연령대 가산율)
  const baseAmount = Math.round(tableAmount * childrenMultiplier * ageMultiplier);

  // 추가 비용 계산
  const educationCost = additionalCosts?.education || 0;
  const medicalCost = additionalCosts?.medical || 0;
  const otherCost = additionalCosts?.other || 0;
  const additionalAmount = educationCost + medicalCost + otherCost;

  // 총 양육비
  const totalAmount = baseAmount + additionalAmount;

  // 비양육 부모 부담액 계산
  const nonCustodialParentRatio = custodialParent === 1 ? parent2Ratio : parent1Ratio;
  const nonCustodialPayment = Math.round(totalAmount * (nonCustodialParentRatio / 100));

  // 계산 근거 생성
  const breakdown = generateBreakdown(
    tableEntry.incomeRange.label,
    childrenMultiplier,
    ageMultiplier,
    tableAmount,
    childrenCount,
    childrenAgeGroup
  );

  return {
    baseAmount,
    additionalAmount,
    totalAmount,
    nonCustodialPayment,
    parent1Ratio,
    parent2Ratio,
    combinedIncome,
    breakdown,
  };
}

/**
 * 계산 근거 상세 생성
 */
function generateBreakdown(
  incomeRangeLabel: string,
  childrenMultiplier: number,
  ageMultiplier: number,
  tableAmount: number,
  childrenCount: number,
  ageGroup: string
): CalculationBreakdown {
  const childrenText = childrenCount === 1 ? '1명' : `${childrenCount}명`;
  const ageText = getAgeGroupText(ageGroup);

  let explanation = `부모 합산 소득 ${incomeRangeLabel} 구간의 기준 양육비 ${tableAmount.toLocaleString()}원`;

  if (childrenCount > 1) {
    explanation += `, 자녀 ${childrenText} 가산율 ${Math.round(childrenMultiplier * 100)}% 적용`;
  }

  if (ageMultiplier !== 1) {
    const agePercent = Math.round((ageMultiplier - 1) * 100);
    if (agePercent > 0) {
      explanation += `, ${ageText} 연령 가산 ${agePercent}% 적용`;
    } else if (agePercent < 0) {
      explanation += `, ${ageText} 연령 ${Math.abs(agePercent)}% 감액 적용`;
    }
  }

  return {
    incomeRange: incomeRangeLabel,
    childrenMultiplier: Math.round(childrenMultiplier * 100),
    ageMultiplier: Math.round(ageMultiplier * 100),
    tableAmount,
    explanation,
  };
}

/**
 * 연령대 텍스트 반환
 */
function getAgeGroupText(ageGroup: string): string {
  const texts: Record<string, string> = {
    '0-2': '영아',
    '3-5': '유아',
    '6-11': '초등학생',
    '12-14': '중학생',
    '15-17': '고등학생',
    '18+': '대학생',
  };
  return texts[ageGroup] || ageGroup;
}

/**
 * 빠른 양육비 예상 계산 (간단 버전)
 * @param parent1Income 부모1 월 소득
 * @param parent2Income 부모2 월 소득
 * @param childrenCount 자녀 수
 * @returns 예상 월 양육비
 */
export function quickCalculate(
  parent1Income: number,
  parent2Income: number,
  childrenCount: number
): number {
  const combinedIncome = parent1Income + parent2Income;
  const baseAmount = getBaseAmount(combinedIncome);
  const effectiveChildrenCount = Math.min(childrenCount, 4);
  const childrenMultiplier = CHILDREN_COUNT_MULTIPLIERS[effectiveChildrenCount] || 1;

  return Math.round(baseAmount * childrenMultiplier);
}
