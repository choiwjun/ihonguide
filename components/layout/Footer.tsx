import Link from 'next/link';

/**
 * Footer 컴포넌트
 * Light Transparency Variant 3 (Ihon Guide Design System)
 * Dark Theme Footer
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#1c1917] py-12 px-6 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
        {/* Brand */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 text-white">
            <div className="w-6 h-6 bg-[#0f766e]/20 rounded flex items-center justify-center text-[#0f766e]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3L4 9v12h16V9l-8-6zM6 19V9.5l6-4.5 6 4.5V19H6z"/>
              </svg>
            </div>
            <span className="font-bold">이혼준비</span>
          </Link>
          <p className="text-stone-400 leading-relaxed">
            데이터 기반 이혼 법률 가이드.
            <br />
            복잡한 법률 정보를 누구나 쉽게 이해하고 활용할 수 있도록 돕습니다.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">서비스</h4>
          <nav className="space-y-2 text-stone-400">
            <Link href="/calculator" className="block hover:text-[#0f766e] transition-colors">
              재산분할 계산기
            </Link>
            <Link href="/calculator" className="block hover:text-[#0f766e] transition-colors">
              양육비 계산기
            </Link>
            <Link href="/diagnosis" className="block hover:text-[#0f766e] transition-colors">
              이혼 유형 진단
            </Link>
            <Link href="/consultation" className="block hover:text-[#0f766e] transition-colors">
              상담 신청
            </Link>
          </nav>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">고객지원</h4>
          <nav className="space-y-2 text-stone-400">
            <Link href="/faq" className="block hover:text-[#0f766e] transition-colors">
              자주 묻는 질문
            </Link>
            <Link href="/terms" className="block hover:text-[#0f766e] transition-colors">
              이용약관
            </Link>
            <Link href="/privacy" className="block hover:text-[#0f766e] transition-colors">
              개인정보처리방침
            </Link>
            <a href="mailto:support@ihonguide.com" className="block hover:text-[#0f766e] transition-colors">
              문의하기
            </a>
          </nav>
        </div>

      </div>

      {/* Bottom */}
      <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-white/10 text-center text-xs text-stone-500">
        © {currentYear} 이혼준비. All rights reserved. 본 서비스에서 제공하는 정보는 법적 효력을 갖지 않으며 참고용으로만 사용해야 합니다.
      </div>
    </footer>
  );
}
