import { describe, it, expect } from 'vitest';
import { NAVIGATION_ITEMS, FOOTER_LINKS, AUTH_LINKS } from './navigation';

describe('navigation constants', () => {
  describe('NAVIGATION_ITEMS', () => {
    it('should have at least 5 navigation items', () => {
      expect(NAVIGATION_ITEMS.length).toBeGreaterThanOrEqual(5);
    });

    it('should include home link', () => {
      const homeItem = NAVIGATION_ITEMS.find((item) => item.href === '/');
      expect(homeItem).toBeDefined();
      expect(homeItem?.label).toBe('홈');
    });

    it('should include diagnosis link', () => {
      const diagnosisItem = NAVIGATION_ITEMS.find((item) => item.href === '/diagnosis');
      expect(diagnosisItem).toBeDefined();
      expect(diagnosisItem?.label).toBe('이혼 유형 진단');
    });

    it('should include calculator link', () => {
      const calculatorItem = NAVIGATION_ITEMS.find((item) => item.href === '/calculator');
      expect(calculatorItem).toBeDefined();
      expect(calculatorItem?.label).toBe('양육비 계산기');
    });

    it('should include consultation link', () => {
      const consultationItem = NAVIGATION_ITEMS.find((item) => item.href === '/consultation');
      expect(consultationItem).toBeDefined();
      expect(consultationItem?.label).toBe('상담 신청');
    });

    it('should have valid href for all items', () => {
      NAVIGATION_ITEMS.forEach((item) => {
        expect(item.href).toMatch(/^\//);
        expect(item.label).toBeTruthy();
      });
    });
  });

  describe('FOOTER_LINKS', () => {
    it('should have footer links', () => {
      expect(FOOTER_LINKS.length).toBeGreaterThan(0);
    });

    it('should include privacy link', () => {
      const privacyItem = FOOTER_LINKS.find((item) => item.href === '/privacy');
      expect(privacyItem).toBeDefined();
    });

    it('should include terms link', () => {
      const termsItem = FOOTER_LINKS.find((item) => item.href === '/terms');
      expect(termsItem).toBeDefined();
    });
  });

  describe('AUTH_LINKS', () => {
    it('should have login link', () => {
      expect(AUTH_LINKS.login).toBe('/login');
    });

    it('should have logout link', () => {
      expect(AUTH_LINKS.logout).toBe('/logout');
    });

    it('should have profile link', () => {
      expect(AUTH_LINKS.profile).toBe('/profile');
    });
  });
});
