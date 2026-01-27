# Coding Convention & AI Collaboration Guide

## 이혼준비 (ihonguide.com) - Coding Convention

---

## 1. 핵심 원칙

> **"신뢰하되, 검증하라" (Trust, but Verify)**

AI가 생성한 코드를 신뢰하되, 항상 검증 단계를 거칩니다.

| 원칙 | 설명 |
|------|------|
| **명확성** | 코드는 자기 설명적이어야 함 |
| **일관성** | 프로젝트 전체에서 동일한 패턴 사용 |
| **단순성** | 불필요한 복잡성 배제 |
| **안전성** | 보안과 에러 처리 우선 |

---

## 2. 프로젝트 구조

```
/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 인증 관련 라우트 그룹
│   │   ├── login/
│   │   └── callback/
│   ├── (main)/            # 메인 페이지 라우트 그룹
│   │   ├── page.tsx       # 랜딩 페이지
│   │   ├── diagnosis/     # FEAT-1: 이혼 유형 진단
│   │   ├── calculator/    # FEAT-2: 양육비 계산기
│   │   ├── consultation/  # FEAT-3: 상담 신청
│   │   ├── guide/         # 블로그/가이드
│   │   └── mypage/        # 마이페이지
│   ├── admin/             # 관리자 페이지
│   │   ├── page.tsx       # 대시보드
│   │   ├── leads/         # 리드 관리
│   │   └── contents/      # 콘텐츠 관리
│   ├── api/               # API 라우트
│   │   ├── diagnosis/
│   │   ├── calculator/
│   │   ├── consultation/
│   │   └── auth/
│   ├── layout.tsx         # 루트 레이아웃
│   ├── globals.css        # 글로벌 스타일
│   └── providers.tsx      # 전역 Provider
│
├── components/            # 재사용 컴포넌트
│   ├── ui/               # 기본 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts      # 배럴 파일
│   ├── layout/           # 레이아웃 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx
│   │   └── Container.tsx
│   ├── features/         # 기능별 컴포넌트
│   │   ├── diagnosis/    # FEAT-1 관련
│   │   │   ├── DiagnosisCard.tsx
│   │   │   ├── DiagnosisProgress.tsx
│   │   │   └── DiagnosisResult.tsx
│   │   ├── calculator/   # FEAT-2 관련
│   │   │   ├── CalculatorForm.tsx
│   │   │   └── CalculatorResult.tsx
│   │   └── consultation/ # FEAT-3 관련
│   │       ├── ConsultationForm.tsx
│   │       └── ConsultationComplete.tsx
│   └── shared/           # 공통 컴포넌트
│       ├── SEO.tsx
│       ├── CTA.tsx
│       └── Disclaimer.tsx
│
├── lib/                   # 유틸리티 및 설정
│   ├── supabase/         # Supabase 클라이언트
│   │   ├── client.ts     # 브라우저용
│   │   ├── server.ts     # 서버용
│   │   └── admin.ts      # 관리자용 (service_role)
│   ├── utils/            # 유틸리티 함수
│   │   ├── format.ts     # 포맷팅 함수
│   │   ├── calculate.ts  # 계산 함수
│   │   └── cn.ts         # className 유틸
│   ├── validations/      # Zod 스키마
│   │   ├── consultation.ts
│   │   └── diagnosis.ts
│   └── constants/        # 상수 정의
│       ├── diagnosis.ts  # 진단 질문 데이터
│       ├── calculator.ts # 산정기준표 데이터
│       └── navigation.ts # 네비게이션 항목
│
├── hooks/                 # 커스텀 훅
│   ├── useAuth.ts
│   ├── useDiagnosis.ts
│   └── useCalculator.ts
│
├── stores/                # Zustand 스토어
│   ├── authStore.ts
│   └── diagnosisStore.ts
│
├── types/                 # TypeScript 타입 정의
│   ├── database.ts       # Supabase 타입 (자동생성)
│   ├── diagnosis.ts
│   ├── calculator.ts
│   └── consultation.ts
│
├── public/                # 정적 파일
│   ├── images/
│   └── fonts/
│
├── docs/                  # 프로젝트 문서
│
└── 설정 파일들
    ├── next.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── .env.local
    └── .env.example
```

---

## 3. 네이밍 컨벤션

### 3.1 파일/폴더

| 유형 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | PascalCase | `DiagnosisCard.tsx` |
| 페이지 | kebab-case 폴더 + page.tsx | `diagnosis/page.tsx` |
| 훅 | camelCase, use 접두사 | `useDiagnosis.ts` |
| 유틸리티 | camelCase | `calculateChildSupport.ts` |
| 타입 | PascalCase | `DiagnosisResult.ts` |
| 상수 | camelCase (파일) | `constants.ts` |
| API 라우트 | kebab-case 폴더 + route.ts | `api/diagnosis/route.ts` |

