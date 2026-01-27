'use client';

/**
 * 관리자 대시보드 페이지
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';

interface DashboardStats {
  totalConsultations: number;
  todayConsultations: number;
  pendingConsultations: number;
  totalBlogPosts: number;
  totalUsers: number;
}

interface RecentConsultation {
  id: string;
  ticketNumber: string;
  name: string;
  consultationType: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalConsultations: 0,
    todayConsultations: 0,
    pendingConsultations: 0,
    totalBlogPosts: 0,
    totalUsers: 0,
  });
  const [recentConsultations, setRecentConsultations] = useState<RecentConsultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: API에서 통계 데이터 불러오기
    // 현재는 더미 데이터
    setStats({
      totalConsultations: 156,
      todayConsultations: 12,
      pendingConsultations: 8,
      totalBlogPosts: 45,
      totalUsers: 1234,
    });

    setRecentConsultations([
      {
        id: '1',
        ticketNumber: 'CST-20260127-0001',
        name: '홍길동',
        consultationType: '이혼상담',
        status: '접수완료',
        createdAt: '2026-01-27T10:30:00Z',
      },
      {
        id: '2',
        ticketNumber: 'CST-20260127-0002',
        name: '김철수',
        consultationType: '양육비상담',
        status: '상담중',
        createdAt: '2026-01-27T09:15:00Z',
      },
      {
        id: '3',
        ticketNumber: 'CST-20260126-0005',
        name: '이영희',
        consultationType: '재산분할상담',
        status: '접수완료',
        createdAt: '2026-01-26T16:45:00Z',
      },
    ]);

    setIsLoading(false);
  }, []);

  const statCards = [
    {
      label: '오늘 상담',
      value: stats.todayConsultations,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: '대기 중',
      value: stats.pendingConsultations,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: '전체 상담',
      value: stats.totalConsultations,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: '블로그 글',
      value: stats.totalBlogPosts,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const statusMap: Record<string, { label: string; color: string }> = {
    접수완료: { label: '접수완료', color: 'bg-blue-100 text-blue-700' },
    상담중: { label: '상담중', color: 'bg-yellow-100 text-yellow-700' },
    상담완료: { label: '상담완료', color: 'bg-green-100 text-green-700' },
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
        <p className="mt-4 text-gray-600">불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="mt-1 text-gray-600">오늘의 현황을 확인하세요.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className={`${stat.bgColor}`}>
            <div className="text-center">
              <p className={`text-3xl font-bold ${stat.color}`}>
                {stat.value.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* 최근 상담 */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">최근 상담 신청</h2>
          <Link href="/admin/consultations">
            <Button variant="ghost" size="sm">
              전체 보기
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-medium text-gray-600">접수번호</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">이름</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">유형</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">상태</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600">신청일</th>
              </tr>
            </thead>
            <tbody>
              {recentConsultations.map((consultation) => (
                <tr key={consultation.id} className="border-b border-gray-100">
                  <td className="py-3 px-2">
                    <Link
                      href={`/admin/consultations/${consultation.id}`}
                      className="font-mono text-brand-primary hover:underline"
                    >
                      {consultation.ticketNumber}
                    </Link>
                  </td>
                  <td className="py-3 px-2">{consultation.name}</td>
                  <td className="py-3 px-2">{consultation.consultationType}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${
                        statusMap[consultation.status]?.color || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {statusMap[consultation.status]?.label || consultation.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gray-500">
                    {new Date(consultation.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
