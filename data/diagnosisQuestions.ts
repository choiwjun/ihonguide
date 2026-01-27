/**
 * 이혼 유형 진단 질문 데이터
 * 총 10문항, 각 문항 1-3점
 */

import type { DiagnosisQuestion } from '@/types/diagnosis';

export const diagnosisQuestions: DiagnosisQuestion[] = [
  {
    id: 'q1',
    order: 1,
    category: 'communication',
    question: '배우자와 이혼에 대해 대화가 가능한가요?',
    description: '이혼 의사와 조건에 대해 대화할 수 있는 상태인지 확인합니다.',
    options: [
      { id: 'q1_opt1', label: '원활하게 대화 가능', score: 3 },
      { id: 'q1_opt2', label: '제한적으로 대화 가능', score: 2 },
      { id: 'q1_opt3', label: '대화가 거의 불가능', score: 1 },
    ],
  },
  {
    id: 'q2',
    order: 2,
    category: 'agreement',
    question: '배우자도 이혼에 동의하고 있나요?',
    description: '양측이 이혼에 대해 합의한 상태인지 확인합니다.',
    options: [
      { id: 'q2_opt1', label: '네, 양측 모두 동의', score: 3 },
      { id: 'q2_opt2', label: '배우자가 망설이고 있음', score: 2 },
      { id: 'q2_opt3', label: '배우자가 반대하고 있음', score: 1 },
    ],
  },
  {
    id: 'q3',
    order: 3,
    category: 'property',
    question: '재산분할에 대해 합의가 가능할 것 같나요?',
    description: '부동산, 예금, 부채 등 재산 분할에 대한 합의 가능성을 확인합니다.',
    options: [
      { id: 'q3_opt1', label: '합의 가능할 것 같음', score: 3 },
      { id: 'q3_opt2', label: '일부 이견이 있으나 조율 가능', score: 2 },
      { id: 'q3_opt3', label: '합의가 어려울 것 같음', score: 1 },
    ],
  },
  {
    id: 'q4',
    order: 4,
    category: 'children',
    question: '미성년 자녀가 있나요?',
    description: '만 19세 미만의 자녀 유무를 확인합니다.',
    options: [
      { id: 'q4_opt1', label: '자녀가 없음', score: 3 },
      { id: 'q4_opt2', label: '자녀가 있으나 양육에 대한 합의 가능', score: 2 },
      { id: 'q4_opt3', label: '자녀가 있고 양육권 분쟁 예상', score: 1 },
    ],
  },
  {
    id: 'q5',
    order: 5,
    category: 'children',
    question: '양육비에 대해 합의가 가능할 것 같나요?',
    description: '자녀 양육비 지급에 대한 합의 가능성을 확인합니다.',
    options: [
      { id: 'q5_opt1', label: '해당없음 또는 합의 가능', score: 3 },
      { id: 'q5_opt2', label: '금액에 대한 조율 필요', score: 2 },
      { id: 'q5_opt3', label: '합의가 어려울 것 같음', score: 1 },
    ],
  },
  {
    id: 'q6',
    order: 6,
    category: 'situation',
    question: '가정폭력이나 부정행위 등 유책사유가 있나요?',
    description: '법적으로 인정되는 이혼 사유의 유무를 확인합니다.',
    options: [
      { id: 'q6_opt1', label: '없음 (성격차이 등)', score: 3 },
      { id: 'q6_opt2', label: '경미한 사유 있음', score: 2 },
      { id: 'q6_opt3', label: '명백한 유책사유 있음', score: 1 },
    ],
  },
  {
    id: 'q7',
    order: 7,
    category: 'agreement',
    question: '위자료에 대해 어떻게 생각하시나요?',
    description: '위자료 청구 또는 지급에 대한 입장을 확인합니다.',
    options: [
      { id: 'q7_opt1', label: '위자료 청구/지급 없이 합의 가능', score: 3 },
      { id: 'q7_opt2', label: '금액에 대한 조율 필요', score: 2 },
      { id: 'q7_opt3', label: '위자료 문제로 분쟁 예상', score: 1 },
    ],
  },
  {
    id: 'q8',
    order: 8,
    category: 'situation',
    question: '현재 별거 중이신가요?',
    description: '별거 기간과 상태를 확인합니다.',
    options: [
      { id: 'q8_opt1', label: '아니요, 함께 거주 중', score: 3 },
      { id: 'q8_opt2', label: '별거 1년 미만', score: 2 },
      { id: 'q8_opt3', label: '별거 1년 이상', score: 1 },
    ],
  },
  {
    id: 'q9',
    order: 9,
    category: 'communication',
    question: '이혼 후에도 원만한 관계 유지가 가능할 것 같나요?',
    description: '이혼 후 관계(특히 자녀가 있는 경우)에 대한 전망을 확인합니다.',
    options: [
      { id: 'q9_opt1', label: '원만한 관계 유지 가능', score: 3 },
      { id: 'q9_opt2', label: '필요한 경우에만 연락', score: 2 },
      { id: 'q9_opt3', label: '관계 단절 예상', score: 1 },
    ],
  },
  {
    id: 'q10',
    order: 10,
    category: 'situation',
    question: '이혼 절차를 빠르게 진행하고 싶으신가요?',
    description: '이혼 절차의 시급성을 확인합니다.',
    options: [
      { id: 'q10_opt1', label: '서두르지 않음, 충분히 합의하고 싶음', score: 3 },
      { id: 'q10_opt2', label: '적당한 속도로 진행하고 싶음', score: 2 },
      { id: 'q10_opt3', label: '최대한 빨리 끝내고 싶음', score: 1 },
    ],
  },
];

/**
 * 질문 ID로 질문 찾기
 */
export function getQuestionById(id: string): DiagnosisQuestion | undefined {
  return diagnosisQuestions.find((q) => q.id === id);
}

/**
 * 특정 카테고리의 질문 찾기
 */
export function getQuestionsByCategory(
  category: DiagnosisQuestion['category']
): DiagnosisQuestion[] {
  return diagnosisQuestions.filter((q) => q.category === category);
}
