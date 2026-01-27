/**
 * 분석 유틸리티 테스트
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// 모듈 전체를 다시 import하기 위해 resetModules 사용
describe('Analytics', () => {
  const mockGtag = vi.fn();

  beforeEach(() => {
    vi.resetModules();
    mockGtag.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('isGAEnabled', () => {
    it('should return false when gtag is not available', async () => {
      vi.stubGlobal('window', {});
      const { isGAEnabled } = await import('./analytics');
      expect(isGAEnabled()).toBe(false);
    });

    it('should return false when GA_MEASUREMENT_ID is not set', async () => {
      vi.stubGlobal('window', { gtag: mockGtag });
      const { isGAEnabled } = await import('./analytics');
      // 환경 변수가 설정되지 않았으므로 false 반환
      expect(isGAEnabled()).toBe(false);
    });
  });

  describe('trackEvent (when GA is disabled)', () => {
    it('should not call gtag when GA is disabled', async () => {
      vi.stubGlobal('window', { gtag: mockGtag });
      const { trackEvent } = await import('./analytics');
      trackEvent('test_event', { param1: 'value1' });
      // GA가 비활성화되어 있으므로 호출되지 않음
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe('trackDiagnosisStart (when GA is disabled)', () => {
    it('should not throw when GA is disabled', async () => {
      vi.stubGlobal('window', {});
      const { trackDiagnosisStart } = await import('./analytics');
      expect(() => trackDiagnosisStart()).not.toThrow();
    });
  });

  describe('trackDiagnosisComplete (when GA is disabled)', () => {
    it('should not throw when GA is disabled', async () => {
      vi.stubGlobal('window', {});
      const { trackDiagnosisComplete } = await import('./analytics');
      expect(() => trackDiagnosisComplete('협의이혼', 85)).not.toThrow();
    });
  });

  describe('trackCalculatorComplete (when GA is disabled)', () => {
    it('should not throw when GA is disabled', async () => {
      vi.stubGlobal('window', {});
      const { trackCalculatorComplete } = await import('./analytics');
      expect(() => trackCalculatorComplete('child_support', true)).not.toThrow();
    });
  });

  describe('trackConsultationSubmit (when GA is disabled)', () => {
    it('should not throw when GA is disabled', async () => {
      vi.stubGlobal('window', {});
      const { trackConsultationSubmit } = await import('./analytics');
      expect(() => trackConsultationSubmit('이혼상담')).not.toThrow();
    });
  });

  describe('trackBlogView (when GA is disabled)', () => {
    it('should not throw when GA is disabled', async () => {
      vi.stubGlobal('window', {});
      const { trackBlogView } = await import('./analytics');
      expect(() => trackBlogView('divorce-guide', '절차')).not.toThrow();
    });
  });

  describe('trackCTAClick (when GA is disabled)', () => {
    it('should not throw when GA is disabled', async () => {
      vi.stubGlobal('window', {});
      const { trackCTAClick } = await import('./analytics');
      expect(() => trackCTAClick('상담 신청', 'hero_section')).not.toThrow();
    });
  });

  describe('trackLogin (when GA is disabled)', () => {
    it('should not throw when GA is disabled', async () => {
      vi.stubGlobal('window', {});
      const { trackLogin } = await import('./analytics');
      expect(() => trackLogin('kakao')).not.toThrow();
    });
  });

  describe('trackSignUp (when GA is disabled)', () => {
    it('should not throw when GA is disabled', async () => {
      vi.stubGlobal('window', {});
      const { trackSignUp } = await import('./analytics');
      expect(() => trackSignUp('google')).not.toThrow();
    });
  });

  describe('trackPageView (when GA is disabled)', () => {
    it('should not throw when GA is disabled', async () => {
      vi.stubGlobal('window', {});
      const { trackPageView } = await import('./analytics');
      expect(() => trackPageView('/test', 'Test')).not.toThrow();
    });
  });
});
