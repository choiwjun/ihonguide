import { describe, it, expect } from 'vitest';
import {
  diagnosisQuestions,
  getQuestionById,
  getQuestionsByCategory,
} from './diagnosisQuestions';

describe('diagnosisQuestions', () => {
  describe('questions data', () => {
    it('should have exactly 10 questions', () => {
      expect(diagnosisQuestions).toHaveLength(10);
    });

    it('should have unique question IDs', () => {
      const ids = diagnosisQuestions.map((q) => q.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have sequential order values', () => {
      const orders = diagnosisQuestions.map((q) => q.order);
      const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      expect(orders).toEqual(expected);
    });

    it('should have valid categories for all questions', () => {
      const validCategories = ['communication', 'property', 'children', 'agreement', 'situation'];
      diagnosisQuestions.forEach((q) => {
        expect(validCategories).toContain(q.category);
      });
    });

    it('should have exactly 3 options for each question', () => {
      diagnosisQuestions.forEach((q) => {
        expect(q.options).toHaveLength(3);
      });
    });

    it('should have score values of 1, 2, or 3 for all options', () => {
      diagnosisQuestions.forEach((q) => {
        q.options.forEach((opt) => {
          expect([1, 2, 3]).toContain(opt.score);
        });
      });
    });

    it('should have options sorted by score descending (3, 2, 1)', () => {
      diagnosisQuestions.forEach((q) => {
        const scores = q.options.map((opt) => opt.score);
        expect(scores).toEqual([3, 2, 1]);
      });
    });

    it('should have unique option IDs within each question', () => {
      diagnosisQuestions.forEach((q) => {
        const optionIds = q.options.map((opt) => opt.id);
        const uniqueIds = new Set(optionIds);
        expect(uniqueIds.size).toBe(optionIds.length);
      });
    });

    it('should have non-empty question text', () => {
      diagnosisQuestions.forEach((q) => {
        expect(q.question.length).toBeGreaterThan(0);
      });
    });

    it('should have non-empty option labels', () => {
      diagnosisQuestions.forEach((q) => {
        q.options.forEach((opt) => {
          expect(opt.label.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('score ranges', () => {
    it('should have minimum possible score of 10 (all 1s)', () => {
      const minScore = diagnosisQuestions.reduce((sum, q) => {
        const minOptionScore = Math.min(...q.options.map((opt) => opt.score));
        return sum + minOptionScore;
      }, 0);
      expect(minScore).toBe(10);
    });

    it('should have maximum possible score of 30 (all 3s)', () => {
      const maxScore = diagnosisQuestions.reduce((sum, q) => {
        const maxOptionScore = Math.max(...q.options.map((opt) => opt.score));
        return sum + maxOptionScore;
      }, 0);
      expect(maxScore).toBe(30);
    });
  });

  describe('getQuestionById', () => {
    it('should return question for valid ID', () => {
      const question = getQuestionById('q1');
      expect(question).toBeDefined();
      expect(question?.id).toBe('q1');
      expect(question?.order).toBe(1);
    });

    it('should return undefined for invalid ID', () => {
      const question = getQuestionById('invalid');
      expect(question).toBeUndefined();
    });

    it('should return correct question for q5', () => {
      const question = getQuestionById('q5');
      expect(question).toBeDefined();
      expect(question?.category).toBe('children');
    });
  });

  describe('getQuestionsByCategory', () => {
    it('should return communication questions', () => {
      const questions = getQuestionsByCategory('communication');
      expect(questions.length).toBeGreaterThan(0);
      questions.forEach((q) => {
        expect(q.category).toBe('communication');
      });
    });

    it('should return property questions', () => {
      const questions = getQuestionsByCategory('property');
      expect(questions.length).toBeGreaterThan(0);
      questions.forEach((q) => {
        expect(q.category).toBe('property');
      });
    });

    it('should return children questions', () => {
      const questions = getQuestionsByCategory('children');
      expect(questions.length).toBeGreaterThan(0);
      questions.forEach((q) => {
        expect(q.category).toBe('children');
      });
    });

    it('should return empty array for non-existent category', () => {
      const questions = getQuestionsByCategory('invalid' as any);
      expect(questions).toEqual([]);
    });
  });
});
