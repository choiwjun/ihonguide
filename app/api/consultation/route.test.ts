/**
 * 상담 신청 API 테스트
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';

// Supabase 모킹
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => Promise.resolve({
    auth: {
      getUser: vi.fn(() => Promise.resolve({ data: { user: null }, error: null })),
    },
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: { id: 'test-id', ticket_number: 'CST-20260127-001' }, error: null })),
        })),
      })),
    })),
  })),
}));

function createMockRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost:3000/api/consultation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

describe('Consultation API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/consultation', () => {
    describe('validation', () => {
      it('should return 400 for missing name', async () => {
        const request = createMockRequest({
          phone: '010-1234-5678',
          consultationType: '이혼상담',
          message: '이혼 절차에 대해 상담 요청합니다.',
          privacyConsent: true,
        });
        const response = await POST(request);

        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.error).toContain('이름');
      });

      it('should return 400 for missing phone', async () => {
        const request = createMockRequest({
          name: '홍길동',
          consultationType: '이혼상담',
          message: '이혼 절차에 대해 상담 요청합니다.',
          privacyConsent: true,
        });
        const response = await POST(request);

        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.error).toContain('연락처');
      });

      it('should return 400 for invalid phone format', async () => {
        const request = createMockRequest({
          name: '홍길동',
          phone: '123',
          consultationType: '이혼상담',
          message: '이혼 절차에 대해 상담 요청합니다.',
          privacyConsent: true,
        });
        const response = await POST(request);

        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.error).toContain('연락처');
      });

      it('should return 400 for missing consultationType', async () => {
        const request = createMockRequest({
          name: '홍길동',
          phone: '010-1234-5678',
          message: '이혼 절차에 대해 상담 요청합니다.',
          privacyConsent: true,
        });
        const response = await POST(request);

        expect(response.status).toBe(400);
      });

      it('should return 400 for missing message', async () => {
        const request = createMockRequest({
          name: '홍길동',
          phone: '010-1234-5678',
          consultationType: '이혼상담',
          privacyConsent: true,
        });
        const response = await POST(request);

        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.error).toContain('상담 내용');
      });

      it('should return 400 for missing privacy consent', async () => {
        const request = createMockRequest({
          name: '홍길동',
          phone: '010-1234-5678',
          consultationType: '이혼상담',
          message: '이혼 절차에 대해 상담 요청합니다.',
          privacyConsent: false,
        });
        const response = await POST(request);

        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.error).toContain('동의');
      });

      it('should return 400 for invalid consultation type', async () => {
        const request = createMockRequest({
          name: '홍길동',
          phone: '010-1234-5678',
          consultationType: '잘못된유형',
          message: '이혼 절차에 대해 상담 요청합니다.',
          privacyConsent: true,
        });
        const response = await POST(request);

        expect(response.status).toBe(400);
      });
    });

    describe('successful submission', () => {
      it('should create consultation successfully', async () => {
        const request = createMockRequest({
          name: '홍길동',
          phone: '010-1234-5678',
          consultationType: '이혼상담',
          message: '이혼 절차에 대해 상담 요청합니다.',
          privacyConsent: true,
        });
        const response = await POST(request);

        expect(response.status).toBe(200);
        const data = await response.json();

        expect(data.success).toBe(true);
        expect(data.data).toBeDefined();
        expect(data.data.ticketNumber).toBeDefined();
      });

      it('should accept optional email', async () => {
        const request = createMockRequest({
          name: '홍길동',
          phone: '010-1234-5678',
          email: 'test@example.com',
          consultationType: '이혼상담',
          message: '이혼 절차에 대해 상담 요청합니다.',
          privacyConsent: true,
        });
        const response = await POST(request);

        expect(response.status).toBe(200);
      });

      it('should accept marketing consent', async () => {
        const request = createMockRequest({
          name: '홍길동',
          phone: '010-1234-5678',
          consultationType: '이혼상담',
          message: '이혼 절차에 대해 상담 요청합니다.',
          privacyConsent: true,
          marketingConsent: true,
        });
        const response = await POST(request);

        expect(response.status).toBe(200);
      });

      it('should return ticket number', async () => {
        const request = createMockRequest({
          name: '홍길동',
          phone: '010-1234-5678',
          consultationType: '양육비상담',
          message: '양육비 관련 상담 원합니다.',
          privacyConsent: true,
        });
        const response = await POST(request);
        const data = await response.json();

        expect(data.data.ticketNumber).toMatch(/^CST-/);
      });

      it('should return status as 접수', async () => {
        const request = createMockRequest({
          name: '홍길동',
          phone: '010-1234-5678',
          consultationType: '재산분할상담',
          message: '재산분할 상담 원합니다.',
          privacyConsent: true,
        });
        const response = await POST(request);
        const data = await response.json();

        expect(data.data.status).toBe('접수');
      });
    });
  });
});
