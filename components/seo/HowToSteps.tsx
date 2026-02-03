/**
 * AEO용 절차(HowTo) 단계 표시
 * 스키마와 동일한 순서로 노출해 AI 인용 일치
 */

interface Step {
  name: string;
  text: string;
}

interface HowToStepsProps {
  name: string;
  description: string;
  step: readonly Step[];
  className?: string;
}

export function HowToSteps({ name, description, step, className = '' }: HowToStepsProps) {
  return (
    <section className={`rounded-lg border border-stone-200/60 bg-white/40 p-6 ${className}`} data-aeo-howto>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{name}</h2>
      <p className="text-gray-600 text-sm mb-6">{description}</p>
      <ol className="space-y-4 list-none counter-reset-[step]">
        {step.map((s, i) => (
          <li key={s.name} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-800 text-sm font-semibold">
              {i + 1}
            </span>
            <div>
              <h3 className="font-medium text-gray-900">{s.name}</h3>
              <p className="text-gray-700 text-sm mt-1">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
