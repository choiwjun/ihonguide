/**
 * 블로그 API 테스트
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './route';
import { NextRequest } from 'next/server';

// 체이닝 가능한 mock 객체
const createChainMock = () => {
  const mock = {
    select: vi.fn(),
    eq: vi.fn(),
    order: vi.fn(),
    range: vi.fn(),
  };

  // 모든 메서드가 자기 자신을 반환하도록 설정 (체이닝 가능)
  mock.select.mockReturnValue(mock);
  mock.eq.mockReturnValue(mock);
  mock.order.mockReturnValue(mock);

  return mock;
};

let mockChain: ReturnType<typeof createChainMock>;

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: vi.fn(() => mockChain),
  }),
}));

describe('GET /api/blog', () => {
  const mockPosts = [
    {
      id: '1',
      slug: 'divorce-procedure',
      title: '이혼 절차 가이드',
      excerpt: '이혼 절차에 대한 안내',
      featured_image: '/images/blog/1.jpg',
      category_id: 'cat-1',
      view_count: 100,
      published_at: '2024-01-15T00:00:00Z',
      blog_categories: {
        id: 'cat-1',
        name: '절차',
        slug: 'procedure',
        description: null,
        sort_order: 1,
      },
    },
    {
      id: '2',
      slug: 'child-support-guide',
      title: '양육비 산정 가이드',
      excerpt: '양육비 계산 방법',
      featured_image: null,
      category_id: 'cat-2',
      view_count: 50,
      published_at: '2024-01-10T00:00:00Z',
      blog_categories: {
        id: 'cat-2',
        name: '양육권',
        slug: 'custody',
        description: null,
        sort_order: 2,
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockChain = createChainMock();
    mockChain.range.mockResolvedValue({ data: mockPosts, error: null, count: 2 });
  });

  it('should return blog posts list', async () => {
    const request = new NextRequest('http://localhost:3000/api/blog');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.posts).toHaveLength(2);
    expect(data.data.posts[0].title).toBe('이혼 절차 가이드');
  });

  it('should support pagination', async () => {
    const request = new NextRequest('http://localhost:3000/api/blog?page=2&pageSize=5');
    await GET(request);

    // range가 올바른 offset으로 호출되었는지 확인 (page 2, pageSize 5 = offset 5-9)
    expect(mockChain.range).toHaveBeenCalledWith(5, 9);
  });

  it('should filter by category', async () => {
    const request = new NextRequest('http://localhost:3000/api/blog?category=procedure');
    await GET(request);

    // eq가 카테고리 필터와 status 모두로 호출되어야 함
    expect(mockChain.eq).toHaveBeenCalledWith('status', 'published');
    expect(mockChain.eq).toHaveBeenCalledWith('blog_categories.slug', 'procedure');
  });

  it('should return pagination metadata', async () => {
    const request = new NextRequest('http://localhost:3000/api/blog');
    const response = await GET(request);
    const data = await response.json();

    expect(data.data.total).toBe(2);
    expect(data.data.page).toBe(1);
    expect(data.data.pageSize).toBe(10);
    expect(data.data.totalPages).toBe(1);
  });

  it('should only return published posts', async () => {
    const request = new NextRequest('http://localhost:3000/api/blog');
    await GET(request);

    expect(mockChain.eq).toHaveBeenCalledWith('status', 'published');
  });

  it('should order by published_at desc', async () => {
    const request = new NextRequest('http://localhost:3000/api/blog');
    await GET(request);

    expect(mockChain.order).toHaveBeenCalledWith('published_at', { ascending: false });
  });

  it('should handle database error', async () => {
    mockChain.range.mockResolvedValueOnce({
      data: null,
      error: { message: 'Database error' },
      count: null,
    });

    const request = new NextRequest('http://localhost:3000/api/blog');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBeDefined();
  });

  it('should transform snake_case to camelCase', async () => {
    const request = new NextRequest('http://localhost:3000/api/blog');
    const response = await GET(request);
    const data = await response.json();

    const post = data.data.posts[0];
    expect(post.featuredImage).toBeDefined();
    expect(post.categoryId).toBeDefined();
    expect(post.viewCount).toBeDefined();
    expect(post.publishedAt).toBeDefined();
    // snake_case가 없어야 함
    expect(post.featured_image).toBeUndefined();
    expect(post.category_id).toBeUndefined();
  });
});
