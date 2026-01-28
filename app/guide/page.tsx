/**
 * 사용법 가이드 페이지
 */

import Link from 'next/link';
import { Container } from '@/components/layout';
import { Card, Button } from '@/components/ui';

const steps = [
  {
    number: '01',
    title: '이혼 유형 진단하기',
    description: '10개의 간단한 질문에 답변하여 나에게 맞는 이혼 유형(협의/조정/소송)을 확인하세요.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    link: '/diagnosis',
    linkText: '진단 시작하기',
  },
  {
    number: '02',
    title: '양육비 계산하기',
    description: '서울가정법원 산정 기준표를 바탕으로 예상 양육비를 계산해보세요.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    link: '/calculator',
    linkText: '계산기 사용하기',
  },
  {
    number: '03',
    title: '전문가 상담 신청',
    description: '진단 결과를 바탕으로 이혼 전문 변호사에게 상담을 신청하세요.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    link: '/consultation',
    linkText: '상담 신청하기',
  },
];

const faqs = [
  {
    question: '진단 결과는 어떻게 활용하나요?',
    answer: '진단 결과는 협의이혼, 조정이혼, 소송이혼 중 어떤 방식이 적합한지 참고용으로 제공됩니다. 실제 이혼 절차는 전문 변호사와 상담 후 결정하시는 것을 권장합니다.',
  },
  {
    question: '양육비 계산 결과는 정확한가요?',
    answer: '양육비 계산기는 서울가정법원의 양육비 산정 기준표를 바탕으로 합니다. 실제 양육비는 개별 상황에 따라 달라질 수 있으므로 참고용으로 활용해주세요.',
  },
  {
    question: '개인정보는 안전하게 보호되나요?',
    answer: '입력하신 모든 정보는 암호화되어 안전하게 처리됩니다. 상담 신청 시 입력한 정보만 담당 변호사에게 전달되며, 그 외 정보는 분석 후 즉시 삭제됩니다.',
  },
  {
    question: '서비스 이용 비용이 있나요?',
    answer: '이혼 유형 진단과 양육비 계산기는 완전 무료로 제공됩니다. 전문가 상담은 초기 상담 무료이며, 이후 비용은 변호사와 별도 협의하시면 됩니다.',
  },
];

export default function GuidePage() {
  return (
    <div className="bg-[#F9F8F6] min-h-screen">
      <Container size="lg" className="py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            이혼준비 <span className="text-[#0f766e]">사용 가이드</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            복잡한 이혼 준비 과정, 3단계로 간단하게 시작하세요.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden">
              {/* Step Number */}
              <div className="absolute top-4 right-4 text-6xl font-black text-slate-100">
                {step.number}
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-[#0f766e]/10 flex items-center justify-center text-[#0f766e] mb-4">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-500 mb-6">
                  {step.description}
                </p>

                {/* Link */}
                <Link href={step.link}>
                  <Button variant="secondary" size="sm" className="group">
                    {step.linkText}
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Video Section */}
        <div className="mb-20">
          <Card className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  처음이신가요?
                </h2>
                <p className="text-slate-500 mb-6">
                  이혼 준비가 처음이시라면 걱정하지 마세요.
                  저희 서비스는 복잡한 법률 용어 없이 누구나 쉽게 이해할 수 있도록 설계되었습니다.
                  질문에 답변하기만 하면 AI가 자동으로 분석하여 결과를 알려드립니다.
                </p>
                <Link href="/diagnosis">
                  <Button size="lg" className="group">
                    무료 진단 시작하기
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </Link>
              </div>
              <div className="flex-1 w-full">
                <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#0f766e]/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-[#0f766e]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-slate-400 text-sm">서비스 소개 영상 준비 중</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">
            자주 묻는 질문
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} padding="lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-start gap-3">
                  <span className="text-[#0f766e]">Q.</span>
                  {faq.question}
                </h3>
                <p className="text-slate-500 pl-7">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-4">
            더 궁금한 점이 있으신가요?
          </p>
          <Link href="/consultation">
            <Button variant="secondary">
              문의하기
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
