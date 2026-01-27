/**
 * 개인정보처리방침 페이지
 */

import { Metadata } from 'next';
import { Container } from '@/components/layout';
import { Card } from '@/components/ui';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: '개인정보처리방침',
  description: '아이혼가이드 개인정보처리방침입니다.',
  noIndex: false,
});

export default function PrivacyPage() {
  return (
    <Container size="md" className="py-8">
      <Card className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">개인정보처리방침</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-sm text-gray-500 mb-8">최종 수정일: 2026년 1월 27일</p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. 개인정보의 수집 및 이용 목적</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              아이혼가이드(이하 &quot;회사&quot;)는 다음의 목적을 위해 개인정보를 수집합니다:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>상담 신청 접수 및 처리</li>
              <li>서비스 이용 기록 분석 및 개선</li>
              <li>법률 정보 및 서비스 안내</li>
              <li>회원 식별 및 인증</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. 수집하는 개인정보 항목</h2>
            <p className="text-gray-700 leading-relaxed mb-3">회사는 다음의 개인정보를 수집합니다:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>필수항목:</strong> 이름, 연락처(휴대전화번호)</li>
              <li><strong>선택항목:</strong> 이메일 주소</li>
              <li><strong>자동수집항목:</strong> IP 주소, 쿠키, 방문 기록, 서비스 이용 기록</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. 개인정보의 보유 및 이용 기간</h2>
            <p className="text-gray-700 leading-relaxed">
              수집된 개인정보는 수집 목적이 달성된 후 지체 없이 파기합니다.
              단, 관련 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관합니다.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
              <li>상담 신청 기록: 3년 (전자상거래법)</li>
              <li>서비스 이용 기록: 3개월 (통신비밀보호법)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. 개인정보의 제3자 제공</h2>
            <p className="text-gray-700 leading-relaxed">
              회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
              다만, 다음의 경우에는 예외로 합니다:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. 개인정보의 파기</h2>
            <p className="text-gray-700 leading-relaxed">
              회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는
              지체 없이 해당 개인정보를 파기합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">6. 이용자의 권리</h2>
            <p className="text-gray-700 leading-relaxed mb-3">이용자는 다음과 같은 권리를 행사할 수 있습니다:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>개인정보 열람 요청</li>
              <li>개인정보 정정 및 삭제 요청</li>
              <li>개인정보 처리 정지 요청</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">7. 쿠키의 사용</h2>
            <p className="text-gray-700 leading-relaxed">
              회사는 서비스 이용 편의를 위해 쿠키를 사용합니다.
              쿠키는 웹사이트가 이용자의 컴퓨터 브라우저에 보내는 작은 텍스트 파일로,
              브라우저 설정을 통해 쿠키 수집을 거부할 수 있습니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">8. 개인정보 보호책임자</h2>
            <p className="text-gray-700 leading-relaxed">
              개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 관련 문의사항을 처리합니다.
            </p>
            <ul className="list-none text-gray-700 space-y-1 mt-3">
              <li>이메일: privacy@ihonguide.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">9. 개인정보처리방침 변경</h2>
            <p className="text-gray-700 leading-relaxed">
              본 개인정보처리방침은 2026년 1월 27일부터 적용됩니다.
              법령 및 방침에 따른 변경 내용의 추가, 삭제 및 정정이 있는 경우에는
              변경 사항의 시행 7일 전부터 공지사항을 통하여 고지합니다.
            </p>
          </section>
        </div>
      </Card>
    </Container>
  );
}
