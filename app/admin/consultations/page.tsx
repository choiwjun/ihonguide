'use client';

/**
 * 상담 관리 페이지
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';

interface Consultation {
  id: string;
  ticketNumber: string;
  name: string;
  phone: string;
  email?: string;
  consultationType: string;
  description?: string;
  status: string;
  createdAt: string;
}

type StatusFilter = 'all' | 'pending' | 'contacted' | 'in_progress' | 'completed';

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'pending', label: '접수대기' },
  { value: 'contacted', label: '연락완료' },
  { value: 'in_progress', label: '상담중' },
  { value: 'completed', label: '상담완료' },
];

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: '접수대기', color: 'bg-blue-100 text-blue-700' },
  contacted: { label: '연락완료', color: 'bg-purple-100 text-purple-700' },
  in_progress: { label: '상담중', color: 'bg-yellow-100 text-yellow-700' },
  completed: { label: '상담완료', color: 'bg-green-100 text-green-700' },
  cancelled: { label: '취소', color: 'bg-gray-100 text-gray-700' },
};

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [isLoading, setIsLoading] = useState(true);

  const fetchConsultations = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') {
        params.set('status', filter);
      }

      const response = await fetch(`/api/admin/consultations?${params.toString()}`);
      const result = await response.json();

      if (result.error) {
        console.error('Failed to fetch consultations:', result.error);
        setConsultations([]);
        return;
      }

      setConsultations(result.data?.consultations || []);
    } catch (error) {
      console.error('Failed to fetch consultations:', error);
      setConsultations([]);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/consultations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await response.json();

      if (result.error) {
        alert(result.error);
        return;
      }

      setConsultations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('상태 변경에 실패했습니다.');
    }
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">상담 관리</h1>
        <p className="mt-1 text-gray-600">상담 신청 내역을 관리합니다.</p>
      </div>

      {/* 필터 */}
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <Button
            key={option.value}
            variant={filter === option.value ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* 상담 목록 */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
          <p className="mt-4 text-gray-600">불러오는 중...</p>
        </div>
      ) : consultations.length === 0 ? (
        <Card>
          <div className="text-center py-8 text-gray-500">
            상담 신청 내역이 없습니다.
          </div>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">접수번호</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">이름</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">연락처</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">유형</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">상태</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">신청일</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">관리</th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((consultation) => (
                  <tr key={consultation.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Link
                        href={`/admin/consultations/${consultation.id}`}
                        className="font-mono text-brand-primary hover:underline"
                      >
                        {consultation.ticketNumber}
                      </Link>
                    </td>
                    <td className="py-3 px-4">{consultation.name}</td>
                    <td className="py-3 px-4">{consultation.phone}</td>
                    <td className="py-3 px-4">{consultation.consultationType}</td>
                    <td className="py-3 px-4">
                      <select
                        value={consultation.status}
                        onChange={(e) => handleStatusChange(consultation.id, e.target.value)}
                        className={`px-2 py-1 text-xs rounded border-0 cursor-pointer ${
                          statusMap[consultation.status]?.color || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <option value="pending">접수대기</option>
                        <option value="contacted">연락완료</option>
                        <option value="in_progress">상담중</option>
                        <option value="completed">상담완료</option>
                        <option value="cancelled">취소</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(consultation.createdAt).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="py-3 px-4">
                      <Link href={`/admin/consultations/${consultation.id}`}>
                        <Button variant="ghost" size="sm">
                          상세
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
