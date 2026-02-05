/**
 * AdulterySimulatorResult 컴포넌트 테스트
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AdulterySimulatorResult } from './AdulterySimulatorResult';
import type { AdulterySimulatorResult as ResultType } from '@/types/adulterySimulator';

describe('AdulterySimulatorResult', () => {
  const mockResult: ResultType = {
    feasibility: {
      score: 75,
      recommendation: 'proceed',
      strengths: ['명확한 증거', '지속적인 관계'],
      weaknesses: ['증거 보강 필요'],
    },
    requirements: {
      maritalBondExists: true,
      intentionalAct: true,
      knowledgeOfMarriage: true,
      causalRelation: true,
      overallMet: true,
    },
    evidenceAssessment: {
      overallReliability: 'strong',
      legalIssues: [],
      additionalEvidenceNeeded: ['추가 메시지 기록'],
    },
    compensation: {
      estimatedMin: 10000000,
      estimatedMax: 30000000,
      averageAmount: 20000000,
      factors: ['혼인 기간', '자녀 유무', '정신적 피해'],
    },
    procedure: {
      estimatedDuration: '6-12개월',
      estimatedCost: { min: 3000000, max: 5000000 },
      steps: [
        {
          order: 1,
          title: '증거 수집',
          description: '필요한 증거 수집',
          estimatedDuration: '1-2개월',
        },
      ],
    },
    risks: {
      level: 'medium',
      items: ['반소 위험', '평판 훼손'],
    },
    warnings: ['증거 획득 방법 주의'],
    recommendations: ['전문가 상담 권장'],
  };

  const mockOnReset = vi.fn();

  it('결과를 렌더링한다', () => {
    render(<AdulterySimulatorResult result={mockResult} onReset={mockOnReset} />);

    expect(screen.getByText('소송 가능성 평가')).toBeInTheDocument();
    expect(screen.getByText('75점')).toBeInTheDocument();
  });

  it('성립 요건 충족도를 표시한다', () => {
    render(<AdulterySimulatorResult result={mockResult} onReset={mockOnReset} />);

    expect(screen.getByText('성립 요건 충족도')).toBeInTheDocument();
    expect(screen.getByText('모든 성립 요건 충족')).toBeInTheDocument();
  });

  it('위자료 예상 금액을 표시한다', () => {
    render(<AdulterySimulatorResult result={mockResult} onReset={mockOnReset} />);

    expect(screen.getByText('위자료 예상')).toBeInTheDocument();
    expect(screen.getByText(/20,000,000원/)).toBeInTheDocument();
  });

  it('리스크 수준을 표시한다', () => {
    render(<AdulterySimulatorResult result={mockResult} onReset={mockOnReset} />);

    expect(screen.getByText('리스크 평가')).toBeInTheDocument();
    expect(screen.getByText('보통')).toBeInTheDocument();
  });

  it('경고사항을 표시한다', () => {
    render(<AdulterySimulatorResult result={mockResult} onReset={mockOnReset} />);

    expect(screen.getByText('경고사항')).toBeInTheDocument();
    expect(screen.getByText('증거 획득 방법 주의')).toBeInTheDocument();
  });

  it('권고사항을 표시한다', () => {
    render(<AdulterySimulatorResult result={mockResult} onReset={mockOnReset} />);

    expect(screen.getByText('권고사항')).toBeInTheDocument();
    expect(screen.getByText('전문가 상담 권장')).toBeInTheDocument();
  });

  it('재계산 버튼을 렌더링한다', () => {
    render(<AdulterySimulatorResult result={mockResult} onReset={mockOnReset} />);

    const resetButton = screen.getByText('다시 시뮬레이션하기');
    expect(resetButton).toBeInTheDocument();
  });

  it('요건이 미충족일 때 올바르게 표시한다', () => {
    const incompleteResult = {
      ...mockResult,
      requirements: {
        ...mockResult.requirements,
        knowledgeOfMarriage: false,
        overallMet: false,
      },
    };

    render(<AdulterySimulatorResult result={incompleteResult} onReset={mockOnReset} />);

    expect(screen.getByText('일부 요건 미충족')).toBeInTheDocument();
  });

  it('추천 수준에 따라 다른 스타일을 적용한다', () => {
    const notFeasibleResult = {
      ...mockResult,
      feasibility: {
        ...mockResult.feasibility,
        recommendation: 'not_feasible' as const,
        score: 30,
      },
    };

    render(<AdulterySimulatorResult result={notFeasibleResult} onReset={mockOnReset} />);

    expect(screen.getByText('소송 어려움')).toBeInTheDocument();
  });
});
