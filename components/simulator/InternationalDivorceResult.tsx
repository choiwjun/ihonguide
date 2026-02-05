'use client';

/**
 * 국제이혼 시뮬레이터 결과 표시 컴포넌트
 * International Divorce Simulator Result Display Component
 * @TASK International Divorce Simulator Result Component
 * @SPEC Light Transparency Design System
 */

import Link from 'next/link';
import { Card, Button } from '@/components/ui';
import type {
  InternationalDivorceResult,
  JurisdictionPriority,
  ComplexityLevel,
  DifficultyLevel,
  RiskSeverity,
  RiskType,
  CountryCode,
} from '@/types/internationalDivorceSimulator';
import { cn } from '@/lib/utils/cn';

interface InternationalDivorceResultProps {
  result: InternationalDivorceResult;
  onReset: () => void;
}

/**
 * USD 금액 포맷팅
 */
function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * USD 범위 포맷팅
 */
function formatUSDRange(min: number, max: number): string {
  return `${formatUSD(min)} ~ ${formatUSD(max)}`;
}

/**
 * 국가 코드를 한글 이름으로 변환
 */
const countryNames: Record<CountryCode, string> = {
  KR: '대한민국',
  US: '미국',
  JP: '일본',
  CN: '중국',
  GB: '영국',
  CA: '캐나다',
  AU: '호주',
  FR: '프랑스',
  DE: '독일',
  VN: '베트남',
  PH: '필리핀',
  TH: '태국',
  OTHER: '기타',
};

/**
 * 국가 코드를 이모지 플래그로 변환
 */
const countryFlags: Record<CountryCode, string> = {
  KR: '🇰🇷',
  US: '🇺🇸',
  JP: '🇯🇵',
  CN: '🇨🇳',
  GB: '🇬🇧',
  CA: '🇨🇦',
  AU: '🇦🇺',
  FR: '🇫🇷',
  DE: '🇩🇪',
  VN: '🇻🇳',
  PH: '🇵🇭',
  TH: '🇹🇭',
  OTHER: '🌐',
};

/**
 * 관할 우선순위 색상 매핑
 */
const priorityColors: Record<JurisdictionPriority, string> = {
  primary: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  secondary: 'bg-blue-100 text-blue-700 border-blue-200',
  possible: 'bg-gray-100 text-gray-700 border-gray-200',
};

/**
 * 관할 우선순위 한글 레이블
 */
const priorityLabels: Record<JurisdictionPriority, string> = {
  primary: '최우선',
  secondary: '차선',
  possible: '가능',
};

/**
 * 복잡도 수준 색상 매핑
 */
const complexityColors: Record<ComplexityLevel, string> = {
  simple: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  moderate: 'bg-amber-100 text-amber-700 border-amber-200',
  complex: 'bg-orange-100 text-orange-700 border-orange-200',
  very_complex: 'bg-red-100 text-red-700 border-red-200',
};

/**
 * 복잡도 수준 한글 레이블
 */
const complexityLabels: Record<ComplexityLevel, string> = {
  simple: '단순',
  moderate: '보통',
  complex: '복잡',
  very_complex: '매우 복잡',
};

/**
 * 난이도 수준 색상 매핑
 */
const difficultyColors: Record<DifficultyLevel, string> = {
  easy: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  moderate: 'bg-amber-100 text-amber-700 border-amber-200',
  difficult: 'bg-orange-100 text-orange-700 border-orange-200',
  very_difficult: 'bg-red-100 text-red-700 border-red-200',
};

/**
 * 난이도 수준 한글 레이블
 */
const difficultyLabels: Record<DifficultyLevel, string> = {
  easy: '쉬움',
  moderate: '보통',
  difficult: '어려움',
  very_difficult: '매우 어려움',
};

/**
 * 리스크 심각도 색상 매핑
 */
const riskSeverityColors: Record<RiskSeverity, string> = {
  low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  very_high: 'bg-red-100 text-red-700 border-red-200',
};

/**
 * 리스크 심각도 한글 레이블
 */
const riskSeverityLabels: Record<RiskSeverity, string> = {
  low: '낮음',
  medium: '보통',
  high: '높음',
  very_high: '매우 높음',
};

