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
    const fetchDashboardData = async () => {
      try {
        // 상담 목록 가져오기
        const response = await fetch('/api/admin/consultations?pageSize=50');
        const result = await response.json();

        if (result.data?.consultations) {
          const consultations = result.data.consultations;
          const today = new Date().toISOString().slice(0, 10);

          // 통계 계산
          const todayCount = consultations.filter((c: any) =>
            c.createdAt?.slice(0, 10) === today
          ).length;
          const pendingCount = consultations.filter((c: any) =>
            c.status === 'pending'
          ).length;

          setStats({
            totalConsultations: result.data.total || 0,
            todayConsultations: todayCount,
            pendingConsultations: pendingCount,
            totalBlogPosts: 0,
            totalUsers: 0,
          });

          // 최근 5개만 표시
          setRecentConsultations(consultations.slice(0, 5).map((c: any) => ({
            id: c.id,
            ticketNumber: c.ticketNumber,
            name: c.name,
            consultationType: c.consultationType,
            status: c.status,
            createdAt: c.createdAt,
          })));
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
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
    pending: { label: '접수대기', color: 'bg-blue-100 text-blue-700' },
    contacted: { label: '연락완료', color: 'bg-purple-100 text-purple-700' },
    in_progress: { label: '상담중', color: 'bg-yellow-100 text-yellow-700' },
    completed: { label: '상담완료', color: 'bg-green-100 text-green-700' },
    cancelled: { label: '취소', color: 'bg-gray-100 text-gray-700' },
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

        {recentConsultations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            아직 상담 신청이 없습니다.
          </div>
        ) : (
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
        )}
      </Card>
    </div>
  );
}