### 3.2 코드

| 유형 | 규칙 | 예시 |
|------|------|------|
| 변수 | camelCase | `diagnosisResult` |
| 함수 | camelCase | `calculateScore()` |
| 컴포넌트 | PascalCase | `DiagnosisCard` |
| 상수 | UPPER_SNAKE_CASE | `MAX_QUESTION_COUNT` |
| 타입/인터페이스 | PascalCase | `DiagnosisResult` |
| 이벤트 핸들러 | handle 접두사 | `handleSubmit` |
| Boolean | is/has/can 접두사 | `isLoading`, `hasError` |
| 프라이빗 | _ 접두사 (선택) | `_internalHelper` |

---

## 4. TypeScript 규칙

### 4.1 타입 정의

```typescript
// ✅ Good: 명시적 인터페이스 정의
interface DiagnosisQuestion {
  id: string;
  text: string;
  options: QuestionOption[];
  category: 'communication' | 'property' | 'children' | 'conflict';
}

// ✅ Good: 컴포넌트 Props 타입
interface DiagnosisCardProps {
  question: DiagnosisQuestion;
  onAnswer: (answer: string) => void;
  isLast?: boolean;
}

// ✅ Good: 함수 반환 타입 명시
function calculateScore(answers: Answer[]): number {
  // ...
}

// ❌ Bad: any 사용
const data: any = fetchData();

// ❌ Bad: 타입 추론에만 의존 (복잡한 경우)
const result = complexCalculation(); // 타입이 불명확
```

### 4.2 Null/Undefined 처리

```typescript
// ✅ Good: Optional chaining
const userName = user?.name;

// ✅ Good: Nullish coalescing
const displayName = user?.name ?? '게스트';

// ✅ Good: 타입 가드
function isAuthenticated(user: User | null): user is User {
  return user !== null && user.id !== undefined;
}

// ✅ Good: 조기 반환
function processUser(user: User | null) {
  if (!user) return null;
  // user는 이제 User 타입
  return user.name;
}
```

### 4.3 제네릭 사용

```typescript
// ✅ Good: API 응답 래퍼
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ✅ Good: 훅 반환 타입
function useFetch<T>(url: string): {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}
```

---

## 5. React/Next.js 패턴

### 5.1 컴포넌트 구조

```typescript
// components/features/diagnosis/DiagnosisCard.tsx

// 1. imports (외부 → 내부 → 타입)
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import type { DiagnosisQuestion } from '@/types';

// 2. types (컴포넌트 전용)
interface DiagnosisCardProps {
  question: DiagnosisQuestion;
  currentStep: number;
  totalSteps: number;
  onAnswer: (answer: string) => void;
  onBack?: () => void;
}

// 3. component
export function DiagnosisCard({
  question,
  currentStep,
  totalSteps,
  onAnswer,
  onBack,
}: DiagnosisCardProps) {
  // 3.1 state & hooks
  const [selected, setSelected] = useState<string | null>(null);

  // 3.2 computed values
  const progress = (currentStep / totalSteps) * 100;
  const canProceed = selected !== null;

  // 3.3 handlers
  const handleSelect = useCallback((optionId: string) => {
    setSelected(optionId);
  }, []);

  const handleSubmit = useCallback(() => {
    if (selected) {
      onAnswer(selected);
    }
  }, [selected, onAnswer]);

  // 3.4 render
  return (
    <Card className="p-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="h-2 bg-surface rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-text-secondary mt-2">
          {currentStep} / {totalSteps}
        </p>
      </div>

      {/* Question */}
      <h3 className="text-h3 mb-4">{question.text}</h3>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={cn(
              'w-full p-4 text-left rounded-lg border transition-colors',
              selected === option.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            )}
          >
            {option.text}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        {onBack && (
          <Button variant="secondary" onClick={onBack}>
            이전
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          disabled={!canProceed}
          className="flex-1"
        >
          다음
        </Button>
      </div>
    </Card>
  );
}
```

### 5.2 서버/클라이언트 컴포넌트

```typescript
// ✅ 서버 컴포넌트 (기본) - 데이터 페칭
// app/(main)/guide/[slug]/page.tsx
import { getPostBySlug } from '@/lib/api/posts';

export default async function GuidePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// ✅ 클라이언트 컴포넌트 - 인터랙션
// components/features/diagnosis/DiagnosisFlow.tsx
'use client';

import { useState } from 'react';
import { useDiagnosis } from '@/hooks/useDiagnosis';

export function DiagnosisFlow({ questions }: Props) {
  const [step, setStep] = useState(0);
  const { saveResult } = useDiagnosis();

  // 인터랙티브 로직...
}
```

### 5.3 데이터 페칭 패턴

