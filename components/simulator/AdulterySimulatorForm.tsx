'use client';

/**
 * 상간녀 소송 시뮬레이터 입력 폼
 * Adultery Lawsuit Simulator Form Component
 *
 * Light Transparency Design System:
 * - bg-white/70, backdrop-blur-md, rounded-2xl borders
 * - Responsive mobile-first design
 * - Korean labels with helpful hints
 */

import { useState, useCallback } from 'react';
import { Card, Button } from '@/components/ui';
import type {
  AdulterySimulatorInput,
  MaritalStatus,
  AdulteryType,
  EvidenceItem,
  EvidenceType,
  EvidenceReliability,
  EvidenceAcquisitionMethod,
  LawsuitGoal,
} from '@/types/adulterySimulator';

interface AdulterySimulatorFormProps {
  onSubmit: (data: AdulterySimulatorInput) => void;
  isSubmitting: boolean;
}

// 혼인 상태 옵션
const MARITAL_STATUS_OPTIONS: { value: MaritalStatus; label: string }[] = [
  { value: 'married', label: '혼인 중' },
  { value: 'separated', label: '별거 중' },
  { value: 'divorced', label: '이혼' },
  { value: 'registered_partner', label: '사실혼' },
];

// 부정행위 유형 옵션
const ADULTERY_TYPE_OPTIONS: { value: AdulteryType; label: string }[] = [
  { value: 'physical', label: '육체적 관계' },
  { value: 'emotional', label: '정서적 외도' },
  { value: 'both', label: '둘 다' },
  { value: 'suspected', label: '의심되는 상황' },
];

// 만남 빈도 옵션
const FREQUENCY_OPTIONS = [
  { value: 'once', label: '한 번' },
  { value: 'occasional', label: '간헐적' },
  { value: 'frequent', label: '빈번함' },
  { value: 'ongoing', label: '지속적' },
];

// 증거 타입 옵션
const EVIDENCE_TYPE_OPTIONS: { value: EvidenceType; label: string }[] = [
  { value: 'messages', label: '메시지 (카톡, 라인 등)' },
  { value: 'photos', label: '사진' },
  { value: 'videos', label: '영상' },
  { value: 'witness', label: '목격담, 진술서' },
  { value: 'financial_records', label: '재무 기록 (호텔, 선물 결제 등)' },
  { value: 'confession', label: '자백' },
  { value: 'detective_report', label: '탐정 보고서' },
  { value: 'other', label: '기타' },
];

// 증거 신뢰도 옵션
const RELIABILITY_OPTIONS: { value: EvidenceReliability; label: string }[] = [
  { value: 'high', label: '높음 (직접 증거)' },
  { value: 'medium', label: '보통 (정황 증거)' },
  { value: 'low', label: '낮음 (불확실)' },
];

// 증거 획득 방법 옵션
const ACQUISITION_METHOD_OPTIONS: { value: EvidenceAcquisitionMethod; label: string }[] = [
  { value: 'legal', label: '합법적' },
  { value: 'questionable', label: '회색지대' },
  { value: 'illegal', label: '불법 (도청, 해킹 등)' },
];

// 소송 목표 옵션
const GOAL_OPTIONS: { value: LawsuitGoal; label: string }[] = [
  { value: 'compensation', label: '위자료' },
  { value: 'divorce', label: '이혼' },
  { value: 'both', label: '둘 다' },
  { value: 'public_apology', label: '공개 사과' },
];

// 정신적 피해 정도 레이블
const EMOTIONAL_DISTRESS_LABELS = ['경미', '보통', '심각', '매우 심각', '극심'];

// 사회적 영향 레이블
const SOCIAL_IMPACT_LABELS = ['없음', '경미', '보통', '심각', '매우 심각'];

// 원 단위 입력 필드 컴포넌트
function MoneyInput({
  id,
  value,
  onChange,
  placeholder = '0',
}: {
  id: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const numValue = parseInt(rawValue, 10);
    onChange(isNaN(numValue) ? 0 : numValue);
  };

  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={value > 0 ? value.toLocaleString() : ''}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-12 px-4 pr-10 bg-white border border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
        원
      </span>
    </div>
  );
}

