/**
 * 폰트 설정 상수
 * 참조: docs/05-DesignSystem.md 섹션 3
 */

export const FONT_URLS = {
  pretendard:
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css',
  notoSerifKr:
    'https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&display=swap',
} as const;

export const FONT_FAMILIES = {
  sans: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  serif: "'Noto Serif KR', Georgia, 'Times New Roman', serif",
} as const;

export type FontKey = keyof typeof FONT_FAMILIES;
