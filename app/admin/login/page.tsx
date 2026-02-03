'use client';

/**
 * 관리자 로그인 페이지
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button } from '@/components/ui';

export default function AdminLoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (result.success) {
        // 세션 저장
        sessionStorage.setItem('adminAuth', 'true');
        sessionStorage.setItem('adminAuthTime', Date.now().toString());
        router.push('/admin');
        router.refresh();
      } else {
        setError(result.error || '로그인에 실패했습니다.');
      }
    } catch {
      setError('서버 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">관리자 로그인</h1>
          <p className="text-gray-600 mt-2">관리자 계정으로 로그인해주세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
              아이디
            </label>
            <input
              id="id"
              type="text"
              value={credentials.id}
              onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="아이디를 입력하세요"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
