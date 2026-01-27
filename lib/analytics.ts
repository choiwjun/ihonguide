/**
 * 분석 유틸리티
 * Google Analytics 4 이벤트 추적
 */

// GA4 타입 선언
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

// GA4 측정 ID (환경 변수에서 가져옴)
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * GA4가 로드되었는지 확인
 */
export function isGAEnabled(): boolean {
  return typeof window !== 'undefined' && !!window.gtag && !!GA_MEASUREMENT_ID;
}

/**
 * 페이지뷰 추적
 */
export function trackPageView(url: string, title?: string): void {
  if (!isGAEnabled()) return;

  window.gtag?.('config', GA_MEASUREMENT_ID!, {
    page_path: url,
    page_title: title,
  });
}

/**
 * 커스텀 이벤트 추적
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, unknown>
): void {
  if (!isGAEnabled()) return;

  window.gtag?.('event', eventName, parameters);
}

// 미리 정의된 이벤트들

/**
 * 진단 시작 이벤트
 */
export function trackDiagnosisStart(): void {
  trackEvent('diagnosis_start', {
    event_category: 'engagement',
    event_label: 'divorce_diagnosis',
  });
}

/**
 * 진단 완료 이벤트
 */
export function trackDiagnosisComplete(resultType: string, score: number): void {
  trackEvent('diagnosis_complete', {
    event_category: 'engagement',
    event_label: resultType,
    value: score,
  });
}

/**
 * 계산기 완료 이벤트
 */
export function trackCalculatorComplete(
  calculatorType: 'child_support' | 'property_division',
  hasResult: boolean
): void {
  trackEvent('calculator_complete', {
    event_category: 'engagement',
    event_label: calculatorType,
    value: hasResult ? 1 : 0,
  });
}

/**
 * 상담 신청 이벤트 (전환 이벤트)
 */
export function trackConsultationSubmit(consultationType: string): void {
  trackEvent('consultation_submit', {
    event_category: 'conversion',
    event_label: consultationType,
  });
}

/**
 * 블로그 조회 이벤트
 */
export function trackBlogView(slug: string, category?: string): void {
  trackEvent('blog_view', {
    event_category: 'content',
    event_label: slug,
    content_type: category || 'general',
  });
}

/**
 * CTA 클릭 이벤트
 */
export function trackCTAClick(ctaName: string, location: string): void {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: ctaName,
    content_group: location,
  });
}

/**
 * 로그인 이벤트
 */
export function trackLogin(method: 'kakao' | 'google' | 'email'): void {
  trackEvent('login', {
    method,
  });
}

/**
 * 회원가입 이벤트
 */
export function trackSignUp(method: 'kakao' | 'google' | 'email'): void {
  trackEvent('sign_up', {
    method,
  });
}
