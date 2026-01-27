/**
 * API 입력 검증 유틸리티
 * Zod 스키마를 사용한 요청 데이터 검증
 */

import { NextResponse } from 'next/server';
import { ZodSchema, ZodError } from 'zod';

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: NextResponse;
}

/**
 * 요청 데이터를 Zod 스키마로 검증
 */
export async function validateRequest<T>(
  request: Request,
  schema: ZodSchema<T>
): Promise<ValidationResult<T>> {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return {
        success: false,
        error: NextResponse.json(
          {
            error: '입력 데이터가 올바르지 않습니다.',
            details: formatZodErrors(result.error),
          },
          { status: 400 }
        ),
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch {
    return {
      success: false,
      error: NextResponse.json(
        { error: '잘못된 JSON 형식입니다.' },
        { status: 400 }
      ),
    };
  }
}

/**
 * Zod 에러를 사용자 친화적인 형태로 변환
 */
function formatZodErrors(error: ZodError): Record<string, string> {
  const errors: Record<string, string> = {};

  error.issues.forEach((issue) => {
    const path = issue.path.join('.');
    errors[path || 'root'] = issue.message;
  });

  return errors;
}

/**
 * 보안을 위한 HTML 태그 제거 (간단한 새니타이제이션)
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // HTML 태그 제거
    .replace(/javascript:/gi, '') // javascript: 프로토콜 제거
    .replace(/on\w+\s*=\s*\S+/gi, '') // 이벤트 핸들러와 값 제거 (onclick=alert(1))
    .trim();
}

/**
 * 민감 데이터 마스킹 (로깅용)
 */
export function maskSensitiveData(data: Record<string, unknown>): Record<string, unknown> {
  const sensitiveFields = ['phone', 'email', 'password', 'token', 'secret'];
  const masked = { ...data };

  for (const key of Object.keys(masked)) {
    const lowerKey = key.toLowerCase();
    if (sensitiveFields.some((field) => lowerKey.includes(field))) {
      const value = masked[key];
      if (typeof value === 'string' && value.length > 0) {
        masked[key] = value.substring(0, 2) + '***';
      }
    }
  }

  return masked;
}