```typescript
// lib/api/consultations.ts
import { createClient } from '@/lib/supabase/server';
import { consultationSchema } from '@/lib/validations';

export async function createConsultation(data: unknown) {
  // 1. 검증
  const validated = consultationSchema.parse(data);

  // 2. DB 작업
  const supabase = createClient();
  const { data: result, error } = await supabase
    .from('consultations')
    .insert(validated)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return result;
}
```

```typescript
// app/api/consultation/route.ts
import { NextResponse } from 'next/server';
import { createConsultation } from '@/lib/api/consultations';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await createConsultation(body);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Consultation API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 6. 스타일링 규칙 (Tailwind)

### 6.1 클래스 순서

```tsx
// 순서: 레이아웃 → 크기 → 간격 → 배경 → 테두리 → 텍스트 → 효과 → 상태
<div
  className={cn(
    // 레이아웃
    'flex flex-col items-center',
    // 크기
    'w-full max-w-md',
    // 간격
    'p-6 mt-4 gap-4',
    // 배경
    'bg-surface',
    // 테두리
    'border border-border rounded-lg',
    // 텍스트
    'text-text',
    // 효과
    'shadow-sm',
    // 상태 (호버, 포커스 등)
    'hover:shadow-md hover:border-primary/50',
    // 전환
    'transition-all duration-200'
  )}
>
```

### 6.2 디자인 토큰 사용

```tsx
// ✅ Good: 커스텀 토큰 사용
<button className="bg-primary text-white hover:bg-primary-dark">

// ❌ Bad: 하드코딩된 값
<button className="bg-[#7C9A82] text-white hover:bg-[#5A7A60]">

// ✅ Good: 시맨틱 클래스
<p className="text-text-secondary">보조 텍스트</p>

// ❌ Bad: 직접 색상
<p className="text-gray-600">보조 텍스트</p>
```

### 6.3 cn 유틸리티 사용

```typescript
// lib/utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 사용 예시
<div className={cn(
  'base-styles',
  isActive && 'active-styles',
  variant === 'primary' && 'primary-styles',
  className // props로 받은 추가 클래스
)}>
```

---

## 7. 보안 체크리스트

### 7.1 환경 변수

```bash
# .env.local
# 서버 전용 (클라이언트에서 접근 불가)
SUPABASE_SERVICE_ROLE_KEY=xxx
DATABASE_URL=xxx

# 클라이언트 노출 가능 (NEXT_PUBLIC_ 접두사)
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_GA_ID=xxx
```

```typescript
// ✅ Good: 서버에서만 사용
// lib/supabase/admin.ts
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // 서버 전용
);

// ❌ Bad: 클라이언트에 노출
const secret = process.env.SECRET_KEY; // 클라이언트에서 undefined
```

### 7.2 입력 검증

```typescript
// lib/validations/consultation.ts
import { z } from 'zod';

export const consultationSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요').max(50),
  phone: z.string().regex(/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/, '올바른 전화번호를 입력해주세요'),
  preferredTime: z.string().min(1, '희망 시간대를 선택해주세요'),
  currentSituation: z.enum(['considering', 'decided', 'in_progress']).optional(),
  interests: z.array(z.enum(['property', 'custody', 'alimony', 'procedure'])).optional(),
  description: z.string().max(1000).optional(),
  privacyAgreed: z.literal(true, {
    errorMap: () => ({ message: '개인정보 처리방침에 동의해주세요' }),
  }),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
```

### 7.3 보안 체크리스트

| 항목 | 확인 |
|------|------|
| 환경 변수에 시크릿 저장 (.env.local) | ☐ |
| 클라이언트에 시크릿 노출 금지 | ☐ |
| 모든 사용자 입력 Zod로 검증 | ☐ |
| SQL Injection 방지 (Supabase 사용) | ☐ |
| XSS 방지 (dangerouslySetInnerHTML 최소화) | ☐ |
| RLS 정책 활성화 확인 | ☐ |
| 에러 메시지에 민감 정보 미포함 | ☐ |
| HTTPS 강제 (Vercel 기본) | ☐ |

---

## 8. Git 컨벤션

### 8.1 브랜치 전략

```
main              # 프로덕션
├── develop       # 개발 통합
│   ├── feature/feat-1-diagnosis    # 기능 개발
│   ├── feature/feat-2-calculator
│   ├── feature/landing-page
│   ├── fix/button-hover-state      # 버그 수정
│   └── refactor/component-structure # 리팩토링
```

### 8.2 브랜치 네이밍

```bash
# 기능 개발
feature/feat-1-diagnosis
feature/feat-2-calculator
feature/admin-dashboard

# 버그 수정
fix/login-redirect-error
fix/calculator-edge-case

# 리팩토링
refactor/auth-logic
refactor/component-structure

