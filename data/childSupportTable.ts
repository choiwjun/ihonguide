/**
 * 양육비 산정기준표
 * 법원 양육비 산정기준표 (2023년 기준) 참고하여 작성
 *
 * 주의: 이 표는 참고용이며, 실제 양육비는 법원에서 개별 사정을 고려하여 결정됩니다.
 */

import type { ChildSupportTableEntry } from '@/types/calculator';

/**
 * 양육비 기준표 (합산 소득 기준, 자녀 1인 기준)
 *
 * 법원 양육비 산정기준표를 참고하여 구성
 * 단위: 원/월
 */
export const childSupportTable: ChildSupportTableEntry[] = [
  {
    incomeRange: { min: 0, max: 1999999, label: '200만원 미만' },
    baseAmount: 370000,
  },
  {
    incomeRange: { min: 2000000, max: 2999999, label: '200~300만원' },
    baseAmount: 450000,
  },
  {
    incomeRange: { min: 3000000, max: 3999999, label: '300~400만원' },
    baseAmount: 530000,
  },
  {
    incomeRange: { min: 4000000, max: 4999999, label: '400~500만원' },
    baseAmount: 610000,
  },
  {
    incomeRange: { min: 5000000, max: 5999999, label: '500~600만원' },
    baseAmount: 690000,
  },
  {
    incomeRange: { min: 6000000, max: 6999999, label: '600~700만원' },
    baseAmount: 770000,
  },
  {
    incomeRange: { min: 7000000, max: 7999999, label: '700~800만원' },
    baseAmount: 850000,
  },
  {
    incomeRange: { min: 8000000, max: 8999999, label: '800~900만원' },
    baseAmount: 930000,
  },
  {
    incomeRange: { min: 9000000, max: 9999999, label: '900~1000만원' },
    baseAmount: 1010000,
  },
  {
    incomeRange: { min: 10000000, max: 11999999, label: '1000~1200만원' },
    baseAmount: 1130000,
  },
  {
    incomeRange: { min: 12000000, max: 13999999, label: '1200~1400만원' },
    baseAmount: 1290000,
  },
  {
    incomeRange: { min: 14000000, max: 15999999, label: '1400~1600만원' },
    baseAmount: 1450000,
  },
  {
    incomeRange: { min: 16000000, max: Infinity, label: '1600만원 이상' },
    baseAmount: 1610000,
  },
];

/**
 * 합산 소득에 해당하는 기준표 항목 찾기
 * @param combinedIncome 부모 합산 월 소득
 * @returns 해당 소득 구간의 기준표 항목
 */
export function findTableEntry(combinedIncome: number): ChildSupportTableEntry {
  const entry = childSupportTable.find(
    (item) =>
      combinedIncome >= item.incomeRange.min &&
      combinedIncome <= item.incomeRange.max
  );

  // 찾지 못하면 가장 낮은 구간 반환
  return entry || childSupportTable[0];
}

/**
 * 소득 구간별 기본 양육비 조회
 * @param combinedIncome 부모 합산 월 소득
 * @returns 기본 양육비 (원/월)
 */
export function getBaseAmount(combinedIncome: number): number {
  const entry = findTableEntry(combinedIncome);
  return entry.baseAmount;
}

/**
 * 소득 구간 라벨 조회
 * @param combinedIncome 부모 합산 월 소득
 * @returns 소득 구간 라벨 (예: "600~700만원")
 */
export function getIncomeRangeLabel(combinedIncome: number): string {
  const entry = findTableEntry(combinedIncome);
  return entry.incomeRange.label;
}

/**
 * 모든 소득 구간 목록 조회
 * @returns 소득 구간 목록
 */
export function getAllIncomeRanges(): string[] {
  return childSupportTable.map((entry) => entry.incomeRange.label);
}
