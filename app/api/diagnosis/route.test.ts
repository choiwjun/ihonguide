import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';

// Mock Supabase
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => Promise.resolve(null)),
}));

function createMockRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost:3000/api/diagnosis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

describe('POST /api/diagnosis', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('validation', () => {
    it('should return 400 for invalid answer format', async () => {
      const request = createMockRequest({
        answers: 'invalid',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('유효하지 않은 응답 형식입니다.');
    });

    it('should return 400 for missing questionId', async () => {
      const request = createMockRequest({
        answers: [
          { optionId: 'opt1', score: 3 },
        ],
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('유효하지 않은 응답 형식입니다.');
    });

    it('should return 400 for invalid score value', async () => {
      const request = createMockRequest({
        answers: [
          { questionId: 'q1', optionId: 'opt1', score: 5 },
        ],
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('유효하지 않은 응답 형식입니다.');
    });

    it('should return 400 for invalid question ID', async () => {
      const request = createMockRequest({
        answers: [
          { questionId: 'invalid_q', optionId: 'opt1', score: 3 },
          { questionId: 'q1', optionId: 'opt1', score: 3 },
          { questionId: 'q2', optionId: 'opt1', score: 3 },
          { questionId: 'q3', optionId: 'opt1', score: 3 },
          { questionId: 'q4', optionId: 'opt1', score: 3 },
        ],
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('유효하지 않은 질문 ID가 포함되어 있습니다.');
    });

    it('should return 400 for too few answers', async () => {
      const request = createMockRequest({
        answers: [
          { questionId: 'q1', optionId: 'q1_opt1', score: 3 },
          { questionId: 'q2', optionId: 'q2_opt1', score: 3 },
        ],
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('최소 5개 이상의 질문에 응답해야 합니다.');
    });
  });

  describe('successful calculation', () => {
    it('should calculate and return result for valid answers', async () => {
      const answers = [
        { questionId: 'q1', optionId: 'q1_opt1', score: 3 },
        { questionId: 'q2', optionId: 'q2_opt1', score: 3 },
        { questionId: 'q3', optionId: 'q3_opt1', score: 3 },
        { questionId: 'q4', optionId: 'q4_opt1', score: 3 },
        { questionId: 'q5', optionId: 'q5_opt1', score: 3 },
      ];

      const request = createMockRequest({ answers });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
      expect(data.data.score).toBe(15);
      expect(data.data.resultType).toBeDefined();
    });

    it('should return 협의 for high score', async () => {
      const answers = Array.from({ length: 10 }, (_, i) => ({
        questionId: `q${i + 1}`,
        optionId: `q${i + 1}_opt1`,
        score: 3,
      }));

      const request = createMockRequest({ answers });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.resultType).toBe('협의');
      expect(data.data.score).toBe(30);
    });

    it('should return 조정 for medium score', async () => {
      const answers = Array.from({ length: 10 }, (_, i) => ({
        questionId: `q${i + 1}`,
        optionId: `q${i + 1}_opt2`,
        score: 2,
      }));

      const request = createMockRequest({ answers });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.resultType).toBe('조정');
      expect(data.data.score).toBe(20);
    });

    it('should return 소송 for low score', async () => {
      const answers = Array.from({ length: 10 }, (_, i) => ({
        questionId: `q${i + 1}`,
        optionId: `q${i + 1}_opt3`,
        score: 1,
      }));

      const request = createMockRequest({ answers });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.resultType).toBe('소송');
      expect(data.data.score).toBe(10);
    });
  });

  describe('session handling', () => {
    it('should generate sessionId when not provided', async () => {
      const answers = Array.from({ length: 5 }, (_, i) => ({
        questionId: `q${i + 1}`,
        optionId: `q${i + 1}_opt1`,
        score: 3,
      }));

      const request = createMockRequest({ answers });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.sessionId).toBeDefined();
      expect(data.data.sessionId).toMatch(/^session_/);
    });

    it('should use provided sessionId', async () => {
      const answers = Array.from({ length: 5 }, (_, i) => ({
        questionId: `q${i + 1}`,
        optionId: `q${i + 1}_opt1`,
        score: 3,
      }));

      const request = createMockRequest({
        answers,
        sessionId: 'my_custom_session',
      });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.sessionId).toBe('my_custom_session');
    });
  });

  describe('result detail', () => {
    it('should include detail with reasons and nextSteps', async () => {
      const answers = Array.from({ length: 10 }, (_, i) => ({
        questionId: `q${i + 1}`,
        optionId: `q${i + 1}_opt1`,
        score: 3,
      }));

      const request = createMockRequest({ answers });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.detail).toBeDefined();
      expect(Array.isArray(data.data.detail.reasons)).toBe(true);
      expect(Array.isArray(data.data.detail.nextSteps)).toBe(true);
      expect(data.data.detail.estimatedDuration).toBeDefined();
    });
  });
});
