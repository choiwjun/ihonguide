'use client';

/**
 * 상담 신청 폼 컴포넌트
 */

import { useState, useCallback } from 'react';
import { Card, Button, Input } from '@/components/ui';
import { CONSULTATION_TYPE_OPTIONS, type ConsultationType } from '@/types/consultation';

interface ConsultationFormProps {
  onSubmit: (data: ConsultationFormData) => void;
  isSubmitting: boolean;
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  email: string;
  consultationType: ConsultationType;
  message: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
}

export function ConsultationForm({ onSubmit, isSubmitting }: ConsultationFormProps) {
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    email: '',
    consultationType: '이혼상담',
    message: '',
    privacyConsent: false,
    marketingConsent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationFormData, string>>>({});

  // 입력값 변경 핸들러
  const handleChange = useCallback(
    (field: keyof ConsultationFormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      },
    []
  );

  // 폼 검증
  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof ConsultationFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '이름은 2자 이상 입력해주세요.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요.';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = '올바른 연락처를 입력해주세요.';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.message.trim()) {
      newErrors.message = '상담 내용을 입력해주세요.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = '상담 내용은 10자 이상 입력해주세요.';
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = '개인정보 수집 및 이용에 동의해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // 폼 제출
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (validate() && !isSubmitting) {
        onSubmit(formData);
      }
    },
    [validate, isSubmitting, onSubmit, formData]
  );

  return (
    <Card className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">상담 신청</h2>
        <p className="text-sm text-gray-600 mt-1">
          전문 상담사가 빠르게 연락드리겠습니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 이름 */}
        <div>
          <Input
            label="이름"
            value={formData.name}
            onChange={handleChange('name')}
            placeholder="홍길동"
            error={errors.name}
            fullWidth
          />
        </div>

        {/* 연락처 */}
        <div>
          <Input
            label="연락처"
            type="tel"
            value={formData.phone}
            onChange={handleChange('phone')}
            placeholder="010-1234-5678"
            error={errors.phone}
            fullWidth
          />
        </div>

        {/* 이메일 (선택) */}
        <div>
          <Input
            label="이메일 (선택)"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            placeholder="example@email.com"
            error={errors.email}
            fullWidth
          />
        </div>

        {/* 상담 유형 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            상담 유형
          </label>
          <select
            value={formData.consultationType}
            onChange={handleChange('consultationType')}
            className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
          >
            {CONSULTATION_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 상담 내용 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            상담 내용
          </label>
          <textarea
            value={formData.message}
            onChange={handleChange('message')}
            placeholder="상담받고 싶은 내용을 자세히 적어주세요."
            rows={5}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
          />
          {errors.message && (
            <span className="text-xs text-red-600 mt-1">{errors.message}</span>
          )}
        </div>

        {/* 개인정보 동의 */}
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.privacyConsent}
              onChange={handleChange('privacyConsent')}
              className="w-5 h-5 mt-0.5 text-brand-primary rounded focus:ring-brand-primary"
            />
            <span className="text-sm text-gray-700">
              <span className="text-red-500">*</span> 개인정보 수집 및 이용에 동의합니다.
              <button
                type="button"
                className="text-brand-primary underline ml-1"
                onClick={() => alert('개인정보 처리방침 상세 내용')}
              >
                자세히
              </button>
            </span>
          </label>
          {errors.privacyConsent && (
            <span className="text-xs text-red-600">{errors.privacyConsent}</span>
          )}

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.marketingConsent}
              onChange={handleChange('marketingConsent')}
              className="w-5 h-5 mt-0.5 text-brand-primary rounded focus:ring-brand-primary"
            />
            <span className="text-sm text-gray-700">
              마케팅 정보 수신에 동의합니다. (선택)
            </span>
          </label>
        </div>

        {/* 제출 버튼 */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? '신청 중...' : '상담 신청하기'}
        </Button>
      </form>
    </Card>
  );
}
