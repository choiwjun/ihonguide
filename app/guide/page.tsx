/**
 * 이혼 가이드 페이지
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { Card } from '@/components/ui';
import { AnswerBlock, DefinitionCard, HowToSteps } from '@/components/seo';
import { generateMetadata } from '@/lib/metadata';
import { FAQ_ITEMS, HOWTO_DIVORCE_PREPARATION, DEFINITIONS } from '@/lib/aeo-data';
import {
  MAIN_HUB_KEYWORDS,
  LONG_TAIL_KEYWORDS,
  DIVORCE_TYPE_KEYWORDS,
  CUSTODY_KEYWORDS,
  ASSET_COST_KEYWORDS,
} from '@/lib/seo-keywords';

export const metadata: Metadata = generateMetadata({
  title: '이혼 가이드 - 절차, 준비, 비용 완벽 정리',
  description: '이혼 절차부터 준비 방법, 비용, 서류까지 모든 것을 한 곳에서 확인하세요. 협의이혼, 재판이혼, 양육권, 재산분할 등 이혼 준비에 필요한 모든 정보를 제공합니다.',
  keywords: [
    ...MAIN_HUB_KEYWORDS,
    ...LONG_TAIL_KEYWORDS,
    ...DIVORCE_TYPE_KEYWORDS,
    ...CUSTODY_KEYWORDS,
    ...ASSET_COST_KEYWORDS,
  ],
});

const GUIDE_SECTIONS = [
  /* 이혼 준비 시작하기 영역 - 주석 처리
  {
    title: '이혼 준비 시작하기',
    icon: '📋',
    items: [
      { title: '이혼 준비 체크리스트', href: '/blog/divorce-checklist' },
      { title: '이혼 준비 순서와 단계', href: '/blog/divorce-steps' },
      { title: '이혼 준비 기간과 비용', href: '/blog/divorce-cost' },
      { title: '이혼 준비 시 주의사항', href: '/blog/divorce-caution' },
    ],
  },
  */
  {
    title: '이혼 유형별 절차',
    icon: '⚖️',
    items: [
      { title: '협의이혼 절차와 준비', href: '/blog/agreed-divorce' },
      { title: '조정이혼 절차', href: '/blog/mediation-divorce' },
      { title: '재판이혼 소송 절차', href: '/blog/lawsuit-divorce' },
      { title: '이혼 유형 진단하기', href: '/diagnosis' },
    ],
  },
  {
    title: '양육권과 양육비',
    icon: '👶',
    items: [
      { title: '양육권 기준과 결정 방법', href: '/blog/custody-guide' },
      { title: '친권과 양육권 차이', href: '/blog/custody-vs-parental' },
      { title: '양육비 계산 방법', href: '/blog/child-support-guide' },
      { title: '양육비 계산기 사용하기', href: '/calculator' },
    ],
  },
  {
    title: '재산분할과 위자료',
    icon: '💰',
    items: [
      { title: '재산분할 기준과 방법', href: '/blog/property-division' },
      { title: '위자료 산정 기준', href: '/blog/alimony-guide' },
      { title: '이혼 시 재산분할 계산', href: '/blog/property-calculation' },
      { title: '이혼 비용 총정리', href: '/blog/divorce-total-cost' },
    ],
  },
  {
    title: '상황별 이혼 준비',
    icon: '👥',
    items: [
      { title: '주부의 이혼 준비', href: '/blog/housewife-divorce' },
      { title: '자녀가 있는 경우 이혼', href: '/blog/divorce-with-children' },
      { title: '이혼 고민 상담', href: '/consultation' },
      { title: '이혼 전 체크사항', href: '/blog/pre-divorce-check' },
    ],
  },
  {
    title: '법률 상담 및 지원',
    icon: '📞',
    items: [
      { title: '무료 이혼 상담 신청', href: '/consultation' },
      { title: '이혼 변호사 선택 방법', href: '/blog/lawyer-guide' },
      { title: '법률 구조 신청 방법', href: '/blog/legal-aid' },
      { title: '온라인 이혼 상담', href: '/consultation' },
    ],
  },
];

export default function GuidePage() {
  return (
    <Container size="lg" className="py-12">
      {/* 헤더 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          이혼 준비 완벽 가이드
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          이혼 절차부터 준비 방법, 비용, 서류까지 모든 것을 한 곳에서 확인하세요.
          <br />
          전문가가 감수한 정확한 정보로 현명한 이혼을 준비할 수 있습니다.
        </p>
      </div>

      {/* 주요 서비스 CTA */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <Link href="/diagnosis">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              이혼 유형 진단
            </h3>
            <p className="text-sm text-gray-600">
              10문항으로 나에게 맞는 이혼 유형을 알아보세요
            </p>
          </Card>
        </Link>

        <Link href="/calculator">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
            <div className="text-4xl mb-3">🧮</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              양육비 계산기
            </h3>
            <p className="text-sm text-gray-600">
              법원 기준으로 정확한 양육비를 계산해보세요
            </p>
          </Card>
        </Link>

        <Link href="/consultation">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              무료 상담 신청
            </h3>
            <p className="text-sm text-gray-600">
              전문 변호사와 무료로 상담받아보세요
            </p>
          </Card>
        </Link>
      </div>

      {/* AEO: 이혼 준비 절차 (HowTo) */}
      <section className="mb-16" aria-labelledby="howto-heading">
        <h2 id="howto-heading" className="text-2xl font-bold text-gray-900 mb-6">
          이혼 준비 절차
        </h2>
        <HowToSteps
          name={HOWTO_DIVORCE_PREPARATION.name}
          description={HOWTO_DIVORCE_PREPARATION.description}
          step={HOWTO_DIVORCE_PREPARATION.step}
        />
      </section>

      {/* AEO: 자주 묻는 질문 (FAQ) - 질문형 H2로 답변 노출 */}
      <section className="mb-16" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">
          자주 묻는 질문
        </h2>
        <div className="space-y-0 divide-y divide-stone-200/60 rounded-lg border border-stone-200/60 bg-white/40 p-6">
          {FAQ_ITEMS.map((item) => (
            <AnswerBlock
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </section>

      {/* AEO: 용어 정의 */}
      <section className="mb-16" aria-labelledby="definitions-heading">
        <h2 id="definitions-heading" className="text-2xl font-bold text-gray-900 mb-6">
          이혼 관련 용어
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {DEFINITIONS.map((item) => (
            <DefinitionCard
              key={item.term}
              term={item.term}
              definition={item.definition}
            />
          ))}
        </div>
      </section>

      {/* 가이드 섹션들 */}
      <div className="space-y-12">
        {GUIDE_SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-3xl">{section.icon}</span>
              {section.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {section.items.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Card className="p-4 hover:shadow-md transition-all hover:border-teal-200 cursor-pointer">
                    <h3 className="font-medium text-gray-900 hover:text-teal-700 transition-colors">
                      {item.title}
                    </h3>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 하단 CTA */}
      <div className="mt-16 text-center">
        <Card className="p-8 bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            이혼 준비, 혼자 고민하지 마세요
          </h2>
          <p className="text-gray-600 mb-6">
            전문 변호사와 무료 상담으로 현명한 이혼을 준비하세요
          </p>
          <Link
            href="/consultation"
            className="inline-block px-8 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            무료 상담 신청하기
          </Link>
        </Card>
      </div>
    </Container>
  );
}
