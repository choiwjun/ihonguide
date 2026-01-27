/**
 * Diagnosis 상태 관리 스토어
 * 진단 질문 응답 및 진행 상태 관리
 */

import { create } from 'zustand';
import type { DiagnosisAnswer } from '@/types/diagnosis';

export type { DiagnosisAnswer };

interface DiagnosisState {
  answers: DiagnosisAnswer[];
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
}

interface DiagnosisActions {
  setTotalSteps: (total: number) => void;
  setAnswer: (answer: DiagnosisAnswer) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  getAnswer: (questionId: string) => DiagnosisAnswer | undefined;
  reset: () => void;
}

const initialState: DiagnosisState = {
  answers: [],
  currentStep: 0,
  totalSteps: 0,
  isCompleted: false,
};

export const useDiagnosisStore = create<DiagnosisState & DiagnosisActions>(
  (set, get) => ({
    ...initialState,

    setTotalSteps: (total) => set({ totalSteps: total }),

    setAnswer: (answer) =>
      set((state) => {
        const existingIndex = state.answers.findIndex(
          (a) => a.questionId === answer.questionId
        );

        if (existingIndex >= 0) {
          const newAnswers = [...state.answers];
          newAnswers[existingIndex] = answer;
          return { answers: newAnswers };
        }

        return { answers: [...state.answers, answer] };
      }),

    nextStep: () =>
      set((state) => {
        const nextStep = Math.min(state.currentStep + 1, state.totalSteps);
        return {
          currentStep: nextStep,
          isCompleted: nextStep >= state.totalSteps,
        };
      }),

    prevStep: () =>
      set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 0),
        isCompleted: false,
      })),

    goToStep: (step) =>
      set((state) => {
        const boundedStep = Math.max(0, Math.min(step, state.totalSteps));
        return {
          currentStep: boundedStep,
          isCompleted: boundedStep >= state.totalSteps && state.totalSteps > 0,
        };
      }),

    getAnswer: (questionId) => {
      return get().answers.find((a) => a.questionId === questionId);
    },

    reset: () => set(initialState),
  })
);
