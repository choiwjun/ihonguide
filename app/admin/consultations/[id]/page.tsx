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
  message: string;
  status: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ConsultationDetailPageProps {
  params: Promise<{ id: string }>;
}

const statusMap: Record<string, { label: string; color: string }> = {
  접수완료: { label: '접수완료', color: 'bg-blue-100 text-blue-700' },
  상담중: { label: '상담중', color: 'bg-yellow-100 text-yellow-700' },
  상담완료: { label: '상담완료', color: 'bg-green-100 text-green-700' },
};

export default function ConsultationDetailPage({ params }: ConsultationDetailPageProps) {
  const { id } = use(params);
  const [consultation, setConsultation] = useState<ConsultationDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: API에서 상담 상세 데이터 불러오기
    // 현재는 더미 데이터
    setConsultation({
      id,
      ticketNumber: 'CST-20260127-0001',
      name: '홍길동',
      phone: '010-1234-5678',
      email: 'hong@example.com',
      consultationType: '이혼상담',
      message: '협의이혼 절차에 대해 상담 받고 싶습니다. 현재 배우자와 합의가 된 상태이며, 자녀는 없습니다. 재산 분할에 대해서도 어느 정도 합의가 되어 있어서, 구체적인 절차와 필요 서류에 대해 안내 받고 싶습니다.',
      status: '접수완료',
      privacyConsent: true,
      marketingConsent: false,
      createdAt: '2026-01-27T10:30:00Z',
      updatedAt: '2026-01-27T10:30:00Z',
    });
    setIsLoading(false);
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    // TODO: API 호출로 상태 업데이트
    setConsultation((prev) => prev ? { ...prev, status: newStatus } : null);
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
          <option value="접수완료">접수완료</option>
          <option value="상담중">상담중</option>
          <option value="상담완료">상담완료</option>
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
            <div className="flex">
              <dt className="w-24 text-gray-500">수정일시</dt>
              <dd>{new Date(consultation.updatedAt).toLocaleString('ko-KR')}</dd>
            </div>
            <div className="flex">
              <dt className="w-24 text-gray-500">동의 사항</dt>
              <dd className="space-x-2">
                <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">
                  개인정보 수집
                </span>
                {consultation.marketingConsent && (
                  <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                    마케팅
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </Card>
      </div>

      {/* 상담 내용 */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">상담 내용</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="whitespace-pre-wrap text-gray-700">{consultation.message}</p>
        </div>
      </Card>

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
