/**
 * 이용약관 페이지
 */

import { Metadata } from 'next';
import { Container } from '@/components/layout';
import { Card } from '@/components/ui';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: '이용약관',
  description: '아이혼가이드 서비스 이용약관입니다.',
  noIndex: false,
});

export default function TermsPage() {
  return (
    <Container size="md" className="py-8">
      <Card className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">이용약관</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-sm text-gray-500 mb-8">최종 수정일: 2026년 1월 27일</p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">제1조 (목적)</h2>
            <p className="text-gray-700 leading-relaxed">
              본 약관은 아이혼가이드(이하 &quot;회사&quot;)가 제공하는 이혼 준비 정보 서비스(이하 &quot;서비스&quot;)의
              이용조건 및 절차, 회사와 이용자의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">제2조 (정의)</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>&quot;서비스&quot;란 회사가 제공하는 이혼 진단, 양육비 계산기, 법률 정보 콘텐츠 및 상담 연결 서비스를 말합니다.</li>
              <li>&quot;이용자&quot;란 본 약관에 동의하고 서비스를 이용하는 자를 말합니다.</li>
              <li>&quot;회원&quot;이란 서비스에 가입하여 아이디를 부여받은 이용자를 말합니다.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">제3조 (약관의 효력 및 변경)</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.</li>
              <li>회사는 필요하다고 인정되는 경우 본 약관을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지함으로써 효력이 발생합니다.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">제4조 (서비스의 제공)</h2>
            <p className="text-gray-700 leading-relaxed mb-3">회사는 다음과 같은 서비스를 제공합니다:</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>이혼 유형 진단 서비스</li>
              <li>양육비 계산기 서비스</li>
              <li>법률 정보 콘텐츠 제공</li>
              <li>법률 상담 연결 서비스</li>
              <li>기타 회사가 정하는 서비스</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">제5조 (서비스 이용의 제한)</h2>
            <p className="text-gray-700 leading-relaxed">
              본 서비스에서 제공하는 정보는 참고용이며, 법률적 효력을 가지지 않습니다.
              실제 법률 문제에 대해서는 반드시 전문 법률가의 상담을 받으시기 바랍니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">제6조 (면책조항)</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>회사는 서비스를 통해 제공되는 정보의 정확성, 완전성, 적시성을 보장하지 않습니다.</li>
              <li>서비스 이용 결과에 대한 모든 책임은 이용자 본인에게 있습니다.</li>
              <li>회사는 이용자 상호간 또는 이용자와 제3자 간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없습니다.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">제7조 (분쟁 해결)</h2>
            <p className="text-gray-700 leading-relaxed">
              본 약관과 관련하여 분쟁이 발생한 경우, 회사와 이용자는 분쟁 해결을 위해 성실히 협의합니다.
              협의가 이루어지지 않을 경우 관할 법원에 소를 제기할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">부칙</h2>
            <p className="text-gray-700">본 약관은 2026년 1월 27일부터 시행합니다.</p>
          </section>
        </div>
      </Card>
    </Container>
  );
}
