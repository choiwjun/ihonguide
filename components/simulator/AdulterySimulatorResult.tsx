'use client';

/**
 * 상간녀 소송 시뮬레이터 결과 표시 컴포넌트
 * Adultery Lawsuit Simulator Result Display Component
 * @TASK Adultery Simulator Result Component
 * @SPEC Light Transparency Design System
 */

import Link from 'next/link';
import { Card, Button, ProgressBar } from '@/components/ui';
import type { AdulterySimulatorResult } from '@/types/adulterySimulator';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

interface AdulterySimulatorResultProps {
  result: AdulterySimulatorResult;
  onReset: () => void;
}

/**
 * 추천 수준별 색상 매핑
 */
const recommendationColors = {
  proceed: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  consider: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
  },
  not_recommended: {
    bg: 'bg-orange-50',
    text: 'text-orange-800',
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-700',
  },
  not_feasible: {
    bg: 'bg-red-50',
    text: 'text-red-800',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700',
  },
};

/**
 * 신뢰도별 색상 매핑
 */
const reliabilityColors = {
  strong: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  moderate: 'bg-amber-100 text-amber-700 border-amber-200',
  weak: 'bg-red-100 text-red-700 border-red-200',
};

/**
 * 리스크 수준별 색상 매핑
 */
const riskColors = {
  low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  high: 'bg-red-100 text-red-700 border-red-200',
};

/**
 * 추천 수준 한글 레이블
 */
const recommendationLabels = {
  proceed: '소송 추천',
  consider: '소송 가능 (보강 필요)',
  not_recommended: '소송 보류 권장',
  not_feasible: '소송 어려움',
};

/**
 * 신뢰도 한글 레이블
 */
const reliabilityLabels = {
  strong: '강력',
  moderate: '보통',
  weak: '약함',
};

/**
 * 리스크 수준 한글 레이블
 */
const riskLabels = {
  low: '낮음',
  medium: '보통',
  high: '높음',
};

