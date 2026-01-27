'use client';

/**
 * 상담 신청 히스토리 컴포넌트
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';

interface ConsultationRequest {
  id: string;
  ticketNumber: string;
  consultationType: string;
  status: string;
  createdAt: string;
}

const statusMap: Record<string, { label: string; color: string }> = {
  접수완료: { label: '접수완료', color: 'bg-blue-100 text-blue-700' },
  상담중: { label: '상담중', color: 'bg-yellow-100 text-yellow-700' },
  상담완료: { label: '상담완료', color: 'bg-green-100 text-green-700' },
};

export function ConsultationHistory() {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: API에서 상담 신청 내역 불러오기
    // 현재는 로컬 스토리지에서 불러옴
    const savedRequests = localStorage.getItem('consultationHistory');
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Card>
        <div className="text-center py-8 text-gray-500">불러오는 중...</div>
      </Card>
    );
  }

  if (requests.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">아직 상담 신청 내역이 없습니다.</p>
          <Link href="/consultation">
            <Button variant="secondary" size="sm">
              상담 신청하기
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id} className="hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-sm text-brand-primary">
                  {request.ticketNumber}
                </span>
                <span className={`px-2 py-0.5 text-xs rounded ${
                  statusMap[request.status]?.color || 'bg-gray-100 text-gray-700'
                }`}>
                  {statusMap[request.status]?.label || request.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{request.consultationType}</p>
            </div>
            <span className="text-xs text-gray-400">
              {new Date(request.createdAt).toLocaleDateString('ko-KR')}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