export function AdulterySimulatorForm({ onSubmit, isSubmitting }: AdulterySimulatorFormProps) {
  // 폼 상태
  const [formData, setFormData] = useState<AdulterySimulatorInput>({
    maritalStatus: 'married',
    marriageDuration: 0,
    hasChildren: false,
    childrenAges: [],
    adulteryType: 'physical',
    knewMaritalStatus: true,
    duration: 0,
    frequency: 'occasional',
    evidences: [],
    familyImpact: {
      emotionalDistress: 3,
      financialLoss: 0,
      socialImpact: 3,
    },
    goal: 'compensation',
    expectedCompensation: 0,
  });

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  // 기본 정보 업데이트
  const updateBasicInfo = useCallback(
    <K extends keyof AdulterySimulatorInput>(field: K, value: AdulterySimulatorInput[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  // 자녀 연령 추가
  const addChildAge = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      childrenAges: [...(prev.childrenAges || []), 0],
    }));
  }, []);

  // 자녀 연령 제거
  const removeChildAge = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      childrenAges: prev.childrenAges?.filter((_, i) => i !== index),
    }));
  }, []);

  // 자녀 연령 업데이트
  const updateChildAge = useCallback((index: number, age: number) => {
    setFormData((prev) => ({
      ...prev,
      childrenAges: prev.childrenAges?.map((a, i) => (i === index ? age : a)),
    }));
  }, []);

  // 증거 추가
  const addEvidence = useCallback(() => {
    const newEvidence: EvidenceItem = {
      type: 'messages',
      reliability: 'medium',
      acquisitionMethod: 'legal',
      description: '',
    };
    setFormData((prev) => ({
      ...prev,
      evidences: [...prev.evidences, newEvidence],
    }));
  }, []);

  // 증거 제거
  const removeEvidence = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      evidences: prev.evidences.filter((_, i) => i !== index),
    }));
  }, []);

  // 증거 업데이트
  const updateEvidence = useCallback(
    <K extends keyof EvidenceItem>(index: number, field: K, value: EvidenceItem[K]) => {
      setFormData((prev) => ({
        ...prev,
        evidences: prev.evidences.map((e, i) => (i === index ? { ...e, [field]: value } : e)),
      }));
    },
    []
  );

  // 가정 영향 업데이트
  const updateFamilyImpact = useCallback(
    <K extends keyof AdulterySimulatorInput['familyImpact']>(
      field: K,
      value: AdulterySimulatorInput['familyImpact'][K]
    ) => {
      setFormData((prev) => ({
        ...prev,
        familyImpact: { ...prev.familyImpact, [field]: value },
      }));
    },
    []
  );

  // 폼 검증
  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.marriageDuration < 0) {
      newErrors.marriageDuration = '혼인 기간을 입력해주세요.';
    }

    if (formData.hasChildren && (!formData.childrenAges || formData.childrenAges.length === 0)) {
      newErrors.childrenAges = '자녀가 있다면 연령을 입력해주세요.';
    }

    if (formData.duration < 0) {
      newErrors.duration = '부정행위 기간을 입력해주세요.';
    }

    if (formData.evidences.length === 0) {
      newErrors.evidences = '최소 1개의 증거를 입력해주세요.';
    }

    formData.evidences.forEach((evidence, index) => {
      if (!evidence.description.trim()) {
        newErrors[`evidence_${index}_description`] = '증거 설명을 입력해주세요.';
      }
    });

    if (formData.familyImpact.financialLoss < 0) {
      newErrors.financialLoss = '금전적 손실을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // 폼 초기화
  const handleReset = useCallback(() => {
    setFormData({
      maritalStatus: 'married',
      marriageDuration: 0,
      hasChildren: false,
      childrenAges: [],
      adulteryType: 'physical',
      knewMaritalStatus: true,
      duration: 0,
      frequency: 'occasional',
      evidences: [],
      familyImpact: {
        emotionalDistress: 3,
        financialLoss: 0,
        socialImpact: 3,
      },
      goal: 'compensation',
      expectedCompensation: 0,
    });
    setErrors({});
  }, []);

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
    <Card className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900">상간녀 소송 시뮬레이터</h2>
        <p className="text-sm text-gray-600 mt-1">
          아래 정보를 입력하시면 소송 가능성을 평가해드립니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 기본 정보 섹션 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">기본 정보</h3>

          {/* 혼인 상태 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">혼인 상태</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MARITAL_STATUS_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                    formData.maritalStatus === option.value
                      ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="maritalStatus"
                    value={option.value}
                    checked={formData.maritalStatus === option.value}
                    onChange={(e) =>
                      updateBasicInfo('maritalStatus', e.target.value as MaritalStatus)
                    }
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 혼인 기간 */}
          <div>
            <label htmlFor="marriageDuration" className="block text-sm font-medium text-gray-700 mb-1">
              혼인 기간 (년)
            </label>
            <input
              id="marriageDuration"
              type="number"
              min="0"
              value={formData.marriageDuration || ''}
              onChange={(e) => updateBasicInfo('marriageDuration', parseInt(e.target.value, 10) || 0)}
              placeholder="0"
              className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            />
            {errors.marriageDuration && (
              <span className="text-xs text-red-600 mt-1">{errors.marriageDuration}</span>
            )}
          </div>

          {/* 자녀 유무 */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasChildren}
                onChange={(e) => {
                  updateBasicInfo('hasChildren', e.target.checked);
                  if (!e.target.checked) {
                    updateBasicInfo('childrenAges', []);
                  }
                }}
                className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
              />
              <span className="text-sm font-medium text-gray-700">자녀가 있습니까?</span>
            </label>

            {/* 자녀 연령 입력 */}
            {formData.hasChildren && (
              <div className="ml-7 space-y-2">
                {formData.childrenAges?.map((age, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={age || ''}
                      onChange={(e) => updateChildAge(index, parseInt(e.target.value, 10) || 0)}
                      placeholder="나이"
                      className="flex-1 h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => removeChildAge(index)}
                      className="px-3 h-10 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                    >
                      제거
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addChildAge}
                  className="text-sm text-brand-primary hover:text-brand-primary-dark font-medium"
                >
                  + 자녀 추가
                </button>
                {errors.childrenAges && (
                  <span className="text-xs text-red-600">{errors.childrenAges}</span>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 부정행위 정황 섹션 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">부정행위 정황</h3>

          {/* 부정행위 유형 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">부정행위 유형</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ADULTERY_TYPE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                    formData.adulteryType === option.value
                      ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="adulteryType"
                    value={option.value}
                    checked={formData.adulteryType === option.value}
                    onChange={(e) =>
                      updateBasicInfo('adulteryType', e.target.value as AdulteryType)
                    }
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 상간녀가 기혼 사실을 알았는지 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              상대방이 기혼 사실을 알고 있었습니까?
            </label>
            <div className="flex gap-3">
              <label
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                  formData.knewMaritalStatus
                    ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="knewMaritalStatus"
                  checked={formData.knewMaritalStatus}
                  onChange={() => updateBasicInfo('knewMaritalStatus', true)}
                  className="sr-only"
                />
                <span className="text-sm font-medium">예</span>
              </label>
              <label
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                  !formData.knewMaritalStatus
                    ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="knewMaritalStatus"
                  checked={!formData.knewMaritalStatus}
                  onChange={() => updateBasicInfo('knewMaritalStatus', false)}
                  className="sr-only"
                />
                <span className="text-sm font-medium">아니오</span>
              </label>
            </div>
          </div>

          {/* 부정행위 기간 */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              부정행위 기간 (개월)
            </label>
            <input
              id="duration"
              type="number"
              min="0"
              value={formData.duration || ''}
              onChange={(e) => updateBasicInfo('duration', parseInt(e.target.value, 10) || 0)}
              placeholder="0"
              className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            />
            {errors.duration && <span className="text-xs text-red-600 mt-1">{errors.duration}</span>}
          </div>

          {/* 만남 빈도 */}
          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
              만남 빈도
            </label>
            <select
              id="frequency"
              value={formData.frequency}
              onChange={(e) =>
                updateBasicInfo('frequency', e.target.value as 'once' | 'occasional' | 'frequent' | 'ongoing')
              }
              className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            >
              {FREQUENCY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* 증거 섹션 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">증거</h3>
            <button
              type="button"
              onClick={addEvidence}
              className="px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-lg hover:bg-brand-primary/20 transition-colors text-sm font-medium"
            >
              + 증거 추가
            </button>
          </div>

          {errors.evidences && formData.evidences.length === 0 && (
            <span className="text-xs text-red-600">{errors.evidences}</span>
          )}

          {formData.evidences.map((evidence, index) => (
            <div
              key={index}
              className="p-4 bg-white/50 border border-gray-200 rounded-xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-800">증거 {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeEvidence(index)}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  제거
                </button>
              </div>

              {/* 증거 타입 */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">증거 타입</label>
                <select
                  value={evidence.type}
                  onChange={(e) => updateEvidence(index, 'type', e.target.value as EvidenceType)}
                  className="w-full h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                >
                  {EVIDENCE_TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 신뢰도 */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">신뢰도</label>
                <div className="flex gap-2">
                  {RELIABILITY_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className={`flex-1 flex items-center justify-center px-3 py-2 border rounded-lg cursor-pointer transition-all text-xs ${
                        evidence.reliability === option.value
                          ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`reliability_${index}`}
                        value={option.value}
                        checked={evidence.reliability === option.value}
                        onChange={(e) =>
                          updateEvidence(index, 'reliability', e.target.value as EvidenceReliability)
                        }
                        className="sr-only"
                      />
                      <span className="font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 획득 방법 */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">획득 방법</label>
                <div className="flex gap-2">
                  {ACQUISITION_METHOD_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className={`flex-1 flex items-center justify-center px-3 py-2 border rounded-lg cursor-pointer transition-all text-xs ${
                        evidence.acquisitionMethod === option.value
                          ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`acquisitionMethod_${index}`}
                        value={option.value}
                        checked={evidence.acquisitionMethod === option.value}
                        onChange={(e) =>
                          updateEvidence(
                            index,
                            'acquisitionMethod',
                            e.target.value as EvidenceAcquisitionMethod
                          )
                        }
                        className="sr-only"
                      />
                      <span className="font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 증거 설명 */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">증거 설명</label>
                <textarea
                  value={evidence.description}
                  onChange={(e) => updateEvidence(index, 'description', e.target.value)}
                  placeholder="증거에 대한 상세 설명을 입력해주세요."
                  rows={3}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
                />
                {errors[`evidence_${index}_description`] && (
                  <span className="text-xs text-red-600 mt-1">
                    {errors[`evidence_${index}_description`]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* 가정 영향 섹션 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">가정에 미친 영향</h3>

          {/* 정신적 피해 정도 */}
          <div>
            <label htmlFor="emotionalDistress" className="block text-sm font-medium text-gray-700 mb-2">
              정신적 피해 정도
            </label>
            <input
              id="emotionalDistress"
              type="range"
              min="1"
              max="5"
              value={formData.familyImpact.emotionalDistress}
              onChange={(e) =>
                updateFamilyImpact('emotionalDistress', parseInt(e.target.value, 10) as 1 | 2 | 3 | 4 | 5)
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              {EMOTIONAL_DISTRESS_LABELS.map((label, i) => (
                <span key={i} className={i + 1 === formData.familyImpact.emotionalDistress ? 'font-semibold text-brand-primary' : ''}>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* 금전적 손실 */}
          <div>
            <label htmlFor="financialLoss" className="block text-sm font-medium text-gray-700 mb-1">
              금전적 손실 (원)
            </label>
            <MoneyInput
              id="financialLoss"
              value={formData.familyImpact.financialLoss}
              onChange={(value) => updateFamilyImpact('financialLoss', value)}
            />
            {errors.financialLoss && (
              <span className="text-xs text-red-600 mt-1">{errors.financialLoss}</span>
            )}
          </div>

          {/* 사회적 영향 */}
          <div>
            <label htmlFor="socialImpact" className="block text-sm font-medium text-gray-700 mb-2">
              사회적 영향 (평판 손상 등)
            </label>
            <input
              id="socialImpact"
              type="range"
              min="1"
              max="5"
              value={formData.familyImpact.socialImpact}
              onChange={(e) =>
                updateFamilyImpact('socialImpact', parseInt(e.target.value, 10) as 1 | 2 | 3 | 4 | 5)
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              {SOCIAL_IMPACT_LABELS.map((label, i) => (
                <span key={i} className={i + 1 === formData.familyImpact.socialImpact ? 'font-semibold text-brand-primary' : ''}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 목표 섹션 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">소송 목표</h3>

          {/* 소송 목표 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">원하시는 결과</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {GOAL_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                    formData.goal === option.value
                      ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="goal"
                    value={option.value}
                    checked={formData.goal === option.value}
                    onChange={(e) => updateBasicInfo('goal', e.target.value as LawsuitGoal)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 희망 위자료 (선택) */}
          {(formData.goal === 'compensation' || formData.goal === 'both') && (
            <div>
              <label htmlFor="expectedCompensation" className="block text-sm font-medium text-gray-700 mb-1">
                희망 위자료 (선택사항)
              </label>
              <MoneyInput
                id="expectedCompensation"
                value={formData.expectedCompensation || 0}
                onChange={(value) => updateBasicInfo('expectedCompensation', value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                희망하시는 위자료 금액을 입력해주세요. (비워두셔도 됩니다)
              </p>
            </div>
          )}
        </section>

        {/* 제출 버튼 */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={isSubmitting}
            className="flex-1"
            size="lg"
          >
            초기화
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
            size="lg"
          >
            {isSubmitting ? '분석 중...' : '분석 시작'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
