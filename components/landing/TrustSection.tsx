'use client';

/**
 * 신뢰 섹션 컴포넌트
 * 서비스 신뢰도를 높이기 위한 통계 및 인증 배지
 */

import { Card } from '@/components/ui';

interface TrustStat {
  value: string;
  label: string;
  description: string;
}

const trustStats: TrustStat[] = [
  {
    value: '10,000+',
    label: '누적 상담',
    description: '성공적인 상담 케이스',
  },
  {
    value: '98%',
    label: '만족도',
    description: '고객 만족도 평가',
  },
  {
    value: '50+',
    label: '전문가',
    description: '이혼 전문 변호사/상담사',
  },
  {
    value: '24시간',
    label: '응답',
    description: '평균 상담 응답 시간',
  },
];

const certifications = [
  '대한변호사협회 등록',
  '개인정보보호 인증',
  '법률서비스 품질인증',
];

export function TrustSection() {
  return (
    <section className="py-16 sm:py-24 bg-white" aria-labelledby="trust-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <h2 id="trust-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
              믿을 수 있는 서비스
            </h2>
            <p className="mt-4 text-gray-600">
              많은 분들이 이혼가이드와 함께 새로운 시작을 준비했습니다
            </p>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {trustStats.map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <div className="text-2xl sm:text-3xl font-bold text-brand-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500">
                  {stat.description}
                </div>
              </Card>
            ))}
          </div>

          {/* 인증 배지 */}
          <ul className="flex flex-wrap justify-center gap-4" aria-label="인증 목록">
            {certifications.map((cert, index) => (
              <li
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600"
              >
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
