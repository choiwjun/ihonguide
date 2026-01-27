/**
 * 블로그 관련 타입 정의
 */

/**
 * 블로그 게시물 상태
 */
export type BlogPostStatus = 'draft' | 'published';

/**
 * SEO 메타 정보
 */
export interface SeoMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
}

/**
 * 블로그 카테고리
 */
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
}

/**
 * 블로그 게시물
 */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  categoryId: string | null;
  category?: BlogCategory | null;
  status: BlogPostStatus;
  seoMeta: SeoMeta | null;
  viewCount: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * 블로그 게시물 목록 아이템 (목록용 간략 정보)
 */
export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  featuredImage: string | null;
  categoryId: string | null;
  category?: BlogCategory | null;
  viewCount: number;
  publishedAt: string | null;
}

/**
 * 블로그 목록 API 응답
 */
export interface BlogListResponse {
  posts: BlogPostSummary[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * 블로그 목록 쿼리 파라미터
 */
export interface BlogListParams {
  page?: number;
  pageSize?: number;
  category?: string;
}

/**
 * 블로그 상세 API 응답
 */
export interface BlogDetailResponse {
  post: BlogPost;
  relatedPosts: BlogPostSummary[];
}

/**
 * 저장된 콘텐츠
 */
export interface SavedContent {
  id: string;
  userId: string;
  postId: string;
  post?: BlogPost;
  createdAt: string;
}

/**
 * 기본 카테고리 목록
 */
export const BLOG_CATEGORIES = [
  { slug: 'procedure', name: '절차' },
  { slug: 'cost', name: '비용' },
  { slug: 'custody', name: '양육권' },
  { slug: 'property', name: '재산분할' },
  { slug: 'faq', name: 'FAQ' },
] as const;

/**
 * 카테고리 슬러그 타입
 */
export type BlogCategorySlug = (typeof BLOG_CATEGORIES)[number]['slug'];
