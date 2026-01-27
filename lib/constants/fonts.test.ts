import { describe, it, expect } from 'vitest';
import { FONT_URLS, FONT_FAMILIES } from './fonts';

describe('fonts', () => {
  describe('FONT_URLS', () => {
    it('should have Pretendard CDN URL', () => {
      expect(FONT_URLS.pretendard).toContain('pretendard');
      expect(FONT_URLS.pretendard).toContain('cdn.jsdelivr.net');
    });

    it('should have Noto Serif KR Google Fonts URL', () => {
      expect(FONT_URLS.notoSerifKr).toContain('Noto+Serif+KR');
      expect(FONT_URLS.notoSerifKr).toContain('fonts.googleapis.com');
    });
  });

  describe('FONT_FAMILIES', () => {
    it('should have sans font family with Pretendard as primary', () => {
      expect(FONT_FAMILIES.sans).toContain('Pretendard');
      expect(FONT_FAMILIES.sans).toContain('sans-serif');
    });

    it('should have serif font family with Noto Serif KR as primary', () => {
      expect(FONT_FAMILIES.serif).toContain('Noto Serif KR');
      expect(FONT_FAMILIES.serif).toContain('serif');
    });
  });
});
