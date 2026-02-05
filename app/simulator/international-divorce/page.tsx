'use client';

/**
 * 국제이혼 시뮬레이터 페이지
 * @TASK International Divorce Simulator Main Page
 * @SPEC 국제이혼 절차, 준거법, 비용 시뮬레이션
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { Container } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import Link from 'next/link';

// 타입 정의
interface InternationalDivorceInput {
  marriageCountry: string;
  residenceCountry: string;
  spouseNationality: string;
  myNationality: string;
  marriageDuration: number;
  hasChildren: boolean;
  childrenResidence?: string;
  propertyLocation: string[];
  preferredJurisdiction?: string;
}

interface SimulationResult {
  applicableLaw: string;
  jurisdiction: string;
  estimatedDuration: string;
  estimatedCost: {
    min: number;
    max: number;
    currency: string;
  };
  requiredDocuments: string[];
  procedureSteps: string[];
  considerations: string[];
  warnings: string[];
}

type Phase = 'intro' | 'form' | 'calculating' | 'result';

// 지원 국가 목록 (예시)
const SUPPORTED_COUNTRIES = [
  { code: 'KR', name: '대한민국', flag: '🇰🇷' },
  { code: 'US', name: '미국', flag: '🇺🇸' },
  { code: 'JP', name: '일본', flag: '🇯🇵' },
  { code: 'CN', name: '중국', flag: '🇨🇳' },
  { code: 'CA', name: '캐나다', flag: '🇨🇦' },
  { code: 'AU', name: '호주', flag: '🇦🇺' },
  { code: 'GB', name: '영국', flag: '🇬🇧' },
  { code: 'DE', name: '독일', flag: '🇩🇪' },
  { code: 'FR', name: '프랑스', flag: '🇫🇷' },
  { code: 'SG', name: '싱가포르', flag: '🇸🇬' },
] as const;

export default function InternationalDivorcePage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [input, setInput] = useState<InternationalDivorceInput>({
    marriageCountry: '',
    residenceCountry: '',
    spouseNationality: '',
    myNationality: 'KR',
    marriageDuration: 0,
    hasChildren: false,
    propertyLocation: [],
    preferredJurisdiction: undefined,
  });
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // 폼 제출
  const handleSubmit = useCallback(async () => {
    setError(null);
    setPhase('calculating');

    try {
      // TODO: 실제 API 연동
      // const response = await fetch('/api/simulator/international-divorce', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(input),
      // });
      // const data = await response.json();

      // 임시 시뮬레이션 로직
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockResult: SimulationResult = {
        applicableLaw: input.residenceCountry === 'KR' ? '대한민국 민법' : '국제사법 준거법',
        jurisdiction: input.residenceCountry === 'KR' ? '대한민국 가정법원' : '거주 국가 법원',
        estimatedDuration: '6개월 ~ 18개월',
        estimatedCost: {
          min: 5000000,
          max: 15000000,
          currency: 'KRW',
        },
        requiredDocuments: [
          '혼인관계증명서 (영문)',
          '가족관계증명서 (영문)',
          '주민등록등본 (영문)',
          '외국인 배우자 여권 사본',
          '혼인신고 증명서 (해당국)',
          '재산 목록 및 증빙서류',
        ],
        procedureSteps: [
          '준거법 결정 및 관할 법원 확인',
          '필수 서류 준비 (공증 및 아포스티유)',
          '이혼 소송 제기 또는 협의서 작성',
          '법원 심리 진행 (통역 필요 시)',
          '판결문 또는 협의서 확정',
          '양국 공문서 등록 및 신고',
        ],
        considerations: [
          '양국의 법률이 상충할 경우 국제사법에 따라 준거법이 결정됩니다.',
          '자녀가 있는 경우 헤이그 협약 가입국 여부를 확인해야 합니다.',
          '재산이 여러 국가에 분산되어 있으면 각국 법률에 따라 별도 절차가 필요합니다.',
          '언어 장벽으로 인해 공인 통역사가 필요할 수 있습니다.',
        ],
        warnings: [
          '본 시뮬레이션은 일반적인 가이드라인이며, 실제 사례는 매우 복잡할 수 있습니다.',
          '국제이혼은 국제사법, 민사소송법, 각국 가족법이 복합적으로 적용됩니다.',
          '반드시 국제이혼 전문 변호사와 상담하시기 바랍니다.',
        ],
      };

      setResult(mockResult);
      setPhase('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : '시뮬레이션 중 오류가 발생했습니다.');
      setPhase('form');
    }
  }, [input]);

  // 결과 화면으로 스크롤
  useEffect(() => {
    if (phase === 'result' && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [phase]);

  // 다시 시작
  const handleReset = () => {
    setInput({
      marriageCountry: '',
      residenceCountry: '',
      spouseNationality: '',
      myNationality: 'KR',
      marriageDuration: 0,
      hasChildren: false,
      propertyLocation: [],
      preferredJurisdiction: undefined,
    });
    setResult(null);
    setError(null);
    setPhase('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 금액 포맷
  const formatMoney = (value: number): string => {
    if (value >= 100000000) {
      const billions = Math.floor(value / 100000000);
      const millions = Math.floor((value % 100000000) / 10000);
      return millions > 0 ? `${billions}억 ${millions.toLocaleString()}만원` : `${billions}억원`;
    }
    if (value >= 10000) {
      return `${Math.floor(value / 10000).toLocaleString()}만원`;
    }
    return `${value.toLocaleString()}원`;
  };

  // 인트로 화면
  const renderIntro = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="inline-block mb-4 px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">
          International Divorce Simulator
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          국제이혼 시뮬레이터
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          국적이 다른 배우자와의 이혼, 복잡한 법률 문제를 미리 시뮬레이션하고 준비하세요.
          준거법, 관할 법원, 예상 비용과 절차를 한눈에 확인할 수 있습니다.
        </p>
      </div>

      {/* 주요 기능 */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          이 시뮬레이터로 알 수 있는 것
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">적용 법률 및 관할권</h3>
              <p className="text-sm text-gray-600">
                어느 나라 법률이 적용되고, 어느 법원에서 이혼 절차를 진행해야 하는지 확인합니다.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">예상 소요 기간 및 비용</h3>
              <p className="text-sm text-gray-600">
                국제이혼에 필요한 시간과 예상 비용을 미리 파악하여 준비할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">필수 서류 및 절차</h3>
              <p className="text-sm text-gray-600">
                준비해야 할 서류 목록과 단계별 절차를 상세히 안내합니다.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">주의사항 및 고려사항</h3>
              <p className="text-sm text-gray-600">
                국제이혼 시 꼭 알아야 할 법률적 주의사항을 미리 확인합니다.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* 국제이혼이란? */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          국제이혼이란?
        </h2>
        <div className="prose prose-sm max-w-none text-gray-600">
          <p>
            국제이혼은 부부 중 한 명 이상이 외국인이거나, 부부가 서로 다른 국가에 거주하는 경우의 이혼을 말합니다.
            일반 이혼과 달리 <strong>국제사법(국제사법법)</strong>이 적용되며, 다음과 같은 복잡한 법률 문제가 발생합니다:
          </p>
          <ul className="space-y-2 mt-4">
            <li>어느 나라의 법을 적용할 것인가? (준거법)</li>
            <li>어느 나라 법원에서 재판할 것인가? (국제재판관할)</li>
            <li>외국 판결을 한국에서 인정받을 수 있는가? (승인 및 집행)</li>
            <li>자녀의 양육권 및 국적 문제 (헤이그 협약)</li>
            <li>재산이 여러 나라에 분산된 경우 처리 방법</li>
          </ul>
        </div>
      </Card>

      {/* 이런 경우에 사용하세요 */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          이런 경우에 사용하세요
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-teal-600">✓</span>
            <p className="text-gray-700">
              외국인 배우자와 이혼을 고려 중이신 분
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-teal-600">✓</span>
            <p className="text-gray-700">
              한국인이지만 해외에서 거주하며 이혼 준비 중인 분
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-teal-600">✓</span>
            <p className="text-gray-700">
              국제결혼 후 한국으로 귀국하여 이혼을 진행하려는 분
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-teal-600">✓</span>
            <p className="text-gray-700">
              재산이나 자녀가 여러 국가에 있는 경우
            </p>
          </div>
        </div>
      </Card>

      {/* 지원 국가 */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          지원 국가 (현재 {SUPPORTED_COUNTRIES.length}개국)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {SUPPORTED_COUNTRIES.map((country) => (
            <div
              key={country.code}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-2xl">{country.flag}</span>
              <span className="text-sm font-medium text-gray-700">{country.name}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          * 추가 국가는 지속적으로 업데이트됩니다.
        </p>
      </Card>

      {/* 법률 안내 */}
      <Card className="p-6 bg-yellow-50 border-yellow-200">
        <h3 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center gap-2">
          <span>⚠️</span>
          법률 자문 고지
        </h3>
        <p className="text-sm text-yellow-700 leading-relaxed">
          본 시뮬레이터는 국제이혼에 대한 <strong>일반적인 정보 제공</strong>을 목적으로 하며,
          개별 사안에 대한 법률 자문이 아닙니다. 실제 이혼 절차 진행 전 <strong>반드시 국제이혼 전문 변호사</strong>와
          상담하시기 바랍니다. 국가 간 법률 충돌, 헤이그 협약, 공증 및 아포스티유 등 복잡한 법률 문제가 발생할 수 있습니다.
        </p>
      </Card>

      {/* 시작 버튼 */}
      <div className="text-center">
        <Button size="lg" onClick={() => setPhase('form')}>
          시뮬레이션 시작하기
        </Button>
        <p className="text-sm text-gray-500 mt-4">
          예상 소요 시간: 약 5분
        </p>
      </div>
    </div>
  );

  // 폼 화면
  const renderForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">정보 입력</h1>
        <p className="text-gray-600">
          정확한 시뮬레이션을 위해 아래 정보를 입력해주세요.
        </p>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              혼인 신고 국가 *
            </label>
            <select
              value={input.marriageCountry}
              onChange={(e) => setInput({ ...input, marriageCountry: e.target.value })}
              className="w-full h-11 px-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            >
              <option value="">선택해주세요</option>
              {SUPPORTED_COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              현재 거주 국가 *
            </label>
            <select
              value={input.residenceCountry}
              onChange={(e) => setInput({ ...input, residenceCountry: e.target.value })}
              className="w-full h-11 px-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            >
              <option value="">선택해주세요</option>
              {SUPPORTED_COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                본인 국적 *
              </label>
              <select
                value={input.myNationality}
                onChange={(e) => setInput({ ...input, myNationality: e.target.value })}
                className="w-full h-11 px-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                {SUPPORTED_COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                배우자 국적 *
              </label>
              <select
                value={input.spouseNationality}
                onChange={(e) => setInput({ ...input, spouseNationality: e.target.value })}
                className="w-full h-11 px-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                <option value="">선택해주세요</option>
                {SUPPORTED_COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              혼인 기간 *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={50}
                value={input.marriageDuration || ''}
                onChange={(e) => setInput({ ...input, marriageDuration: parseInt(e.target.value) || 0 })}
                className="w-24 h-11 px-3 bg-white border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
              <span className="text-gray-600">년</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">자녀 정보</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              자녀 유무 *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={!input.hasChildren}
                  onChange={() => setInput({ ...input, hasChildren: false, childrenResidence: undefined })}
                  className="w-4 h-4 text-teal-600"
                />
                <span className="text-gray-700">없음</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={input.hasChildren}
                  onChange={() => setInput({ ...input, hasChildren: true })}
                  className="w-4 h-4 text-teal-600"
                />
                <span className="text-gray-700">있음</span>
              </label>
            </div>
          </div>

          {input.hasChildren && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                자녀 거주 국가 *
              </label>
              <select
                value={input.childrenResidence || ''}
                onChange={(e) => setInput({ ...input, childrenResidence: e.target.value })}
                className="w-full h-11 px-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                <option value="">선택해주세요</option>
                {SUPPORTED_COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-2">
                * 자녀가 여러 국가에 있는 경우 주로 거주하는 국가를 선택하세요.
              </p>
            </div>
          )}
        </div>
      </Card>

      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-sm text-red-700">{error}</p>
        </Card>
      )}

      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => setPhase('intro')} className="flex-1">
          이전
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={
            !input.marriageCountry ||
            !input.residenceCountry ||
            !input.spouseNationality ||
            !input.myNationality ||
            input.marriageDuration <= 0 ||
            (input.hasChildren && !input.childrenResidence)
          }
          className="flex-1"
        >
          시뮬레이션 시작
        </Button>
      </div>
    </div>
  );

  // 계산 중 화면
  const renderCalculating = () => (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      <h2 className="text-xl font-semibold text-gray-900">시뮬레이션 진행 중...</h2>
      <p className="text-gray-600 text-center max-w-md">
        입력하신 정보를 바탕으로 준거법, 관할, 예상 비용을 분석하고 있습니다.
      </p>
    </div>
  );

  // 결과 화면
  const renderResult = () => {
    if (!result) return null;

    return (
      <div ref={resultRef} className="space-y-6">
        <div className="text-center mb-8">
          <div className="inline-block mb-4 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
            시뮬레이션 완료
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            국제이혼 시뮬레이션 결과
          </h1>
          <p className="text-gray-600">
            입력하신 정보를 바탕으로 예상되는 절차와 비용입니다.
          </p>
        </div>

        {/* 핵심 정보 */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">적용 법률</p>
            <p className="text-lg font-bold text-teal-600">{result.applicableLaw}</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">관할 법원</p>
            <p className="text-lg font-bold text-teal-600">{result.jurisdiction}</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">예상 기간</p>
            <p className="text-lg font-bold text-teal-600">{result.estimatedDuration}</p>
          </Card>
        </div>

        {/* 예상 비용 */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">예상 비용</h2>
          <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg p-6 text-center">
            <p className="text-sm text-teal-700 mb-2">총 예상 비용</p>
            <p className="text-3xl font-bold text-teal-600">
              {formatMoney(result.estimatedCost.min)} ~ {formatMoney(result.estimatedCost.max)}
            </p>
            <p className="text-xs text-teal-600 mt-2">
              * 변호사 비용, 통역비, 서류 발급 및 공증 비용 포함
            </p>
          </div>
        </Card>

        {/* 필수 서류 */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">필수 서류</h2>
          <ul className="space-y-2">
            {result.requiredDocuments.map((doc, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-gray-700">{doc}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              💡 <strong>Tip:</strong> 외국 공문서는 아포스티유(Apostille) 또는 영사 인증이 필요합니다.
            </p>
          </div>
        </Card>

        {/* 절차 단계 */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">절차 단계</h2>
          <div className="space-y-3">
            {result.procedureSteps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-gray-700">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 고려사항 */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">주요 고려사항</h2>
          <ul className="space-y-2">
            {result.considerations.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-teal-600 flex-shrink-0 mt-0.5">•</span>
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* 경고 */}
        <Card className="p-6 bg-red-50 border-red-200">
          <h3 className="text-sm font-semibold text-red-800 mb-3 flex items-center gap-2">
            <span>⚠️</span>
            중요 안내사항
          </h3>
          <ul className="space-y-2">
            {result.warnings.map((warning, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-600 flex-shrink-0 mt-0.5">•</span>
                <span className="text-sm text-red-700">{warning}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button variant="secondary" onClick={handleReset} className="flex-1">
            다시 시뮬레이션
          </Button>
          <Link href="/consultation" className="flex-1">
            <Button className="w-full">전문가 상담 신청</Button>
          </Link>
          <Button
            variant="ghost"
            onClick={() => window.print()}
            className="flex-1"
          >
            결과 출력
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Container size="md" className="py-8">
      {phase === 'intro' && renderIntro()}
      {phase === 'form' && renderForm()}
      {phase === 'calculating' && renderCalculating()}
      {phase === 'result' && renderResult()}
    </Container>
  );
}
