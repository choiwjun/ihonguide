/**
 * 관리자 블로그 API 테스트 - PUT/DELETE /api/admin/blog/[id]
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { PUT, DELETE } from './route';

// Supabase 모킹
const mockGetUser = vi.fn();
const mockFrom = vi.fn();

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => Promise.resolve({
    auth: {
      getUser: mockGetUser,
    },
    from: mockFrom,
  })),
}));

describe('PUT /api/admin/blog/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should require authentication', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
      error: { message: 'Not authenticated' },
    });

    const request = new NextRequest('http://localhost/api/admin/blog/1', {
      method: 'PUT',
      body: JSON.stringify({ title: 'Updated' }),
    });

    const response = await PUT(request, { params: Promise.resolve({ id: '1' }) });
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('인증이 필요합니다.');
  });

  it('should require admin role', async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: 'user-1',
          user_metadata: { role: 'user' },
        },
      },
      error: null,
    });

    const request = new NextRequest('http://localhost/api/admin/blog/1', {
      method: 'PUT',
      body: JSON.stringify({ title: 'Updated' }),
    });

    const response = await PUT(request, { params: Promise.resolve({ id: '1' }) });
    const data = await response.json();

    expect(response.status).toBe(403);
    expect(data.error).toBe('관리자 권한이 필요합니다.');
  });

  it('should return 404 if post not found', async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: 'admin-1',
          user_metadata: { role: 'admin' },
        },
      },
      error: null,
    });

    const mockChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
    };
    mockFrom.mockReturnValue(mockChain);

    const request = new NextRequest('http://localhost/api/admin/blog/999', {
      method: 'PUT',
      body: JSON.stringify({ title: 'Updated' }),
    });

    const response = await PUT(request, { params: Promise.resolve({ id: '999' }) });
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('게시물을 찾을 수 없습니다.');
  });

  it('should update blog post successfully', async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: 'admin-1',
          user_metadata: { role: 'admin' },
        },
      },
      error: null,
    });

    let callCount = 0;
    const mockChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      neq: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      single: vi.fn().mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          // 기존 게시물 조회
          return Promise.resolve({
            data: { id: '1', status: 'draft', published_at: null },
            error: null,
          });
        }
        // 업데이트 후 반환
        return Promise.resolve({
          data: { id: '1', title: 'Updated Title', status: 'published' },
          error: null,
        });
      }),
    };
    mockFrom.mockReturnValue(mockChain);

    const request = new NextRequest('http://localhost/api/admin/blog/1', {
      method: 'PUT',
      body: JSON.stringify({ title: 'Updated Title', status: 'published' }),
    });

    const response = await PUT(request, { params: Promise.resolve({ id: '1' }) });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.post).toBeDefined();
  });

  it('should check for duplicate slug on update', async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: 'admin-1',
          user_metadata: { role: 'admin' },
        },
      },
      error: null,
    });

    let callCount = 0;
    const mockChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      neq: vi.fn().mockReturnThis(),
      single: vi.fn().mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          // 기존 게시물 조회
          return Promise.resolve({
            data: { id: '1', status: 'draft', published_at: null },
            error: null,
          });
        }
        // slug 중복 체크 - 다른 게시물에서 이미 사용 중
        return Promise.resolve({
          data: { id: '2' },
          error: null,
        });
      }),
    };
    mockFrom.mockReturnValue(mockChain);

    const request = new NextRequest('http://localhost/api/admin/blog/1', {
      method: 'PUT',
      body: JSON.stringify({ slug: 'existing-slug' }),
    });

    const response = await PUT(request, { params: Promise.resolve({ id: '1' }) });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('이미 사용 중인 URL입니다.');
  });
});

describe('DELETE /api/admin/blog/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should require authentication', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
      error: { message: 'Not authenticated' },
    });

    const request = new NextRequest('http://localhost/api/admin/blog/1', {
      method: 'DELETE',
    });

    const response = await DELETE(request, { params: Promise.resolve({ id: '1' }) });
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('인증이 필요합니다.');
  });

  it('should require admin role', async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: 'user-1',
          user_metadata: { role: 'user' },
        },
      },
      error: null,
    });

    const request = new NextRequest('http://localhost/api/admin/blog/1', {
      method: 'DELETE',
    });

    const response = await DELETE(request, { params: Promise.resolve({ id: '1' }) });
    const data = await response.json();

    expect(response.status).toBe(403);
    expect(data.error).toBe('관리자 권한이 필요합니다.');
  });

  it('should delete blog post successfully', async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: 'admin-1',
          user_metadata: { role: 'admin' },
        },
      },
      error: null,
    });

    const mockChain = {
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ error: null }),
    };
    mockFrom.mockReturnValue(mockChain);

    const request = new NextRequest('http://localhost/api/admin/blog/1', {
      method: 'DELETE',
    });

    const response = await DELETE(request, { params: Promise.resolve({ id: '1' }) });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('should handle delete errors', async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: 'admin-1',
          user_metadata: { role: 'admin' },
        },
      },
      error: null,
    });

    const mockChain = {
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ error: { message: 'Delete failed' } }),
    };
    mockFrom.mockReturnValue(mockChain);

    const request = new NextRequest('http://localhost/api/admin/blog/1', {
      method: 'DELETE',
    });

    const response = await DELETE(request, { params: Promise.resolve({ id: '1' }) });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('게시물 삭제에 실패했습니다.');
  });
});
