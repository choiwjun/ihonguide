import { describe, it, expect, beforeEach } from 'vitest';
import { useCalculatorStore } from './calculatorStore';

describe('calculatorStore', () => {
  beforeEach(() => {
    useCalculatorStore.getState().reset();
  });

  describe('initial state', () => {
    it('should have default income as 0', () => {
      const { parent1Income, parent2Income } = useCalculatorStore.getState();
      expect(parent1Income).toBe(0);
      expect(parent2Income).toBe(0);
    });

    it('should have default childrenCount as 1', () => {
      const { childrenCount } = useCalculatorStore.getState();
      expect(childrenCount).toBe(1);
    });

    it('should have default childrenAgeGroup as 6-11', () => {
      const { childrenAgeGroup } = useCalculatorStore.getState();
      expect(childrenAgeGroup).toBe('6-11');
    });

    it('should have default custodialParent as 1', () => {
      const { custodialParent } = useCalculatorStore.getState();
      expect(custodialParent).toBe(1);
    });

    it('should have zero additional costs by default', () => {
      const { additionalCosts } = useCalculatorStore.getState();
      expect(additionalCosts.education).toBe(0);
      expect(additionalCosts.medical).toBe(0);
      expect(additionalCosts.other).toBe(0);
    });

    it('should have null result by default', () => {
      const { result } = useCalculatorStore.getState();
      expect(result).toBeNull();
    });

    it('should not be calculating by default', () => {
      const { isCalculating } = useCalculatorStore.getState();
      expect(isCalculating).toBe(false);
    });

    it('should have null error by default', () => {
      const { error } = useCalculatorStore.getState();
      expect(error).toBeNull();
    });
  });

  describe('income setters', () => {
    it('should set parent1Income', () => {
      useCalculatorStore.getState().setParent1Income(4000000);
      expect(useCalculatorStore.getState().parent1Income).toBe(4000000);
    });

    it('should set parent2Income', () => {
      useCalculatorStore.getState().setParent2Income(3000000);
      expect(useCalculatorStore.getState().parent2Income).toBe(3000000);
    });
  });

  describe('children setters', () => {
    it('should set childrenCount', () => {
      useCalculatorStore.getState().setChildrenCount(2);
      expect(useCalculatorStore.getState().childrenCount).toBe(2);
    });

    it('should set childrenAgeGroup', () => {
      useCalculatorStore.getState().setChildrenAgeGroup('15-17');
      expect(useCalculatorStore.getState().childrenAgeGroup).toBe('15-17');
    });
  });

  describe('custodialParent setter', () => {
    it('should set custodialParent to 1', () => {
      useCalculatorStore.getState().setCustodialParent(1);
      expect(useCalculatorStore.getState().custodialParent).toBe(1);
    });

    it('should set custodialParent to 2', () => {
      useCalculatorStore.getState().setCustodialParent(2);
      expect(useCalculatorStore.getState().custodialParent).toBe(2);
    });
  });

  describe('additionalCosts setter', () => {
    it('should set education cost', () => {
      useCalculatorStore.getState().setAdditionalCost('education', 200000);
      expect(useCalculatorStore.getState().additionalCosts.education).toBe(200000);
    });

    it('should set medical cost', () => {
      useCalculatorStore.getState().setAdditionalCost('medical', 100000);
      expect(useCalculatorStore.getState().additionalCosts.medical).toBe(100000);
    });

    it('should set other cost', () => {
      useCalculatorStore.getState().setAdditionalCost('other', 50000);
      expect(useCalculatorStore.getState().additionalCosts.other).toBe(50000);
    });

    it('should set multiple costs independently', () => {
      useCalculatorStore.getState().setAdditionalCost('education', 200000);
      useCalculatorStore.getState().setAdditionalCost('medical', 100000);

      const { additionalCosts } = useCalculatorStore.getState();
      expect(additionalCosts.education).toBe(200000);
      expect(additionalCosts.medical).toBe(100000);
    });
  });

  describe('result management', () => {
    it('should set result', () => {
      const mockResult = {
        baseAmount: 500000,
        additionalAmount: 100000,
        totalAmount: 600000,
        nonCustodialPayment: 300000,
        parent1Ratio: 50,
        parent2Ratio: 50,
        combinedIncome: 10000000,
        breakdown: {
          incomeRange: '900~1000만원',
          childrenMultiplier: 100,
          ageMultiplier: 100,
          tableAmount: 500000,
          explanation: 'test',
        },
      };

      useCalculatorStore.getState().setResult(mockResult);
      expect(useCalculatorStore.getState().result).toEqual(mockResult);
    });

    it('should clear result', () => {
      const mockResult = {
        baseAmount: 500000,
        additionalAmount: 0,
        totalAmount: 500000,
        nonCustodialPayment: 250000,
        parent1Ratio: 50,
        parent2Ratio: 50,
        combinedIncome: 10000000,
        breakdown: {
          incomeRange: '900~1000만원',
          childrenMultiplier: 100,
          ageMultiplier: 100,
          tableAmount: 500000,
          explanation: 'test',
        },
      };

      useCalculatorStore.getState().setResult(mockResult);
      useCalculatorStore.getState().setResult(null);
      expect(useCalculatorStore.getState().result).toBeNull();
    });
  });

  describe('calculation state', () => {
    it('should set isCalculating', () => {
      useCalculatorStore.getState().setIsCalculating(true);
      expect(useCalculatorStore.getState().isCalculating).toBe(true);
    });

    it('should set error', () => {
      useCalculatorStore.getState().setError('계산 오류');
      expect(useCalculatorStore.getState().error).toBe('계산 오류');
    });

    it('should clear error', () => {
      useCalculatorStore.getState().setError('계산 오류');
      useCalculatorStore.getState().setError(null);
      expect(useCalculatorStore.getState().error).toBeNull();
    });
  });

  describe('getInput', () => {
    it('should return input object without additional costs when zero', () => {
      useCalculatorStore.getState().setParent1Income(4000000);
      useCalculatorStore.getState().setParent2Income(3000000);
      useCalculatorStore.getState().setChildrenCount(2);
      useCalculatorStore.getState().setChildrenAgeGroup('12-14');
      useCalculatorStore.getState().setCustodialParent(2);

      const input = useCalculatorStore.getState().getInput();

      expect(input.parent1Income).toBe(4000000);
      expect(input.parent2Income).toBe(3000000);
      expect(input.childrenCount).toBe(2);
      expect(input.childrenAgeGroup).toBe('12-14');
      expect(input.custodialParent).toBe(2);
      expect(input.additionalCosts).toBeUndefined();
    });

    it('should include additional costs when present', () => {
      useCalculatorStore.getState().setParent1Income(4000000);
      useCalculatorStore.getState().setParent2Income(3000000);
      useCalculatorStore.getState().setAdditionalCost('education', 200000);

      const input = useCalculatorStore.getState().getInput();

      expect(input.additionalCosts).toBeDefined();
      expect(input.additionalCosts?.education).toBe(200000);
    });
  });

  describe('reset', () => {
    it('should reset all state to initial values', () => {
      // Set various state
      useCalculatorStore.getState().setParent1Income(4000000);
      useCalculatorStore.getState().setParent2Income(3000000);
      useCalculatorStore.getState().setChildrenCount(3);
      useCalculatorStore.getState().setChildrenAgeGroup('15-17');
      useCalculatorStore.getState().setCustodialParent(2);
      useCalculatorStore.getState().setAdditionalCost('education', 200000);
      useCalculatorStore.getState().setIsCalculating(true);
      useCalculatorStore.getState().setError('test error');

      // Reset
      useCalculatorStore.getState().reset();

      const state = useCalculatorStore.getState();
      expect(state.parent1Income).toBe(0);
      expect(state.parent2Income).toBe(0);
      expect(state.childrenCount).toBe(1);
      expect(state.childrenAgeGroup).toBe('6-11');
      expect(state.custodialParent).toBe(1);
      expect(state.additionalCosts.education).toBe(0);
      expect(state.result).toBeNull();
      expect(state.isCalculating).toBe(false);
      expect(state.error).toBeNull();
    });
  });
});
