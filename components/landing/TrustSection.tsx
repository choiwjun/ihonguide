'use client';

/**
 * 신뢰 섹션 컴포넌트
 * Warm Professional Style (Ihon Guide Design System)
 */

const certifications = [
  { icon: '⚖️', label: '대한변호사협회 등록' },
  { icon: '🔒', label: '개인정보보호 인증' },
  { icon: '✓', label: '법률서비스 품질인증' },
];

export function TrustSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#F9F7F2]" aria-labelledby="trust-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-[#E0F2F1] text-[#107B6A] text-sm font-medium rounded-full mb-4">
              신뢰할 수 있는 서비스
            </span>
            <h2 id="trust-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              전문가가 만든 서비스입니다
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              변호사 감수와 보안 인증으로 안심하고 이용하세요
            </p>
          </div>

          {/* Trust Cards */}
          <div className="bg-white/70 backdrop-blur-[20px] rounded-3xl p-8 sm:p-12 border border-white/80 shadow-[0_4px_20px_-2px_rgba(16,123,106,0.08),0_0_8px_-2px_rgba(0,0,0,0.02)]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-stone-200/60 shadow-sm"
                >
                  <div className="w-14 h-14 bg-[#E0F2F1] rounded-lg flex items-center justify-center text-2xl mb-4">
                    {cert.icon}
                  </div>
                  <span className="text-sm font-medium text-slate-800">
                    {cert.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Additional Trust Info */}
            <div className="mt-8 pt-8 border-t border-stone-200">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#107B6A]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">SSL 암호화 적용</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#107B6A]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">개인정보 수집 최소화</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#107B6A]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">상담 내용 비공개</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
