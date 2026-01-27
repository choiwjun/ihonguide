'use client';

/**
 * 양육비 계산 결과 표시 컴포넌트
 */

import Link from 'next/link';
import { Card, Button } from '@/components/ui';
import type { ChildSupportResult } from '@/types/calculator';
import { formatCurrency } from '@/lib/utils/format';

interface CalculatorResultProps {
  result: ChildSupportResult;
  onReset: () => void;
}

export function CalculatorResult({ result, onReset }: CalculatorResultProps) {
  return (
    <div className="space-y-6">
      {/* 결과 요약 */}
      <Card className="text-center">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">산정된 월 양육비</p>
          <div className="text-4xl font-bold text-brand-primary">
            {formatCurrency(result.nonCustodialPayment)}
          </div>
          <p className="text-sm text-gray-600">
            비양육 부모 월 부담액
          </p>
        </div>
      </Card>

      {/* 상세 내역 */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">계산 상세</h3>

          <div className="space-y-3">
            {/* 합산 소득 */}
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">부모 합산 소득</span>
              <span className="font-medium">{formatCurrency(result.combinedIncome)}</span>
            </div>

            {/* 소득 비율 */}
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">소득 비율</span>
              <span className="font-medium">
                부모1 {result.parent1Ratio}% : 부모2 {result.parent2Ratio}%
              </span>
            </div>

            {/* 기본 양육비 */}
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">기본 양육비</span>
              <span className="font-medium">{formatCurrency(result.baseAmount)}</span>
            </div>

            {/* 추가 비용 */}
            {result.additionalAmount > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">추가 비용</span>
                <span className="font-medium">+{formatCurrency(result.additionalAmount)}</span>
              </div>
            )}

            {/* 총 양육비 */}
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">총 양육비</span>
              <span className="font-semibold text-lg">{formatCurrency(result.totalAmount)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 계산 근거 */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">계산 근거</h3>

          <div className="p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">적용 소득 구간</span>
              <span className="font-medium">{result.breakdown.incomeRange}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">기준표 금액</span>
              <span className="font-medium">{formatCurrency(result.breakdown.tableAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">자녀 수 가산율</span>
              <span className="font-medium">{result.breakdown.childrenMultiplier}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">연령 가산율</span>
              <span className="font-medium">{result.breakdown.ageMultiplier}%</span>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            {result.breakdown.explanation}
          </p>
        </div>
      </Card>

      {/* 안내 문구 */}
      <Card className="bg-amber-50 border-amber-200">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="text-sm text-amber-800">
            <p className="font-medium mb-1">참고 안내</p>
            <p>
              본 계산 결과는 법원 양육비 산정기준표를 기반으로 한 참고용 정보입니다.
              실제 양육비는 법원에서 개별 사정을 고려하여 결정됩니다.
            </p>
          </div>
        </div>
      </Card>

      {/* CTA 버튼 */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 text-center">
            다음으로 해볼 수 있어요
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/diagnosis" className="block">
              <Button variant="secondary" className="w-full">
                이혼 유형 진단하기
              </Button>
            </Link>
            <Link href="/consultation" className="block">
              <Button className="w-full">전문가 상담 신청</Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* 재계산 */}
      <div className="text-center">
        <Button variant="ghost" onClick={onReset} className="text-gray-500">
          다시 계산하기
        </Button>
      </div>
    </div>
  );
}
