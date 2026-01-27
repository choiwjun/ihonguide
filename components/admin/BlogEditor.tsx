'use client';

/**
 * 블로그 에디터 컴포넌트
 * 관리자가 블로그 글을 작성/수정할 때 사용
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input } from '@/components/ui';

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

interface BlogPostData {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  categoryId: string;
  metaTitle: string;
  metaDescription: string;
  status: 'draft' | 'published';
}

interface BlogEditorProps {
  post?: BlogPostData;
  categories: BlogCategory[];
  isEdit?: boolean;
}

const initialPostData: BlogPostData = {
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  categoryId: '',
  metaTitle: '',
  metaDescription: '',
  status: 'draft',
};

export function BlogEditor({ post, categories, isEdit = false }: BlogEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<BlogPostData>(post || initialPostData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (post) {
      setFormData(post);
    }
  }, [post]);

  // 제목에서 slug 자동 생성
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[가-힣]/g, (char) => char) // 한글 유지
      .replace(/[^\w\s가-힣-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
      metaTitle: prev.metaTitle || title,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (publishStatus: 'draft' | 'published') => {
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        status: publishStatus,
      };

      const url = isEdit ? `/api/admin/blog/${post?.id}` : '/api/admin/blog';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '저장에 실패했습니다.');
      }

      router.push('/admin/blog');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* 기본 정보 */}
      <Card>
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">기본 정보</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제목 *
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="게시물 제목을 입력하세요"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              슬러그 (URL)
            </label>
            <Input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="url-friendly-slug"
            />
            <p className="mt-1 text-xs text-gray-500">
              URL에 사용됩니다: /blog/{formData.slug || 'slug'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              카테고리
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              <option value="">카테고리 선택</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              요약 (발췌문)
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
              placeholder="게시물 목록에 표시될 요약문"
            />
          </div>
        </div>
      </Card>

      {/* 본문 */}
      <Card>
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">본문</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              내용 *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={15}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary resize-y font-mono text-sm"
              placeholder="마크다운 형식으로 작성하세요..."
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              마크다운 형식을 지원합니다.
            </p>
          </div>
        </div>
      </Card>

      {/* SEO 설정 */}
      <Card>
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">SEO 설정</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              메타 제목
            </label>
            <Input
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              placeholder="검색 결과에 표시될 제목"
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.metaTitle.length}/60자 권장
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              메타 설명
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
              placeholder="검색 결과에 표시될 설명"
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.metaDescription.length}/160자 권장
            </p>
          </div>
        </div>
      </Card>

      {/* 액션 버튼 */}
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => router.push('/admin/blog')}
          disabled={isSubmitting}
        >
          취소
        </Button>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => handleSubmit('draft')}
            disabled={isSubmitting}
          >
            {isSubmitting ? '저장 중...' : '초안 저장'}
          </Button>
          <Button
            onClick={() => handleSubmit('published')}
            disabled={isSubmitting}
          >
            {isSubmitting ? '저장 중...' : isEdit ? '수정하고 발행' : '발행'}
          </Button>
        </div>
      </div>
    </div>
  );
}
