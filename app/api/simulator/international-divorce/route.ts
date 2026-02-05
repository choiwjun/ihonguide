/**
 * 국제이혼 시뮬레이터 API
 * POST /api/simulator/international-divorce - 국제이혼 시뮬레이션 계산
 */

import { NextRequest, NextResponse } from 'next/server';
import { calculateInternationalDivorce } from '@/lib/simulator/internationalDivorce';
import type {
  InternationalDivorceInput,
  InternationalDivorceResult,
  CountryCode,
  ResidenceDuration,
  MarriageType,
  CooperationLevel,
  AssetType,
} from '@/types/internationalDivorceSimulator';

// Valid values for validation
const VALID_COUNTRY_CODES: CountryCode[] = [
  'KR', 'US', 'JP', 'CN', 'GB', 'CA', 'AU', 'FR', 'DE', 'VN', 'PH', 'TH', 'OTHER',
];

const VALID_RESIDENCE_DURATIONS: ResidenceDuration[] = [
  'less_than_1_year', '1_to_3_years', '3_to_5_years', 'more_than_5_years',
];

const VALID_MARRIAGE_TYPES: MarriageType[] = [
  'civil', 'religious', 'both', 'common_law',
];

const VALID_COOPERATION_LEVELS: CooperationLevel[] = [
  'cooperative', 'neutral', 'uncooperative', 'hostile',
];

const VALID_ASSET_TYPES: AssetType[] = [
  'real_estate', 'financial', 'business', 'other',
];

const VALID_CUSTODY_OPTIONS = ['petitioner', 'respondent', 'shared', 'undecided'] as const;

/**
 * Validate country code
 */
function isValidCountryCode(value: unknown): value is CountryCode {
  return typeof value === 'string' && VALID_COUNTRY_CODES.includes(value as CountryCode);
}

/**
 * Validate residence duration
 */
function isValidResidenceDuration(value: unknown): value is ResidenceDuration {
  return typeof value === 'string' && VALID_RESIDENCE_DURATIONS.includes(value as ResidenceDuration);
}

/**
 * Validate party info
 */
function validatePartyInfo(
  party: unknown,
  partyName: string
): { valid: boolean; error?: string } {
  if (!party || typeof party !== 'object') {
    return { valid: false, error: `${partyName} 정보가 필요합니다.` };
  }

  const { nationality, currentResidence, residenceDuration } = party as Record<string, unknown>;

  if (!isValidCountryCode(nationality)) {
    return { valid: false, error: `${partyName}의 국적이 유효하지 않습니다.` };
  }

  if (!isValidCountryCode(currentResidence)) {
    return { valid: false, error: `${partyName}의 현재 거주지가 유효하지 않습니다.` };
  }

  if (!isValidResidenceDuration(residenceDuration)) {
    return { valid: false, error: `${partyName}의 거주 기간이 유효하지 않습니다.` };
  }

  return { valid: true };
}

/**
 * Validate marriage info
 */
function validateMarriageInfo(marriage: unknown): { valid: boolean; error?: string } {
  if (!marriage || typeof marriage !== 'object') {
    return { valid: false, error: '혼인 정보가 필요합니다.' };
  }

  const { marriageCountry, marriageType, duration, registeredInKorea } = marriage as Record<string, unknown>;

  if (!isValidCountryCode(marriageCountry)) {
    return { valid: false, error: '혼인 국가가 유효하지 않습니다.' };
  }

  if (typeof marriageType !== 'string' || !VALID_MARRIAGE_TYPES.includes(marriageType as MarriageType)) {
    return { valid: false, error: '혼인 형태가 유효하지 않습니다.' };
  }

  if (typeof duration !== 'number' || duration < 0 || duration > 100) {
    return { valid: false, error: '혼인 기간이 유효하지 않습니다. (0-100년)' };
  }

  if (typeof registeredInKorea !== 'boolean') {
    return { valid: false, error: '한국 혼인 신고 여부가 필요합니다.' };
  }

  return { valid: true };
}

/**
 * Validate children info (optional)
 */
function validateChildrenInfo(children: unknown): { valid: boolean; error?: string } {
  if (children === undefined || children === null) {
    return { valid: true }; // Children info is optional
  }

  if (typeof children !== 'object') {
    return { valid: false, error: '자녀 정보 형식이 유효하지 않습니다.' };
  }

  const { count, ages, currentResidence, custody } = children as Record<string, unknown>;

  if (typeof count !== 'number' || count < 0 || count > 20) {
    return { valid: false, error: '자녀 수가 유효하지 않습니다. (0-20명)' };
  }

  if (!Array.isArray(ages)) {
    return { valid: false, error: '자녀 연령 정보가 배열 형식이어야 합니다.' };
  }

  if (ages.length !== count) {
    return { valid: false, error: '자녀 수와 연령 정보 개수가 일치하지 않습니다.' };
  }

  for (const age of ages) {
    if (typeof age !== 'number' || age < 0 || age > 30) {
      return { valid: false, error: '자녀 연령이 유효하지 않습니다. (0-30세)' };
    }
  }

  if (!isValidCountryCode(currentResidence)) {
    return { valid: false, error: '자녀 거주지가 유효하지 않습니다.' };
  }

  if (typeof custody !== 'string' || !VALID_CUSTODY_OPTIONS.includes(custody as typeof VALID_CUSTODY_OPTIONS[number])) {
    return { valid: false, error: '양육권 상태가 유효하지 않습니다.' };
  }

  return { valid: true };
}

