/**
 * Calculator 상태 관리 스토어
 * 양육비 계산기 입력 및 결과 관리
 */

import { create } from 'zustand';
import type { ChildSupportInput, ChildSupportResult, ChildAgeGroup } from '@/types/calculator';

interface CalculatorState {
  // 입력 상태
  parent1Income: number;
  parent2Income: number;
  childrenCount: number;
  childrenAgeGroup: ChildAgeGroup;
  custodialParent: 1 | 2;
  additionalCosts: {
    education: number;
    medical: number;
    other: number;
  };

  // 결과 상태
  result: ChildSupportResult | null;
  isCalculating: boolean;
  error: string | null;
}

interface CalculatorActions {
  setParent1Income: (income: number) => void;
  setParent2Income: (income: number) => void;
  setChildrenCount: (count: number) => void;
  setChildrenAgeGroup: (group: ChildAgeGroup) => void;
  setCustodialParent: (parent: 1 | 2) => void;
  setAdditionalCost: (type: 'education' | 'medical' | 'other', amount: number) => void;
  setResult: (result: ChildSupportResult | null) => void;
  setIsCalculating: (isCalculating: boolean) => void;
  setError: (error: string | null) => void;
  getInput: () => ChildSupportInput;
  reset: () => void;
}

const initialState: CalculatorState = {
  parent1Income: 0,
  parent2Income: 0,
  childrenCount: 1,
  childrenAgeGroup: '6-11',
  custodialParent: 1,
  additionalCosts: {
    education: 0,
    medical: 0,
    other: 0,
  },
  result: null,
  isCalculating: false,
  error: null,
};

export const useCalculatorStore = create<CalculatorState & CalculatorActions>(
  (set, get) => ({
    ...initialState,

    setParent1Income: (income) => set({ parent1Income: income }),
    setParent2Income: (income) => set({ parent2Income: income }),
    setChildrenCount: (count) => set({ childrenCount: count }),
    setChildrenAgeGroup: (group) => set({ childrenAgeGroup: group }),
    setCustodialParent: (parent) => set({ custodialParent: parent }),

    setAdditionalCost: (type, amount) =>
      set((state) => ({
        additionalCosts: {
          ...state.additionalCosts,
          [type]: amount,
        },
      })),

    setResult: (result) => set({ result }),
    setIsCalculating: (isCalculating) => set({ isCalculating }),
    setError: (error) => set({ error }),

    getInput: () => {
      const state = get();
      const additionalCosts = {
        education: state.additionalCosts.education || undefined,
        medical: state.additionalCosts.medical || undefined,
        other: state.additionalCosts.other || undefined,
      };

      // 모든 추가 비용이 0이면 undefined 반환
      const hasAdditionalCosts = Object.values(state.additionalCosts).some((v) => v > 0);

      return {
        parent1Income: state.parent1Income,
        parent2Income: state.parent2Income,
        childrenCount: state.childrenCount,
        childrenAgeGroup: state.childrenAgeGroup,
        custodialParent: state.custodialParent,
        additionalCosts: hasAdditionalCosts ? additionalCosts : undefined,
      };
    },

    reset: () => set(initialState),
  })
);
