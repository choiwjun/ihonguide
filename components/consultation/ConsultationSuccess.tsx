'use client';

/**
 * 상담 신청 완료 컴포넌트
 */

import Link from 'next/link';
import { Card, Button } from '@/components/ui';
import type { ConsultationResult } from '@/types/consultation';

interface ConsultationSuccessProps {
  result: ConsultationResult;
  onReset: () => void;
}

export function ConsultationSuccess({ result, onReset }: ConsultationSuccessProps) {
  return (
    <div className="space-y-6">
      {/* 성공 메시지 */}
      <Card className="text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">상담 신청이 완료되었습니다</h2>
            <p className="text-gray-600 mt-2">
              빠른 시일 내에 연락드리겠습니다.
            </p>
          </div>
        </div>
      </Card>

      {/* 접수 정보 */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">접수 정보</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">접수 번호</span>
              <span className="font-mono font-medium text-brand-primary">
                {result.ticketNumber}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">접수 상태</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                {result.status}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">접수 일시</span>
              <span className="font-medium">
                {new Date(result.createdAt).toLocaleString('ko-KR')}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* 안내 문구 */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">안내 사항</p>
            <ul className="list-disc list-inside space-y-1">
              <li>영업일 기준 1-2일 이내 연락드립니다.</li>
              <li>접수 번호를 통해 상담 진행 상황을 확인하실 수 있습니다.</li>
              <li>추가 문의는 고객센터(1588-0000)로 연락주세요.</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* CTA 버튼 */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 text-center">
            다른 서비스도 이용해보세요
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/diagnosis" className="block">
              <Button variant="secondary" className="w-full">
                이혼 유형 진단하기
              </Button>
            </Link>
            <Link href="/calculator" className="block">
              <Button variant="secondary" className="w-full">
                양육비 계산하기
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* 추가 신청 */}
      <div className="text-center">
        <Button variant="ghost" onClick={onReset} className="text-gray-500">
          새로운 상담 신청하기
        </Button>
      </div>
    </div>
  );
}
