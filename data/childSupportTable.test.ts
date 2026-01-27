import { describe, it, expect } from 'vitest';
import {
  childSupportTable,
  findTableEntry,
  getBaseAmount,
  getIncomeRangeLabel,
  getAllIncomeRanges,
} from './childSupportTable';

describe('childSupportTable', () => {
  describe('table data', () => {
    it('should have at least 10 income ranges', () => {
      expect(childSupportTable.length).toBeGreaterThanOrEqual(10);
    });

    it('should have sequential income ranges without gaps', () => {
      for (let i = 1; i < childSupportTable.length; i++) {
        const prev = childSupportTable[i - 1];
        const curr = childSupportTable[i];
        // Previous max + 1 should equal current min
        expect(curr.incomeRange.min).toBe(prev.incomeRange.max + 1);
      }
    });

    it('should have increasing base amounts', () => {
      for (let i = 1; i < childSupportTable.length; i++) {
        const prev = childSupportTable[i - 1];
        const curr = childSupportTable[i];
        expect(curr.baseAmount).toBeGreaterThan(prev.baseAmount);
      }
    });

    it('should start from 0 income', () => {
      expect(childSupportTable[0].incomeRange.min).toBe(0);
    });

    it('should end with Infinity for highest range', () => {
      const lastEntry = childSupportTable[childSupportTable.length - 1];
      expect(lastEntry.incomeRange.max).toBe(Infinity);
    });

    it('should have labels for all entries', () => {
      childSupportTable.forEach((entry) => {
        expect(entry.incomeRange.label).toBeTruthy();
        expect(entry.incomeRange.label.length).toBeGreaterThan(0);
      });
    });

    it('should have positive base amounts', () => {
      childSupportTable.forEach((entry) => {
        expect(entry.baseAmount).toBeGreaterThan(0);
      });
    });
  });

  describe('findTableEntry', () => {
    it('should find entry for lowest income', () => {
      const entry = findTableEntry(1000000);
      expect(entry.incomeRange.label).toContain('200만원 미만');
    });

    it('should find entry for middle income (500만원)', () => {
      const entry = findTableEntry(5000000);
      expect(entry.incomeRange.min).toBeLessThanOrEqual(5000000);
      expect(entry.incomeRange.max).toBeGreaterThanOrEqual(5000000);
    });

    it('should find entry for high income (1500만원)', () => {
      const entry = findTableEntry(15000000);
      expect(entry.incomeRange.min).toBeLessThanOrEqual(15000000);
      expect(entry.incomeRange.max).toBeGreaterThanOrEqual(15000000);
    });

    it('should find entry for very high income (2000만원)', () => {
      const entry = findTableEntry(20000000);
      expect(entry.incomeRange.max).toBe(Infinity);
    });

    it('should return first entry for zero income', () => {
      const entry = findTableEntry(0);
      expect(entry).toEqual(childSupportTable[0]);
    });

    it('should find correct entry for boundary values', () => {
      // Test at 200만원 boundary
      const entryBelow = findTableEntry(1999999);
      const entryAt = findTableEntry(2000000);
      expect(entryBelow.incomeRange.label).toContain('200만원 미만');
      expect(entryAt.incomeRange.label).toContain('200~300');
    });
  });

  describe('getBaseAmount', () => {
    it('should return correct amount for 300만원 income', () => {
      const amount = getBaseAmount(3000000);
      expect(amount).toBeGreaterThan(0);
      expect(amount).toBeLessThan(1000000); // Reasonable range
    });

    it('should return correct amount for 700만원 income', () => {
      const amount = getBaseAmount(7000000);
      expect(amount).toBeGreaterThan(getBaseAmount(3000000));
    });

    it('should return higher amount for higher income', () => {
      const lowAmount = getBaseAmount(3000000);
      const midAmount = getBaseAmount(6000000);
      const highAmount = getBaseAmount(10000000);

      expect(midAmount).toBeGreaterThan(lowAmount);
      expect(highAmount).toBeGreaterThan(midAmount);
    });

    it('should return consistent amount for same income', () => {
      const amount1 = getBaseAmount(5000000);
      const amount2 = getBaseAmount(5000000);
      expect(amount1).toBe(amount2);
    });
  });

  describe('getIncomeRangeLabel', () => {
    it('should return label for low income', () => {
      const label = getIncomeRangeLabel(1500000);
      expect(label).toBe('200만원 미만');
    });

    it('should return label for middle income', () => {
      const label = getIncomeRangeLabel(5500000);
      expect(label).toContain('500');
    });

    it('should return label for high income', () => {
      const label = getIncomeRangeLabel(20000000);
      expect(label).toContain('1600만원 이상');
    });
  });

  describe('getAllIncomeRanges', () => {
    it('should return all income range labels', () => {
      const ranges = getAllIncomeRanges();
      expect(ranges.length).toBe(childSupportTable.length);
    });

    it('should include lowest range', () => {
      const ranges = getAllIncomeRanges();
      expect(ranges).toContain('200만원 미만');
    });

    it('should include highest range', () => {
      const ranges = getAllIncomeRanges();
      expect(ranges).toContain('1600만원 이상');
    });
  });
});
