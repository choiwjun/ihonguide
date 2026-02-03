/**
 * 사이트맵 테스트
 */

import { expect, test, describe } from 'vitest';

describe('Sitemap', () => {
  test('사이트맵이 올바른 형식을 가져야 함', async () => {
    // 비동기 임포트 사용
    const sitemapModule = await import('./sitemap');
    const sitemap = await sitemapModule.default();

    expect(Array.isArray(sitemap)).toBe(true);
    expect(sitemap.length).toBeGreaterThan(0);
  });

  test('각 사이트맵 항목이 필수 필드를 가짐', async () => {
    const sitemapModule = await import('./sitemap');
    const sitemap = await sitemapModule.default();

    if (sitemap.length > 0) {
      const firstItem = sitemap[0];
      expect(firstItem).toHaveProperty('url');
      expect(firstItem).toHaveProperty('lastModified');
      expect(firstItem).toHaveProperty('changeFrequency');
      expect(firstItem).toHaveProperty('priority');
    }
  });

  test('정적 페이지가 포함되어야 함', async () => {
    const sitemapModule = await import('./sitemap');
    const sitemap = await sitemapModule.default();

    const urls = sitemap.map((item: any) => item.url);
    expect(urls).toContain('https://ihonjunbi.com');
    expect(urls).toContain('https://ihonjunbi.com/diagnosis');
    expect(urls).toContain('https://ihonjunbi.com/calculator');
    expect(urls).toContain('https://ihonjunbi.com/consultation');
    expect(urls).toContain('https://ihonjunbi.com/blog');
  });

  test('블로그 포스트가 포함되어야 함 (데이터 있을 때)', async () => {
    // 주의: 이 테스트는 실제 데이터가 있을 때만 통과
    const sitemapModule = await import('./sitemap');
    const sitemap = await sitemapModule.default();

    const blogUrls = sitemap
      .map((item: any) => item.url)
      .filter((url: string) => url.includes('/blog/'));

    // 블로그 포스트가 있으면 테스트
    if (blogUrls.length > 0) {
      expect(blogUrls.length).toBeGreaterThan(0);
      // 블로그 URL이 올바른 형식
      blogUrls.forEach((url: string) => {
        expect(url).toMatch(/^https:\/\/ihonjunbi\.com\/blog\/[^/]+$/);
      });
    }
  });

  test('캐싱이 설정되어야 함', async () => {
    const sitemapModule = await import('./sitemap');
    expect(sitemapModule.revalidate).toBeDefined();
    expect(sitemapModule.revalidate).toBe(86400); // 24시간
  });
});
