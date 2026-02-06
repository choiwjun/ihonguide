import { createOgImage, OG_SIZE } from '@/lib/og';
import { createApiClient } from '@/lib/supabase/api';

export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let title = '이혼 정보 블로그';
  let category = '';

  try {
    const supabase = createApiClient();
    if (supabase) {
      const { data: post } = await (supabase as any)
        .from('blog_posts')
        .select('title, category:blog_categories(name)')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (post) {
        title = post.title;
        category = post.category?.name || '';
      }
    }
  } catch {
    // 실패 시 기본 제목 사용
  }

  return createOgImage(
    title,
    category ? `${category} | 이혼준비 블로그` : '이혼준비 블로그',
    { badge: 'BLOG' },
  );
}
