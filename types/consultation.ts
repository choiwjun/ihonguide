/**
 * 상담 신청 관련 타입 정의
 */

/**
 * 상담 유형
 */
export type ConsultationType = '이혼상담' | '양육비상담' | '재산분할상담' | '기타';

/**
 * 상담 신청 입력 데이터
 */
export interface ConsultationInput {
  /** 이름 */
  name: string;
  /** 연락처 */
  phone: string;
  /** 이메일 (선택) */
  email?: string;
  /** 상담 유형 */
  consultationType: ConsultationType;
  /** 상담 내용 */
  message: string;
  /** 개인정보 동의 */
  privacyConsent: boolean;
  /** 마케팅 수신 동의 (선택) */
  marketingConsent?: boolean;
}

/**
 * 상담 신청 결과
 */
export interface ConsultationResult {
  /** 신청 ID */
  id: string;
  /** 접수 번호 */
  ticketNumber: string;
  /** 신청 일시 */
  createdAt: string;
  /** 상태 */
  status: ConsultationStatus;
}

/**
 * 상담 신청 상태
 */
export type ConsultationStatus = '접수' | '검토중' | '상담예정' | '완료' | '취소';

/**
 * 저장용 상담 데이터 (DB 스키마와 매핑)
 */
export interface SavedConsultation {
  id: string;
  userId?: string;
  sessionId: string;
  name: string;
  phone: string;
  email?: string;
  consultationType: ConsultationType;
  message: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
  status: ConsultationStatus;
  ticketNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 상담 유형 옵션
 */
export const CONSULTATION_TYPE_OPTIONS: { value: ConsultationType; label: string }[] = [
  { value: '이혼상담', label: '이혼 절차 상담' },
  { value: '양육비상담', label: '양육비 상담' },
  { value: '재산분할상담', label: '재산분할 상담' },
  { value: '기타', label: '기타 상담' },
];