/**
 * 리스크 타입 한글 레이블
 */
const riskTypeLabels: Record<RiskType, string> = {
  custody: '양육권',
  asset: '재산',
  jurisdiction: '관할',
  enforcement: '집행',
};

/**
 * 리스크 타입 아이콘
 */
const riskTypeIcons: Record<RiskType, string> = {
  custody: '👨‍👩‍👧‍👦',
  asset: '💰',
  jurisdiction: '⚖️',
  enforcement: '📋',
};

/**
 * 자녀 양육권 복잡도 색상
 */
const custodyComplexityColors = {
  low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  high: 'bg-red-100 text-red-700 border-red-200',
};

/**
 * 자녀 양육권 복잡도 한글 레이블
 */
const custodyComplexityLabels = {
  low: '낮음',
  medium: '보통',
  high: '높음',
};

export function InternationalDivorceResult({
  result,
  onReset,
}: InternationalDivorceResultProps) {
  return (
    <div className="space-y-6 print:space-y-4">
      {/* 1. 관할 판단 */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">관할 판단</h2>

          {/* 추천 국가 */}
          <div className="p-4 bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 rounded-xl border border-brand-primary/20">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">
                {countryFlags[result.jurisdiction.recommended]}
              </span>
              <div>
                <p className="text-sm text-gray-600">추천 국가</p>
                <p className="text-2xl font-bold text-brand-primary">
                  {countryNames[result.jurisdiction.recommended]}
                </p>
              </div>
            </div>
          </div>

          {/* 추천 이유 */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              추천 이유
            </h3>
            <ul className="space-y-1.5">
              {result.jurisdiction.reasoning.map((reason, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <svg
                    className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 관할 가능 국가 테이블 */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">
              관할 가능 국가
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">
                      국가
                    </th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">
                      우선순위
                    </th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">
                      관할 근거
                    </th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700">
                      유리함
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.jurisdiction.possibleCountries.map((country) => (
                    <tr
                      key={country.country}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">
                            {countryFlags[country.country]}
                          </span>
                          <span className="font-medium text-gray-900">
                            {country.countryName}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={cn(
                            'inline-block px-2 py-1 rounded text-xs font-semibold border',
                            priorityColors[country.priority]
                          )}
                        >
                          {priorityLabels[country.priority]}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <ul className="space-y-1">
                          {country.basis.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-1 text-gray-700"
                            >
                              <span className="text-gray-400">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-3 px-3 text-center">
                        {country.advantageous ? (
                          <svg
                            className="w-5 h-5 text-emerald-600 inline-block"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-400 inline-block"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>

      {/* 2. 준거법 */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">준거법</h2>

          {/* 준거법 국가 */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <span className="text-3xl">
              {countryFlags[result.applicableLaw.country]}
            </span>
            <div>
              <p className="text-sm text-gray-600">적용 법률</p>
              <p className="text-lg font-bold text-gray-900">
                {result.applicableLaw.lawName}
              </p>
            </div>
          </div>

          {/* 주요 특징 */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">주요 특징</h3>
            <ul className="space-y-1.5">
              {result.applicableLaw.keyFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <svg
                    className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 실무상 시사점 */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">
              실무상 시사점
            </h3>
            <ul className="space-y-1.5">
              {result.applicableLaw.implications.map((implication, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <svg
                    className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{implication}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* 3. 복잡도 분석 */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">복잡도 분석</h2>

          {/* 복잡도 수준 */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              복잡도 수준
            </span>
            <span
              className={cn(
                'px-3 py-1 rounded-full text-sm font-semibold border',
                complexityColors[result.complexity.level]
              )}
            >
              {complexityLabels[result.complexity.level]}
            </span>
          </div>

          {/* 복잡도 요인 */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">복잡도 요인</h3>
            <ul className="space-y-1.5">
              {result.complexity.factors.map((factor, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <svg
                    className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* 4. 예상 소요 시간 및 비용 */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            예상 소요 시간 및 비용
          </h2>

          {/* 예상 기간 타임라인 */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">예상 기간</h3>
            <div className="relative pt-2">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-gray-600">
                  최소 {result.estimates.duration.min}개월
                </span>
                <span className="text-xs font-semibold text-brand-primary">
                  평균 {result.estimates.duration.average}개월
                </span>
                <span className="text-xs text-gray-600">
                  최대 {result.estimates.duration.max}개월
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-brand-primary to-amber-500"
                  style={{
                    width: `${
                      (result.estimates.duration.average /
                        result.estimates.duration.max) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* 예상 비용 테이블 */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">비용 내역</h3>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-700">
                      변호사 비용
                    </td>
                    <td className="py-3 px-4 text-right text-gray-900">
                      {formatUSDRange(
                        result.estimates.costs.legal.min,
                        result.estimates.costs.legal.max
                      )}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-700">
                      번역 비용
                    </td>
                    <td className="py-3 px-4 text-right text-gray-900">
                      {formatUSDRange(
                        result.estimates.costs.translation.min,
                        result.estimates.costs.translation.max
                      )}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-700">
                      여행 비용
                    </td>
                    <td className="py-3 px-4 text-right text-gray-900">
                      {formatUSDRange(
                        result.estimates.costs.travel.min,
                        result.estimates.costs.travel.max
                      )}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-700">
                      기타 비용
                    </td>
                    <td className="py-3 px-4 text-right text-gray-900">
                      {formatUSDRange(
                        result.estimates.costs.other.min,
                        result.estimates.costs.other.max
                      )}
                    </td>
                  </tr>
                  <tr className="bg-brand-primary/5">
                    <td className="py-3 px-4 font-bold text-gray-900">
                      총 예상 비용
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-brand-primary text-base">
                      {formatUSDRange(
                        result.estimates.costs.total.min,
                        result.estimates.costs.total.max
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>

      {/* 5. 필수 서류 */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">필수 서류</h2>

          <div className="space-y-4">
            {result.requiredDocuments.map((doc, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {doc.category}
                  </h3>
                  <div className="flex gap-2">
                    {doc.apostilleRequired && (
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                        아포스티유 필요
                      </span>
                    )}
                    {doc.translationRequired && (
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                        번역 필요
                      </span>
                    )}
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {doc.documents.map((docName, docIndex) => (
                    <li
                      key={docIndex}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{docName}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 6. 송달 및 집행 */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">송달 및 집행</h2>

          {/* 송달 난이도 */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              송달 난이도
            </span>
            <span
              className={cn(
                'px-3 py-1 rounded-full text-sm font-semibold border',
                difficultyColors[result.enforcement.serviceDifficulty]
              )}
            >
              {difficultyLabels[result.enforcement.serviceDifficulty]}
            </span>
          </div>

          {/* 집행 가능성 */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              집행 가능 여부
            </span>
            {result.enforcement.enforcementPossible ? (
              <span className="flex items-center gap-1 text-sm font-semibold text-emerald-700">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                가능
              </span>
            ) : (
              <span className="flex items-center gap-1 text-sm font-semibold text-red-700">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                불가
              </span>
            )}
          </div>

          {/* 적용 가능한 조약 */}
          {result.enforcement.treaties.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">
                적용 가능한 국제 조약
              </h3>
              <ul className="space-y-1.5">
                {result.enforcement.treaties.map((treaty, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <svg
                      className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{treaty}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>

      {/* 7. 자녀 양육권 (자녀가 있는 경우) */}
      {result.childCustody && (
        <Card>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">자녀 양육권</h2>

            {/* 적용 가능한 협약 */}
            {result.childCustody.applicableConvention && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-600 font-medium mb-1">
                  적용 협약
                </p>
                <p className="text-base font-semibold text-blue-900">
                  {result.childCustody.applicableConvention}
                </p>
              </div>
            )}

            {/* 복잡도 수준 */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                복잡도 수준
              </span>
              <span
                className={cn(
                  'px-3 py-1 rounded-full text-sm font-semibold border',
                  custodyComplexityColors[result.childCustody.complexityLevel]
                )}
              >
                {
                  custodyComplexityLabels[
                    result.childCustody.complexityLevel
                  ]
                }
              </span>
            </div>

            {/* 경고사항 */}
            {result.childCustody.warnings.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-red-700 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  주의사항
                </h3>
                <ul className="space-y-1.5">
                  {result.childCustody.warnings.map((warning, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-red-700 p-2 bg-red-50 rounded"
                    >
                      <svg
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* 8. 리스크 평가 */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">리스크 평가</h2>

          {/* 전체 리스크 수준 */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              전체 리스크 수준
            </span>
            <span
              className={cn(
                'px-3 py-1 rounded-full text-sm font-semibold border',
                riskSeverityColors[result.risks.level]
              )}
            >
              {riskSeverityLabels[result.risks.level]}
            </span>
          </div>

          {/* 리스크 항목 (타입별로 그룹화) */}
          <div className="space-y-3">
            {(['custody', 'asset', 'jurisdiction', 'enforcement'] as const)
              .map((type) => {
                const items = result.risks.items.filter(
                  (item) => item.type === type
                );
                if (items.length === 0) return null;

                return (
                  <div key={type} className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <span className="text-lg">{riskTypeIcons[type]}</span>
                      {riskTypeLabels[type]} 리스크
                    </h3>
                    <div className="space-y-2">
                      {items.map((item, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <span
                              className={cn(
                                'inline-block px-2 py-1 rounded text-xs font-semibold border flex-shrink-0',
                                riskSeverityColors[item.severity]
                              )}
                            >
                              {riskSeverityLabels[item.severity]}
                            </span>
                            <p className="text-sm font-medium text-gray-900">
                              {item.description}
                            </p>
                          </div>
                          <div className="pl-2 border-l-2 border-emerald-200">
                            <p className="text-xs text-gray-600">
                              <span className="font-semibold text-emerald-700">
                                완화 방안:
                              </span>{' '}
                              {item.mitigation}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
              .filter(Boolean)}
          </div>
        </div>
      </Card>

      {/* 9. 절차 단계 */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">절차 단계</h2>

          <ol className="space-y-4">
            {result.procedure.steps.map((step) => (
              <li key={step.order} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center text-base font-bold">
                  {step.order}
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-semibold text-gray-900 mb-1">
                    {step.title}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    {step.description}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    예상 소요: {step.estimatedDuration}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Card>

      {/* 10. 권고사항 */}
      {result.recommendations.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              권고사항
            </h2>
            <ul className="space-y-2">
              {result.recommendations.map((recommendation, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-blue-800 p-3 bg-white/50 rounded-lg"
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      {/* 11. 경고사항 */}
      {result.warnings.length > 0 && (
        <Card className="bg-red-50 border-red-200">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-red-900 flex items-center gap-2">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              경고사항
            </h2>
            <ul className="space-y-2">
              {result.warnings.map((warning, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-red-800 p-3 bg-white/50 rounded-lg"
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      {/* 12. 법적 고지 */}
      <Card className="bg-gray-50 border-gray-200 print:break-before-page">
        <div className="flex gap-3">
          <svg
            className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-sm text-gray-700 space-y-2">
            <p className="font-medium">법적 고지</p>
            <p>
              본 시뮬레이터의 결과는 입력하신 정보를 바탕으로 한 참고용
              정보이며, 실제 법적 결과나 법률 자문을 대체할 수 없습니다.
              국제이혼은 매우 복잡한 절차이므로 반드시 국제가족법 전문 변호사와
              상담하시기 바랍니다.
            </p>
          </div>
        </div>
      </Card>

      {/* 13. CTA 버튼 */}
      <Card className="print:hidden">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 text-center">
            다음 단계
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/consultation" className="block">
              <Button className="w-full">국제가족법 전문 변호사 상담</Button>
            </Link>
            <Link href="/diagnosis" className="block">
              <Button variant="secondary" className="w-full">
                이혼 유형 진단
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* 14. 재계산 버튼 */}
      <div className="text-center print:hidden">
        <Button variant="ghost" onClick={onReset} className="text-gray-500">
          다시 시뮬레이션하기
        </Button>
      </div>
    </div>
  );
}
