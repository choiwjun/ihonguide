'use client';

/**
 * Stats 섹션 컴포넌트
 * Light Transparency Variant 3 (Ihon Guide Design System)
 */

const stats = [
  { value: '15,000+', label: '분석된 판례' },
  { value: '98%', label: '계산 정확도' },
  { value: '50,000+', label: '월간 이용자' },
  { value: '~40%', label: '법률 비용 절감' },
];

export function StatsSection() {
  return (
    <section className="w-full border-y border-stone-200/60 bg-white/40 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-slate-200 text-center md:text-left">
          {stats.map((stat, index) => (
            <div key={stat.label} className="px-4">
              <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-[#0f766e] tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
