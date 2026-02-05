'use client';

/**
 * 국제이혼 시뮬레이터 입력 폼
 * International Divorce Simulator Form Component
 *
 * Light Transparency Design System:
 * - bg-white/70, backdrop-blur-md, rounded-2xl borders
 * - Responsive mobile-first design
 * - Korean labels with English subtitles
 */

import { useState, useCallback } from 'react';
import { Card, Button } from '@/components/ui';
import type {
  InternationalDivorceInput,
  CountryCode,
  ResidenceDuration,
  MarriageType,
  AssetType,
  CooperationLevel,
  AssetInfo,
} from '@/types/internationalDivorceSimulator';

interface InternationalDivorceFormProps {
  onSubmit: (data: InternationalDivorceInput) => void;
  isSubmitting: boolean;
}

// 국가 옵션 (한글)
const COUNTRY_OPTIONS: { value: CountryCode; label: string }[] = [
  { value: 'KR', label: '한국' },
  { value: 'US', label: '미국' },
  { value: 'JP', label: '일본' },
  { value: 'CN', label: '중국' },
  { value: 'GB', label: '영국' },
  { value: 'CA', label: '캐나다' },
  { value: 'AU', label: '호주' },
  { value: 'FR', label: '프랑스' },
  { value: 'DE', label: '독일' },
  { value: 'VN', label: '베트남' },
  { value: 'PH', label: '필리핀' },
  { value: 'TH', label: '태국' },
  { value: 'OTHER', label: '기타' },
];

// 거주 기간 옵션
const RESIDENCE_DURATION_OPTIONS: { value: ResidenceDuration; label: string }[] = [
  { value: 'less_than_1_year', label: '1년 미만' },
  { value: '1_to_3_years', label: '1~3년' },
  { value: '3_to_5_years', label: '3~5년' },
  { value: 'more_than_5_years', label: '5년 이상' },
];

// 혼인 형태 옵션
const MARRIAGE_TYPE_OPTIONS: { value: MarriageType; label: string }[] = [
  { value: 'civil', label: '민사혼' },
  { value: 'religious', label: '종교혼' },
  { value: 'both', label: '둘 다' },
  { value: 'common_law', label: '사실혼' },
];

// 재산 유형 옵션
const ASSET_TYPE_OPTIONS: { value: AssetType; label: string }[] = [
  { value: 'real_estate', label: '부동산' },
  { value: 'financial', label: '금융자산' },
  { value: 'business', label: '사업체' },
  { value: 'other', label: '기타' },
];

// 협조 수준 옵션
const COOPERATION_LEVEL_OPTIONS: { value: CooperationLevel; label: string }[] = [
  { value: 'cooperative', label: '협조적' },
  { value: 'neutral', label: '중립적' },
  { value: 'uncooperative', label: '비협조적' },
  { value: 'hostile', label: '적대적' },
];

// 양육권 옵션
const CUSTODY_OPTIONS = [
  { value: 'petitioner', label: '청구인' },
  { value: 'respondent', label: '피청구인' },
  { value: 'shared', label: '공동양육' },
  { value: 'undecided', label: '미정' },
] as const;

// 금액 입력 컴포넌트 (USD)
function MoneyInput({
  id,
  value,
  onChange,
  placeholder = '0',
  currency = 'USD',
}: {
  id: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  currency?: string;
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
        className="w-full h-12 px-4 pr-16 bg-white border border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
        {currency}
      </span>
    </div>
  );
}

