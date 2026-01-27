'use client';

/**
 * 진단 질문 카드 컴포넌트
 */

import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import type { DiagnosisQuestion, DiagnosisAnswer } from '@/types/diagnosis';

interface QuestionCardProps {
  question: DiagnosisQuestion;
  selectedAnswer?: DiagnosisAnswer;
  onAnswer: (answer: DiagnosisAnswer) => void;
  onNext: () => void;
  onPrev?: () => void;
  isLastQuestion: boolean;
  hasAnswer: boolean;
}

export function QuestionCard({
  question,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrev,
  isLastQuestion,
  hasAnswer,
}: QuestionCardProps) {
  const handleOptionClick = (optionId: string, score: number) => {
    onAnswer({
      questionId: question.id,
      optionId,
      score,
    });
  };

  return (
    <Card className="space-y-6">
      {/* 질문 */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-brand-primary">
          질문 {question.order}
        </span>
        <h2 className="text-xl font-semibold text-gray-900">
          {question.question}
        </h2>
        {question.description && (
          <p className="text-sm text-gray-500">{question.description}</p>
        )}
      </div>

      {/* 옵션 */}
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer?.optionId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleOptionClick(option.id, option.score)}
              className={cn(
                'w-full p-4 text-left border-2 rounded-lg transition-all',
                'hover:border-brand-primary/50 hover:bg-brand-primary/5',
                'focus:outline-none focus:ring-2 focus:ring-brand-primary/50',
                isSelected
                  ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                  : 'border-gray-200 text-gray-700'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center',
                    isSelected
                      ? 'border-brand-primary bg-brand-primary'
                      : 'border-gray-300'
                  )}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="font-medium">{option.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 네비게이션 */}
      <div className="flex justify-between pt-4 border-t">
        <Button
          variant="secondary"
          onClick={onPrev}
          disabled={!onPrev}
          className={cn(!onPrev && 'invisible')}
        >
          이전
        </Button>
        <Button onClick={onNext} disabled={!hasAnswer}>
          {isLastQuestion ? '결과 보기' : '다음'}
        </Button>
      </div>
    </Card>
  );
}
