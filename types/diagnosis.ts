/**
 * 이혼 유형 진단 관련 타입 정의
 */

/**
 * 진단 질문 옵션
 */
export interface DiagnosisOption {
  id: string;
  label: string;
  score: number;
}

/**
 * 진단 질문
 */
export interface DiagnosisQuestion {
  id: string;
  order: number;
  category: 'communication' | 'property' | 'children' | 'agreement' | 'situation';
  question: string;
  description?: string;
  options: DiagnosisOption[];
}

/**
 * 사용자의 질문 응답
 */
export interface DiagnosisAnswer {
  questionId: string;
  optionId: string;
  score: number;
}

/**
 * 진단 결과 유형
 */
export type DiagnosisResultType = '협의' | '조정' | '소송';

/**
 * 진단 결과 상세
 */
export interface DiagnosisResultDetail {
  recommendation: DiagnosisResultType;
  reasons: string[];
  nextSteps: string[];
  estimatedDuration: string;
  additionalInfo?: string;
}

/**
 * 진단 결과
 */
export interface DiagnosisResult {
  resultType: DiagnosisResultType;
  score: number;
  totalQuestions: number;
  answeredQuestions: number;
  detail: DiagnosisResultDetail;
  createdAt: Date;
}

/**
 * 저장용 진단 결과 (DB 스키마와 매핑)
 */
export interface SavedDiagnosisResult {
  id: string;
  userId?: string;
  sessionId: string;
  answers: Record<string, DiagnosisAnswer>;
  resultType: DiagnosisResultType;
  score: number;
  resultDetail: DiagnosisResultDetail;
  createdAt: Date;
}

/**
 * 점수 범위 상수
 */
export const DIAGNOSIS_SCORE_RANGES = {
  협의: { min: 25, max: Infinity },
  조정: { min: 15, max: 24 },
  소송: { min: 0, max: 14 },
} as const;

/**
 * 질문 카테고리 라벨
 */
export const DIAGNOSIS_CATEGORY_LABELS: Record<DiagnosisQuestion['category'], string> = {
  communication: '의사소통',
  property: '재산',
  children: '자녀',
  agreement: '합의',
  situation: '상황',
};
