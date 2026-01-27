# TRD (기술 요구사항 정의서)

## 이혼준비 (ihonguide.com) - Technical Requirements Document

**버전:** v1.0
**작성일:** 2026-01-27

---

## 1. 시스템 아키텍처

### 1.1 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────────────┐
│                         사용자 (User)                            │
│                    [모바일 / PC 브라우저]                         │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTPS
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Vercel (호스팅)                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 Next.js 14 (App Router)                  │   │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐              │   │
│  │  │  Pages    │ │Components │ │   API     │              │   │
│  │  │ (SSR/SSG) │ │   (RSC)   │ │  Routes   │              │   │
│  │  └───────────┘ └───────────┘ └─────┬─────┘              │   │
│  └────────────────────────────────────┼─────────────────────┘   │
└───────────────────────────────────────┼─────────────────────────┘
                                        │
          ┌─────────────────────────────┼─────────────────────────┐
          │                             ▼                         │
          │  ┌─────────────────────────────────────────────────┐  │
          │  │              Supabase (Backend)                 │  │
          │  │  ┌───────────┐ ┌───────────┐ ┌───────────┐     │  │
          │  │  │PostgreSQL │ │   Auth    │ │  Storage  │     │  │
          │  │  │    DB     │ │  (OAuth)  │ │  (Files)  │     │  │
          │  │  └───────────┘ └───────────┘ └───────────┘     │  │
          │  └─────────────────────────────────────────────────┘  │
          └───────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      외부 서비스 연동                            │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐                     │
│  │  Kakao    │ │  Naver    │ │   GA4     │                     │
│  │  OAuth    │ │  OAuth    │ │ Analytics │                     │
│  └───────────┘ └───────────┘ └───────────┘                     │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 설계 원칙

| 원칙 | 적용 |
|------|------|
| **Serverless First** | Vercel + Supabase로 서버 관리 최소화 |
| **Edge Optimization** | Vercel Edge로 글로벌 저지연 |
| **Progressive Enhancement** | SSR/SSG 기본, 클라이언트 인터랙션 점진 추가 |
| **1인 운영 최적화** | 자동화, 간소화된 관리 |

---

## 2. 기술 스택

### 2.1 프론트엔드

| 항목 | 선택 | 선택 이유 | 대안 | 벤더 락인 리스크 |
|------|------|----------|------|-----------------|
| 프레임워크 | **Next.js 14** (App Router) | SEO 최적화, React 생태계, Vercel 최적 호환 | Remix, Nuxt | 낮음 (React 기반) |
| 스타일링 | **Tailwind CSS** | 빠른 개발, 일관된 디자인, AI 코딩 친화적 | styled-components, CSS Modules | 낮음 |
| 상태 관리 | **Zustand** | 가볍고 단순, 보일러플레이트 최소 | Redux, Jotai | 낮음 |
| 폼 처리 | **React Hook Form** + **Zod** | 성능, 타입 안전성 | Formik | 낮음 |
| 애니메이션 | **Framer Motion** | 선언적, 부드러운 전환 | CSS only, GSAP | 낮음 |

### 2.2 백엔드

| 항목 | 선택 | 선택 이유 | 대안 | 벤더 락인 리스크 |
|------|------|----------|------|-----------------|
| BaaS | **Supabase** | Auth+DB+Storage 통합, PostgreSQL 기반, 무료 시작 | Firebase, AWS Amplify | 중간 (PostgreSQL로 이전 가능) |
| API | **Next.js API Routes** | 프론트와 통합, 서버리스 | 별도 Express 서버 | 낮음 |
| 인증 | **Supabase Auth** | 소셜 로그인 쉬운 연동 | NextAuth.js | 중간 |

### 2.3 데이터베이스

| 항목 | 선택 | 선택 이유 | 대안 |
|------|------|----------|------|
| 메인 DB | **Supabase PostgreSQL** | 관계형, 확장성, RLS 보안 | PlanetScale, Neon |
| ORM | **Prisma** 또는 **Supabase Client** | 타입 안전성, 마이그레이션 | Drizzle |

### 2.4 배포/호스팅

| 항목 | 선택 | 예상 비용 | 확장 전략 |
|------|------|----------|----------|
| 호스팅 | **Vercel** | 무료 → Pro $20/월 | 트래픽 증가 시 Pro 전환 |
| DB/Auth | **Supabase** | 무료 → Pro $25/월 | 사용량 증가 시 Pro 전환 |
| 도메인 | ihonguide.com | ~₩30,000/년 | - |

### 2.5 외부 API/서비스

