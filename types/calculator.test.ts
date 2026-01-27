import { describe, it, expect } from 'vitest';
import type {
  ChildSupportInput,
  ChildSupportResult,
  CalculationBreakdown,
  SavedCalculatorResult,
  ChildAgeGroup,
} from './calculator';
import {
  AGE_GROUP_MULTIPLIERS,
  CHILDREN_COUNT_MULTIPLIERS,
  AGE_GROUP_LABELS,
} from './calculator';

describe('calculator types', () => {
  describe('type compilation', () => {
    it('should compile ChildSupportInput type', () => {
      const input: ChildSupportInput = {
        parent1Income: 4000000,
        parent2Income: 3000000,
        childrenCount: 1,
        childrenAgeGroup: '6-11',
        custodialParent: 1,
        additionalCosts: {
          education: 200000,
          medical: 100000,
        },
      };
      expect(input.parent1Income).toBe(4000000);
      expect(input.childrenAgeGroup).toBe('6-11');
    });

    it('should compile ChildSupportResult type', () => {
      const result: ChildSupportResult = {
        baseAmount: 800000,
        additionalAmount: 300000,
        totalAmount: 1100000,
        nonCustodialPayment: 495000,
        parent1Ratio: 57.14,
        parent2Ratio: 42.86,
        combinedIncome: 7000000,
        breakdown: {
          incomeRange: '600만원~800만원',
          childrenMultiplier: 100,
          ageMultiplier: 110,
          tableAmount: 727000,
          explanation: '법원 양육비 산정기준표 기반 계산',
        },
      };
      expect(result.totalAmount).toBe(1100000);
    });

    it('should compile CalculationBreakdown type', () => {
      const breakdown: CalculationBreakdown = {
        incomeRange: '400만원~600만원',
        childrenMultiplier: 180,
        ageMultiplier: 120,
        tableAmount: 600000,
        explanation: '2자녀, 중학생 기준',
      };
      expect(breakdown.incomeRange).toBe('400만원~600만원');
    });

    it('should compile SavedCalculatorResult type', () => {
      const saved: SavedCalculatorResult = {
        id: 'uuid-123',
        sessionId: 'session-456',
        calculatorType: '양육비',
        inputData: {
          parent1Income: 4000000,
          parent2Income: 3000000,
          childrenCount: 1,
          childrenAgeGroup: '6-11',
          custodialParent: 1,
        },
        resultData: {
          baseAmount: 800000,
          additionalAmount: 0,
          totalAmount: 800000,
          nonCustodialPayment: 343000,
          parent1Ratio: 57.14,
          parent2Ratio: 42.86,
          combinedIncome: 7000000,
          breakdown: {
            incomeRange: '600만원~800만원',
            childrenMultiplier: 100,
            ageMultiplier: 110,
            tableAmount: 727000,
            explanation: '계산 근거',
          },
        },
        createdAt: new Date(),
      };
      expect(saved.calculatorType).toBe('양육비');
    });

    it('should compile ChildAgeGroup type', () => {
      const ageGroups: ChildAgeGroup[] = ['0-2', '3-5', '6-11', '12-14', '15-17', '18+'];
      expect(ageGroups).toHaveLength(6);
    });
  });

  describe('AGE_GROUP_MULTIPLIERS', () => {
    it('should have correct multiplier for infants (0-2)', () => {
      expect(AGE_GROUP_MULTIPLIERS['0-2']).toBe(0.9);
    });

    it('should have correct multiplier for toddlers (3-5)', () => {
      expect(AGE_GROUP_MULTIPLIERS['3-5']).toBe(1.0);
    });

    it('should have correct multiplier for elementary (6-11)', () => {
      expect(AGE_GROUP_MULTIPLIERS['6-11']).toBe(1.1);
    });

    it('should have correct multiplier for middle school (12-14)', () => {
      expect(AGE_GROUP_MULTIPLIERS['12-14']).toBe(1.2);
    });

    it('should have correct multiplier for high school (15-17)', () => {
      expect(AGE_GROUP_MULTIPLIERS['15-17']).toBe(1.3);
    });

    it('should have correct multiplier for college (18+)', () => {
      expect(AGE_GROUP_MULTIPLIERS['18+']).toBe(1.4);
    });
  });

  describe('CHILDREN_COUNT_MULTIPLIERS', () => {
    it('should have correct multiplier for 1 child', () => {
      expect(CHILDREN_COUNT_MULTIPLIERS[1]).toBe(1.0);
    });

    it('should have correct multiplier for 2 children', () => {
      expect(CHILDREN_COUNT_MULTIPLIERS[2]).toBe(1.8);
    });

    it('should have correct multiplier for 3 children', () => {
      expect(CHILDREN_COUNT_MULTIPLIERS[3]).toBe(2.5);
    });

    it('should have correct multiplier for 4+ children', () => {
      expect(CHILDREN_COUNT_MULTIPLIERS[4]).toBe(3.1);
    });
  });

  describe('AGE_GROUP_LABELS', () => {
    it('should have labels for all age groups', () => {
      expect(AGE_GROUP_LABELS['0-2']).toContain('영아');
      expect(AGE_GROUP_LABELS['3-5']).toContain('유아');
      expect(AGE_GROUP_LABELS['6-11']).toContain('초등');
      expect(AGE_GROUP_LABELS['12-14']).toContain('중등');
      expect(AGE_GROUP_LABELS['15-17']).toContain('고등');
      expect(AGE_GROUP_LABELS['18+']).toContain('대학');
    });
  });
});
