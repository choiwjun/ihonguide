'use client';

/**
 * 마이페이지
 */

import { useState } from 'react';
import { Container } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import {
  DiagnosisHistory,
  CalculatorHistory,
  ConsultationHistory,
  SavedPosts,
} from '@/components/mypage';
import { useAuthStore } from '@/stores/authStore';
import { signOut } from '@/lib/auth';

type TabType = 'diagnosis' | 'calculator' | 'consultation' | 'saved';

const tabs: { id: TabType; label: string }[] = [
  { id: 'diagnosis', label: '진단 결과' },
  { id: 'calculator', label: '양육비 계산' },
  { id: 'consultation', label: '상담 내역' },
  { id: 'saved', label: '저장된 글' },
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<TabType>('diagnosis');
  const { user } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Container size="lg" className="py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">마이페이지</h1>
        <p className="mt-2 text-gray-600">
          이용 기록과 저장된 콘텐츠를 확인하세요.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* 사이드바 - 프로필 */}
        <div className="lg:col-span-1">
          <Card>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="font-medium text-gray-900">
                {user?.name || user?.email || '사용자'}
              </p>
              {user?.email && (
                <p className="text-sm text-gray-500 mt-1">
                  {user.email}
                </p>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="mt-4 text-gray-500"
              >
                로그아웃
              </Button>
            </div>
          </Card>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="lg:col-span-3">
          {/* 탭 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* 탭 콘텐츠 */}
          <div>
            {activeTab === 'diagnosis' && <DiagnosisHistory />}
            {activeTab === 'calculator' && <CalculatorHistory />}
            {activeTab === 'consultation' && <ConsultationHistory />}
            {activeTab === 'saved' && <SavedPosts />}
          </div>
        </div>
      </div>
    </Container>
  );
}
