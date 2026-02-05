/**
 * 국제이혼 시뮬레이터 결과 컴포넌트 테스트
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InternationalDivorceResult } from './InternationalDivorceResult';
import type { InternationalDivorceResult as ResultType } from '@/types/internationalDivorceSimulator';

// 모의 결과 데이터
const mockResult: ResultType = {
  jurisdiction: {
    possibleCountries: [
      {
        country: 'KR',
        countryName: '대한민국',
        basis: ['청구인 국적', '혼인 신고지'],
        priority: 'primary',
        advantageous: true,
      },
      {
        country: 'US',
        countryName: '미국',
        basis: ['피청구인 거주지'],
        priority: 'secondary',
        advantageous: false,
      },
    ],
    recommended: 'KR',
    reasoning: ['청구인 국적 보유', '한국 법원에서 소송 비용 절감'],
  },
  applicableLaw: {
    country: 'KR',
    lawName: '대한민국 민법',
    keyFeatures: ['유책주의', '재산분할 인정'],
    implications: ['이혼 사유 입증 필요', '재산분할 청구 가능'],
  },
  complexity: {
    level: 'moderate',
    factors: ['다국적 재산', '자녀 양육권 분쟁'],
  },
  estimates: {
    duration: {
      min: 6,
      max: 18,
      average: 12,
    },
    costs: {
      legal: { min: 5000, max: 15000 },
      translation: { min: 1000, max: 3000 },
      travel: { min: 2000, max: 5000 },
      other: { min: 500, max: 2000 },
      total: { min: 8500, max: 25000 },
    },
  },
  requiredDocuments: [
    {
      category: '신분 관계 서류',
      documents: ['여권', '주민등록등본', '가족관계증명서'],
      apostilleRequired: true,
      translationRequired: true,
    },
  ],
  enforcement: {
    serviceDifficulty: 'moderate',
    enforcementPossible: true,
    treaties: ['뉴욕협약'],
  },
  childCustody: {
    applicableConvention: '헤이그 아동탈취협약',
    complexityLevel: 'medium',
    warnings: ['국제적 부모 쟁탈 위험'],
  },
  risks: {
    level: 'medium',
    items: [
      {
        type: 'custody',
        severity: 'high',
        description: '자녀를 상대국으로 데려갈 위험',
        mitigation: '여권 압류 신청',
      },
      {
        type: 'asset',
        severity: 'medium',
        description: '해외 재산 은닉 가능성',
        mitigation: '재산명시 명령',
      },
    ],
  },
  procedure: {
    steps: [
      {
        order: 1,
        title: '관할 확정',
        description: '관할권 확인 및 법원 선택',
        estimatedDuration: '1개월',
      },
      {
        order: 2,
        title: '소송 제기',
        description: '이혼 소장 작성 및 제출',
        estimatedDuration: '1개월',
      },
    ],
  },
  recommendations: ['국제가족법 전문 변호사 조기 상담', '증거 자료 사전 준비'],
  warnings: ['송달 지연 가능성', '언어 장벽으로 인한 의사소통 문제'],
};

describe('InternationalDivorceResult', () => {
  it('결과를 렌더링한다', () => {
    const onReset = vi.fn();
    render(<InternationalDivorceResult result={mockResult} onReset={onReset} />);

    // 주요 섹션 제목 확인
    expect(screen.getByText('관할 판단')).toBeInTheDocument();
    expect(screen.getByText('준거법')).toBeInTheDocument();
    expect(screen.getByText('복잡도 분석')).toBeInTheDocument();
    expect(screen.getByText('예상 소요 시간 및 비용')).toBeInTheDocument();
    expect(screen.getByText('필수 서류')).toBeInTheDocument();
    expect(screen.getByText('송달 및 집행')).toBeInTheDocument();
    expect(screen.getByText('자녀 양육권')).toBeInTheDocument();
    expect(screen.getByText('리스크 평가')).toBeInTheDocument();
    expect(screen.getByText('절차 단계')).toBeInTheDocument();
  });

  it('추천 국가를 표시한다', () => {
    const onReset = vi.fn();
    render(<InternationalDivorceResult result={mockResult} onReset={onReset} />);

    // 여러 위치에 나타날 수 있으므로 getAllByText 사용
    const koreaElements = screen.getAllByText('대한민국');
    expect(koreaElements.length).toBeGreaterThan(0);
  });

  it('관할 가능 국가 목록을 표시한다', () => {
    const onReset = vi.fn();
    render(<InternationalDivorceResult result={mockResult} onReset={onReset} />);

    // 국가명 확인 (여러 번 나타날 수 있음)
    const koreaElements = screen.getAllByText('대한민국');
    expect(koreaElements.length).toBeGreaterThan(0);

    const usaElements = screen.getAllByText('미국');
    expect(usaElements.length).toBeGreaterThan(0);
  });

  it('예상 비용을 USD로 표시한다', () => {
    const onReset = vi.fn();
    render(<InternationalDivorceResult result={mockResult} onReset={onReset} />);

    // USD 형식 확인 ($ 기호 포함)
    expect(screen.getByText(/\$8,500/)).toBeInTheDocument();
    expect(screen.getByText(/\$25,000/)).toBeInTheDocument();
  });

  it('복잡도 수준을 표시한다', () => {
    const onReset = vi.fn();
    render(<InternationalDivorceResult result={mockResult} onReset={onReset} />);

    // 복잡도 레이블은 여러 곳에 나타날 수 있음
    const moderateElements = screen.getAllByText('보통');
    expect(moderateElements.length).toBeGreaterThan(0);
  });

  it('자녀 양육권 정보를 표시한다', () => {
    const onReset = vi.fn();
    render(<InternationalDivorceResult result={mockResult} onReset={onReset} />);

    expect(screen.getByText('헤이그 아동탈취협약')).toBeInTheDocument();
  });

  it('리스크를 타입별로 그룹화한다', () => {
    const onReset = vi.fn();
    render(<InternationalDivorceResult result={mockResult} onReset={onReset} />);

    expect(screen.getByText('양육권 리스크')).toBeInTheDocument();
    expect(screen.getByText('재산 리스크')).toBeInTheDocument();
  });

  it('절차 단계를 순서대로 표시한다', () => {
    const onReset = vi.fn();
    render(<InternationalDivorceResult result={mockResult} onReset={onReset} />);

    expect(screen.getByText('관할 확정')).toBeInTheDocument();
    expect(screen.getByText('소송 제기')).toBeInTheDocument();
  });

  it('권고사항을 표시한다', () => {
    const onReset = vi.fn();
    render(<InternationalDivorceResult result={mockResult} onReset={onReset} />);

    // 권고사항 섹션 확인
    expect(screen.getByText('권고사항')).toBeInTheDocument();
    // 실제 권고사항 내용도 있는지 확인
    const lawyerElements = screen.getAllByText(/국제가족법 전문 변호사/);
    expect(lawyerElements.length).toBeGreaterThan(0);
  });

  it('경고사항을 표시한다', () => {
    const onReset = vi.fn();
    render(<InternationalDivorceResult result={mockResult} onReset={onReset} />);

    expect(screen.getByText(/송달 지연 가능성/)).toBeInTheDocument();
  });

  it('자녀가 없는 경우 자녀 양육권 섹션을 숨긴다', () => {
    const resultWithoutChildren = {
      ...mockResult,
      childCustody: undefined,
    };
    const onReset = vi.fn();
    render(
      <InternationalDivorceResult
        result={resultWithoutChildren}
        onReset={onReset}
      />
    );

    expect(screen.queryByText('자녀 양육권')).not.toBeInTheDocument();
  });

  it('재계산 버튼 클릭 시 onReset을 호출한다', () => {
    const onReset = vi.fn();
    render(<InternationalDivorceResult result={mockResult} onReset={onReset} />);

    const resetButton = screen.getByText('다시 시뮬레이션하기');
    resetButton.click();

    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
