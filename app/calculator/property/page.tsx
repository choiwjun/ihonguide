'use client';

/**
 * 재산분할 시뮬레이터 페이지
 */

import { useState, useCallback } from 'react';
import { Container } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import Link from 'next/link';

// 타입 정의
interface Asset {
  id: string;
  type: 'real_estate' | 'financial' | 'vehicle' | 'other';
  name: string;
  value: number;
  isPreMarriage: boolean; // 혼전 재산 여부
}

interface Debt {
  id: string;
  name: string;
  value: number;
}

interface FormData {
  marriageYears: number;
  hasChildren: boolean;
  childCustodian: 'spouse1' | 'spouse2' | 'both';
  assets: Asset[];
  debts: Debt[];
  contributions: {
    spouse1Income: number;
    spouse2Income: number;
    houseworkRatio: number; // 0-100, spouse1 기준
    childcareRatio: number; // 0-100, spouse1 기준
  };
}

interface DivisionResult {
  totalAssets: number;
  totalDebts: number;
  excludedAssets: number;
  netAssets: number;
  ratio: { spouse1: number; spouse2: number };
  amounts: { spouse1: number; spouse2: number };
  factors: string[];
}

// 초기 데이터
const initialFormData: FormData = {
  marriageYears: 5,
  hasChildren: false,
  childCustodian: 'both',
  assets: [],
  debts: [],
  contributions: {
    spouse1Income: 50,
    spouse2Income: 50,
    houseworkRatio: 50,
    childcareRatio: 50,
  },
};

// 금액 포맷
function formatMoney(value: number): string {
  if (value >= 100000000) {
    const billions = Math.floor(value / 100000000);
    const millions = Math.floor((value % 100000000) / 10000);
    return millions > 0 ? `${billions}억 ${millions.toLocaleString()}만원` : `${billions}억원`;
  }
  if (value >= 10000) {
    return `${Math.floor(value / 10000).toLocaleString()}만원`;
  }
  return `${value.toLocaleString()}원`;
}

// MoneyInput 컴포넌트
function MoneyInput({
  value,
  onChange,
  placeholder = '0',
}: {
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
        type="text"
        inputMode="numeric"
        value={value > 0 ? value.toLocaleString() : ''}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-10 px-3 pr-10 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
        만원
      </span>
    </div>
  );
}

