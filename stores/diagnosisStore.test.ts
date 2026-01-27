import { describe, it, expect, beforeEach } from 'vitest';
import { useDiagnosisStore } from './diagnosisStore';
import type { DiagnosisAnswer } from '@/types/diagnosis';

describe('diagnosisStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useDiagnosisStore.getState().reset();
  });

  describe('initial state', () => {
    it('should have empty answers array by default', () => {
      const { answers } = useDiagnosisStore.getState();
      expect(answers).toEqual([]);
    });

    it('should have currentStep as 0 by default', () => {
      const { currentStep } = useDiagnosisStore.getState();
      expect(currentStep).toBe(0);
    });

    it('should have totalSteps as 0 by default', () => {
      const { totalSteps } = useDiagnosisStore.getState();
      expect(totalSteps).toBe(0);
    });

    it('should not be completed by default', () => {
      const { isCompleted } = useDiagnosisStore.getState();
      expect(isCompleted).toBe(false);
    });
  });

  describe('setTotalSteps', () => {
    it('should set the total number of steps', () => {
      useDiagnosisStore.getState().setTotalSteps(5);
      expect(useDiagnosisStore.getState().totalSteps).toBe(5);
    });
  });

  describe('setAnswer', () => {
    it('should add a new answer', () => {
      const answer: DiagnosisAnswer = {
        questionId: 'q1',
        optionId: 'q1_opt1',
        score: 3,
      };

      useDiagnosisStore.getState().setAnswer(answer);

      const { answers } = useDiagnosisStore.getState();
      expect(answers).toHaveLength(1);
      expect(answers[0]).toEqual(answer);
    });

    it('should update existing answer for same questionId', () => {
      useDiagnosisStore.getState().setAnswer({ questionId: 'q1', optionId: 'q1_opt1', score: 3 });
      useDiagnosisStore.getState().setAnswer({ questionId: 'q1', optionId: 'q1_opt2', score: 2 });

      const { answers } = useDiagnosisStore.getState();
      expect(answers).toHaveLength(1);
      expect(answers[0].optionId).toBe('q1_opt2');
      expect(answers[0].score).toBe(2);
    });

    it('should add multiple answers for different questions', () => {
      useDiagnosisStore.getState().setAnswer({ questionId: 'q1', optionId: 'q1_opt1', score: 3 });
      useDiagnosisStore.getState().setAnswer({ questionId: 'q2', optionId: 'q2_opt1', score: 3 });

      const { answers } = useDiagnosisStore.getState();
      expect(answers).toHaveLength(2);
    });
  });

  describe('nextStep', () => {
    it('should increment currentStep', () => {
      useDiagnosisStore.getState().setTotalSteps(5);
      useDiagnosisStore.getState().nextStep();
      expect(useDiagnosisStore.getState().currentStep).toBe(1);
    });

    it('should not exceed totalSteps', () => {
      useDiagnosisStore.getState().setTotalSteps(2);
      useDiagnosisStore.getState().nextStep();
      useDiagnosisStore.getState().nextStep();
      useDiagnosisStore.getState().nextStep();
      expect(useDiagnosisStore.getState().currentStep).toBe(2);
    });

    it('should mark as completed when reaching final step', () => {
      useDiagnosisStore.getState().setTotalSteps(2);
      useDiagnosisStore.getState().nextStep();
      useDiagnosisStore.getState().nextStep();
      expect(useDiagnosisStore.getState().isCompleted).toBe(true);
    });
  });

  describe('prevStep', () => {
    it('should decrement currentStep', () => {
      useDiagnosisStore.getState().setTotalSteps(5);
      useDiagnosisStore.getState().nextStep();
      useDiagnosisStore.getState().nextStep();
      useDiagnosisStore.getState().prevStep();
      expect(useDiagnosisStore.getState().currentStep).toBe(1);
    });

    it('should not go below 0', () => {
      useDiagnosisStore.getState().prevStep();
      expect(useDiagnosisStore.getState().currentStep).toBe(0);
    });

    it('should mark as not completed when going back', () => {
      useDiagnosisStore.getState().setTotalSteps(2);
      useDiagnosisStore.getState().nextStep();
      useDiagnosisStore.getState().nextStep();
      useDiagnosisStore.getState().prevStep();
      expect(useDiagnosisStore.getState().isCompleted).toBe(false);
    });
  });

  describe('goToStep', () => {
    it('should go to specific step', () => {
      useDiagnosisStore.getState().setTotalSteps(5);
      useDiagnosisStore.getState().goToStep(3);
      expect(useDiagnosisStore.getState().currentStep).toBe(3);
    });

    it('should not go to negative step', () => {
      useDiagnosisStore.getState().setTotalSteps(5);
      useDiagnosisStore.getState().goToStep(-1);
      expect(useDiagnosisStore.getState().currentStep).toBe(0);
    });

    it('should not exceed totalSteps', () => {
      useDiagnosisStore.getState().setTotalSteps(5);
      useDiagnosisStore.getState().goToStep(10);
      expect(useDiagnosisStore.getState().currentStep).toBe(5);
    });
  });

  describe('getAnswer', () => {
    it('should return answer for specific questionId', () => {
      useDiagnosisStore.getState().setAnswer({ questionId: 'q1', optionId: 'q1_opt1', score: 3 });
      useDiagnosisStore.getState().setAnswer({ questionId: 'q2', optionId: 'q2_opt2', score: 2 });

      const answer = useDiagnosisStore.getState().getAnswer('q1');
      expect(answer?.optionId).toBe('q1_opt1');
      expect(answer?.score).toBe(3);
    });

    it('should return undefined for non-existent questionId', () => {
      const answer = useDiagnosisStore.getState().getAnswer('non-existent');
      expect(answer).toBeUndefined();
    });
  });

  describe('reset', () => {
    it('should reset all state to initial values', () => {
      // Set some state
      useDiagnosisStore.getState().setTotalSteps(5);
      useDiagnosisStore.getState().setAnswer({ questionId: 'q1', optionId: 'q1_opt1', score: 3 });
      useDiagnosisStore.getState().nextStep();
      useDiagnosisStore.getState().nextStep();

      // Reset
      useDiagnosisStore.getState().reset();

      const state = useDiagnosisStore.getState();
      expect(state.answers).toEqual([]);
      expect(state.currentStep).toBe(0);
      expect(state.totalSteps).toBe(0);
      expect(state.isCompleted).toBe(false);
    });
  });
});
