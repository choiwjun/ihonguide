/**
 * 관리자 블로그 API 테스트 - POST /api/admin/blog
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { POST } from './route';

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

describe('POST /api/admin/blog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    verifyAdminAuthMock.mockResolvedValue(true);
    fromMock.mockReset();
    createAdminClientMock.mockReturnValue({
      from: fromMock,
    });
  });

  it('should require authentication', async () => {
    verifyAdminAuthMock.mockResolvedValueOnce(false);

    const request = new NextRequest('http://localhost/api/admin/blog', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test', content: 'Test content', status: 'draft' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('인증이 필요합니다.');
  });

  it('should validate required fields', async () => {
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
    const slugCheckChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: { id: 'existing-post' }, error: null }),
    };
    fromMock.mockReturnValueOnce(slugCheckChain);

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
    const slugCheckChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
    };

    const insertChain = {
      insert: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: {
          id: 'new-post-id',
          title: 'New Post',
          slug: 'new-post',
          status: 'draft',
        },
        error: null,
      }),
    };

    fromMock.mockReturnValueOnce(slugCheckChain).mockReturnValueOnce(insertChain);

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
    const slugCheckChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
    };

    const insertChain = {
      insert: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: { message: 'DB error' } }),
    };

    fromMock.mockReturnValueOnce(slugCheckChain).mockReturnValueOnce(insertChain);

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