export default function PropertyDivisionPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [result, setResult] = useState<DivisionResult | null>(null);

  // Step 1: 기본 정보
  const renderStep1 = () => (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">기본 정보</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            혼인 기간
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={50}
              value={formData.marriageYears}
              onChange={(e) => setFormData({ ...formData, marriageYears: parseInt(e.target.value) || 0 })}
              className="w-24 h-10 px-3 bg-white border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
            <span className="text-gray-600">년</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            자녀 유무
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={!formData.hasChildren}
                onChange={() => setFormData({ ...formData, hasChildren: false })}
                className="w-4 h-4 text-teal-600"
              />
              <span className="text-gray-700">없음</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={formData.hasChildren}
                onChange={() => setFormData({ ...formData, hasChildren: true })}
                className="w-4 h-4 text-teal-600"
              />
              <span className="text-gray-700">있음</span>
            </label>
          </div>
        </div>

        {formData.hasChildren && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              양육 담당자
            </label>
            <select
              value={formData.childCustodian}
              onChange={(e) => setFormData({ ...formData, childCustodian: e.target.value as any })}
              className="w-full h-10 px-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            >
              <option value="spouse1">배우자 1</option>
              <option value="spouse2">배우자 2</option>
              <option value="both">공동 양육</option>
            </select>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={() => setStep(2)}>다음</Button>
      </div>
    </Card>
  );

  // Step 2: 재산/부채 입력
  const addAsset = () => {
    const newAsset: Asset = {
      id: Date.now().toString(),
      type: 'real_estate',
      name: '',
      value: 0,
      isPreMarriage: false,
    };
    setFormData({ ...formData, assets: [...formData.assets, newAsset] });
  };

  const updateAsset = (id: string, field: keyof Asset, value: any) => {
    setFormData({
      ...formData,
      assets: formData.assets.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    });
  };

  const removeAsset = (id: string) => {
    setFormData({ ...formData, assets: formData.assets.filter((a) => a.id !== id) });
  };

  const addDebt = () => {
    const newDebt: Debt = {
      id: Date.now().toString(),
      name: '',
      value: 0,
    };
    setFormData({ ...formData, debts: [...formData.debts, newDebt] });
  };

  const updateDebt = (id: string, field: keyof Debt, value: any) => {
    setFormData({
      ...formData,
      debts: formData.debts.map((d) => (d.id === id ? { ...d, [field]: value } : d)),
    });
  };

  const removeDebt = (id: string) => {
    setFormData({ ...formData, debts: formData.debts.filter((d) => d.id !== id) });
  };

  const assetTypeLabels = {
    real_estate: '부동산',
    financial: '금융자산',
    vehicle: '차량',
    other: '기타',
  };

  const renderStep2 = () => (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">재산 및 부채</h2>

      {/* 재산 목록 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">재산 목록</h3>
          <Button variant="secondary" size="sm" onClick={addAsset}>
            + 재산 추가
          </Button>
        </div>

        {formData.assets.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
            재산을 추가해주세요
          </p>
        ) : (
          <div className="space-y-3">
            {formData.assets.map((asset) => (
              <div key={asset.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex gap-3">
                  <select
                    value={asset.type}
                    onChange={(e) => updateAsset(asset.id, 'type', e.target.value)}
                    className="w-28 h-10 px-2 bg-white border border-gray-300 rounded-lg text-sm"
                  >
                    {Object.entries(assetTypeLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="명칭 (예: 아파트)"
                    value={asset.name}
                    onChange={(e) => updateAsset(asset.id, 'name', e.target.value)}
                    className="flex-1 h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => removeAsset(asset.id)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    삭제
                  </button>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="flex-1">
                    <MoneyInput
                      value={asset.value}
                      onChange={(v) => updateAsset(asset.id, 'value', v)}
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={asset.isPreMarriage}
                      onChange={(e) => updateAsset(asset.id, 'isPreMarriage', e.target.checked)}
                      className="w-4 h-4 text-teal-600 rounded"
                    />
                    혼전/상속재산
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 부채 목록 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">부채 목록</h3>
          <Button variant="secondary" size="sm" onClick={addDebt}>
            + 부채 추가
          </Button>
        </div>

        {formData.debts.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
            부채를 추가해주세요 (없으면 다음으로)
          </p>
        ) : (
          <div className="space-y-3">
            {formData.debts.map((debt) => (
              <div key={debt.id} className="p-4 bg-gray-50 rounded-lg flex gap-3 items-center">
                <input
                  type="text"
                  placeholder="명칭 (예: 주담대)"
                  value={debt.name}
                  onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                  className="flex-1 h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm"
                />
                <div className="w-40">
                  <MoneyInput
                    value={debt.value}
                    onChange={(v) => updateDebt(debt.id, 'value', v)}
                  />
                </div>
                <button
                  onClick={() => removeDebt(debt.id)}
                  className="text-red-500 hover:text-red-700 px-2"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="secondary" onClick={() => setStep(1)}>이전</Button>
        <Button onClick={() => setStep(3)}>다음</Button>
      </div>
    </Card>
  );

  // Step 3: 기여도
  const renderStep3 = () => (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">기여도 평가</h2>
      <p className="text-sm text-gray-600 mb-6">
        각 항목에서 배우자 1의 기여 비율을 설정해주세요.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            소득 기여도
          </label>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 w-16">배우자1</span>
            <input
              type="range"
              min={0}
              max={100}
              value={formData.contributions.spouse1Income}
              onChange={(e) => setFormData({
                ...formData,
                contributions: {
                  ...formData.contributions,
                  spouse1Income: parseInt(e.target.value),
                  spouse2Income: 100 - parseInt(e.target.value),
                },
              })}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <span className="text-sm text-gray-600 w-16 text-right">배우자2</span>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>{formData.contributions.spouse1Income}%</span>
            <span>{formData.contributions.spouse2Income}%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            가사노동 기여도
          </label>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 w-16">배우자1</span>
            <input
              type="range"
              min={0}
              max={100}
              value={formData.contributions.houseworkRatio}
              onChange={(e) => setFormData({
                ...formData,
                contributions: {
                  ...formData.contributions,
                  houseworkRatio: parseInt(e.target.value),
                },
              })}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <span className="text-sm text-gray-600 w-16 text-right">배우자2</span>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>{formData.contributions.houseworkRatio}%</span>
            <span>{100 - formData.contributions.houseworkRatio}%</span>
          </div>
        </div>

        {formData.hasChildren && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              양육 기여도
            </label>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 w-16">배우자1</span>
              <input
                type="range"
                min={0}
                max={100}
                value={formData.contributions.childcareRatio}
                onChange={(e) => setFormData({
                  ...formData,
                  contributions: {
                    ...formData.contributions,
                    childcareRatio: parseInt(e.target.value),
                  },
                })}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <span className="text-sm text-gray-600 w-16 text-right">배우자2</span>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>{formData.contributions.childcareRatio}%</span>
              <span>{100 - formData.contributions.childcareRatio}%</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="secondary" onClick={() => setStep(2)}>이전</Button>
        <Button onClick={calculateDivision}>계산하기</Button>
      </div>
    </Card>
  );

  // 계산 로직 (버튼 클릭 시에만 호출되므로 메모이제이션 불필요)
  const calculateDivision = () => {
    const { assets, debts, contributions, marriageYears, hasChildren, childCustodian } = formData;

    // 총 재산 계산 (만원 → 원)
    const totalAssets = assets.reduce((sum, a) => sum + a.value * 10000, 0);
    const excludedAssets = assets.filter((a) => a.isPreMarriage).reduce((sum, a) => sum + a.value * 10000, 0);
    const totalDebts = debts.reduce((sum, d) => sum + d.value * 10000, 0);
    const netAssets = totalAssets - excludedAssets - totalDebts;

    // 기본 비율 50:50
    let spouse1Ratio = 50;
    const factors: string[] = [];

    // 소득 기여도 반영 (±5%)
    const incomeWeight = (contributions.spouse1Income - 50) * 0.1;
    spouse1Ratio += incomeWeight;
    if (Math.abs(incomeWeight) > 1) {
      factors.push(`소득 기여도 차이: ${incomeWeight > 0 ? '+' : ''}${incomeWeight.toFixed(1)}%`);
    }

    // 가사노동 기여도 반영 (±5%)
    const houseworkWeight = (contributions.houseworkRatio - 50) * 0.1;
    spouse1Ratio += houseworkWeight;
    if (Math.abs(houseworkWeight) > 1) {
      factors.push(`가사노동 기여도: ${houseworkWeight > 0 ? '+' : ''}${houseworkWeight.toFixed(1)}%`);
    }

    // 양육 기여도 반영 (±5%)
    if (hasChildren) {
      const childcareWeight = (contributions.childcareRatio - 50) * 0.1;
      spouse1Ratio += childcareWeight;
      if (Math.abs(childcareWeight) > 1) {
        factors.push(`양육 기여도: ${childcareWeight > 0 ? '+' : ''}${childcareWeight.toFixed(1)}%`);
      }

      // 양육권자 가산 (+3%)
      if (childCustodian === 'spouse1') {
        spouse1Ratio += 3;
        factors.push('양육권자 가산: +3%');
      } else if (childCustodian === 'spouse2') {
        spouse1Ratio -= 3;
        factors.push('양육권자 가산: -3% (배우자2에게)');
      }
    }

    // 혼인 기간 보정 (10년 이상이면 기여도 차이 감소)
    if (marriageYears >= 10) {
      const diff = spouse1Ratio - 50;
      spouse1Ratio = 50 + diff * 0.7;
      factors.push('장기 혼인 보정 (10년+): 기여도 차이 30% 감소');
    }

    // 최소/최대 제한 (30% ~ 70%)
    spouse1Ratio = Math.max(30, Math.min(70, spouse1Ratio));

    const spouse2Ratio = 100 - spouse1Ratio;

    setResult({
      totalAssets,
      totalDebts,
      excludedAssets,
      netAssets,
      ratio: { spouse1: spouse1Ratio, spouse2: spouse2Ratio },
      amounts: {
        spouse1: Math.round(netAssets * spouse1Ratio / 100),
        spouse2: Math.round(netAssets * spouse2Ratio / 100),
      },
      factors,
    });
    setStep(4);
  };

  // Step 4: 결과
  const renderResult = () => {
    if (!result) return null;

    return (
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">재산분할 시뮬레이션 결과</h2>

          {/* 요약 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">배우자 1</p>
              <p className="text-2xl font-bold text-teal-600">{result.ratio.spouse1.toFixed(1)}%</p>
              <p className="text-sm text-gray-700 mt-1">{formatMoney(result.amounts.spouse1)}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">배우자 2</p>
              <p className="text-2xl font-bold text-teal-600">{result.ratio.spouse2.toFixed(1)}%</p>
              <p className="text-sm text-gray-700 mt-1">{formatMoney(result.amounts.spouse2)}</p>
            </div>
          </div>

          {/* 상세 내역 */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">총 재산</span>
              <span className="font-medium">{formatMoney(result.totalAssets)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">특유재산 (제외)</span>
              <span className="font-medium text-red-600">-{formatMoney(result.excludedAssets)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">총 부채</span>
              <span className="font-medium text-red-600">-{formatMoney(result.totalDebts)}</span>
            </div>
            <div className="flex justify-between text-sm border-t pt-3">
              <span className="text-gray-900 font-medium">분할 대상 순재산</span>
              <span className="font-bold text-teal-600">{formatMoney(result.netAssets)}</span>
            </div>
          </div>

          {/* 적용 요소 */}
          {result.factors.length > 0 && (
            <div className="mt-6 p-4 bg-teal-50 rounded-lg">
              <h3 className="text-sm font-medium text-teal-800 mb-2">적용된 조정 요소</h3>
              <ul className="text-sm text-teal-700 space-y-1">
                {result.factors.map((factor, i) => (
                  <li key={i}>• {factor}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>

        {/* 안내 문구 */}
        <Card className="p-6 bg-yellow-50 border-yellow-200">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">참고 안내</h3>
          <p className="text-sm text-yellow-700">
            본 시뮬레이션은 일반적인 기준을 참고한 예상치이며, 실제 재판 결과와 다를 수 있습니다.
            정확한 재산분할 산정을 위해서는 전문가 상담을 권장합니다.
          </p>
        </Card>

        {/* 액션 */}
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => { setResult(null); setStep(1); }} className="flex-1">
            다시 계산하기
          </Button>
          <Link href="/consultation" className="flex-1">
            <Button className="w-full">전문가 상담 신청</Button>
          </Link>
        </div>
      </div>
    );
  };

  // 진행 표시
  const renderProgress = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3, 4].map((s) => (
        <div
          key={s}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            s === step
              ? 'bg-teal-600 text-white'
              : s < step
              ? 'bg-teal-100 text-teal-700'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {s}
        </div>
      ))}
    </div>
  );

  return (
    <Container size="md" className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">재산분할 시뮬레이터</h1>
        <p className="text-gray-600">혼인 중 형성된 재산의 예상 분할 비율을 계산합니다.</p>
      </div>

      {renderProgress()}

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderResult()}
    </Container>
  );
}
