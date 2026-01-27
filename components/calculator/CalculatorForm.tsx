'use client';

/**
 * 양육비 계산기 입력 폼
 */

import { useCallback } from 'react';
import { useCalculatorStore } from '@/stores';
import { Card, Button } from '@/components/ui';
import { AGE_GROUP_LABELS, type ChildAgeGroup } from '@/types/calculator';

interface CalculatorFormProps {
  onCalculate: () => void;
  isCalculating: boolean;
}

// 원 단위 입력 필드 컴포넌트
function MoneyInput({
  id,
  value,
  onChange,
  placeholder = '0',
}: {
  id: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const numValue = parseInt(rawValue, 10);
    onChange(isNaN(numValue) ? 0 : numValue);
  };

  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={value > 0 ? value.toLocaleString() : ''}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-12 px-4 pr-10 bg-white border border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
        원
      </span>
    </div>
  );
}

export function CalculatorForm({ onCalculate, isCalculating }: CalculatorFormProps) {
  const {
    parent1Income,
    parent2Income,
    childrenCount,
    childrenAgeGroup,
    custodialParent,
    additionalCosts,
    setParent1Income,
    setParent2Income,
    setChildrenCount,
    setChildrenAgeGroup,
    setCustodialParent,
    setAdditionalCost,
  } = useCalculatorStore();

  // 폼 유효성 검사
  const isValid = parent1Income >= 0 && parent2Income >= 0 && childrenCount >= 1;

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isValid && !isCalculating) {
        onCalculate();
      }
    },
    [isValid, isCalculating, onCalculate]
  );

  return (
    <Card className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">양육비 계산기</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 부모 소득 입력 */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">부모 소득 (월)</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="parent1Income" className="block text-sm text-gray-600 mb-1">
                부모 1 소득
              </label>
              <MoneyInput
                id="parent1Income"
                value={parent1Income}
                onChange={setParent1Income}
              />
            </div>
            <div>
              <label htmlFor="parent2Income" className="block text-sm text-gray-600 mb-1">
                부모 2 소득
              </label>
              <MoneyInput
                id="parent2Income"
                value={parent2Income}
                onChange={setParent2Income}
              />
            </div>
          </div>
        </div>

        {/* 자녀 정보 */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">자녀 정보</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="childrenCount" className="block text-sm text-gray-600 mb-1">
                자녀 수
              </label>
              <select
                id="childrenCount"
                value={childrenCount}
                onChange={(e) => setChildrenCount(parseInt(e.target.value, 10))}
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              >
                {[1, 2, 3, 4, 5].map((count) => (
                  <option key={count} value={count}>
                    {count}명
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="childrenAgeGroup" className="block text-sm text-gray-600 mb-1">
                자녀 연령대 (대표)
              </label>
              <select
                id="childrenAgeGroup"
                value={childrenAgeGroup}
                onChange={(e) => setChildrenAgeGroup(e.target.value as ChildAgeGroup)}
                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              >
                {Object.entries(AGE_GROUP_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 양육 부모 */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">양육 부모</h3>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="custodialParent"
                value={1}
                checked={custodialParent === 1}
                onChange={() => setCustodialParent(1)}
                className="w-4 h-4 text-brand-primary focus:ring-brand-primary"
              />
              <span className="text-sm text-gray-700">부모 1</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="custodialParent"
                value={2}
                checked={custodialParent === 2}
                onChange={() => setCustodialParent(2)}
                className="w-4 h-4 text-brand-primary focus:ring-brand-primary"
              />
              <span className="text-sm text-gray-700">부모 2</span>
            </label>
          </div>
        </div>

        {/* 추가 비용 (선택) */}
        <details className="group">
          <summary className="text-sm font-medium text-gray-700 cursor-pointer list-none flex items-center gap-2">
            <svg
              className="w-4 h-4 transition-transform group-open:rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            추가 비용 (선택사항)
          </summary>
          <div className="mt-4 space-y-3 pl-6">
            <div>
              <label htmlFor="education" className="block text-sm text-gray-600 mb-1">
                교육비 (월)
              </label>
              <MoneyInput
                id="education"
                value={additionalCosts.education}
                onChange={(v) => setAdditionalCost('education', v)}
              />
            </div>
            <div>
              <label htmlFor="medical" className="block text-sm text-gray-600 mb-1">
                의료비 (월)
              </label>
              <MoneyInput
                id="medical"
                value={additionalCosts.medical}
                onChange={(v) => setAdditionalCost('medical', v)}
              />
            </div>
            <div>
              <label htmlFor="other" className="block text-sm text-gray-600 mb-1">
                기타 비용 (월)
              </label>
              <MoneyInput
                id="other"
                value={additionalCosts.other}
                onChange={(v) => setAdditionalCost('other', v)}
              />
            </div>
          </div>
        </details>

        {/* 계산 버튼 */}
        <Button
          type="submit"
          disabled={!isValid || isCalculating}
          className="w-full"
          size="lg"
        >
          {isCalculating ? '계산 중...' : '양육비 계산하기'}
        </Button>
      </form>
    </Card>
  );
}
