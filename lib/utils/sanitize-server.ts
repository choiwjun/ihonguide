/**
 * 서버 사이드용 텍스트 sanitize 유틸리티
 * jsdom이나 DOMPurify 없이 동작
 * API 라우트에서 사용
 */

/**
 * 서버 사이드용 텍스트 sanitize
 */
export function sanitizeTextServer(dirty: string): string {
  if (!dirty) return '';

  return dirty
    // HTML 태그 제거
    .replace(/<[^>]*>/g, '')
    // HTML 엔티티 디코드
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    // 스크립트 관련 위험한 패턴 제거
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    // 연속 공백 정리
    .replace(/\s+/g, ' ')
    .trim();
}
