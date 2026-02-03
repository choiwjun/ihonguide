/**
 * AEO용 용어 정의 카드
 * AI가 정의(DefinedTerm) 인용 시 참고할 수 있는 구조
 */

interface DefinitionCardProps {
  term: string;
  definition: string;
  className?: string;
}

export function DefinitionCard({ term, definition, className = '' }: DefinitionCardProps) {
  return (
    <div
      className={`rounded-lg border border-stone-200/60 bg-white/60 p-4 ${className}`}
      data-aeo-definition
    >
      <dt className="text-base font-semibold text-teal-800 mb-1">{term}</dt>
      <dd className="text-gray-700 text-sm leading-relaxed">{definition}</dd>
    </div>
  );
}