| 서비스 | 용도 | 대체 옵션 |
|--------|------|----------|
| Kakao OAuth | 소셜 로그인 | - |
| Naver OAuth | 소셜 로그인 | - |
| Google Analytics 4 | 사용자 분석 | Mixpanel, Amplitude |
| (v2) OpenAI API | AI 챗봇 | Claude API, Gemini |
| (v2) 이메일 서비스 | 리드 알림 | Resend, SendGrid |

---

## 3. 비기능적 요구사항

### 3.1 성능

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Time to Interactive | < 3.0s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Lighthouse Performance | 90+ | CI/CD 체크 |

### 3.2 보안

| 항목 | 구현 방법 |
|------|----------|
| 인증 | Supabase Auth (JWT) |
| 권한 제어 | Supabase RLS (Row Level Security) |
| 데이터 암호화 | HTTPS (TLS 1.3), DB 암호화 at rest |
| 입력 검증 | Zod 스키마 검증, SQL Injection 방지 (Prepared Statements) |
| XSS 방지 | React 기본 이스케이핑, CSP 헤더 |
| CSRF 방지 | SameSite 쿠키, CSRF 토큰 |

### 3.3 확장성

| 단계 | 동시 접속 | 대응 |
|------|----------|------|
| MVP | ~100명 | Vercel/Supabase 무료 플랜 |
| 성장기 | ~500명 | Pro 플랜 전환 |
| 확장기 | 1000명+ | Edge Functions, DB 최적화 |

### 3.4 가용성

| 목표 | 방법 |
|------|------|
| 99.9% Uptime | Vercel/Supabase SLA |
| 장애 알림 | Vercel Analytics, Supabase Dashboard |
| 백업 | Supabase 자동 백업 (Pro) |

---

## 4. 데이터베이스 요구사항

### 4.1 스키마 설계 원칙

| 원칙 | 적용 |
|------|------|
| 정규화 | 3NF 기준, 성능 필요시 역정규화 |
| 소프트 삭제 | deleted_at 컬럼으로 복구 가능 |
| 감사 로그 | created_at, updated_at 필수 |
| UUID | 외부 노출 ID는 UUID 사용 |

### 4.2 인덱싱 전략

| 테이블 | 인덱스 | 이유 |
|--------|-------|------|
| users | email | 로그인 조회 |
| consultations | user_id, created_at | 사용자별 신청 목록 |
| diagnosis_results | user_id | 사용자별 결과 조회 |
| blog_posts | slug, published_at | SEO URL, 최신순 정렬 |

---

## 5. 접근 제어 및 권한 모델

### 5.1 역할 정의

| 역할 | 설명 | 권한 |
|------|------|------|
| **anonymous** | 비로그인 사용자 | 콘텐츠 읽기, 도구 사용 (저장 불가) |
| **user** | 로그인 사용자 | 콘텐츠 읽기, 도구 사용, 결과 저장, 상담 신청 |
| **admin** | 관리자 (운영자) | 모든 권한 + 리드 관리, 콘텐츠 관리 |

### 5.2 RLS 정책 (Supabase)

```sql
-- 사용자는 자신의 데이터만 접근
users: auth.uid() = id
diagnosis_results: auth.uid() = user_id
consultations: auth.uid() = user_id

-- 관리자는 모든 데이터 접근
admin role: full access via service_role key
```

---

## 6. 데이터 생명주기

### 6.1 수집 원칙

| 원칙 | 적용 |
|------|------|
| 최소 수집 | 서비스에 필요한 정보만 수집 |
| 명시적 동의 | 개인정보 수집·이용 동의 필수 |
| 목적 명시 | 수집 목적 명확히 고지 |

### 6.2 보존 기간

| 데이터 유형 | 보존 기간 | 근거 |
|------------|----------|------|
| 회원 정보 | 탈퇴 후 30일 | 재가입 방지 |
| 상담 신청 | 3년 | 비즈니스 기록 |
| 진단 결과 | 1년 | 서비스 개선 |
| 로그 데이터 | 90일 | 분석 및 디버깅 |

### 6.3 삭제/익명화 경로

| 요청 | 처리 |
|------|------|
| 회원 탈퇴 | 30일 후 개인정보 삭제, 통계 데이터는 익명화 보존 |
| 데이터 삭제 요청 | 7일 이내 처리 |
| 분석 데이터 | 개인 식별 불가하게 익명화 |

---

## 7. 확장 계획 (기술)

| 버전 | 기술 추가 |
|------|----------|
| v2 | Supabase Realtime (알림), OpenAI API (챗봇), 이메일 서비스 |
| v3 | Flutter/React Native 래핑, 푸시 알림 |
| v4 | 커뮤니티 기능 (게시글, 댓글), 검색 최적화 (Full-text search) |
