/**
 * 네비게이션 상수
 */

export interface NavigationItem {
  href: string;
  label: string;
  description?: string;
}

/**
 * 메인 네비게이션 항목
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { href: '/', label: '홈', description: '메인 페이지' },
  { href: '/diagnosis', label: '이혼 유형 진단', description: '나에게 맞는 이혼 방식 알아보기' },
  { href: '/calculator', label: '양육비 계산기', description: '예상 양육비 계산하기' },
  { href: '/guide', label: '가이드', description: '이혼 절차 안내' },
  { href: '/consultation', label: '상담 신청', description: '전문가 상담 신청하기' },
];

/**
 * 푸터 링크 항목
 */
export const FOOTER_LINKS: NavigationItem[] = [
  { href: '/privacy', label: '개인정보처리방침' },
  { href: '/terms', label: '이용약관' },
  { href: '/contact', label: '문의하기' },
];

/**
 * 인증 관련 링크
 */
export const AUTH_LINKS = {
  login: '/login',
  logout: '/logout',
  profile: '/profile',
} as const;