# 긴급 수정
hotfix/critical-security-issue
```

### 8.3 커밋 메시지

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type:**
| Type | 설명 |
|------|------|
| `feat` | 새로운 기능 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 |
| `style` | 코드 스타일 (포맷팅) |
| `refactor` | 리팩토링 |
| `test` | 테스트 |
| `chore` | 빌드, 설정 변경 |

**예시:**
```bash
feat(diagnosis): 이혼 유형 진단 결과 페이지 구현

- 협의/조정/소송 3가지 결과 타입 표시
- 다음 단계 안내 섹션 추가
- 결과 저장 기능 연동

Refs: FEAT-1, US-1.2
```

```bash
fix(calculator): 양육비 계산 시 0원 입력 처리

- 소득 0원 입력 시 에러 방지
- 최소값 검증 로직 추가

Fixes: #123
```

---

## 9. 에러 처리

### 9.1 클라이언트 에러 처리

```typescript
// hooks/useApi.ts
export function useApi<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      setData(result);
      return result;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [fetcher]);

  return { data, error, isLoading, execute };
}
```

### 9.2 에러 바운더리

```typescript
// components/shared/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Error caught by boundary:', error);
    // 에러 리포팅 서비스로 전송
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center">
          <h2 className="text-h3 mb-4">문제가 발생했습니다</h2>
          <p className="text-text-secondary mb-4">
            페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-primary underline"
          >
            새로고침
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 10. AI 협업 가이드

### 10.1 효과적인 지시 방법

```markdown
✅ Good:
"FEAT-1 이혼 유형 진단의 결과 페이지를 구현해줘.

참조 문서:
- PRD: docs/01-PRD.md 섹션 4 (US-1.2: 결과 페이지에 권장 행동 표시)
- User Flow: docs/03-UserFlow.md 섹션 2 (결과 화면)
- Design System: docs/05-DesignSystem.md 섹션 5 (Card 컴포넌트)

요구사항:
- 결과 타입: 협의, 조정, 소송
- 각 결과에 대한 설명과 다음 단계 CTA 포함
- 결과 저장 버튼 (로그인 필요 시 로그인 유도)

기술 스펙:
- components/features/diagnosis/DiagnosisResult.tsx 생성
- Framer Motion으로 진입 애니메이션
- 반응형 레이아웃"

❌ Bad:
"진단 결과 페이지 만들어줘"
```

### 10.2 코드 리뷰 요청

```markdown
"다음 코드를 리뷰해줘:
- 타입 안전성 확인
- 보안 취약점 점검
- 성능 개선점 제안
- 코딩 컨벤션 준수 여부 (docs/07-CodingConvention.md 기준)"
```

### 10.3 검증 워크플로우

```bash
# 1. AI 코드 생성 후

# 2. 타입 체크
npm run type-check  # tsc --noEmit

# 3. 린트
npm run lint

# 4. 로컬 테스트
npm run dev

# 5. 빌드 테스트
npm run build

# 6. 커밋 및 Preview 배포
git add .
git commit -m "feat(diagnosis): add result page"
git push

# 7. Vercel Preview에서 기능 테스트
```

### 10.4 문제 발생 시 보고 형식

```markdown
## 문제 상황
양육비 계산기에서 결과가 표시되지 않음

## 재현 단계
1. /calculator 페이지 접속
2. 부모1 소득: 400만원 입력
3. 부모2 소득: 300만원 입력
4. 자녀 1명, 10세 입력
5. 계산하기 버튼 클릭

## 예상 동작
예상 양육비 금액이 표시되어야 함

## 실제 동작
빈 화면이 표시됨

## 에러 메시지
```
TypeError: Cannot read property 'amount' of undefined
at CalculatorResult.tsx:42
```

## 관련 코드
components/features/calculator/CalculatorResult.tsx
```

---

## 11. Decision Log (결정 기록)

| 항목 | 선택 | 근거 | 대안 | 영향 |
|------|------|------|------|------|
| 프레임워크 | Next.js 14 | SEO, React 생태계, Vercel 호환 | Remix, Nuxt | 프론트엔드 전체 |
| 스타일링 | Tailwind CSS | AI 친화적, 빠른 개발 | styled-components | 컴포넌트 스타일 |
| BaaS | Supabase | Auth+DB 통합, PostgreSQL | Firebase | 백엔드 전체 |
| 배포 | Vercel | Next.js 최적, 자동화 | Netlify, AWS | 배포 파이프라인 |
| 소셜 로그인 | Kakao, Naver | 한국 사용자 친화 | Google | 인증 흐름 |
| 상태 관리 | Zustand | 가벼움, 단순함 | Redux, Jotai | 클라이언트 상태 |
| 폼 처리 | React Hook Form + Zod | 성능, 타입 안전성 | Formik | 폼 컴포넌트 |
| 애니메이션 | Framer Motion | 선언적, React 친화 | CSS, GSAP | UI 인터랙션 |
