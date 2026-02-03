/**
 * HTML 콘텐츠 sanitize 유틸리티
 * XSS 공격 방지를 위한 HTML 정화
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * HTML 콘텐츠를 안전하게 정화
 * 허용된 태그와 속성만 남기고 나머지는 제거
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'ul', 'ol', 'li',
      'blockquote', 'pre', 'code',
      'strong', 'em', 'u', 's', 'mark',
      'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span',
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel',
      'src', 'alt', 'width', 'height',
      'class', 'id',
    ],
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ['target'], // 링크에 target 허용
    FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'input', 'button'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  });
}

/**
 * 텍스트 입력 sanitize (HTML 태그 완전 제거)
 * 클라이언트 사이드에서만 사용
 */
export function sanitizeText(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

/**
 * 서버 사이드용 텍스트 sanitize (jsdom 없이)
 * API 라우트에서 사용
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
