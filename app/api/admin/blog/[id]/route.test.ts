/**
 * 관리자 블로그 API 테스트 - PATCH/DELETE /api/admin/blog/[id]
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { PATCH, DELETE } from './route';

const verifyAdminAuthMock = vi.fn();
const createAdminClientMock = vi.fn();
const fromMock = vi.fn();

vi.mock('@/lib/auth/admin', () => ({
  verifyAdminAuth: (...args: unknown[]) => verifyAdminAuthMock(...args),
  unauthorizedResponse: () =>
    NextResponse.json(
      { error: '인증이 필요합니다.' },
      { status: 401 }
    ),
}));

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: () => createAdminClientMock(),
}));

describe('PATCH /api/admin/blog/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    verifyAdminAuthMock.mockResolvedValue(true);
    fromMock.mockReset();
    createAdminClientMock.mockReturnValue({ from: fromMock });
  });

  it('should require authentication', async () => {
    verifyAdminAuthMock.mockResolvedValueOnce(false);

    const request = new NextRequest('http://localhost/api/admin/blog/1', {
      method: 'PATCH',
      body: JSON.stringify({ title: 'Updated' }),
    });

    const response = await PATCH(request, { params: Promise.resolve({ id: '1' }) });
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('인증이 필요합니다.');
  });

  it('should return 404 if post not found', async () => {
    const existingChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
    };
    fromMock.mockReturnValueOnce(existingChain);

    const request = new NextRequest('http://localhost/api/admin/blog/999', {
      method: 'PATCH',
      body: JSON.stringify({ title: 'Updated' }),
    });

    const response = await PATCH(request, { params: Promise.resolve({ id: '999' }) });
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('게시물을 찾을 수 없습니다.');
  });

  it('should update blog post successfully', async () => {
    const existingChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { id: '1', status: 'draft', published_at: null },
        error: null,
      }),
    };

    const updateChain = {
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { id: '1', title: 'Updated Title', status: 'published' },
        error: null,
      }),
    };

    fromMock.mockReturnValueOnce(existingChain).mockReturnValueOnce(updateChain);

    const request = new NextRequest('http://localhost/api/admin/blog/1', {
      method: 'PATCH',
      body: JSON.stringify({ title: 'Updated Title', status: 'published' }),
    });

    const response = await PATCH(request, { params: Promise.resolve({ id: '1' }) });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.post).toBeDefined();
  });

  it('should check for duplicate slug on update', async () => {
    const existingChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { id: '1', status: 'draft', published_at: null },
        error: null,
      }),
    };

    const duplicateChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      neq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { id: '2' },
        error: null,
      }),
    };

    fromMock.mockReturnValueOnce(existingChain).mockReturnValueOnce(duplicateChain);

    const request = new NextRequest('http://localhost/api/admin/blog/1', {
      method: 'PATCH',
      body: JSON.stringify({ slug: 'existing-slug' }),
    });

    const response = await PATCH(request, { params: Promise.resolve({ id: '1' }) });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('이미 사용 중인 URL입니다.');
  });
});

describe('DELETE /api/admin/blog/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    verifyAdminAuthMock.mockResolvedValue(true);
    fromMock.mockReset();
    createAdminClientMock.mockReturnValue({ from: fromMock });
  });

  it('should require authentication', async () => {
    verifyAdminAuthMock.mockResolvedValueOnce(false);

    const request = new NextRequest('http://localhost/api/admin/blog/1', {
      method: 'DELETE',
    });

    const response = await DELETE(request, { params: Promise.resolve({ id: '1' }) });
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('인증이 필요합니다.');
  });

  it('should delete blog post successfully', async () => {
    const existingChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: { id: '1' }, error: null }),
    };

    const deleteChain = {
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ error: null }),
    };

    fromMock.mockReturnValueOnce(existingChain).mockReturnValueOnce(deleteChain);

    const request = new NextRequest('http://localhost/api/admin/blog/1', {
      method: 'DELETE',
    });

    const response = await DELETE(request, { params: Promise.resolve({ id: '1' }) });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('should handle delete errors', async () => {
    const existingChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: { id: '1' }, error: null }),
    };

    const deleteChain = {
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ error: { message: 'Delete failed' } }),
    };

    fromMock.mockReturnValueOnce(existingChain).mockReturnValueOnce(deleteChain);

    const request = new NextRequest('http://localhost/api/admin/blog/1', {
      method: 'DELETE',
    });

    const response = await DELETE(request, { params: Promise.resolve({ id: '1' }) });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('게시물 삭제에 실패했습니다.');
  });
});
