'use client';

/**
 * 상담 상세 페이지
 */

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';

interface ConsultationDetail {
  id: string;
  ticketNumber: string;
  name: string;
  phone: string;
  email?: string;
  consultationType: string;
  description?: string;
  status: string;
  adminNotes?: string;
  createdAt: string;
  contactedAt?: string;
  completedAt?: string;
}

interface ConsultationDetailPageProps {
  params: Promise<{ id: string }>;
}

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: '접수대기', color: 'bg-blue-100 text-blue-700' },
  contacted: { label: '연락완료', color: 'bg-purple-100 text-purple-700' },
  in_progress: { label: '상담중', color: 'bg-yellow-100 text-yellow-700' },
  completed: { label: '상담완료', color: 'bg-green-100 text-green-700' },
  cancelled: { label: '취소', color: 'bg-gray-100 text-gray-700' },
};

export default function ConsultationDetailPage({ params }: ConsultationDetailPageProps) {
  const { id } = use(params);
  const [consultation, setConsultation] = useState<ConsultationDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const response = await fetch(`/api/admin/consultations/${id}`);
        const result = await response.json();

        if (result.error) {
          console.error('Failed to fetch consultation:', result.error);
          setConsultation(null);
          return;
        }

        setConsultation(result.data);
      } catch (error) {
        console.error('Failed to fetch consultation:', error);
        setConsultation(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsultation();
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
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

      setConsultation((prev) => prev ? { ...prev, status: newStatus } : null);
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('상태 변경에 실패했습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
        <p className="mt-4 text-gray-600">불러오는 중...</p>
      </div>
    );
  }

  if (!consultation) {
    return (
      <Card>
        <div className="text-center py-8 text-gray-500">
          상담 정보를 찾을 수 없습니다.
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/consultations" className="text-sm text-gray-500 hover:text-gray-700">
            ← 상담 목록
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            {consultation.ticketNumber}
          </h1>
        </div>
        <select
          value={consultation.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`px-4 py-2 rounded-lg border-0 cursor-pointer text-sm font-medium ${
            statusMap[consultation.status]?.color || 'bg-gray-100 text-gray-700'
          }`}
        >
          <option value="pending">접수대기</option>
          <option value="contacted">연락완료</option>
          <option value="in_progress">상담중</option>
          <option value="completed">상담완료</option>
          <option value="cancelled">취소</option>
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 신청자 정보 */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">신청자 정보</h2>
          <dl className="space-y-3">
            <div className="flex">
              <dt className="w-24 text-gray-500">이름</dt>
              <dd className="font-medium">{consultation.name}</dd>
            </div>
            <div className="flex">
              <dt className="w-24 text-gray-500">연락처</dt>
              <dd className="font-medium">{consultation.phone}</dd>
            </div>
            {consultation.email && (
              <div className="flex">
                <dt className="w-24 text-gray-500">이메일</dt>
                <dd className="font-medium">{consultation.email}</dd>
              </div>
            )}
            <div className="flex">
              <dt className="w-24 text-gray-500">상담 유형</dt>
              <dd className="font-medium">{consultation.consultationType}</dd>
            </div>
          </dl>
        </Card>

        {/* 접수 정보 */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">접수 정보</h2>
          <dl className="space-y-3">
            <div className="flex">
              <dt className="w-24 text-gray-500">접수번호</dt>
              <dd className="font-mono">{consultation.ticketNumber}</dd>
            </div>
            <div className="flex">
              <dt className="w-24 text-gray-500">접수일시</dt>
              <dd>{new Date(consultation.createdAt).toLocaleString('ko-KR')}</dd>
            </div>
            {consultation.contactedAt && (
              <div className="flex">
                <dt className="w-24 text-gray-500">연락일시</dt>
                <dd>{new Date(consultation.contactedAt).toLocaleString('ko-KR')}</dd>
              </div>
            )}
            {consultation.completedAt && (
              <div className="flex">
                <dt className="w-24 text-gray-500">완료일시</dt>
                <dd>{new Date(consultation.completedAt).toLocaleString('ko-KR')}</dd>
              </div>
            )}
          </dl>
        </Card>
      </div>

      {/* 상담 내용 */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">상담 내용</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="whitespace-pre-wrap text-gray-700">{consultation.description || '내용 없음'}</p>
        </div>
      </Card>

      {/* 관리자 메모 */}
      {consultation.adminNotes && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">관리자 메모</h2>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="whitespace-pre-wrap text-gray-700">{consultation.adminNotes}</p>
          </div>
        </Card>
      )}

      {/* 액션 버튼 */}
      <div className="flex gap-3">
        <Button variant="secondary" onClick={() => window.history.back()}>
          목록으로
        </Button>
        <Button onClick={() => window.open(`tel:${consultation.phone}`)}>
          전화 연결
        </Button>
      </div>
    </div>
  );
}
