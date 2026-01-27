import { describe, it, expect } from 'vitest';
import type {
  DiagnosisQuestion,
  DiagnosisAnswer,
  DiagnosisResult,
  DiagnosisResultType,
  DiagnosisResultDetail,
  SavedDiagnosisResult,
} from './diagnosis';
import {
  DIAGNOSIS_SCORE_RANGES,
  DIAGNOSIS_CATEGORY_LABELS,
} from './diagnosis';

describe('diagnosis types', () => {
  describe('type compilation', () => {
    it('should compile DiagnosisQuestion type', () => {
      const question: DiagnosisQuestion = {
        id: 'q1',
        order: 1,
        category: 'communication',
        question: '배우자와 대화가 가능한가요?',
        options: [
          { id: 'opt1', label: '원활하게 대화 가능', score: 3 },
          { id: 'opt2', label: '어느 정도 대화 가능', score: 2 },
          { id: 'opt3', label: '대화가 거의 불가능', score: 1 },
        ],
      };
      expect(question.id).toBe('q1');
      expect(question.category).toBe('communication');
      expect(question.options).toHaveLength(3);
    });

    it('should compile DiagnosisAnswer type', () => {
      const answer: DiagnosisAnswer = {
        questionId: 'q1',
        optionId: 'opt1',
        score: 3,
      };
      expect(answer.questionId).toBe('q1');
      expect(answer.score).toBe(3);
    });

    it('should compile DiagnosisResult type', () => {
      const result: DiagnosisResult = {
        resultType: '협의',
        score: 28,
        totalQuestions: 10,
        answeredQuestions: 10,
        detail: {
          recommendation: '협의',
          reasons: ['원활한 의사소통', '재산분할 합의 가능'],
          nextSteps: ['협의이혼 의사 확인서 작성', '법원 제출'],
          estimatedDuration: '1-2개월',
        },
        createdAt: new Date(),
      };
      expect(result.resultType).toBe('협의');
      expect(result.score).toBe(28);
    });

    it('should compile DiagnosisResultDetail type', () => {
      const detail: DiagnosisResultDetail = {
        recommendation: '조정',
        reasons: ['재산분할 이견 존재', '양육권 조율 필요'],
        nextSteps: ['가정법원 조정 신청', '조정위원회 참석'],
        estimatedDuration: '3-6개월',
        additionalInfo: '조정 성공률은 약 70%입니다.',
      };
      expect(detail.recommendation).toBe('조정');
      expect(detail.reasons).toHaveLength(2);
    });

    it('should compile SavedDiagnosisResult type', () => {
      const saved: SavedDiagnosisResult = {
        id: 'uuid-123',
        sessionId: 'session-456',
        answers: {
          q1: { questionId: 'q1', optionId: 'opt1', score: 3 },
        },
        resultType: '소송',
        score: 12,
        resultDetail: {
          recommendation: '소송',
          reasons: ['합의 불가'],
          nextSteps: ['변호사 상담'],
          estimatedDuration: '6-12개월',
        },
        createdAt: new Date(),
      };
      expect(saved.id).toBe('uuid-123');
      expect(saved.resultType).toBe('소송');
    });

    it('should compile DiagnosisResultType', () => {
      const types: DiagnosisResultType[] = ['협의', '조정', '소송'];
      expect(types).toContain('협의');
      expect(types).toContain('조정');
      expect(types).toContain('소송');
    });
  });

  describe('DIAGNOSIS_SCORE_RANGES', () => {
    it('should have correct range for 협의이혼', () => {
      expect(DIAGNOSIS_SCORE_RANGES.협의.min).toBe(25);
      expect(DIAGNOSIS_SCORE_RANGES.협의.max).toBe(Infinity);
    });

    it('should have correct range for 조정이혼', () => {
      expect(DIAGNOSIS_SCORE_RANGES.조정.min).toBe(15);
      expect(DIAGNOSIS_SCORE_RANGES.조정.max).toBe(24);
    });

    it('should have correct range for 소송이혼', () => {
      expect(DIAGNOSIS_SCORE_RANGES.소송.min).toBe(0);
      expect(DIAGNOSIS_SCORE_RANGES.소송.max).toBe(14);
    });
  });

  describe('DIAGNOSIS_CATEGORY_LABELS', () => {
    it('should have all category labels', () => {
      expect(DIAGNOSIS_CATEGORY_LABELS.communication).toBe('의사소통');
      expect(DIAGNOSIS_CATEGORY_LABELS.property).toBe('재산');
      expect(DIAGNOSIS_CATEGORY_LABELS.children).toBe('자녀');
      expect(DIAGNOSIS_CATEGORY_LABELS.agreement).toBe('합의');
      expect(DIAGNOSIS_CATEGORY_LABELS.situation).toBe('상황');
    });
  });
});
