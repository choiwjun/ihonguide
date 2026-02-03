/**
 * AEO용 답변 블록
 * AI 답변 엔진이 인용하기 쉬운 질문-답변 구조 (질문을 H2로 노출)
 */

interface AnswerBlockProps {
  question: string;
  answer: string;
  /** 50단어 이내 요약 (선택, 스니펫용) */
  summary?: string;
  className?: string;
}

export function AnswerBlock({ question, answer, summary, className = '' }: AnswerBlockProps) {
  return (
    <section className={`border-b border-stone-200/60 pb-6 last:border-0 last:pb-0 ${className}`} aria-labelledby={question.replace(/\s/g, '-')}>
      <h2 id={question.replace(/\s/g, '-')} className="text-lg font-semibold text-gray-900 mb-2">
        {question}
      </h2>
      {summary && (
        <p className="text-gray-600 text-sm mb-2 font-medium" data-aeo-summary>
          {summary}
        </p>
      )}
      <p className="text-gray-700 leading-relaxed">{answer}</p>
    </section>
  );
}
