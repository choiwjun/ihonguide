/**
 * 블로그 상세 API 테스트
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './route';
import { NextRequest } from 'next/server';

// 체이닝 가능한 mock 객체
const createChainMock = () => {
  const mock = {
    select: vi.fn(),
    eq: vi.fn(),
    single: vi.fn(),
    order: vi.fn(),
    limit: vi.fn(),
    neq: vi.fn(),
    update: vi.fn(),
    then: vi.fn(),
  };

  // 모든 메서드가 자기 자신을 반환하도록 설정 (체이닝 가능)
  mock.select.mockReturnValue(mock);
  mock.eq.mockReturnValue(mock);
  mock.order.mockReturnValue(mock);
  mock.neq.mockReturnValue(mock);
  mock.update.mockReturnValue(mock);
  // then은 Promise 체이닝을 위해 필요
  mock.then.mockImplementation((cb) => {
    cb && cb();
    return mock;
  });

  return mock;
};

let mockChain: ReturnType<typeof createChainMock>;

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: vi.fn(() => mockChain),
  }),
}));

describe('GET /api/blog/[slug]', () => {
  const mockPost = {
    id: '1',
    slug: 'divorce-procedure',
    title: '이혼 절차 가이드',
    content: '<p>이혼 절차에 대한 상세 내용...</p>',
    excerpt: '이혼 절차에 대한 안내',
    featured_image: '/images/blog/1.jpg',
    category_id: 'cat-1',
    status: 'published',
    seo_meta: { title: 'SEO 제목', description: 'SEO 설명' },
    view_count: 100,
    published_at: '2024-01-15T00:00:00Z',
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    blog_categories: {
      id: 'cat-1',
      name: '절차',
      slug: 'procedure',
      description: null,
      sort_order: 1,
    },
  };

  const mockRelatedPosts = [
    {
      id: '2',
      slug: 'divorce-cost',
      title: '이혼 비용 안내',
      excerpt: '이혼에 필요한 비용',
      featured_image: null,
      category_id: 'cat-1',
      view_count: 50,
      published_at: '2024-01-12T00:00:00Z',
      blog_categories: {
        id: 'cat-1',
        name: '절차',
        slug: 'procedure',
        description: null,
        sort_order: 1,
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockChain = createChainMock();

    // 단일 게시물 조회 결과 (terminal method)
    mockChain.single.mockResolvedValue({ data: mockPost, error: null });
    // 관련 게시물 목록 조회 결과 (terminal method)
    mockChain.limit.mockResolvedValue({ data: mockRelatedPosts, error: null });
  });

  it('should return blog post by slug', async () => {
    const request = new NextRequest('http://localhost:3000/api/blog/divorce-procedure');
    const params = Promise.resolve({ slug: 'divorce-procedure' });
    const response = await GET(request, { params });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.post.title).toBe('이혼 절차 가이드');
    expect(data.data.post.content).toBe('<p>이혼 절차에 대한 상세 내용...</p>');
  });

  it('should return 404 for non-existent post', async () => {
    mockChain.single.mockResolvedValueOnce({ data: null, error: null });

    const request = new NextRequest('http://localhost:3000/api/blog/non-existent');
    const params = Promise.resolve({ slug: 'non-existent' });
    const response = await GET(request, { params });
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('게시물을 찾을 수 없습니다.');
  });

  it('should return related posts', async () => {
    const request = new NextRequest('http://localhost:3000/api/blog/divorce-procedure');
    const params = Promise.resolve({ slug: 'divorce-procedure' });
    const response = await GET(request, { params });
    const data = await response.json();

    expect(data.data.relatedPosts).toBeDefined();
    expect(Array.isArray(data.data.relatedPosts)).toBe(true);
  });

  it('should increment view count', async () => {
    const request = new NextRequest('http://localhost:3000/api/blog/divorce-procedure');
    const params = Promise.resolve({ slug: 'divorce-procedure' });
    await GET(request, { params });

    expect(mockChain.update).toHaveBeenCalled();
  });

  it('should transform snake_case to camelCase', async () => {
    const request = new NextRequest('http://localhost:3000/api/blog/divorce-procedure');
    const params = Promise.resolve({ slug: 'divorce-procedure' });
    const response = await GET(request, { params });
    const data = await response.json();

    const post = data.data.post;
    expect(post.featuredImage).toBeDefined();
    expect(post.categoryId).toBeDefined();
    expect(post.viewCount).toBeDefined();
    expect(post.publishedAt).toBeDefined();
    expect(post.createdAt).toBeDefined();
    expect(post.updatedAt).toBeDefined();
    expect(post.seoMeta).toBeDefined();
  });

  it('should handle database error', async () => {
    mockChain.single.mockResolvedValueOnce({
      data: null,
      error: { message: 'Database error' },
    });

    const request = new NextRequest('http://localhost:3000/api/blog/divorce-procedure');
    const params = Promise.resolve({ slug: 'divorce-procedure' });
    const response = await GET(request, { params });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBeDefined();
  });
});
