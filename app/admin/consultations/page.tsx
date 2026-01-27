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
  message: string;
  status: string;
  createdAt: string;
}

type StatusFilter = 'all' | '접수완료' | '상담중' | '상담완료';

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: '접수완료', label: '접수완료' },
  { value: '상담중', label: '상담중' },
  { value: '상담완료', label: '상담완료' },
];

const statusMap: Record<string, { label: string; color: string }> = {
  접수완료: { label: '접수완료', color: 'bg-blue-100 text-blue-700' },
  상담중: { label: '상담중', color: 'bg-yellow-100 text-yellow-700' },
  상담완료: { label: '상담완료', color: 'bg-green-100 text-green-700' },
};

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [isLoading, setIsLoading] = useState(true);

  const fetchConsultations = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: API에서 데이터 불러오기
      // 현재는 더미 데이터
      const mockData: Consultation[] = [
        {
          id: '1',
          ticketNumber: 'CST-20260127-0001',
          name: '홍길동',
          phone: '010-1234-5678',
          email: 'hong@example.com',
          consultationType: '이혼상담',
          message: '이혼 절차에 대해 상담 받고 싶습니다.',
          status: '접수완료',
          createdAt: '2026-01-27T10:30:00Z',
        },
        {
          id: '2',
          ticketNumber: 'CST-20260127-0002',
          name: '김철수',
          phone: '010-9876-5432',
          consultationType: '양육비상담',
          message: '양육비 산정에 대해 문의드립니다.',
          status: '상담중',
          createdAt: '2026-01-27T09:15:00Z',
        },
        {
          id: '3',
          ticketNumber: 'CST-20260126-0005',
          name: '이영희',
          phone: '010-1111-2222',
          email: 'lee@example.com',
          consultationType: '재산분할상담',
          message: '재산 분할 관련 상담 요청합니다.',
          status: '상담완료',
          createdAt: '2026-01-26T16:45:00Z',
        },
        {
          id: '4',
          ticketNumber: 'CST-20260126-0004',
          name: '박민수',
          phone: '010-3333-4444',
          consultationType: '이혼상담',
          message: '협의이혼 절차가 궁금합니다.',
          status: '접수완료',
          createdAt: '2026-01-26T14:20:00Z',
        },
      ];

      const filtered = filter === 'all'
        ? mockData
        : mockData.filter((c) => c.status === filter);

      setConsultations(filtered);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    // TODO: API 호출로 상태 업데이트
    setConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
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
                        <option value="접수완료">접수완료</option>
                        <option value="상담중">상담중</option>
                        <option value="상담완료">상담완료</option>
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
