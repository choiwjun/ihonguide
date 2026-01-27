'use client';

/**
 * 이혼 유형 진단 페이지
 */

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDiagnosisStore } from '@/stores';
import { diagnosisQuestions } from '@/data/diagnosisQuestions';
import { Container } from '@/components/layout';
import { DiagnosisStart } from '@/components/diagnosis/DiagnosisStart';
import { QuestionCard } from '@/components/diagnosis/QuestionCard';
import { DiagnosisProgress } from '@/components/diagnosis/DiagnosisProgress';
import type { DiagnosisAnswer } from '@/types/diagnosis';

type DiagnosisPhase = 'start' | 'questions' | 'submitting';

export default function DiagnosisPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<DiagnosisPhase>('start');
  const [error, setError] = useState<string | null>(null);

  const {
    currentStep,
    answers,
    setTotalSteps,
    setAnswer,
    nextStep,
    prevStep,
    reset,
  } = useDiagnosisStore();

  // 진단 시작
  const handleStart = useCallback(() => {
    reset();
    setTotalSteps(diagnosisQuestions.length);
    setPhase('questions');
  }, [reset, setTotalSteps]);

  // 답변 선택
  const handleAnswer = useCallback(
    (answer: DiagnosisAnswer) => {
      setAnswer(answer);
    },
    [setAnswer]
  );

  // 다음 질문으로 이동
  const handleNext = useCallback(() => {
    if (currentStep < diagnosisQuestions.length - 1) {
      nextStep();
    }
  }, [currentStep, nextStep]);

  // 이전 질문으로 이동
  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      prevStep();
    }
  }, [currentStep, prevStep]);

  // 진단 제출
  const handleSubmit = useCallback(async () => {
    setPhase('submitting');
    setError(null);

    try {
      const response = await fetch('/api/diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '진단 처리 중 오류가 발생했습니다.');
      }

      // 결과를 세션 스토리지에 저장
      sessionStorage.setItem('lastDiagnosisResult', JSON.stringify(data.data));
      sessionStorage.setItem(`diagnosis_${data.data.sessionId}`, JSON.stringify(data.data));

      // 결과 페이지로 이동 (세션 ID와 함께)
      router.push(`/diagnosis/result?sessionId=${data.data.sessionId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '진단 처리 중 오류가 발생했습니다.');
      setPhase('questions');
    }
  }, [answers, router]);

  // 현재 질문
  const currentQuestion = diagnosisQuestions[currentStep];

  // 현재 질문에 대한 답변
  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion?.id
  );

  // 마지막 질문인지 확인
  const isLastQuestion = currentStep === diagnosisQuestions.length - 1;

  // 제출 가능한지 확인 (모든 질문에 답변했는지)
  const canSubmit = answers.length === diagnosisQuestions.length;

  return (
    <Container size="md" className="py-8">
      {phase === 'start' && <DiagnosisStart onStart={handleStart} />}

      {phase === 'questions' && currentQuestion && (
        <div className="space-y-6">
          <DiagnosisProgress
            current={currentStep + 1}
            total={diagnosisQuestions.length}
          />

          <QuestionCard
            question={currentQuestion}
            selectedAnswer={currentAnswer}
            onAnswer={handleAnswer}
            onNext={isLastQuestion && canSubmit ? handleSubmit : handleNext}
            onPrev={currentStep > 0 ? handlePrev : undefined}
            isLastQuestion={isLastQuestion}
            hasAnswer={!!currentAnswer}
          />

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>
      )}

      {phase === 'submitting' && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">결과를 분석하고 있습니다...</p>
        </div>
      )}
    </Container>
  );
}