export function AdulterySimulatorResult({ result, onReset }: AdulterySimulatorResultProps) {
  const recommendationColor = recommendationColors[result.feasibility.recommendation];
  const reliabilityColor = reliabilityColors[result.evidenceAssessment.overallReliability];
  const riskColor = riskColors[result.risks.level];

  return (
    <div className="space-y-6 print:space-y-4">
      {/* 1. 소송 가능성 평가 */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">소송 가능성 평가</h2>

          {/* 점수 게이지 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">가능성 점수</span>
              <span className="text-2xl font-bold text-brand-primary">
                {result.feasibility.score}점
              </span>
            </div>
            <ProgressBar value={result.feasibility.score} className="h-3" />
            <p className="text-xs text-gray-500 text-right">100점 만점</p>
          </div>

          {/* 추천 수준 */}
          <div className={cn(
            'p-4 rounded-lg border',
            recommendationColor.bg,
            recommendationColor.border
          )}>
            <div className="flex items-center gap-2">
              <span className={cn(
                'px-3 py-1 rounded-full text-sm font-semibold',
                recommendationColor.badge
              )}>
                {recommendationLabels[result.feasibility.recommendation]}
              </span>
            </div>
          </div>

          {/* 유리한 점 */}
          {result.feasibility.strengths.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                유리한 점
              </h3>
              <ul className="space-y-1.5">
                {result.feasibility.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 불리한 점 */}
          {result.feasibility.weaknesses.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                불리한 점
              </h3>
              <ul className="space-y-1.5">
                {result.feasibility.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>

      {/* 2. 성립 요건 충족도 */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">성립 요건 충족도</h2>

          {/* 전체 충족 여부 */}
          <div className={cn(
            'p-4 rounded-lg border text-center',
            result.requirements.overallMet
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-red-50 border-red-200'
          )}>
            <div className="flex items-center justify-center gap-2">
              {result.requirements.overallMet ? (
                <>
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-emerald-800">모든 성립 요건 충족</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-red-800">일부 요건 미충족</span>
                </>
              )}
            </div>
          </div>

          {/* 개별 요건 체크리스트 */}
          <div className="grid gap-3 sm:grid-cols-2">
            <RequirementItem
              label="혼인 관계 존재"
              met={result.requirements.maritalBondExists}
            />
            <RequirementItem
              label="고의성"
              met={result.requirements.intentionalAct}
            />
            <RequirementItem
              label="혼인 인식"
              met={result.requirements.knowledgeOfMarriage}
            />
            <RequirementItem
              label="인과관계"
              met={result.requirements.causalRelation}
            />
          </div>
        </div>
      </Card>

      {/* 3. 증거 평가 */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">증거 평가</h2>

          {/* 종합 신뢰도 */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">종합 신뢰도</span>
            <span className={cn(
              'px-3 py-1 rounded-full text-sm font-semibold border',
              reliabilityColor
            )}>
              {reliabilityLabels[result.evidenceAssessment.overallReliability]}
            </span>
          </div>

          {/* 법적 문제점 */}
          {result.evidenceAssessment.legalIssues.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                증거 법적 문제점
              </h3>
              <ul className="space-y-1.5">
                {result.evidenceAssessment.legalIssues.map((issue, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 추가 필요 증거 */}
          {result.evidenceAssessment.additionalEvidenceNeeded.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                추가로 필요한 증거
              </h3>
              <ul className="space-y-1.5">
                {result.evidenceAssessment.additionalEvidenceNeeded.map((evidence, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>{evidence}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>

      {/* 4. 위자료 예상 */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">위자료 예상</h2>

          {/* 금액 범위 */}
          <div className="space-y-3">
            <div className="text-center p-6 bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">예상 평균 위자료</p>
              <div className="text-3xl font-bold text-brand-primary">
                {formatCurrency(result.compensation.averageAmount)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">최소 금액</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(result.compensation.estimatedMin)}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">최대 금액</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(result.compensation.estimatedMax)}
                </p>
              </div>
            </div>
          </div>

          {/* 산정 근거 */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">산정 근거</h3>
            <ul className="space-y-1.5">
              {result.compensation.factors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* 5. 소송 진행 정보 */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">소송 진행 정보</h2>

          {/* 예상 기간 및 비용 */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-600 font-medium mb-1">예상 소요 기간</p>
              <p className="text-lg font-semibold text-blue-900">
                {result.procedure.estimatedDuration}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-xs text-purple-600 font-medium mb-1">예상 소송 비용</p>
              <p className="text-lg font-semibold text-purple-900">
                {formatCurrency(result.procedure.estimatedCost.min)} ~ {formatCurrency(result.procedure.estimatedCost.max)}
              </p>
            </div>
          </div>

          {/* 진행 단계 */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">진행 단계</h3>
            <ol className="space-y-3">
              {result.procedure.steps.map((step) => (
                <li key={step.order} className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {step.order}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-medium text-gray-900 mb-1">{step.title}</p>
                    <p className="text-sm text-gray-600">{step.description}</p>
                    <p className="text-xs text-gray-500 mt-1">예상 소요: {step.estimatedDuration}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Card>

      {/* 6. 리스크 평가 */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">리스크 평가</h2>

          {/* 리스크 수준 */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">리스크 수준</span>
            <span className={cn(
              'px-3 py-1 rounded-full text-sm font-semibold border',
              riskColor
            )}>
              {riskLabels[result.risks.level]}
            </span>
          </div>

          {/* 리스크 항목 */}
          {result.risks.items.length > 0 && (
            <ul className="space-y-2">
              {result.risks.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>

      {/* 7. 경고사항 */}
      {result.warnings.length > 0 && (
        <Card className="bg-red-50 border-red-200">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-red-900 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              경고사항
            </h2>
            <ul className="space-y-2">
              {result.warnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-red-800">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      {/* 8. 권고사항 */}
      {result.recommendations.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              권고사항
            </h2>
            <ul className="space-y-2">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      {/* 9. 법적 고지 */}
      <Card className="bg-gray-50 border-gray-200 print:break-before-page">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-gray-700 space-y-2">
            <p className="font-medium">법적 고지</p>
            <p>
              본 시뮬레이터의 결과는 입력하신 정보를 바탕으로 한 참고용 정보이며,
              실제 소송 결과나 법적 자문을 대체할 수 없습니다.
              구체적인 법률 상담은 전문 변호사와 상담하시기 바랍니다.
            </p>
          </div>
        </div>
      </Card>

      {/* 10. CTA 버튼 */}
      <Card className="print:hidden">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 text-center">
            다음 단계
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/consultation" className="block">
              <Button className="w-full">전문 변호사 상담</Button>
            </Link>
            <Link href="/diagnosis" className="block">
              <Button variant="secondary" className="w-full">
                이혼 유형 진단
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* 11. 재계산 버튼 */}
      <div className="text-center print:hidden">
        <Button variant="ghost" onClick={onReset} className="text-gray-500">
          다시 시뮬레이션하기
        </Button>
      </div>
    </div>
  );
}

/**
 * 개별 요건 아이템 컴포넌트
 */
interface RequirementItemProps {
  label: string;
  met: boolean;
}

function RequirementItem({ label, met }: RequirementItemProps) {
  return (
    <div className={cn(
      'flex items-center gap-2 p-3 rounded-lg border',
      met
        ? 'bg-emerald-50 border-emerald-200'
        : 'bg-red-50 border-red-200'
    )}>
      {met ? (
        <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
      <span className={cn(
        'text-sm font-medium',
        met ? 'text-emerald-800' : 'text-red-800'
      )}>
        {label}
      </span>
    </div>
  );
}