export function InternationalDivorceForm({ onSubmit, isSubmitting }: InternationalDivorceFormProps) {
  // 폼 상태
  const [formData, setFormData] = useState<InternationalDivorceInput>({
    petitioner: {
      nationality: 'KR',
      currentResidence: 'KR',
      residenceDuration: '1_to_3_years',
    },
    respondent: {
      nationality: 'US',
      currentResidence: 'US',
      residenceDuration: '1_to_3_years',
    },
    marriage: {
      marriageCountry: 'KR',
      marriageType: 'civil',
      duration: 0,
      registeredInKorea: false,
    },
    assets: [],
    cooperation: {
      level: 'neutral',
      communicationPossible: true,
      willingToNegotiate: true,
    },
  });

  const [hasChildren, setHasChildren] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  // 청구인 정보 업데이트
  const updatePetitioner = useCallback(
    <K extends keyof InternationalDivorceInput['petitioner']>(
      field: K,
      value: InternationalDivorceInput['petitioner'][K]
    ) => {
      setFormData((prev) => ({
        ...prev,
        petitioner: { ...prev.petitioner, [field]: value },
      }));
      setErrors((prev) => ({ ...prev, [`petitioner_${field}`]: undefined }));
    },
    []
  );

  // 피청구인 정보 업데이트
  const updateRespondent = useCallback(
    <K extends keyof InternationalDivorceInput['respondent']>(
      field: K,
      value: InternationalDivorceInput['respondent'][K]
    ) => {
      setFormData((prev) => ({
        ...prev,
        respondent: { ...prev.respondent, [field]: value },
      }));
      setErrors((prev) => ({ ...prev, [`respondent_${field}`]: undefined }));
    },
    []
  );

  // 혼인 정보 업데이트
  const updateMarriage = useCallback(
    <K extends keyof InternationalDivorceInput['marriage']>(
      field: K,
      value: InternationalDivorceInput['marriage'][K]
    ) => {
      setFormData((prev) => ({
        ...prev,
        marriage: { ...prev.marriage, [field]: value },
      }));
      setErrors((prev) => ({ ...prev, [`marriage_${field}`]: undefined }));
    },
    []
  );

  // 자녀 정보 업데이트
  const updateChildren = useCallback(
    <K extends keyof NonNullable<InternationalDivorceInput['children']>>(
      field: K,
      value: NonNullable<InternationalDivorceInput['children']>[K]
    ) => {
      setFormData((prev) => ({
        ...prev,
        children: prev.children ? { ...prev.children, [field]: value } : undefined,
      }));
    },
    []
  );

  // 자녀 연령 추가
  const addChildAge = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      children: prev.children
        ? { ...prev.children, ages: [...prev.children.ages, 0] }
        : {
            count: 1,
            ages: [0],
            currentResidence: 'KR',
            custody: 'undecided',
          },
    }));
  }, []);

  // 자녀 연령 제거
  const removeChildAge = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      children: prev.children
        ? {
            ...prev.children,
            ages: prev.children.ages.filter((_, i) => i !== index),
            count: Math.max(0, prev.children.count - 1),
          }
        : undefined,
    }));
  }, []);

  // 자녀 연령 업데이트
  const updateChildAge = useCallback((index: number, age: number) => {
    setFormData((prev) => ({
      ...prev,
      children: prev.children
        ? {
            ...prev.children,
            ages: prev.children.ages.map((a, i) => (i === index ? age : a)),
          }
        : undefined,
    }));
  }, []);

  // 재산 추가
  const addAsset = useCallback(() => {
    const newAsset: AssetInfo = {
      type: 'financial',
      location: 'KR',
      estimatedValue: 0,
    };
    setFormData((prev) => ({
      ...prev,
      assets: [...prev.assets, newAsset],
    }));
  }, []);

  // 재산 제거
  const removeAsset = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      assets: prev.assets.filter((_, i) => i !== index),
    }));
  }, []);

  // 재산 업데이트
  const updateAsset = useCallback(
    <K extends keyof AssetInfo>(index: number, field: K, value: AssetInfo[K]) => {
      setFormData((prev) => ({
        ...prev,
        assets: prev.assets.map((a, i) => (i === index ? { ...a, [field]: value } : a)),
      }));
    },
    []
  );

  // 협조 상황 업데이트
  const updateCooperation = useCallback(
    <K extends keyof InternationalDivorceInput['cooperation']>(
      field: K,
      value: InternationalDivorceInput['cooperation'][K]
    ) => {
      setFormData((prev) => ({
        ...prev,
        cooperation: { ...prev.cooperation, [field]: value },
      }));
    },
    []
  );

  // 폼 검증
  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.marriage.duration < 0) {
      newErrors.marriage_duration = '혼인 기간을 입력해주세요.';
    }

    if (hasChildren && (!formData.children || formData.children.ages.length === 0)) {
      newErrors.children_ages = '자녀가 있다면 연령을 입력해주세요.';
    }

    if (hasChildren && formData.children) {
      if (formData.children.count !== formData.children.ages.length) {
        newErrors.children_count = '자녀 수와 연령 개수가 일치하지 않습니다.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, hasChildren]);

  // 폼 초기화
  const handleReset = useCallback(() => {
    setFormData({
      petitioner: {
        nationality: 'KR',
        currentResidence: 'KR',
        residenceDuration: '1_to_3_years',
      },
      respondent: {
        nationality: 'US',
        currentResidence: 'US',
        residenceDuration: '1_to_3_years',
      },
      marriage: {
        marriageCountry: 'KR',
        marriageType: 'civil',
        duration: 0,
        registeredInKorea: false,
      },
      assets: [],
      cooperation: {
        level: 'neutral',
        communicationPossible: true,
        willingToNegotiate: true,
      },
    });
    setHasChildren(false);
    setErrors({});
  }, []);

  // 폼 제출
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (validate() && !isSubmitting) {
        // 자녀가 없으면 children 필드 제거
        const submitData = { ...formData };
        if (!hasChildren) {
          delete submitData.children;
        }
        onSubmit(submitData);
      }
    },
    [validate, isSubmitting, onSubmit, formData, hasChildren]
  );

  return (
    <Card className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900">국제이혼 시뮬레이터</h2>
        <p className="text-sm text-gray-600 mt-1">
          국제이혼의 관할, 준거법, 절차 복잡도를 평가해드립니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 청구인 섹션 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            청구인 정보
            <span className="text-sm font-normal text-gray-500 ml-2">(이혼 신청자)</span>
          </h3>

          {/* 국적 */}
          <div>
            <label htmlFor="petitioner-nationality" className="block text-sm font-medium text-gray-700 mb-1">
              국적
            </label>
            <select
              id="petitioner-nationality"
              value={formData.petitioner.nationality}
              onChange={(e) => updatePetitioner('nationality', e.target.value as CountryCode)}
              className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            >
              {COUNTRY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 현재 거주 국가 */}
          <div>
            <label htmlFor="petitioner-residence" className="block text-sm font-medium text-gray-700 mb-1">
              현재 거주 국가
            </label>
            <select
              id="petitioner-residence"
              value={formData.petitioner.currentResidence}
              onChange={(e) => updatePetitioner('currentResidence', e.target.value as CountryCode)}
              className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            >
              {COUNTRY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 거주 기간 */}
          <div>
            <label htmlFor="petitioner-duration" className="block text-sm font-medium text-gray-700 mb-1">
              거주 기간
            </label>
            <select
              id="petitioner-duration"
              value={formData.petitioner.residenceDuration}
              onChange={(e) => updatePetitioner('residenceDuration', e.target.value as ResidenceDuration)}
              className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            >
              {RESIDENCE_DURATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* 피청구인 섹션 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            피청구인 정보
            <span className="text-sm font-normal text-gray-500 ml-2">(배우자)</span>
          </h3>

          {/* 국적 */}
          <div>
            <label htmlFor="respondent-nationality" className="block text-sm font-medium text-gray-700 mb-1">
              국적
            </label>
            <select
              id="respondent-nationality"
              value={formData.respondent.nationality}
              onChange={(e) => updateRespondent('nationality', e.target.value as CountryCode)}
              className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            >
              {COUNTRY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 현재 거주 국가 */}
          <div>
            <label htmlFor="respondent-residence" className="block text-sm font-medium text-gray-700 mb-1">
              현재 거주 국가
            </label>
            <select
              id="respondent-residence"
              value={formData.respondent.currentResidence}
              onChange={(e) => updateRespondent('currentResidence', e.target.value as CountryCode)}
              className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            >
              {COUNTRY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 거주 기간 */}
          <div>
            <label htmlFor="respondent-duration" className="block text-sm font-medium text-gray-700 mb-1">
              거주 기간
            </label>
            <select
              id="respondent-duration"
              value={formData.respondent.residenceDuration}
              onChange={(e) => updateRespondent('residenceDuration', e.target.value as ResidenceDuration)}
              className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            >
              {RESIDENCE_DURATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* 혼인 정보 섹션 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">혼인 정보</h3>

          {/* 혼인 국가 */}
          <div>
            <label htmlFor="marriage-country" className="block text-sm font-medium text-gray-700 mb-1">
              혼인 국가
            </label>
            <select
              id="marriage-country"
              value={formData.marriage.marriageCountry}
              onChange={(e) => updateMarriage('marriageCountry', e.target.value as CountryCode)}
              className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            >
              {COUNTRY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 혼인 형태 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">혼인 형태</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MARRIAGE_TYPE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                    formData.marriage.marriageType === option.value
                      ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="marriageType"
                    value={option.value}
                    checked={formData.marriage.marriageType === option.value}
                    onChange={(e) => updateMarriage('marriageType', e.target.value as MarriageType)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 혼인 기간 */}
          <div>
            <label htmlFor="marriage-duration" className="block text-sm font-medium text-gray-700 mb-1">
              혼인 기간 (년)
            </label>
            <input
              id="marriage-duration"
              type="number"
              min="0"
              value={formData.marriage.duration || ''}
              onChange={(e) => updateMarriage('duration', parseInt(e.target.value, 10) || 0)}
              placeholder="0"
              className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            />
            {errors.marriage_duration && (
              <span className="text-xs text-red-600 mt-1">{errors.marriage_duration}</span>
            )}
          </div>

          {/* 한국 혼인 신고 여부 */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.marriage.registeredInKorea}
                onChange={(e) => updateMarriage('registeredInKorea', e.target.checked)}
                className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
              />
              <span className="text-sm font-medium text-gray-700">한국에 혼인 신고됨</span>
            </label>
          </div>
        </section>

        {/* 자녀 정보 섹션 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">자녀 정보</h3>

          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasChildren}
                onChange={(e) => {
                  setHasChildren(e.target.checked);
                  if (!e.target.checked) {
                    setFormData((prev) => ({ ...prev, children: undefined }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      children: {
                        count: 0,
                        ages: [],
                        currentResidence: 'KR',
                        custody: 'undecided',
                      },
                    }));
                  }
                }}
                className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
              />
              <span className="text-sm font-medium text-gray-700">자녀가 있습니까?</span>
            </label>

            {/* 자녀 상세 정보 */}
            {hasChildren && formData.children && (
              <div className="ml-7 space-y-4 p-4 bg-white/50 border border-gray-200 rounded-xl">
                {/* 자녀 연령 입력 */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">자녀 연령</label>
                  {formData.children.ages.map((age, index) => (
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
                  {errors.children_ages && (
                    <span className="text-xs text-red-600">{errors.children_ages}</span>
                  )}
                </div>

                {/* 자녀 거주 국가 */}
                <div>
                  <label htmlFor="children-residence" className="block text-sm font-medium text-gray-700 mb-1">
                    자녀 현재 거주 국가
                  </label>
                  <select
                    id="children-residence"
                    value={formData.children.currentResidence}
                    onChange={(e) => updateChildren('currentResidence', e.target.value as CountryCode)}
                    className="w-full h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  >
                    {COUNTRY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 양육권 */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">양육권</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CUSTODY_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center justify-center gap-2 px-3 py-2 border rounded-lg cursor-pointer transition-all text-sm ${
                          formData.children?.custody === option.value
                            ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="custody"
                          value={option.value}
                          checked={formData.children?.custody === option.value}
                          onChange={(e) =>
                            updateChildren('custody', e.target.value as 'petitioner' | 'respondent' | 'shared' | 'undecided')
                          }
                          className="sr-only"
                        />
                        <span className="font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 재산 섹션 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">재산 정보</h3>
            <button
              type="button"
              onClick={addAsset}
              className="px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-lg hover:bg-brand-primary/20 transition-colors text-sm font-medium"
            >
              + 재산 추가
            </button>
          </div>

          {formData.assets.length === 0 ? (
            <p className="text-sm text-gray-500 italic">재산이 없으면 건너뛰셔도 됩니다.</p>
          ) : (
            <div className="space-y-3">
              {formData.assets.map((asset, index) => (
                <div key={index} className="p-4 bg-white/50 border border-gray-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-800">재산 {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeAsset(index)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      제거
                    </button>
                  </div>

                  {/* 재산 유형 */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">재산 유형</label>
                    <select
                      value={asset.type}
                      onChange={(e) => updateAsset(index, 'type', e.target.value as AssetType)}
                      className="w-full h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    >
                      {ASSET_TYPE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 재산 소재지 */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">재산 소재지</label>
                    <select
                      value={asset.location}
                      onChange={(e) => updateAsset(index, 'location', e.target.value as CountryCode)}
                      className="w-full h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    >
                      {COUNTRY_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 추정 가치 */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">추정 가치 (USD)</label>
                    <MoneyInput
                      id={`asset-value-${index}`}
                      value={asset.estimatedValue}
                      onChange={(value) => updateAsset(index, 'estimatedValue', value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 협조 상황 섹션 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">협조 상황</h3>

          {/* 협조 수준 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">배우자의 협조 수준</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {COOPERATION_LEVEL_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                    formData.cooperation.level === option.value
                      ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="cooperationLevel"
                    value={option.value}
                    checked={formData.cooperation.level === option.value}
                    onChange={(e) => updateCooperation('level', e.target.value as CooperationLevel)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 연락 가능 여부 */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.cooperation.communicationPossible}
                onChange={(e) => updateCooperation('communicationPossible', e.target.checked)}
                className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
              />
              <span className="text-sm font-medium text-gray-700">배우자와 연락 가능</span>
            </label>
          </div>

          {/* 협상 의사 */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.cooperation.willingToNegotiate}
                onChange={(e) => updateCooperation('willingToNegotiate', e.target.checked)}
                className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
              />
              <span className="text-sm font-medium text-gray-700">배우자가 협상 의사 있음</span>
            </label>
          </div>
        </section>

        {/* 선호 관할 섹션 */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            선호하는 관할 국가
            <span className="text-sm font-normal text-gray-500 ml-2">(선택사항)</span>
          </h3>

          <div>
            <label htmlFor="preferred-jurisdiction" className="block text-sm font-medium text-gray-700 mb-1">
              이혼 소송을 진행하고 싶은 국가
            </label>
            <select
              id="preferred-jurisdiction"
              value={formData.preferredJurisdiction || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  preferredJurisdiction: e.target.value ? (e.target.value as CountryCode) : undefined,
                }))
              }
              className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            >
              <option value="">선택 안 함</option>
              {COUNTRY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              선택하시면 해당 국가에서 진행 가능한지 평가해드립니다.
            </p>
          </div>
        </section>

        {/* 제출 버튼 */}
        <div className="flex gap-3">
          <Button type="button" variant="secondary" onClick={handleReset} disabled={isSubmitting} className="flex-1" size="lg">
            초기화
          </Button>
          <Button type="submit" disabled={isSubmitting} className="flex-1" size="lg">
            {isSubmitting ? '분석 중...' : '분석 시작'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
