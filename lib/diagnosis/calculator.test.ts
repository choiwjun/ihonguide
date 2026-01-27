import { describe, it, expect } from 'vitest';
import {
  calculateTotalScore,
  determineResultType,
  generateResultDetail,
  calculateDiagnosisResult,
} from './calculator';
import type { DiagnosisAnswer } from '@/types/diagnosis';

describe('diagnosis calculator', () => {
  describe('calculateTotalScore', () => {
    it('should calculate total score from answers', () => {
      const answers: DiagnosisAnswer[] = [
        { questionId: 'q1', optionId: 'q1_opt1', score: 3 },
        { questionId: 'q2', optionId: 'q2_opt1', score: 3 },
        { questionId: 'q3', optionId: 'q3_opt2', score: 2 },
      ];
      expect(calculateTotalScore(answers)).toBe(8);
    });

    it('should return 0 for empty answers', () => {
      expect(calculateTotalScore([])).toBe(0);
    });

    it('should handle single answer', () => {
      const answers: DiagnosisAnswer[] = [
        { questionId: 'q1', optionId: 'q1_opt1', score: 3 },
      ];
      expect(calculateTotalScore(answers)).toBe(3);
    });
  });

  describe('determineResultType', () => {
    describe('협의이혼 (score >= 25)', () => {
      it('should return 협의 for score 25', () => {
        expect(determineResultType(25)).toBe('협의');
      });

      it('should return 협의 for score 30', () => {
        expect(determineResultType(30)).toBe('협의');
      });

      it('should return 협의 for score 27', () => {
        expect(determineResultType(27)).toBe('협의');
      });
    });

    describe('조정이혼 (score 15-24)', () => {
      it('should return 조정 for score 24', () => {
        expect(determineResultType(24)).toBe('조정');
      });

      it('should return 조정 for score 15', () => {
        expect(determineResultType(15)).toBe('조정');
      });

      it('should return 조정 for score 20', () => {
        expect(determineResultType(20)).toBe('조정');
      });
    });

    describe('소송이혼 (score < 15)', () => {
      it('should return 소송 for score 14', () => {
        expect(determineResultType(14)).toBe('소송');
      });

      it('should return 소송 for score 10', () => {
        expect(determineResultType(10)).toBe('소송');
      });

      it('should return 소송 for score 0', () => {
        expect(determineResultType(0)).toBe('소송');
      });
    });
  });

  describe('generateResultDetail', () => {
    it('should generate detail for 협의', () => {
      const answers: DiagnosisAnswer[] = [
        { questionId: 'q1', optionId: 'q1_opt1', score: 3 },
        { questionId: 'q2', optionId: 'q2_opt1', score: 3 },
        { questionId: 'q3', optionId: 'q3_opt1', score: 3 },
      ];
      const detail = generateResultDetail('협의', answers);

      expect(detail.recommendation).toBe('협의');
      expect(detail.reasons.length).toBeGreaterThan(0);
      expect(detail.nextSteps.length).toBeGreaterThan(0);
      expect(detail.estimatedDuration).toBe('1-3개월');
    });

    it('should generate detail for 조정', () => {
      const answers: DiagnosisAnswer[] = [
        { questionId: 'q3', optionId: 'q3_opt2', score: 2 },
        { questionId: 'q4', optionId: 'q4_opt2', score: 2 },
        { questionId: 'q5', optionId: 'q5_opt2', score: 2 },
      ];
      const detail = generateResultDetail('조정', answers);

      expect(detail.recommendation).toBe('조정');
      expect(detail.reasons.length).toBeGreaterThan(0);
      expect(detail.nextSteps.length).toBeGreaterThan(0);
      expect(detail.estimatedDuration).toBe('3-6개월');
    });

    it('should generate detail for 소송', () => {
      const answers: DiagnosisAnswer[] = [
        { questionId: 'q1', optionId: 'q1_opt3', score: 1 },
        { questionId: 'q2', optionId: 'q2_opt3', score: 1 },
        { questionId: 'q3', optionId: 'q3_opt3', score: 1 },
      ];
      const detail = generateResultDetail('소송', answers);

      expect(detail.recommendation).toBe('소송');
      expect(detail.reasons.length).toBeGreaterThan(0);
      expect(detail.nextSteps.length).toBeGreaterThan(0);
      expect(detail.estimatedDuration).toBe('6-12개월');
    });

    it('should include reasons array', () => {
      const detail = generateResultDetail('협의', []);
      expect(Array.isArray(detail.reasons)).toBe(true);
    });

    it('should include nextSteps array', () => {
      const detail = generateResultDetail('협의', []);
      expect(Array.isArray(detail.nextSteps)).toBe(true);
    });
  });

  describe('calculateDiagnosisResult', () => {
    it('should calculate complete result for high score (협의)', () => {
      const answers: DiagnosisAnswer[] = Array.from({ length: 10 }, (_, i) => ({
        questionId: `q${i + 1}`,
        optionId: `q${i + 1}_opt1`,
        score: 3,
      }));

      const result = calculateDiagnosisResult(answers);

      expect(result.resultType).toBe('협의');
      expect(result.score).toBe(30);
      expect(result.totalQuestions).toBe(10);
      expect(result.answeredQuestions).toBe(10);
      expect(result.detail).toBeDefined();
      expect(result.createdAt).toBeInstanceOf(Date);
    });

    it('should calculate complete result for medium score (조정)', () => {
      const answers: DiagnosisAnswer[] = Array.from({ length: 10 }, (_, i) => ({
        questionId: `q${i + 1}`,
        optionId: `q${i + 1}_opt2`,
        score: 2,
      }));

      const result = calculateDiagnosisResult(answers);

      expect(result.resultType).toBe('조정');
      expect(result.score).toBe(20);
    });

    it('should calculate complete result for low score (소송)', () => {
      const answers: DiagnosisAnswer[] = Array.from({ length: 10 }, (_, i) => ({
        questionId: `q${i + 1}`,
        optionId: `q${i + 1}_opt3`,
        score: 1,
      }));

      const result = calculateDiagnosisResult(answers);

      expect(result.resultType).toBe('소송');
      expect(result.score).toBe(10);
    });

    it('should return result with matching score and resultType', () => {
      // Edge case: exactly 25 should be 협의
      const answers25: DiagnosisAnswer[] = [
        ...Array.from({ length: 5 }, (_, i) => ({
          questionId: `q${i + 1}`,
          optionId: `q${i + 1}_opt1`,
          score: 3,
        })),
        ...Array.from({ length: 5 }, (_, i) => ({
          questionId: `q${i + 6}`,
          optionId: `q${i + 6}_opt2`,
          score: 2,
        })),
      ];

      const result = calculateDiagnosisResult(answers25);
      expect(result.score).toBe(25);
      expect(result.resultType).toBe('협의');
    });

    it('should return result with detail including reasons and nextSteps', () => {
      const answers: DiagnosisAnswer[] = [
        { questionId: 'q1', optionId: 'q1_opt1', score: 3 },
      ];

      const result = calculateDiagnosisResult(answers);

      expect(result.detail.reasons).toBeDefined();
      expect(Array.isArray(result.detail.reasons)).toBe(true);
      expect(result.detail.nextSteps).toBeDefined();
      expect(Array.isArray(result.detail.nextSteps)).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle boundary score 25 (협의 threshold)', () => {
      expect(determineResultType(25)).toBe('협의');
    });

    it('should handle boundary score 24 (조정 upper bound)', () => {
      expect(determineResultType(24)).toBe('조정');
    });

    it('should handle boundary score 15 (조정 lower bound)', () => {
      expect(determineResultType(15)).toBe('조정');
    });

    it('should handle boundary score 14 (소송 upper bound)', () => {
      expect(determineResultType(14)).toBe('소송');
    });
  });
});
