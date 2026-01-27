/**
 * 관리자 블로그 API 테스트 - POST /api/admin/blog
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';

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

describe('POST /api/admin/blog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should require authentication', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
      error: { message: 'Not authenticated' },
    });

    const request = new NextRequest('http://localhost/api/admin/blog', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test', content: 'Test content' }),
    });

    const response = await POST(request);
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

    const request = new NextRequest('http://localhost/api/admin/blog', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test', content: 'Test content', status: 'draft' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(403);
    expect(data.error).toBe('관리자 권한이 필요합니다.');
  });

  it('should validate required fields', async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: 'admin-1',
          user_metadata: { role: 'admin' },
        },
      },
      error: null,
    });

    const request = new NextRequest('http://localhost/api/admin/blog', {
      method: 'POST',
      body: JSON.stringify({ title: '', content: '', status: 'draft' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('제목은 필수입니다.');
  });

  it('should validate content is required', async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: 'admin-1',
          user_metadata: { role: 'admin' },
        },
      },
      error: null,
    });

    const request = new NextRequest('http://localhost/api/admin/blog', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test Title', content: '', status: 'draft' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('내용은 필수입니다.');
  });

  it('should check for duplicate slug', async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: 'admin-1',
          user_metadata: { role: 'admin' },
        },
      },
      error: null,
    });

    // Slug 중복 체크 모킹
    const mockChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: { id: 'existing-post' }, error: null }),
    };
    mockFrom.mockReturnValue(mockChain);

    const request = new NextRequest('http://localhost/api/admin/blog', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Test Title',
        slug: 'existing-slug',
        content: 'Test content',
        status: 'draft',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('이미 사용 중인 URL입니다.');
  });

  it('should create a new blog post successfully', async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: 'admin-1',
          user_metadata: { role: 'admin' },
        },
      },
      error: null,
    });

    // Slug 체크 (없음) → 게시물 생성
    let callCount = 0;
    const mockChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          // slug 중복 체크 - 없음
          return Promise.resolve({ data: null, error: null });
        }
        // insert 후 select
        return Promise.resolve({
          data: {
            id: 'new-post-id',
            title: 'New Post',
            slug: 'new-post',
            status: 'draft',
          },
          error: null,
        });
      }),
      insert: vi.fn().mockReturnThis(),
    };
    mockFrom.mockReturnValue(mockChain);

    const request = new NextRequest('http://localhost/api/admin/blog', {
      method: 'POST',
      body: JSON.stringify({
        title: 'New Post',
        content: 'Post content here',
        status: 'draft',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.post).toBeDefined();
  });

  it('should handle database errors', async () => {
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
      single: vi.fn().mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.resolve({ data: null, error: null });
        }
        return Promise.resolve({ data: null, error: { message: 'DB error' } });
      }),
      insert: vi.fn().mockReturnThis(),
    };
    mockFrom.mockReturnValue(mockChain);

    const request = new NextRequest('http://localhost/api/admin/blog', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Test Post',
        content: 'Content',
        status: 'draft',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('게시물 생성에 실패했습니다.');
  });
});
