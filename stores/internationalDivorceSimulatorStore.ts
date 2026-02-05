/**
 * International Divorce Simulator 상태 관리 스토어
 * 국제이혼 시뮬레이터 입력 및 결과 관리
 */

import { create } from 'zustand';
import type {
  InternationalDivorceInput,
  InternationalDivorceResult,
} from '@/types/internationalDivorceSimulator';
import { calculateInternationalDivorce } from '@/lib/simulator/internationalDivorce';

interface InternationalDivorceSimulatorState {
  // 입력 상태
  input: InternationalDivorceInput | null;

  // 결과 상태
  result: InternationalDivorceResult | null;
  isLoading: boolean;
  error: string | null;
}

interface InternationalDivorceSimulatorActions {
  setInput: (input: InternationalDivorceInput) => void;
  calculate: () => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState: InternationalDivorceSimulatorState = {
  input: null,
  result: null,
  isLoading: false,
  error: null,
};

export const useInternationalDivorceSimulatorStore = create<
  InternationalDivorceSimulatorState & InternationalDivorceSimulatorActions
>((set, get) => ({
  ...initialState,

  setInput: (input) => set({ input, error: null }),

  calculate: () => {
    const state = get();

    if (!state.input) {
      set({ error: '입력 데이터가 없습니다.' });
      return;
    }

    try {
      set({ isLoading: true, error: null });

      // 계산 수행
      const result = calculateInternationalDivorce(state.input);

      set({ result, isLoading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '시뮬레이션 중 오류가 발생했습니다.';

      set({
        error: errorMessage,
        result: null,
        isLoading: false,
      });
    }
  },

  setError: (error) => set({ error }),

  reset: () => set(initialState),
}));
