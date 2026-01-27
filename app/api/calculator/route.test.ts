/**
 * 양육비 계산기 API 테스트
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
          single: vi.fn(() => Promise.resolve({ data: { id: 'test-id' }, error: null })),
        })),
      })),
    })),
  })),
}));

function createMockRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost:3000/api/calculator', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

describe('Calculator API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/calculator', () => {
    describe('validation', () => {
      it('should return 400 for missing required fields', async () => {
        const request = createMockRequest({});
        const response = await POST(request);

        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.error).toBeDefined();
      });

      it('should return 400 for invalid parent1Income', async () => {
        const request = createMockRequest({
          parent1Income: -1000,
          parent2Income: 3000000,
          childrenCount: 1,
          childrenAgeGroup: '6-11',
          custodialParent: 1,
        });
        const response = await POST(request);

        expect(response.status).toBe(400);
      });

      it('should return 400 for invalid childrenCount', async () => {
        const request = createMockRequest({
          parent1Income: 4000000,
          parent2Income: 3000000,
          childrenCount: 0,
          childrenAgeGroup: '6-11',
          custodialParent: 1,
        });
        const response = await POST(request);

        expect(response.status).toBe(400);
      });

      it('should return 400 for invalid childrenAgeGroup', async () => {
        const request = createMockRequest({
          parent1Income: 4000000,
          parent2Income: 3000000,
          childrenCount: 1,
          childrenAgeGroup: 'invalid',
          custodialParent: 1,
        });
        const response = await POST(request);

        expect(response.status).toBe(400);
      });

      it('should return 400 for invalid custodialParent', async () => {
        const request = createMockRequest({
          parent1Income: 4000000,
          parent2Income: 3000000,
          childrenCount: 1,
          childrenAgeGroup: '6-11',
          custodialParent: 3,
        });
        const response = await POST(request);

        expect(response.status).toBe(400);
      });
    });

    describe('successful calculation', () => {
      it('should calculate child support successfully', async () => {
        const request = createMockRequest({
          parent1Income: 4000000,
          parent2Income: 3000000,
          childrenCount: 1,
          childrenAgeGroup: '6-11',
          custodialParent: 1,
        });
        const response = await POST(request);

        expect(response.status).toBe(200);
        const data = await response.json();

        expect(data.success).toBe(true);
        expect(data.data).toBeDefined();
        expect(data.data.baseAmount).toBeGreaterThan(0);
        expect(data.data.totalAmount).toBeGreaterThan(0);
        expect(data.data.nonCustodialPayment).toBeGreaterThan(0);
      });

      it('should return combinedIncome', async () => {
        const request = createMockRequest({
          parent1Income: 4000000,
          parent2Income: 3000000,
          childrenCount: 1,
          childrenAgeGroup: '6-11',
          custodialParent: 1,
        });
        const response = await POST(request);
        const data = await response.json();

        expect(data.data.combinedIncome).toBe(7000000);
      });

      it('should calculate correct income ratios', async () => {
        const request = createMockRequest({
          parent1Income: 6000000,
          parent2Income: 4000000,
          childrenCount: 1,
          childrenAgeGroup: '3-5',
          custodialParent: 1,
        });
        const response = await POST(request);
        const data = await response.json();

        expect(data.data.parent1Ratio).toBe(60);
        expect(data.data.parent2Ratio).toBe(40);
      });

      it('should include breakdown', async () => {
        const request = createMockRequest({
          parent1Income: 4000000,
          parent2Income: 3000000,
          childrenCount: 2,
          childrenAgeGroup: '12-14',
          custodialParent: 1,
        });
        const response = await POST(request);
        const data = await response.json();

        expect(data.data.breakdown).toBeDefined();
        expect(data.data.breakdown.incomeRange).toBeDefined();
        expect(data.data.breakdown.childrenMultiplier).toBe(180);
        expect(data.data.breakdown.ageMultiplier).toBe(120);
      });
    });

    describe('additional costs', () => {
      it('should include additional education costs', async () => {
        const request = createMockRequest({
          parent1Income: 4000000,
          parent2Income: 3000000,
          childrenCount: 1,
          childrenAgeGroup: '6-11',
          custodialParent: 1,
          additionalCosts: {
            education: 200000,
          },
        });
        const response = await POST(request);
        const data = await response.json();

        expect(data.data.additionalAmount).toBe(200000);
      });

      it('should include all additional costs', async () => {
        const request = createMockRequest({
          parent1Income: 4000000,
          parent2Income: 3000000,
          childrenCount: 1,
          childrenAgeGroup: '6-11',
          custodialParent: 1,
          additionalCosts: {
            education: 200000,
            medical: 100000,
            other: 50000,
          },
        });
        const response = await POST(request);
        const data = await response.json();

        expect(data.data.additionalAmount).toBe(350000);
      });
    });

    describe('session handling', () => {
      it('should return sessionId', async () => {
        const request = createMockRequest({
          parent1Income: 4000000,
          parent2Income: 3000000,
          childrenCount: 1,
          childrenAgeGroup: '6-11',
          custodialParent: 1,
        });
        const response = await POST(request);
        const data = await response.json();

        expect(data.data.sessionId).toBeDefined();
        expect(data.data.sessionId).toMatch(/^session_/);
      });

      it('should use provided sessionId', async () => {
        const request = createMockRequest({
          parent1Income: 4000000,
          parent2Income: 3000000,
          childrenCount: 1,
          childrenAgeGroup: '6-11',
          custodialParent: 1,
          sessionId: 'my-custom-session-id',
        });
        const response = await POST(request);
        const data = await response.json();

        expect(data.data.sessionId).toBe('my-custom-session-id');
      });
    });
  });
});
