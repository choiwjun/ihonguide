import { describe, it, expect } from 'vitest';
import { calculateChildSupport, quickCalculate } from './childSupport';
import type { ChildSupportInput } from '@/types/calculator';

describe('childSupport calculator', () => {
  describe('calculateChildSupport - 단일 자녀', () => {
    it('should calculate for single child with average income', () => {
      const input: ChildSupportInput = {
        parent1Income: 4000000,
        parent2Income: 3000000,
        childrenCount: 1,
        childrenAgeGroup: '6-11',
        custodialParent: 1,
      };

      const result = calculateChildSupport(input);

      expect(result.combinedIncome).toBe(7000000);
      expect(result.parent1Ratio).toBeCloseTo(57.14, 1);
      expect(result.parent2Ratio).toBeCloseTo(42.86, 1);
      expect(result.baseAmount).toBeGreaterThan(0);
      expect(result.totalAmount).toBe(result.baseAmount + result.additionalAmount);
    });

    it('should calculate correct income ratios', () => {
      const input: ChildSupportInput = {
        parent1Income: 6000000,
        parent2Income: 4000000,
        childrenCount: 1,
        childrenAgeGroup: '3-5',
        custodialParent: 1,
      };

      const result = calculateChildSupport(input);

      expect(result.parent1Ratio).toBe(60);
      expect(result.parent2Ratio).toBe(40);
    });

    it('should calculate non-custodial payment based on ratio', () => {
      const input: ChildSupportInput = {
        parent1Income: 5000000,
        parent2Income: 5000000,
        childrenCount: 1,
        childrenAgeGroup: '3-5',
        custodialParent: 1,
      };

      const result = calculateChildSupport(input);

      // Parent2 (non-custodial) should pay 50%
      expect(result.nonCustodialPayment).toBe(Math.round(result.totalAmount * 0.5));
    });

    it('should handle custodial parent 2', () => {
      const input: ChildSupportInput = {
        parent1Income: 6000000,
        parent2Income: 4000000,
        childrenCount: 1,
        childrenAgeGroup: '3-5',
        custodialParent: 2,
      };

      const result = calculateChildSupport(input);

      // Parent1 (non-custodial) should pay based on 60% ratio
      expect(result.nonCustodialPayment).toBe(Math.round(result.totalAmount * 0.6));
    });
  });

  describe('calculateChildSupport - 다자녀', () => {
    it('should apply 180% multiplier for 2 children', () => {
      const singleChildInput: ChildSupportInput = {
        parent1Income: 4000000,
        parent2Income: 3000000,
        childrenCount: 1,
        childrenAgeGroup: '6-11',
        custodialParent: 1,
      };

      const twoChildInput: ChildSupportInput = {
        ...singleChildInput,
        childrenCount: 2,
      };

      const singleResult = calculateChildSupport(singleChildInput);
      const twoChildResult = calculateChildSupport(twoChildInput);

      // 2 children should be ~1.8x of single child (considering age multiplier)
      expect(twoChildResult.baseAmount).toBeCloseTo(singleResult.baseAmount * 1.8, -3);
    });

    it('should apply 250% multiplier for 3 children', () => {
      const singleChildInput: ChildSupportInput = {
        parent1Income: 4000000,
        parent2Income: 3000000,
        childrenCount: 1,
        childrenAgeGroup: '3-5', // Use base age group (1.0 multiplier)
        custodialParent: 1,
      };

      const threeChildInput: ChildSupportInput = {
        ...singleChildInput,
        childrenCount: 3,
      };

      const singleResult = calculateChildSupport(singleChildInput);
      const threeChildResult = calculateChildSupport(threeChildInput);

      expect(threeChildResult.baseAmount).toBeCloseTo(singleResult.baseAmount * 2.5, -3);
    });

    it('should cap at 4 children multiplier', () => {
      const fourChildInput: ChildSupportInput = {
        parent1Income: 4000000,
        parent2Income: 3000000,
        childrenCount: 4,
        childrenAgeGroup: '3-5',
        custodialParent: 1,
      };

      const fiveChildInput: ChildSupportInput = {
        ...fourChildInput,
        childrenCount: 5,
      };

      const fourResult = calculateChildSupport(fourChildInput);
      const fiveResult = calculateChildSupport(fiveChildInput);

      // 5 children should have same multiplier as 4
      expect(fiveResult.baseAmount).toBe(fourResult.baseAmount);
    });
  });

  describe('calculateChildSupport - 연령대 가산', () => {
    it('should apply 90% for infants (0-2)', () => {
      const input: ChildSupportInput = {
        parent1Income: 4000000,
        parent2Income: 3000000,
        childrenCount: 1,
        childrenAgeGroup: '0-2',
        custodialParent: 1,
      };

      const result = calculateChildSupport(input);
      expect(result.breakdown.ageMultiplier).toBe(90);
    });

    it('should apply 100% for toddlers (3-5)', () => {
      const input: ChildSupportInput = {
        parent1Income: 4000000,
        parent2Income: 3000000,
        childrenCount: 1,
        childrenAgeGroup: '3-5',
        custodialParent: 1,
      };

      const result = calculateChildSupport(input);
      expect(result.breakdown.ageMultiplier).toBe(100);
    });

    it('should apply 130% for high school (15-17)', () => {
      const input: ChildSupportInput = {
        parent1Income: 4000000,
        parent2Income: 3000000,
        childrenCount: 1,
        childrenAgeGroup: '15-17',
        custodialParent: 1,
      };

      const result = calculateChildSupport(input);
      expect(result.breakdown.ageMultiplier).toBe(130);
    });

    it('should increase amount for older children', () => {
      const infantInput: ChildSupportInput = {
        parent1Income: 4000000,
        parent2Income: 3000000,
        childrenCount: 1,
        childrenAgeGroup: '0-2',
        custodialParent: 1,
      };

      const highSchoolInput: ChildSupportInput = {
        ...infantInput,
        childrenAgeGroup: '15-17',
      };

      const infantResult = calculateChildSupport(infantInput);
      const highSchoolResult = calculateChildSupport(highSchoolInput);

      expect(highSchoolResult.baseAmount).toBeGreaterThan(infantResult.baseAmount);
    });
  });

  describe('calculateChildSupport - 추가 비용', () => {
    it('should add education costs', () => {
      const input: ChildSupportInput = {
        parent1Income: 4000000,
        parent2Income: 3000000,
        childrenCount: 1,
        childrenAgeGroup: '6-11',
        custodialParent: 1,
        additionalCosts: {
          education: 200000,
        },
      };

      const result = calculateChildSupport(input);

      expect(result.additionalAmount).toBe(200000);
      expect(result.totalAmount).toBe(result.baseAmount + 200000);
    });

    it('should add medical costs', () => {
      const input: ChildSupportInput = {
        parent1Income: 4000000,
        parent2Income: 3000000,
        childrenCount: 1,
        childrenAgeGroup: '6-11',
        custodialParent: 1,
        additionalCosts: {
          medical: 100000,
        },
      };

      const result = calculateChildSupport(input);

      expect(result.additionalAmount).toBe(100000);
    });

    it('should add all additional costs', () => {
      const input: ChildSupportInput = {
        parent1Income: 4000000,
        parent2Income: 3000000,
        childrenCount: 1,
        childrenAgeGroup: '6-11',
        custodialParent: 1,
        additionalCosts: {
          education: 200000,
          medical: 100000,
          other: 50000,
        },
      };

      const result = calculateChildSupport(input);

      expect(result.additionalAmount).toBe(350000);
      expect(result.totalAmount).toBe(result.baseAmount + 350000);
    });

    it('should handle no additional costs', () => {
      const input: ChildSupportInput = {
        parent1Income: 4000000,
        parent2Income: 3000000,
        childrenCount: 1,
        childrenAgeGroup: '6-11',
        custodialParent: 1,
      };

      const result = calculateChildSupport(input);

      expect(result.additionalAmount).toBe(0);
      expect(result.totalAmount).toBe(result.baseAmount);
    });
  });

  describe('calculateChildSupport - breakdown', () => {
    it('should include income range in breakdown', () => {
      const input: ChildSupportInput = {
        parent1Income: 4000000,
        parent2Income: 3000000,
        childrenCount: 1,
        childrenAgeGroup: '6-11',
        custodialParent: 1,
      };

      const result = calculateChildSupport(input);

      expect(result.breakdown.incomeRange).toBeTruthy();
      expect(result.breakdown.explanation).toBeTruthy();
    });

    it('should include multipliers in breakdown', () => {
      const input: ChildSupportInput = {
        parent1Income: 4000000,
        parent2Income: 3000000,
        childrenCount: 2,
        childrenAgeGroup: '12-14',
        custodialParent: 1,
      };

      const result = calculateChildSupport(input);

      expect(result.breakdown.childrenMultiplier).toBe(180);
      expect(result.breakdown.ageMultiplier).toBe(120);
    });
  });

  describe('quickCalculate', () => {
    it('should return quick estimate for single child', () => {
      const amount = quickCalculate(4000000, 3000000, 1);
      expect(amount).toBeGreaterThan(0);
    });

    it('should increase for multiple children', () => {
      const singleAmount = quickCalculate(4000000, 3000000, 1);
      const doubleAmount = quickCalculate(4000000, 3000000, 2);

      expect(doubleAmount).toBeGreaterThan(singleAmount);
    });

    it('should increase for higher income', () => {
      const lowAmount = quickCalculate(2000000, 2000000, 1);
      const highAmount = quickCalculate(5000000, 5000000, 1);

      expect(highAmount).toBeGreaterThan(lowAmount);
    });
  });

  describe('edge cases', () => {
    it('should handle zero income', () => {
      const input: ChildSupportInput = {
        parent1Income: 0,
        parent2Income: 0,
        childrenCount: 1,
        childrenAgeGroup: '6-11',
        custodialParent: 1,
      };

      const result = calculateChildSupport(input);

      expect(result.combinedIncome).toBe(0);
      expect(result.parent1Ratio).toBe(50);
      expect(result.parent2Ratio).toBe(50);
      expect(result.baseAmount).toBeGreaterThan(0); // Uses lowest tier
    });

    it('should handle very high income', () => {
      const input: ChildSupportInput = {
        parent1Income: 50000000,
        parent2Income: 50000000,
        childrenCount: 1,
        childrenAgeGroup: '6-11',
        custodialParent: 1,
      };

      const result = calculateChildSupport(input);

      expect(result.combinedIncome).toBe(100000000);
      expect(result.baseAmount).toBeGreaterThan(0);
    });

    it('should handle single parent income', () => {
      const input: ChildSupportInput = {
        parent1Income: 5000000,
        parent2Income: 0,
        childrenCount: 1,
        childrenAgeGroup: '6-11',
        custodialParent: 1,
      };

      const result = calculateChildSupport(input);

      expect(result.parent1Ratio).toBe(100);
      expect(result.parent2Ratio).toBe(0);
      expect(result.nonCustodialPayment).toBe(0); // Parent2 has 0 income
    });
  });
});
