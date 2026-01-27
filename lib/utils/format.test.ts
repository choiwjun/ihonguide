import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatCurrencyInManwon,
  formatPhone,
  formatDate,
  formatPercent,
} from './format';

describe('format utilities', () => {
  describe('formatCurrency', () => {
    it('should format currency with commas and 원', () => {
      expect(formatCurrency(1000000)).toBe('1,000,000원');
    });

    it('should format zero', () => {
      expect(formatCurrency(0)).toBe('0원');
    });

    it('should format small numbers', () => {
      expect(formatCurrency(100)).toBe('100원');
    });

    it('should format large numbers', () => {
      expect(formatCurrency(1234567890)).toBe('1,234,567,890원');
    });
  });

  describe('formatCurrencyInManwon', () => {
    it('should convert to manwon', () => {
      expect(formatCurrencyInManwon(1000000)).toBe('100만원');
    });

    it('should round to nearest manwon', () => {
      expect(formatCurrencyInManwon(1005000)).toBe('101만원');
    });

    it('should format large amounts', () => {
      expect(formatCurrencyInManwon(100000000)).toBe('10,000만원');
    });
  });

  describe('formatPhone', () => {
    it('should format 11-digit phone number', () => {
      expect(formatPhone('01012345678')).toBe('010-1234-5678');
    });

    it('should format 10-digit phone number', () => {
      expect(formatPhone('0212345678')).toBe('02-1234-5678');
    });

    it('should return original if not valid length', () => {
      expect(formatPhone('123')).toBe('123');
    });

    it('should handle phone with existing formatting', () => {
      expect(formatPhone('010-1234-5678')).toBe('010-1234-5678');
    });
  });

  describe('formatDate', () => {
    it('should format date in short format', () => {
      const result = formatDate(new Date(2024, 0, 15));
      expect(result).toMatch(/2024.*01.*15/);
    });

    it('should format date in long format', () => {
      const result = formatDate(new Date(2024, 0, 15), 'long');
      expect(result).toMatch(/2024.*1.*15/);
    });

    it('should format today as 오늘', () => {
      const result = formatDate(new Date(), 'relative');
      expect(result).toBe('오늘');
    });

    it('should format yesterday as 어제', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const result = formatDate(yesterday, 'relative');
      expect(result).toBe('어제');
    });

    it('should format days ago', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const result = formatDate(threeDaysAgo, 'relative');
      expect(result).toBe('3일 전');
    });
  });

  describe('formatPercent', () => {
    it('should format percent', () => {
      expect(formatPercent(75)).toBe('75%');
    });

    it('should round to integer', () => {
      expect(formatPercent(75.6)).toBe('76%');
    });

    it('should handle 0', () => {
      expect(formatPercent(0)).toBe('0%');
    });

    it('should handle 100', () => {
      expect(formatPercent(100)).toBe('100%');
    });
  });
});
