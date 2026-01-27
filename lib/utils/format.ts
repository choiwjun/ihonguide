/**
 * 포맷팅 유틸리티 함수
 */

/**
 * 숫자를 한국 원화 형식으로 포맷팅
 * @param amount - 포맷팅할 금액
 * @returns 포맷팅된 금액 문자열 (예: "1,000,000원")
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR').format(amount) + '원';
}

/**
 * 숫자를 만원 단위로 포맷팅
 * @param amount - 포맷팅할 금액 (원 단위)
 * @returns 포맷팅된 금액 문자열 (예: "100만원")
 */
export function formatCurrencyInManwon(amount: number): string {
  const manwon = Math.round(amount / 10000);
  return new Intl.NumberFormat('ko-KR').format(manwon) + '만원';
}

/**
 * 전화번호 포맷팅
 * @param phone - 포맷팅할 전화번호 (숫자만)
 * @returns 포맷팅된 전화번호 (예: "010-1234-5678")
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }

  if (cleaned.length === 10) {
    // 서울 지역번호 (02)는 2-4-4 패턴
    if (cleaned.startsWith('02')) {
      return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    // 그 외 지역번호는 3-3-4 패턴
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  return phone;
}

/**
 * 날짜 포맷팅
 * @param date - 포맷팅할 날짜
 * @param format - 포맷 형식 ('short' | 'long' | 'relative')
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDate(date: Date | string, format: 'short' | 'long' | 'relative' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (format === 'relative') {
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return '오늘';
    if (days === 1) return '어제';
    if (days < 7) return `${days}일 전`;
    if (days < 30) return `${Math.floor(days / 7)}주 전`;
    if (days < 365) return `${Math.floor(days / 30)}개월 전`;
    return `${Math.floor(days / 365)}년 전`;
  }

  const options: Intl.DateTimeFormatOptions = format === 'long'
    ? { year: 'numeric', month: 'long', day: 'numeric' }
    : { year: 'numeric', month: '2-digit', day: '2-digit' };

  return new Intl.DateTimeFormat('ko-KR', options).format(d);
}

/**
 * 퍼센트 포맷팅
 * @param value - 포맷팅할 값 (0-100)
 * @returns 포맷팅된 퍼센트 문자열 (예: "75%")
 */
export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}