/**
 * Validate assets array
 */
function validateAssets(assets: unknown): { valid: boolean; error?: string } {
  if (!Array.isArray(assets)) {
    return { valid: false, error: '재산 정보가 배열 형식이어야 합니다.' };
  }

  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i];

    if (!asset || typeof asset !== 'object') {
      return { valid: false, error: `재산 항목 ${i + 1}의 형식이 유효하지 않습니다.` };
    }

    const { type, location, estimatedValue } = asset as Record<string, unknown>;

    if (typeof type !== 'string' || !VALID_ASSET_TYPES.includes(type as AssetType)) {
      return { valid: false, error: `재산 항목 ${i + 1}의 유형이 유효하지 않습니다.` };
    }

    if (!isValidCountryCode(location)) {
      return { valid: false, error: `재산 항목 ${i + 1}의 소재지가 유효하지 않습니다.` };
    }

    if (typeof estimatedValue !== 'number' || estimatedValue < 0) {
      return { valid: false, error: `재산 항목 ${i + 1}의 추정 가치가 유효하지 않습니다.` };
    }
  }

  return { valid: true };
}

/**
 * Validate cooperation info
 */
function validateCooperationInfo(cooperation: unknown): { valid: boolean; error?: string } {
  if (!cooperation || typeof cooperation !== 'object') {
    return { valid: false, error: '협조 상황 정보가 필요합니다.' };
  }

  const { level, communicationPossible, willingToNegotiate } = cooperation as Record<string, unknown>;

  if (typeof level !== 'string' || !VALID_COOPERATION_LEVELS.includes(level as CooperationLevel)) {
    return { valid: false, error: '협조 수준이 유효하지 않습니다.' };
  }

  if (typeof communicationPossible !== 'boolean') {
    return { valid: false, error: '연락 가능 여부가 필요합니다.' };
  }

  if (typeof willingToNegotiate !== 'boolean') {
    return { valid: false, error: '협상 의사 여부가 필요합니다.' };
  }

  return { valid: true };
}

/**
 * Validate entire input
 */
function validateInput(body: unknown): { valid: boolean; error?: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: '요청 본문이 유효하지 않습니다.' };
  }

  const input = body as Record<string, unknown>;

  // Validate petitioner (required)
  const petitionerValidation = validatePartyInfo(input.petitioner, '청구인');
  if (!petitionerValidation.valid) {
    return petitionerValidation;
  }

  // Validate respondent (required)
  const respondentValidation = validatePartyInfo(input.respondent, '피청구인');
  if (!respondentValidation.valid) {
    return respondentValidation;
  }

  // Validate marriage info (required)
  const marriageValidation = validateMarriageInfo(input.marriage);
  if (!marriageValidation.valid) {
    return marriageValidation;
  }

  // Validate children info (optional)
  const childrenValidation = validateChildrenInfo(input.children);
  if (!childrenValidation.valid) {
    return childrenValidation;
  }

  // Validate assets (required, can be empty array)
  const assetsValidation = validateAssets(input.assets);
  if (!assetsValidation.valid) {
    return assetsValidation;
  }

  // Validate cooperation (required)
  const cooperationValidation = validateCooperationInfo(input.cooperation);
  if (!cooperationValidation.valid) {
    return cooperationValidation;
  }

  // Validate preferredJurisdiction (optional)
  if (input.preferredJurisdiction !== undefined && input.preferredJurisdiction !== null) {
    if (!isValidCountryCode(input.preferredJurisdiction)) {
      return { valid: false, error: '선호 관할국이 유효하지 않습니다.' };
    }
  }

  return { valid: true };
}

/**
 * API Response type
 */
interface ApiSuccessResponse {
  success: true;
  data: InternationalDivorceResult;
}

interface ApiErrorResponse {
  success: false;
  error: string;
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

/**
 * POST /api/simulator/international-divorce
 * Calculate international divorce simulation based on input
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: '유효한 JSON 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // Validate input
    const validation = validateInput(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error || '입력값이 유효하지 않습니다.' },
        { status: 400 }
      );
    }

    // Cast to proper type after validation
    const input = body as InternationalDivorceInput;

    // Calculate international divorce simulation
    const result = calculateInternationalDivorce(input);

    // Return successful response
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    // Log error for debugging
    console.error('International divorce simulator API error:', error);

    // Return generic error response
    return NextResponse.json(
      { success: false, error: '시뮬레이션 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
