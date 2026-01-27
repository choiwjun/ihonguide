# TASKS (TDD 기반 개발 태스크)

## 이혼준비 (ihonguide.com) - 실행 가능한 개발 큐

---

# 기본 가이드라인

코드나 테스트를 작성하기 전에, 에이전트는 반드시 문서 학습 단계를 먼저 수행해야 합니다.

먼저, `/docs` 폴더에 존재하는 모든 `.md` 파일을 읽고 학습합니다.

이 문서들은 도메인 지식, 기능 요구사항, 비즈니스 의도 및 제약 조건을 포함하고 있으며,

에이전트는 이를 **제품 명세의 주요 진실 소스(Source of Truth)**로 취급해야 합니다.

`docs/` 폴더의 모든 문서를 완전히 이해하기 전까지는

테스트를 작성하거나 코드를 생성해서는 안 됩니다.

다음으로, 에이전트는 `plan.md` 파일을 읽고 학습합니다.

`plan.md`는 이 프로젝트의 개발 방법론, TDD 사이클, Tidy First 원칙, 커밋 규율을 정의하며—

이것은 **최상위 실행 규칙(Constitution)**입니다.

모든 에이전트 행동은 `plan.md`를 준수해야 하며,

`docs/`의 내용과 충돌하는 경우 `plan.md`의 규칙이 항상 우선합니다.

---

## 태스크 문서 생성 단계 (계획 단계)

`docs/`와 `plan.md`를 모두 학습한 후에야 에이전트는 `tasks.md` 파일을 생성합니다.

`tasks.md`는 단순한 할 일 목록이 아니라,

**실행 가능한 개발 큐(Execution Queue)**이자 프로젝트 진행의 참조 문서입니다.

`docs/`에 명시되거나 암시된 요구사항을 기반으로,

에이전트는 이를 **테스트 가능한 최소 단위(Tasks)**로 분해합니다.

각 Task는 다음 원칙을 따릅니다:

- 하나의 Task는 하나의 테스트로 검증 가능해야 함
- 행동은 단일 책임을 가져야 함
- 가능한 가장 작은 실행 단위여야 함
- 구조적(STRUCTURAL) / 동작적(BEHAVIORAL) 유형이 명확히 구분되어야 함

`tasks.md`가 생성되기 전까지는

에이전트는 어떤 코드나 테스트도 작성해서는 안 됩니다.

---

## 역할 및 전문성

당신은 **Kent Beck의 TDD(테스트 주도 개발)**와

**Tidy First 원칙**을 엄격히 따르는 **시니어 소프트웨어 엔지니어**입니다.

작업을 시작하기 전에 유능한 서브 에이전트를 포함하고 적극적으로 활용하세요.

당신의 목적은 이 방법론을 **정확하게** 적용하면서 개발을 안내하는 것입니다.

---

## 핵심 개발 원칙

- 항상 **TDD 사이클: Red → Green → Refactor**를 따름
- 가장 단순한 실패하는 테스트를 먼저 작성
- 테스트를 통과하는 데 필요한 **최소한의 코드만** 작성
- 모든 테스트가 통과한 후에만 리팩토링
- **Tidy First** 원칙에 따라 **구조적 변경**과 **동작적 변경**을 분리
- 개발 과정 전반에 걸쳐 **높은 코드 품질** 유지

---

## TDD 방법론 가이드

- 매우 작은 기능 증분을 정의하는 **실패하는 테스트**를 작성하는 것으로 시작
- 테스트 이름은 동작을 명확하게 표현해야 함
예: `shouldCalculateChildSupportForTwoChildren` (두 자녀에 대한 양육비를 계산해야 함)
- 테스트 실패 메시지는 **명확하고 이해하기 쉬워야** 함
- 테스트를 통과하는 데 필요한 **최소한의 코드만** 작성
- 테스트가 통과한 후에만 리팩토링 고려
- 각 새로운 기능에 대해 이 사이클을 반복

### 버그 수정 시

1. 먼저 **API 수준에서 실패하는 테스트** 작성
2. 문제를 재현하는 **가장 작은 테스트** 추가
3. 두 테스트 모두 통과시킴

---

## TIDY FIRST 접근법

모든 변경사항은 두 가지 유형 중 하나로 분류되어야 합니다:

### 1. 구조적 변경 (STRUCTURAL)

- 동작을 변경하지 않고 구조만 변경
- 예시:
    - 이름 변경 (Renaming)
    - 메서드 추출 (Extract method)
    - 코드 이동 (Move code)
    - 타입/인터페이스 추가

### 2. 동작적 변경 (BEHAVIORAL)

- 실제 기능 추가 또는 수정

### 핵심 규칙

- **구조적 변경과 동작적 변경을 같은 커밋에 절대 섞지 않음**
- 둘 다 필요하면 **구조적 변경을 먼저** 수행
- 구조적 변경 전후로 테스트를 실행하여 **동작이 변하지 않았음을 확인**

---

## 커밋 규율

다음 조건이 **모두** 충족될 때만 커밋:

- 모든 테스트 통과
- 컴파일러/린터 경고 없음
- 하나의 논리적 작업 단위만 포함
- 커밋 메시지에 **구조적 변경인지 동작적 변경인지 명시**
- 대규모 커밋보다 **작고 빈번한 커밋** 선호

### 커밋 메시지 형식

```
[STRUCTURAL] DiagnosisService에서 calculateScore 함수 추출
[BEHAVIORAL] 단일 자녀 케이스에 대한 양육비 계산 추가
[FIX] 상담 폼 검증에서 null 포인터 해결
```

---

## 코드 품질 표준

- 중복을 **적극적으로 제거**
- 이름과 구조를 통해 의도를 **명확하게 표현**
- 의존성을 명시적으로 만듦
- 메서드는 **작고 단일 책임**을 가져야 함
- 상태와 부수 효과를 최소화
- **현재 가능한 가장 단순한 해결책** 사용

---

## 리팩토링 가이드라인

- 테스트가 통과하는 **Green 상태에서만** 리팩토링
- 검증된 리팩토링 패턴을 **공식 명칭과 함께** 사용
- **한 번에 하나의 리팩토링만** 수행
- 각 리팩토링 단계 후 테스트 실행
- 중복 제거와 가독성 향상을 우선시

---

## 태스크 완료 및 중단 규칙

하나의 Task가 완료되면, 에이전트는 즉시 다음 행동을 수행합니다:

- `tasks.md`에서 Task 상태를 `DONE`으로 업데이트
- 변경사항을 명확하게 기록
- **즉시 작업 중단**

에이전트는 자동으로 다음 Task로 진행하지 않으며,

사용자의 다음 `"go"` 입력을 기다려야 합니다.

---

## 태스크 상태 범례

- `[ ]` TODO - 시작 전
- `[~]` IN_PROGRESS - 진행 중
- `[x]` DONE - 완료 및 검증됨

---

# 개발 큐

## Phase 0: 프로젝트 초기화

### M0.1: 프로젝트 설정

#### [S] Task 0.1.1: TypeScript로 Next.js 14 프로젝트 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** `npm run build`가 에러 없이 성공
- **작업:** Next.js 14 App Router 프로젝트를 TypeScript로 초기화
- **참조:** [07-CodingConvention.md](./07-CodingConvention.md) 섹션 2
- **상태:** [x] DONE
- **비고:** Next.js 16.1.5 사용 (보안 패치 적용)

#### [S] Task 0.1.2: ESLint 및 Prettier 설정
- **유형:** 구조적(STRUCTURAL)
- **테스트:** `npm run lint`가 경고 없이 통과
- **작업:** 프로젝트 컨벤션에 맞게 ESLint, Prettier 설정
- **참조:** [07-CodingConvention.md](./07-CodingConvention.md) 섹션 5
- **상태:** [x] DONE
- **비고:** ESLint 9 flat config, eslint-config-next, Prettier 설정 완료

#### [S] Task 0.1.3: 폴더 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** 아키텍처에 따른 모든 필수 디렉토리 존재
- **작업:** `src/app`, `src/components`, `src/lib`, `src/hooks`, `src/types`, `src/utils`, `src/styles` 생성
- **참조:** [07-CodingConvention.md](./07-CodingConvention.md) 섹션 2
- **상태:** [x] DONE
- **비고:** 코딩 컨벤션에 따라 src/ 없이 루트에 폴더 구조 생성

#### [S] Task 0.1.4: Tailwind CSS 설치 및 설정
- **유형:** 구조적(STRUCTURAL)
- **테스트:** Tailwind 클래스가 브라우저에서 올바르게 렌더링
- **작업:** Tailwind CSS, PostCSS 설치, 기본 설정 생성
- **참조:** [05-DesignSystem.md](./05-DesignSystem.md) 섹션 2
- **상태:** [x] DONE
- **비고:** Tailwind CSS v4 사용 (@tailwindcss/postcss, CSS 기반 설정)

#### [B] Task 0.1.5: Tailwind에 디자인 토큰 설정
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** `bg-sage-500`이 올바른 색상 `#7C9A82`로 렌더링
- **작업:** tailwind.config.ts에 커스텀 색상, 폰트, 간격 추가
- **참조:** [05-DesignSystem.md](./05-DesignSystem.md) 섹션 2, 3, 4
- **상태:** [x] DONE
- **비고:** Tailwind v4 @theme 디렉티브로 globals.css에 디자인 토큰 설정 완료

#### [S] Task 0.1.6: 테스트 프레임워크 설정 (Vitest + Testing Library)
- **유형:** 구조적(STRUCTURAL)
- **테스트:** `npm run test`가 에러 없이 실행
- **작업:** Vitest, @testing-library/react 설치, vitest.config.ts 설정
- **상태:** [x] DONE
- **비고:** vitest v4, @testing-library/react, jsdom 설정 완료

#### [S] Task 0.1.7: cn 유틸리티 함수 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** cn 함수가 클래스 이름을 올바르게 병합
- **작업:** clsx + tailwind-merge로 `src/utils/cn.ts` 생성
- **참조:** [07-CodingConvention.md](./07-CodingConvention.md) 섹션 4.3
- **상태:** [ ] TODO

#### [S] Task 0.1.8: Providers 컴포넌트 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** Providers가 children을 올바르게 래핑
- **작업:** `src/components/providers.tsx` 생성
- **참조:** [07-CodingConvention.md](./07-CodingConvention.md) 섹션 2.1
- **상태:** [ ] TODO

#### [S] Task 0.1.9: 환경 변수 파일 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** .env.example 파일이 필수 변수 목록 포함
- **작업:** .env.local 및 .env.example 파일 생성
- **상태:** [ ] TODO

---

### M0.2: Supabase 설정

#### [S] Task 0.2.1: Supabase 클라이언트 설정 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** Supabase 클라이언트가 에러 없이 초기화
- **작업:** 적절한 타입과 함께 `src/lib/supabase/client.ts` 생성
- **참조:** [02-TRD.md](./02-TRD.md) 섹션 2.1
- **상태:** [ ] TODO

#### [B] Task 0.2.2: users 테이블 생성
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** users 테이블에 삽입 및 조회 가능
- **작업:** users 테이블 SQL 마이그레이션 실행
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) 섹션 2.1
- **상태:** [ ] TODO

#### [B] Task 0.2.3: diagnosis_results 테이블 생성
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** JSONB 응답과 함께 진단 결과 삽입 가능
- **작업:** diagnosis_results 테이블 SQL 마이그레이션 실행
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) 섹션 2.2
- **상태:** [ ] TODO

#### [B] Task 0.2.4: calculator_results 테이블 생성
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** JSONB 입력/출력과 함께 계산기 결과 삽입 가능
- **작업:** calculator_results 테이블 SQL 마이그레이션 실행
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) 섹션 2.3
- **상태:** [ ] TODO

#### [B] Task 0.2.5: consultations 테이블 생성
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 모든 필수 필드와 함께 상담 삽입 가능
- **작업:** consultations 테이블 SQL 마이그레이션 실행
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) 섹션 2.4
- **상태:** [ ] TODO

#### [B] Task 0.2.6: 블로그 테이블 생성 (posts, categories)
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 카테고리 관계와 함께 게시물 삽입 가능
- **작업:** blog_posts, blog_categories SQL 마이그레이션 실행
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) 섹션 2.5, 2.6
- **상태:** [ ] TODO

#### [B] Task 0.2.7: RLS 정책 적용
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 인증되지 않은 사용자가 users 테이블 읽기 불가
- **작업:** 모든 RLS 정책 SQL 실행
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) 섹션 4
- **상태:** [ ] TODO

#### [B] Task 0.2.8: 데이터베이스 인덱스 생성
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 인덱스로 쿼리 성능 향상
- **작업:** 모든 인덱스 SQL 실행
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) 섹션 3
- **상태:** [ ] TODO

#### [B] Task 0.2.9: saved_contents 테이블 생성
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 사용자-게시물 관계로 저장 콘텐츠 삽입 가능
- **작업:** saved_contents 테이블 SQL 마이그레이션 실행
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) 섹션 2.7
- **상태:** [ ] TODO

#### [B] Task 0.2.10: admin_settings 테이블 생성
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 키-값 설정 삽입 및 조회 가능
- **작업:** admin_settings 테이블 SQL 마이그레이션 실행
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) 섹션 2.8
- **상태:** [ ] TODO

#### [B] Task 0.2.11: 초기 데이터 삽입 - 블로그 카테고리
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 5개 기본 카테고리 존재 확인 (절차, 비용, 양육권, 재산분할, FAQ)
- **작업:** 블로그 카테고리 시드 데이터 삽입
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) 섹션 5.1
- **상태:** [ ] TODO

#### [B] Task 0.2.12: 초기 데이터 삽입 - 관리자 설정
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** site_name, contact_email 등 기본 설정값 존재 확인
- **작업:** 관리자 설정 시드 데이터 삽입
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) 섹션 5.2
- **상태:** [ ] TODO

#### [S] Task 0.2.13: Supabase 타입 자동 생성 설정
- **유형:** 구조적(STRUCTURAL)
- **테스트:** `npm run db:types` 명령으로 타입 파일 생성
- **작업:** supabase gen types 명령 설정, `src/types/database.types.ts` 생성
- **참조:** [02-TRD.md](./02-TRD.md) 섹션 2.1
- **상태:** [ ] TODO

#### [S] Task 0.2.14: Supabase 서버 클라이언트 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** 서버 컴포넌트에서 Supabase 클라이언트 사용 가능
- **작업:** `src/lib/supabase/server.ts` 생성
- **참조:** [07-CodingConvention.md](./07-CodingConvention.md) 섹션 2
- **상태:** [ ] TODO

#### [S] Task 0.2.15: Supabase 관리자 클라이언트 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** service_role 키로 RLS 우회 가능
- **작업:** `src/lib/supabase/admin.ts` 생성
- **참조:** [07-CodingConvention.md](./07-CodingConvention.md) 섹션 2
- **상태:** [ ] TODO

---

### M0.3: 인증 설정

#### [S] Task 0.3.1: 인증 유틸리티 타입 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** TypeScript가 인증 타입을 에러 없이 컴파일
- **작업:** User, Session 타입과 함께 `src/types/auth.ts` 생성
- **상태:** [ ] TODO

#### [B] Task 0.3.2: 카카오 OAuth 로그인 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** `signInWithKakao()`가 카카오 OAuth로 리다이렉트
- **작업:** Supabase 카카오 프로바이더 설정, 로그인 함수 생성
- **참조:** [03-UserFlow.md](./03-UserFlow.md) 섹션 5
- **상태:** [ ] TODO

#### [B] Task 0.3.3: 네이버 OAuth 로그인 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** `signInWithNaver()`가 네이버 OAuth로 리다이렉트
- **작업:** Supabase 네이버 프로바이더 설정, 로그인 함수 생성
- **참조:** [03-UserFlow.md](./03-UserFlow.md) 섹션 5
- **상태:** [ ] TODO

#### [B] Task 0.3.4: 로그아웃 함수 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** `signOut()`이 세션을 지우고 리다이렉트
- **작업:** signOut 유틸리티 함수 생성
- **상태:** [ ] TODO

#### [B] Task 0.3.5: 인증 상태 훅 생성
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** `useAuth()`가 현재 사용자 상태 반환
- **작업:** `src/hooks/useAuth.ts` 생성
- **상태:** [ ] TODO

#### [B] Task 0.3.6: OAuth 콜백 라우트 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** /auth/callback이 OAuth 토큰을 처리하고 적절히 리다이렉트
- **작업:** `src/app/auth/callback/route.ts` 생성
- **참조:** [03-UserFlow.md](./03-UserFlow.md) 섹션 5
- **상태:** [ ] TODO

#### [S] Task 0.3.7: 로그인 모달 컴포넌트 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** LoginModal 컴포넌트 파일이 존재하고 내보내기
- **작업:** `src/components/auth/LoginModal.tsx` 생성
- **참조:** [03-UserFlow.md](./03-UserFlow.md) 섹션 5
- **상태:** [ ] TODO

#### [B] Task 0.3.8: 로그인 모달 UI 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 모달에 카카오/네이버 로그인 버튼 표시
- **작업:** 소셜 로그인 버튼과 함께 로그인 모달 UI 구현
- **상태:** [ ] TODO

---

## Phase 1: 핵심 UI 컴포넌트

### M1.1: 디자인 시스템 구현

#### [S] Task 1.1.1: 디자인 토큰용 CSS 변수 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** globals.css에서 CSS 변수 접근 가능
- **작업:** 모든 색상, 간격, 타이포그래피 CSS 변수 정의
- **참조:** [05-DesignSystem.md](./05-DesignSystem.md) 섹션 2
- **상태:** [ ] TODO

#### [B] Task 1.1.2: Pretendard 폰트 로드
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 텍스트가 Pretendard 폰트 패밀리로 렌더링
- **작업:** Pretendard용 next/font 설정
- **참조:** [05-DesignSystem.md](./05-DesignSystem.md) 섹션 3
- **상태:** [ ] TODO

#### [B] Task 1.1.3: Noto Serif KR 폰트 로드
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 헤딩이 Noto Serif KR로 렌더링
- **작업:** Noto Serif KR용 next/font 설정
- **참조:** [05-DesignSystem.md](./05-DesignSystem.md) 섹션 3
- **상태:** [ ] TODO

---

### M1.2: Button 컴포넌트

#### [S] Task 1.2.1: Button 컴포넌트 인터페이스 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** ButtonProps 타입이 에러 없이 컴파일
- **작업:** ButtonProps와 함께 `src/types/components.ts` 정의
- **참조:** [05-DesignSystem.md](./05-DesignSystem.md) 섹션 5.1
- **상태:** [ ] TODO

#### [B] Task 1.2.2: Button primary 변형 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** `<Button variant="primary">`가 sage-500 배경으로 렌더링
- **작업:** primary 스타일로 Button 컴포넌트 생성
- **상태:** [ ] TODO

#### [B] Task 1.2.3: Button secondary 변형 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** `<Button variant="secondary">`가 테두리 스타일로 렌더링
- **작업:** Button에 secondary 변형 추가
- **상태:** [ ] TODO

#### [B] Task 1.2.4: Button ghost 변형 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** `<Button variant="ghost">`가 투명 배경으로 렌더링
- **작업:** Button에 ghost 변형 추가
- **상태:** [ ] TODO

#### [B] Task 1.2.5: Button 크기 변형 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** Button이 sm, md, lg 크기에서 올바르게 렌더링
- **작업:** size prop 처리 추가
- **상태:** [ ] TODO

#### [B] Task 1.2.6: Button 비활성화 상태 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 비활성화된 Button이 투명도가 낮고 포인터 이벤트 없음
- **작업:** 비활성화 상태 스타일 추가
- **상태:** [ ] TODO

#### [B] Task 1.2.7: Button 로딩 상태 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 로딩 중인 Button이 스피너를 표시하고 상호작용 비활성화
- **작업:** 스피너 컴포넌트와 함께 loading prop 추가
- **상태:** [ ] TODO

---

### M1.3: Input 컴포넌트

#### [S] Task 1.3.1: Input 컴포넌트 인터페이스 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** InputProps 타입이 에러 없이 컴파일
- **작업:** 타입에 InputProps 정의
- **참조:** [05-DesignSystem.md](./05-DesignSystem.md) 섹션 5.2
- **상태:** [ ] TODO

#### [B] Task 1.3.2: 텍스트 Input 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** `<Input type="text">`가 올바른 스타일로 렌더링
- **작업:** 텍스트 입력 스타일로 Input 컴포넌트 생성
- **상태:** [ ] TODO

#### [B] Task 1.3.3: Input 에러 상태 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** error prop이 있는 Input이 빨간 테두리와 에러 메시지 표시
- **작업:** 에러 상태 스타일 및 메시지 표시 추가
- **상태:** [ ] TODO

#### [B] Task 1.3.4: 라벨이 있는 Input 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** label prop이 있는 Input이 접근 가능한 라벨 렌더링
- **작업:** 적절한 id 연결과 함께 label prop 추가
- **상태:** [ ] TODO

---

### M1.4: Card 컴포넌트

#### [S] Task 1.4.1: Card 컴포넌트 인터페이스 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** CardProps 타입이 에러 없이 컴파일
- **작업:** 타입에 CardProps 정의
- **참조:** [05-DesignSystem.md](./05-DesignSystem.md) 섹션 5.3
- **상태:** [ ] TODO

#### [B] Task 1.4.2: Card 기본 컴포넌트 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** Card가 그림자와 둥근 모서리로 렌더링
- **작업:** 기본 스타일로 Card 컴포넌트 생성
- **상태:** [ ] TODO

#### [B] Task 1.4.3: Card 호버 효과 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** Card가 호버 시 트랜지션과 함께 상승
- **작업:** translateY와 함께 호버 상태 추가
- **상태:** [ ] TODO

---

### M1.5: Modal 컴포넌트

#### [S] Task 1.5.1: Modal 컴포넌트 인터페이스 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** ModalProps 타입이 에러 없이 컴파일
- **작업:** 타입에 ModalProps 정의
- **참조:** [05-DesignSystem.md](./05-DesignSystem.md) 섹션 5.4
- **상태:** [ ] TODO

#### [B] Task 1.5.2: Modal 오버레이 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** Modal이 반투명 배경으로 렌더링
- **작업:** 배경 스타일로 Modal 생성
- **상태:** [ ] TODO

#### [B] Task 1.5.3: 배경 클릭 시 Modal 닫기 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 배경 클릭 시 onClose 핸들러 호출
- **작업:** 배경 클릭 핸들러 추가
- **상태:** [ ] TODO

#### [B] Task 1.5.4: Escape 키로 Modal 닫기 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** Escape 키 누르면 onClose 핸들러 호출
- **작업:** Escape용 키보드 이벤트 리스너 추가
- **상태:** [ ] TODO

#### [B] Task 1.5.5: Modal 포커스 트랩 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** Tab 키가 모달 콘텐츠 내에서 순환
- **작업:** 포커스 트랩 로직 구현
- **상태:** [ ] TODO

---

### M1.6: Progress 컴포넌트

#### [S] Task 1.6.1: Progress 컴포넌트 인터페이스 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** ProgressProps 타입이 에러 없이 컴파일
- **작업:** 타입에 ProgressProps 정의
- **상태:** [ ] TODO

#### [B] Task 1.6.2: Progress 바 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** `<Progress value={50}>`이 50% 채워진 바 렌더링
- **작업:** 동적 너비로 Progress 컴포넌트 생성
- **상태:** [ ] TODO

#### [B] Task 1.6.3: 단계 기반 Progress 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** `<Progress current={2} total={5}>`가 단계 인디케이터 렌더링
- **작업:** 원형으로 단계 모드 추가
- **상태:** [ ] TODO

---

### M1.7: 레이아웃 컴포넌트

#### [S] Task 1.7.1: Header 컴포넌트 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** Header 컴포넌트 파일이 존재하고 내보내기
- **작업:** `src/components/layout/Header.tsx` 생성
- **참조:** [05-DesignSystem.md](./05-DesignSystem.md) 섹션 7
- **상태:** [ ] TODO

#### [B] Task 1.7.2: Header 로고 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** Header가 홈으로 링크되는 로고 렌더링
- **작업:** Next.js Link로 로고 추가
- **상태:** [ ] TODO

#### [B] Task 1.7.3: Header 네비게이션 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** Header가 네비게이션 링크 렌더링
- **작업:** 네비게이션 항목 추가: 홈, 이혼 유형 진단, 양육비 계산기, 가이드, 상담 신청
- **상태:** [ ] TODO

#### [B] Task 1.7.4: Header 인증 버튼 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** Header가 로그아웃 상태에서 로그인 버튼 표시
- **작업:** 조건부 인증 UI 추가
- **상태:** [ ] TODO

#### [B] Task 1.7.5: 모바일 네비게이션 메뉴 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 햄버거 메뉴가 모바일에서 네비게이션 드로어 열기
- **작업:** 슬라이드 애니메이션으로 모바일 메뉴 추가
- **상태:** [ ] TODO

#### [S] Task 1.7.6: Footer 컴포넌트 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** Footer 컴포넌트 파일이 존재하고 내보내기
- **작업:** `src/components/layout/Footer.tsx` 생성
- **상태:** [ ] TODO

#### [B] Task 1.7.7: Footer 콘텐츠 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** Footer가 저작권과 링크 렌더링
- **작업:** 연락처 정보와 함께 footer 콘텐츠 추가
- **상태:** [ ] TODO

#### [S] Task 1.7.8: RootLayout 컴포넌트 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** RootLayout이 페이지를 Header와 Footer로 감싸기
- **작업:** `src/app/layout.tsx` 업데이트
- **상태:** [ ] TODO

#### [S] Task 1.7.9: Error Boundary 컴포넌트 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** error.tsx 파일이 에러를 캐치하고 폴백 UI 표시
- **작업:** `src/app/error.tsx` 생성
- **참조:** [plan.md](./plan.md) 섹션 6
- **상태:** [ ] TODO

#### [B] Task 1.7.10: 전역 로딩 UI 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 페이지 전환 시 로딩 인디케이터 표시
- **작업:** `src/app/loading.tsx` 생성
- **상태:** [ ] TODO

#### [B] Task 1.7.11: 404 페이지 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 존재하지 않는 경로 접근 시 404 페이지 표시
- **작업:** `src/app/not-found.tsx` 생성
- **상태:** [ ] TODO

---

### M1.8: 공유 컴포넌트

#### [S] Task 1.8.1: Container 컴포넌트 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** Container가 max-width와 padding 적용
- **작업:** `src/components/layout/Container.tsx` 생성
- **참조:** [07-CodingConvention.md](./07-CodingConvention.md) 섹션 2
- **상태:** [ ] TODO

#### [S] Task 1.8.2: CTA 컴포넌트 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** CTA 컴포넌트가 제목, 설명, 버튼 렌더링
- **작업:** `src/components/shared/CTA.tsx` 생성
- **참조:** [07-CodingConvention.md](./07-CodingConvention.md) 섹션 2
- **상태:** [ ] TODO

#### [S] Task 1.8.3: Disclaimer 컴포넌트 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** Disclaimer가 면책 고지 텍스트 렌더링
- **작업:** `src/components/shared/Disclaimer.tsx` 생성
- **참조:** [07-CodingConvention.md](./07-CodingConvention.md) 섹션 2
- **상태:** [ ] TODO

#### [S] Task 1.8.4: 네비게이션 상수 정의
- **유형:** 구조적(STRUCTURAL)
- **테스트:** NAVIGATION_ITEMS 배열이 메뉴 항목 포함
- **작업:** `src/lib/constants/navigation.ts` 생성
- **참조:** [07-CodingConvention.md](./07-CodingConvention.md) 섹션 2
- **상태:** [ ] TODO

#### [S] Task 1.8.5: 포맷팅 유틸리티 함수 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** formatCurrency, formatPhone 등 함수가 올바르게 동작
- **작업:** `src/lib/utils/format.ts` 생성
- **상태:** [ ] TODO

---

### M1.9: 상태 관리 (Zustand)

#### [S] Task 1.9.1: Auth 스토어 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** useAuthStore가 user, isAuthenticated 상태 제공
- **작업:** `src/stores/authStore.ts` 생성
- **참조:** [02-TRD.md](./02-TRD.md) 섹션 2.1
- **상태:** [ ] TODO

#### [S] Task 1.9.2: Diagnosis 스토어 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** useDiagnosisStore가 answers, currentStep 상태 제공
- **작업:** `src/stores/diagnosisStore.ts` 생성
- **참조:** [07-CodingConvention.md](./07-CodingConvention.md) 섹션 2
- **상태:** [ ] TODO

---

## Phase 2: 핵심 기능 (MVP)

### M2.1: FEAT-1 진단 - 데이터 모델

#### [S] Task 2.1.1: 진단 질문 타입 정의
- **유형:** 구조적(STRUCTURAL)
- **테스트:** DiagnosisQuestion 타입이 에러 없이 컴파일
- **작업:** 질문/답변 타입과 함께 `src/types/diagnosis.ts` 생성
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) 섹션 2.2
- **상태:** [ ] TODO

#### [B] Task 2.1.2: 진단 질문 데이터 생성
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** Questions 배열이 유효한 구조로 10개 항목 포함
- **작업:** `src/data/diagnosisQuestions.ts` 생성
- **참조:** [01-PRD.md](./01-PRD.md) FEAT-1
- **상태:** [ ] TODO

#### [B] Task 2.1.3: "협의이혼" 점수 계산 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 점수 25+ 시 result_type "협의" 반환
- **작업:** `calculateDiagnosisResult` 함수 생성
- **상태:** [ ] TODO

#### [B] Task 2.1.4: "조정이혼" 점수 계산 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 점수 15-24 시 result_type "조정" 반환
- **작업:** 계산 함수에 조정 케이스 추가
- **상태:** [ ] TODO

#### [B] Task 2.1.5: "소송이혼" 점수 계산 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 점수 15 미만 시 result_type "소송" 반환
- **작업:** 계산 함수에 소송 케이스 추가
- **상태:** [ ] TODO

#### [B] Task 2.1.6: 결과 상세 생성기 생성
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 결과에 reasons와 nextSteps 배열 포함
- **작업:** `generateResultDetail` 함수 생성
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) result_detail JSONB
- **상태:** [ ] TODO

---

### M2.2: FEAT-1 진단 - API

#### [S] Task 2.2.1: 진단 API 라우트 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** API 라우트 파일이 올바른 경로에 존재
- **작업:** `src/app/api/diagnosis/route.ts` 생성
- **상태:** [ ] TODO

#### [B] Task 2.2.2: POST /api/diagnosis 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 유효한 응답으로 POST 시 계산된 결과 반환
- **작업:** 검증과 함께 POST 핸들러 구현
- **상태:** [ ] TODO

#### [B] Task 2.2.3: 진단 결과 저장 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 결과가 diagnosis_results 테이블에 저장
- **작업:** 계산 후 Supabase 삽입 추가
- **상태:** [ ] TODO

#### [B] Task 2.2.4: 세션 기반 진단 처리 (비로그인)
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 인증되지 않은 사용자가 session_id로 저장 가능
- **작업:** 익명 사용자를 위한 session_id 생성 및 사용
- **상태:** [ ] TODO

---

### M2.3: FEAT-1 진단 - UI

#### [S] Task 2.3.1: 진단 페이지 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** /diagnosis 라우트에서 페이지 렌더링
- **작업:** `src/app/diagnosis/page.tsx` 생성
- **참조:** [03-UserFlow.md](./03-UserFlow.md) 섹션 2
- **상태:** [ ] TODO

#### [S] Task 2.3.2: DiagnosisProvider 컨텍스트 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** 컨텍스트가 answers 상태와 setAnswer 함수 제공
- **작업:** Zustand 또는 React Context로 진단 컨텍스트 생성
- **상태:** [ ] TODO

#### [B] Task 2.3.3: 진단 시작 화면 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 시작 화면에 소개 텍스트와 시작 버튼 표시
- **작업:** DiagnosisStart 컴포넌트 생성
- **상태:** [ ] TODO

#### [B] Task 2.3.4: 질문 카드 컴포넌트 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** QuestionCard가 질문 텍스트와 옵션 렌더링
- **작업:** QuestionCard 컴포넌트 생성
- **상태:** [ ] TODO

#### [B] Task 2.3.5: 답변 선택 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 옵션 클릭 시 답변 상태 업데이트
- **작업:** 옵션에 클릭 핸들러 추가
- **상태:** [ ] TODO

#### [B] Task 2.3.6: 진행률 인디케이터 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 진행률이 전체 중 현재 질문 번호 표시
- **작업:** 진단 흐름에 Progress 컴포넌트 추가
- **상태:** [ ] TODO

#### [B] Task 2.3.7: 질문 네비게이션 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 답변 선택 후 다음 질문으로 이동 가능
- **작업:** 네비게이션 로직과 함께 다음 버튼 추가
- **상태:** [ ] TODO

#### [B] Task 2.3.8: 뒤로 가기 네비게이션 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 뒤로 가기 버튼이 답변을 유지한 채 이전 질문으로 복귀
- **작업:** 상태 복원과 함께 뒤로 가기 버튼 추가
- **상태:** [ ] TODO

#### [B] Task 2.3.9: 질문 전환 애니메이션 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 질문 전환 시 페이드/슬라이드 효과
- **작업:** Framer Motion 애니메이션 추가
- **참조:** [05-DesignSystem.md](./05-DesignSystem.md) 섹션 6
- **상태:** [ ] TODO

#### [S] Task 2.3.10: 결과 페이지 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** /diagnosis/result에서 결과 페이지 렌더링
- **작업:** `src/app/diagnosis/result/page.tsx` 생성
- **상태:** [ ] TODO

#### [B] Task 2.3.11: 결과 표시 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 결과 페이지에 진단 유형과 설명 표시
- **작업:** 결과 데이터 가져와서 표시
- **상태:** [ ] TODO

#### [B] Task 2.3.12: 결과 CTA 버튼 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** CTA 버튼이 계산기와 상담으로 링크
- **작업:** 결과 페이지에 액션 버튼 추가
- **상태:** [ ] TODO

#### [B] Task 2.3.13: 결과 저장 기능 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 저장 버튼이 로그인 후 익명 결과를 사용자에게 연결
- **작업:** 인증 확인과 함께 저장 로직 추가
- **상태:** [ ] TODO

---

### M2.4: FEAT-2 계산기 - 데이터 모델

#### [S] Task 2.4.1: 계산기 타입 정의
- **유형:** 구조적(STRUCTURAL)
- **테스트:** CalculatorInput, CalculatorResult 타입이 컴파일
- **작업:** `src/types/calculator.ts` 생성
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) 섹션 2.3
- **상태:** [ ] TODO

#### [B] Task 2.4.2: 양육비 기준 테이블 데이터 생성
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 기준 테이블이 소득 구간에 맞는 금액 반환
- **작업:** `src/data/childSupportTable.ts` 생성
- **참조:** [01-PRD.md](./01-PRD.md) FEAT-2
- **상태:** [ ] TODO

#### [B] Task 2.4.3: 양육비 계산 구현 - 단일 자녀
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** `calculate({parent1: 4000000, parent2: 3000000, children: 1})`이 올바른 금액 반환
- **작업:** `calculateChildSupport` 함수 생성
- **상태:** [ ] TODO

#### [B] Task 2.4.4: 양육비 계산 구현 - 다자녀
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 2명 이상 자녀에 대해 계산이 올바르게 조정
- **작업:** 계산에 다자녀 지원 추가
- **상태:** [ ] TODO

#### [B] Task 2.4.5: 추가 비용 계산 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 교육비와 의료비가 기본 금액에 추가
- **작업:** 추가 비용 처리 추가
- **상태:** [ ] TODO

---

### M2.5: FEAT-2 계산기 - API

#### [S] Task 2.5.1: 계산기 API 라우트 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** API 라우트 파일이 올바른 경로에 존재
- **작업:** `src/app/api/calculator/route.ts` 생성
- **상태:** [ ] TODO

#### [B] Task 2.5.2: POST /api/calculator 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 유효한 입력으로 POST 시 계산된 금액 반환
- **작업:** 검증과 함께 POST 핸들러 구현
- **상태:** [ ] TODO

#### [B] Task 2.5.3: 계산기 결과 저장 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 결과가 calculator_results 테이블에 저장
- **작업:** 계산 후 Supabase 삽입 추가
- **상태:** [ ] TODO

---

### M2.6: FEAT-2 계산기 - UI

#### [S] Task 2.6.1: 계산기 페이지 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** /calculator 라우트에서 페이지 렌더링
- **작업:** `src/app/calculator/page.tsx` 생성
- **참조:** [03-UserFlow.md](./03-UserFlow.md) 섹션 3
- **상태:** [ ] TODO

#### [B] Task 2.6.2: 부모 소득 입력 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 양쪽 부모의 소득 값 입력 가능
- **작업:** 검증과 함께 소득 입력 필드 추가
- **상태:** [ ] TODO

#### [B] Task 2.6.3: 자녀 수 입력 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 자녀 수 선택 가능
- **작업:** 자녀 수 선택기 추가
- **상태:** [ ] TODO

#### [B] Task 2.6.4: 자녀 나이 입력 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 각 자녀의 나이 입력 가능
- **작업:** 자녀 수에 따른 동적 나이 입력 추가
- **상태:** [ ] TODO

#### [B] Task 2.6.5: 양육권자 선택기 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 어느 부모가 양육권을 가지는지 선택 가능
- **작업:** 양육권자 라디오 버튼 추가
- **상태:** [ ] TODO

#### [B] Task 2.6.6: 추가 비용 입력 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 추가 비용 토글 및 입력 가능
- **작업:** 교육비/의료비 필드 추가
- **상태:** [ ] TODO

#### [B] Task 2.6.7: 계산 버튼 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 계산 버튼이 API 호출 트리거
- **작업:** API 통합과 함께 제출 핸들러 추가
- **상태:** [ ] TODO

#### [B] Task 2.6.8: 결과 표시 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 결과에 계산된 금액과 내역 표시
- **작업:** 포맷팅과 함께 결과 섹션 추가
- **상태:** [ ] TODO

#### [B] Task 2.6.9: 면책 고지 표시 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 면책 고지 텍스트가 결과와 항상 함께 표시
- **작업:** 면책 고지 컴포넌트 추가
- **상태:** [ ] TODO

#### [B] Task 2.6.10: 재계산 기능 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 입력 변경 시 재계산 가능
- **작업:** 초기화/재계산 로직 추가
- **상태:** [ ] TODO

---

### M2.7: FEAT-3 상담 신청 폼

#### [S] Task 2.7.1: 상담 폼 타입 정의
- **유형:** 구조적(STRUCTURAL)
- **테스트:** ConsultationFormData 타입이 컴파일
- **작업:** 폼 데이터용 타입 생성
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) 섹션 2.4
- **상태:** [ ] TODO

#### [S] Task 2.7.2: 상담 API 라우트 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** API 라우트 파일이 올바른 경로에 존재
- **작업:** `src/app/api/consultation/route.ts` 생성
- **상태:** [ ] TODO

#### [B] Task 2.7.3: 상담 폼 검증 스키마 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** Zod 스키마가 필수 필드를 올바르게 검증
- **작업:** 폼 검증용 Zod 스키마 생성
- **상태:** [ ] TODO

#### [B] Task 2.7.4: POST /api/consultation 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 유효한 데이터로 POST 시 상담 레코드 생성
- **작업:** POST 핸들러 구현
- **상태:** [ ] TODO

#### [S] Task 2.7.5: 상담 페이지 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** /consultation 라우트에서 페이지 렌더링
- **작업:** `src/app/consultation/page.tsx` 생성
- **참조:** [03-UserFlow.md](./03-UserFlow.md) 섹션 4
- **상태:** [ ] TODO

#### [B] Task 2.7.6: 이름 입력 필드 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 이름 필드가 필수로 검증
- **작업:** 검증과 함께 이름 입력 추가
- **상태:** [ ] TODO

#### [B] Task 2.7.7: 전화번호 입력 필드 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 전화번호 필드가 형식 검증 (010-XXXX-XXXX)
- **작업:** 패턴 검증과 함께 전화번호 입력 추가
- **상태:** [ ] TODO

#### [B] Task 2.7.8: 희망 연락 시간 선택기 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 희망 연락 시간 선택 가능
- **작업:** 시간 선호도 드롭다운/체크박스 추가
- **상태:** [ ] TODO

#### [B] Task 2.7.9: 현재 상황 선택기 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 하나의 상황 옵션 선택 가능
- **작업:** 상황 라디오 버튼 추가
- **상태:** [ ] TODO

#### [B] Task 2.7.10: 관심사 다중 선택 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 여러 관심 분야 선택 가능
- **작업:** 관심사 체크박스 추가
- **상태:** [ ] TODO

#### [B] Task 2.7.11: 설명 텍스트영역 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 선택적 설명 텍스트 입력 가능
- **작업:** 설명 텍스트영역 추가
- **상태:** [ ] TODO

#### [B] Task 2.7.12: 개인정보 동의 체크박스 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 동의 체크 없이 폼 제출 불가
- **작업:** 검증과 함께 동의 체크박스 추가
- **상태:** [ ] TODO

#### [B] Task 2.7.13: 폼 제출 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 유효한 폼 제출 시 성공 표시
- **작업:** React Hook Form으로 폼 제출 핸들러 추가
- **상태:** [ ] TODO

#### [S] Task 2.7.14: 상담 성공 페이지 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** /consultation/success에서 성공 페이지 렌더링
- **작업:** 성공 페이지 컴포넌트 생성
- **상태:** [ ] TODO

#### [B] Task 2.7.15: 성공 페이지 콘텐츠 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 성공 페이지에 확인 메시지와 예상 응답 시간 표시
- **작업:** 성공 메시지와 다음 단계 추가
- **상태:** [ ] TODO

---

### M2.8: 랜딩 페이지

#### [S] Task 2.8.1: 랜딩 페이지 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** / 라우트에서 페이지 렌더링
- **작업:** 섹션 컴포넌트와 함께 `src/app/page.tsx` 생성
- **상태:** [ ] TODO

#### [B] Task 2.8.2: Hero 섹션 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** Hero에 헤드라인, 서브헤드라인, CTA 표시
- **작업:** 콘텐츠와 함께 Hero 컴포넌트 생성
- **참조:** [01-PRD.md](./01-PRD.md) 섹션 2
- **상태:** [ ] TODO

#### [B] Task 2.8.3: 문제-해결 섹션 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 섹션에 전후 비교 표시
- **작업:** 비교 레이아웃 생성
- **상태:** [ ] TODO

#### [B] Task 2.8.4: 기능 섹션 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 섹션에 3개 기능 카드 표시
- **작업:** 아이콘과 함께 기능 카드 생성
- **상태:** [ ] TODO

#### [B] Task 2.8.5: 신뢰 섹션 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 섹션에 신뢰 배지 표시 (변호사 감수, 무료)
- **작업:** 신뢰 인디케이터 생성
- **상태:** [ ] TODO

#### [B] Task 2.8.6: CTA 섹션 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** CTA 버튼이 진단으로 링크
- **작업:** 최종 행동 유도 추가
- **상태:** [ ] TODO

#### [B] Task 2.8.7: 스크롤 애니메이션 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 섹션이 뷰포트에 들어올 때 애니메이션
- **작업:** Framer Motion 스크롤 애니메이션 추가
- **참조:** [05-DesignSystem.md](./05-DesignSystem.md) 섹션 6
- **상태:** [ ] TODO

---

### M2.9: 블로그 기능

#### [S] Task 2.9.1: 블로그 타입 정의
- **유형:** 구조적(STRUCTURAL)
- **테스트:** BlogPost, BlogCategory 타입이 에러 없이 컴파일
- **작업:** `src/types/blog.ts` 생성
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) 섹션 2.5, 2.6
- **상태:** [ ] TODO

#### [S] Task 2.9.2: 블로그 API 라우트 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** API 라우트 파일이 올바른 경로에 존재
- **작업:** `src/app/api/blog/route.ts`, `src/app/api/blog/[slug]/route.ts` 생성
- **상태:** [ ] TODO

#### [B] Task 2.9.3: GET /api/blog 구현 (목록)
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 발행된 게시물 목록 반환, 카테고리 필터링 지원
- **작업:** 페이지네이션과 카테고리 필터 포함 GET 핸들러 구현
- **상태:** [ ] TODO

#### [B] Task 2.9.4: GET /api/blog/[slug] 구현 (상세)
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** slug로 특정 게시물 조회, 조회수 증가
- **작업:** 상세 조회 GET 핸들러 구현
- **상태:** [ ] TODO

#### [S] Task 2.9.5: 블로그 목록 페이지 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** /blog 라우트에서 페이지 렌더링
- **작업:** `src/app/blog/page.tsx` 생성
- **참조:** [01-PRD.md](./01-PRD.md) 섹션 6.1
- **상태:** [ ] TODO

#### [B] Task 2.9.6: 블로그 목록 UI 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 게시물 카드 그리드로 표시, 카테고리 탭 동작
- **작업:** BlogList, BlogCard 컴포넌트 생성
- **상태:** [ ] TODO

#### [S] Task 2.9.7: 블로그 상세 페이지 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** /blog/[slug] 라우트에서 페이지 렌더링
- **작업:** `src/app/blog/[slug]/page.tsx` 생성
- **상태:** [ ] TODO

#### [B] Task 2.9.8: 블로그 상세 UI 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 게시물 제목, 본문, 작성일 표시
- **작업:** BlogDetail 컴포넌트 생성
- **상태:** [ ] TODO

#### [B] Task 2.9.9: 블로그 저장 기능 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 로그인 사용자가 게시물 저장/취소 가능
- **작업:** 저장 버튼 및 saved_contents API 연동
- **상태:** [ ] TODO

#### [B] Task 2.9.10: 관련 콘텐츠 표시 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 상세 페이지 하단에 같은 카테고리 게시물 표시
- **작업:** 관련 게시물 섹션 추가
- **상태:** [ ] TODO

---

### M2.10: 마이페이지 (사용자 대시보드)

#### [S] Task 2.10.1: 마이페이지 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** /mypage 라우트에서 페이지 렌더링
- **작업:** `src/app/mypage/page.tsx` 생성
- **참조:** [03-UserFlow.md](./03-UserFlow.md) 섹션 1
- **상태:** [ ] TODO

#### [B] Task 2.10.2: 마이페이지 인증 가드 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 비로그인 사용자가 /mypage 접근 시 로그인으로 리다이렉트
- **작업:** 인증 확인 미들웨어 추가
- **상태:** [ ] TODO

#### [B] Task 2.10.3: 저장된 진단 결과 목록 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 사용자의 이전 진단 결과 목록 표시
- **작업:** 진단 결과 목록 컴포넌트 생성
- **상태:** [ ] TODO

#### [B] Task 2.10.4: 저장된 계산기 결과 목록 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 사용자의 이전 계산 결과 목록 표시
- **작업:** 계산기 결과 목록 컴포넌트 생성
- **상태:** [ ] TODO

#### [B] Task 2.10.5: 저장된 블로그 글 목록 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 사용자가 저장한 게시물 목록 표시
- **작업:** 저장된 콘텐츠 목록 컴포넌트 생성
- **상태:** [ ] TODO

#### [B] Task 2.10.6: 내 상담 신청 내역 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 사용자의 상담 신청 내역 및 상태 표시
- **작업:** 상담 신청 내역 컴포넌트 생성
- **상태:** [ ] TODO

#### [B] Task 2.10.7: 계산기 결과 저장 기능 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 로그인 사용자가 계산기 결과 저장 가능
- **작업:** 계산기 페이지에 저장 버튼 추가
- **상태:** [ ] TODO

---

## Phase 3: 관리자 및 분석

### M3.1: 관리자 대시보드

#### [S] Task 3.1.1: 관리자 라우트 그룹 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** /admin 라우트 아래에 관리자 페이지들
- **작업:** `src/app/admin/` 디렉토리 구조 생성
- **참조:** [03-UserFlow.md](./03-UserFlow.md) 섹션 6
- **상태:** [ ] TODO

#### [B] Task 3.1.2: 관리자 인증 가드 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 비관리자 사용자가 /admin에서 리다이렉트
- **작업:** role='admin' 확인하는 미들웨어 생성
- **상태:** [ ] TODO

#### [B] Task 3.1.3: 상담 목록 페이지 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 관리자가 모든 상담 조회 가능
- **작업:** 필터링과 함께 상담 목록 생성
- **상태:** [ ] TODO

#### [B] Task 3.1.4: 상담 상태 업데이트 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 관리자가 상담 상태 변경 가능
- **작업:** API 업데이트와 함께 상태 드롭다운 추가
- **상태:** [ ] TODO

#### [B] Task 3.1.5: 상담 상세 보기 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 관리자가 연결된 진단/계산기 결과 조회 가능
- **작업:** 관련 데이터와 함께 상세 페이지 생성
- **상태:** [ ] TODO

#### [B] Task 3.1.6: 관리자 대시보드 지표 표시 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 대시보드에 오늘의 신청 건수, 주요 지표 표시
- **작업:** 통계 컴포넌트 및 API 생성
- **참조:** [03-UserFlow.md](./03-UserFlow.md) 섹션 6
- **상태:** [ ] TODO

---

### M3.2: 블로그 관리 (관리자)

#### [S] Task 3.2.1: 블로그 관리 페이지 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** /admin/blog 라우트에서 페이지 렌더링
- **작업:** `src/app/admin/blog/page.tsx` 생성
- **참조:** [03-UserFlow.md](./03-UserFlow.md) 섹션 6
- **상태:** [ ] TODO

#### [B] Task 3.2.2: 블로그 글 목록 관리 UI 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 관리자가 모든 게시물 조회 가능 (초안 포함)
- **작업:** 관리자용 게시물 목록 테이블 생성
- **상태:** [ ] TODO

#### [S] Task 3.2.3: 블로그 글 작성/수정 페이지 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** /admin/blog/new, /admin/blog/[id]/edit 라우트 렌더링
- **작업:** 블로그 에디터 페이지 생성
- **상태:** [ ] TODO

#### [B] Task 3.2.4: 블로그 글 작성 폼 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 제목, 내용, 카테고리, SEO 메타 입력 가능
- **작업:** 블로그 에디터 폼 컴포넌트 생성
- **상태:** [ ] TODO

#### [B] Task 3.2.5: 블로그 글 저장 API 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** POST /api/admin/blog로 새 게시물 생성
- **작업:** 관리자용 블로그 POST API 구현
- **상태:** [ ] TODO

#### [B] Task 3.2.6: 블로그 글 수정 API 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** PUT /api/admin/blog/[id]로 게시물 수정
- **작업:** 관리자용 블로그 PUT API 구현
- **상태:** [ ] TODO

#### [B] Task 3.2.7: 블로그 발행/비공개 토글 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 게시물 상태를 draft/published로 변경 가능
- **작업:** 상태 변경 API 및 UI 구현
- **상태:** [ ] TODO

---

### M3.3: 보안 강화

#### [S] Task 3.3.1: 보안 헤더 설정 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** next.config.js에 보안 헤더 설정 존재
- **작업:** `next.config.js`에 securityHeaders 배열 추가
- **참조:** [02-TRD.md](./02-TRD.md) 섹션 3.2
- **상태:** [ ] TODO

#### [B] Task 3.3.2: CSP (Content Security Policy) 헤더 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 응답 헤더에 Content-Security-Policy 포함
- **작업:** CSP 정책 정의 및 적용 (script-src, style-src, img-src 등)
- **참조:** [02-TRD.md](./02-TRD.md) 섹션 3.2 - XSS 방지
- **상태:** [ ] TODO

#### [B] Task 3.3.3: 추가 보안 헤더 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** X-Frame-Options, X-Content-Type-Options, Referrer-Policy 헤더 존재
- **작업:** 클릭재킹 방지, MIME 스니핑 방지 헤더 추가
- **상태:** [ ] TODO

#### [B] Task 3.3.4: CSRF 보호 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** POST 요청에 CSRF 토큰 검증 동작
- **작업:** CSRF 토큰 생성 및 검증 미들웨어 구현
- **참조:** [02-TRD.md](./02-TRD.md) 섹션 3.2, [plan.md](./plan.md) 섹션 7
- **상태:** [ ] TODO

#### [B] Task 3.3.5: API Rate Limiting 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 동일 IP에서 과도한 요청 시 429 응답 반환
- **작업:** 상담 신청, 진단, 계산기 API에 rate limit 적용
- **상태:** [ ] TODO

#### [S] Task 3.3.6: API 입력 검증 미들웨어 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** validateRequest 함수가 Zod 스키마로 검증
- **작업:** `src/lib/api/validate.ts` 생성
- **참조:** [02-TRD.md](./02-TRD.md) 섹션 3.2 - 입력 검증
- **상태:** [ ] TODO

#### [B] Task 3.3.7: 진단 API 입력 검증 적용
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 잘못된 형식의 answers 데이터 전송 시 400 에러 반환
- **작업:** POST /api/diagnosis에 Zod 스키마 검증 적용
- **상태:** [ ] TODO

#### [B] Task 3.3.8: 계산기 API 입력 검증 적용
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 음수 소득 또는 잘못된 데이터 전송 시 400 에러 반환
- **작업:** POST /api/calculator에 Zod 스키마 검증 적용
- **상태:** [ ] TODO

#### [B] Task 3.3.9: 에러 응답 보안화 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 프로덕션에서 에러 응답에 스택 트레이스 미포함
- **작업:** 환경별 에러 메시지 분기 처리
- **참조:** [07-CodingConvention.md](./07-CodingConvention.md) 섹션 7.3
- **상태:** [ ] TODO

#### [B] Task 3.3.10: 환경 변수 검증 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 필수 환경 변수 누락 시 앱 시작 실패
- **작업:** 앱 시작 시 필수 환경 변수 존재 확인
- **참조:** [plan.md](./plan.md) 섹션 7
- **상태:** [ ] TODO

#### [B] Task 3.3.11: 세션 토큰 자동 갱신 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 만료 임박 토큰이 자동으로 갱신
- **작업:** Supabase 세션 갱신 로직 구현
- **참조:** [02-TRD.md](./02-TRD.md) 섹션 3.2 - 인증
- **상태:** [ ] TODO

#### [B] Task 3.3.12: HTML 콘텐츠 새니타이제이션 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 블로그 콘텐츠에서 악성 스크립트 태그 제거
- **작업:** DOMPurify 또는 유사 라이브러리로 HTML 정화
- **참조:** [plan.md](./plan.md) 섹션 7 - XSS 방지
- **상태:** [ ] TODO

#### [B] Task 3.3.13: 민감 데이터 로깅 방지 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 로그에 전화번호, 이름 등 개인정보 미포함
- **작업:** 로깅 유틸리티에 민감 데이터 마스킹 적용
- **상태:** [ ] TODO

#### [B] Task 3.3.14: 보안 감사 로깅 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 로그인, 상담 신청 등 주요 이벤트 로깅
- **작업:** 보안 관련 이벤트 로깅 함수 생성
- **상태:** [ ] TODO

#### [B] Task 3.3.15: 파일 업로드 보안 검증 (향후 확장용)
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 허용되지 않은 파일 형식 업로드 시 거부
- **작업:** 파일 타입, 크기 검증 로직 구현
- **상태:** [ ] TODO

---

### M3.4: 분석 연동

#### [S] Task 3.4.1: 분석 유틸리티 구조 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** 분석 함수 파일 존재
- **작업:** `src/lib/analytics.ts` 생성
- **상태:** [ ] TODO

#### [B] Task 3.4.2: GA4 스크립트 삽입 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** GA4 스크립트가 페이지에 로드
- **작업:** 루트 레이아웃에 GA4 추가
- **상태:** [ ] TODO

#### [B] Task 3.4.3: 페이지뷰 추적 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 페이지 네비게이션이 페이지뷰 이벤트 트리거
- **작업:** 페이지뷰 추적 훅 추가
- **상태:** [ ] TODO

#### [B] Task 3.4.4: diagnosis_start 이벤트 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 진단 시작 시 이벤트 발생
- **작업:** 이벤트 추적 호출 추가
- **상태:** [ ] TODO

#### [B] Task 3.4.5: diagnosis_complete 이벤트 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 진단 완료 시 결과 유형과 함께 이벤트 발생
- **작업:** 이벤트 추적 호출 추가
- **상태:** [ ] TODO

#### [B] Task 3.4.6: calculator_complete 이벤트 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 계산기 사용 시 이벤트 발생
- **작업:** 이벤트 추적 호출 추가
- **상태:** [ ] TODO

#### [B] Task 3.4.7: consultation_submit 이벤트 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 폼 제출 시 전환 이벤트 발생
- **작업:** 이벤트 추적 호출 추가
- **상태:** [ ] TODO

---

### M3.5: SEO 및 메타데이터

#### [S] Task 3.5.1: 메타데이터 유틸리티 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** generateMetadata 헬퍼 함수 존재
- **작업:** `src/lib/metadata.ts` 생성
- **참조:** [04-DatabaseDesign.md](./04-DatabaseDesign.md) seo_meta
- **상태:** [ ] TODO

#### [B] Task 3.5.2: 페이지별 메타데이터 설정
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 각 페이지에 적절한 title, description 설정
- **작업:** 모든 페이지에 metadata export 추가
- **상태:** [ ] TODO

#### [B] Task 3.5.3: sitemap.xml 생성 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** /sitemap.xml이 모든 공개 URL 포함
- **작업:** `src/app/sitemap.ts` 생성
- **상태:** [ ] TODO

#### [B] Task 3.5.4: robots.txt 생성 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** /robots.txt가 크롤링 규칙 제공
- **작업:** `src/app/robots.ts` 생성
- **상태:** [ ] TODO

#### [B] Task 3.5.5: Open Graph 이미지 기본 설정
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 소셜 공유 시 OG 이미지 표시
- **작업:** 기본 OG 이미지 및 메타 태그 설정
- **상태:** [ ] TODO

---

### M3.6: 법적 페이지

#### [S] Task 3.6.1: 이용약관 페이지 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** /terms 라우트에서 페이지 렌더링
- **작업:** `src/app/terms/page.tsx` 생성
- **상태:** [ ] TODO

#### [B] Task 3.6.2: 이용약관 콘텐츠 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 이용약관 전체 내용 표시
- **작업:** 이용약관 텍스트 작성 및 표시
- **상태:** [ ] TODO

#### [S] Task 3.6.3: 개인정보처리방침 페이지 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** /privacy 라우트에서 페이지 렌더링
- **작업:** `src/app/privacy/page.tsx` 생성
- **상태:** [ ] TODO

#### [B] Task 3.6.4: 개인정보처리방침 콘텐츠 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 개인정보처리방침 전체 내용 표시
- **작업:** 개인정보처리방침 텍스트 작성 및 표시
- **상태:** [ ] TODO

---

## Phase 4: 테스트 및 최적화

### M4.1: 성능 최적화

#### [B] Task 4.1.1: 이미지 최적화 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 이미지가 적절한 크기의 WebP로 제공
- **작업:** 모든 이미지에 next/image 설정
- **상태:** [ ] TODO

#### [B] Task 4.1.2: 폰트 최적화 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 폰트가 display:swap으로 프리로드
- **작업:** 폰트 로딩 전략 설정
- **상태:** [ ] TODO

#### [B] Task 4.1.3: 코드 스플리팅 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 동적 임포트가 초기 번들 크기 감소
- **작업:** 무거운 컴포넌트에 동적 임포트 추가
- **상태:** [ ] TODO

#### [B] Task 4.1.4: 블로그 SSG 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 블로그 페이지가 정적으로 생성
- **작업:** 블로그용 generateStaticParams 설정
- **상태:** [ ] TODO

#### [B] Task 4.1.5: Lighthouse Performance 90+ 달성
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** Lighthouse 감사에서 Performance >= 90
- **작업:** 남은 성능 이슈 수정
- **상태:** [ ] TODO

---

### M4.2: 접근성

#### [B] Task 4.2.1: 적절한 헤딩 계층 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 헤딩이 h1 > h2 > h3 순서 따름
- **작업:** 헤딩 구조 감사 및 수정
- **참조:** [05-DesignSystem.md](./05-DesignSystem.md) 섹션 8
- **상태:** [ ] TODO

#### [B] Task 4.2.2: 키보드 네비게이션 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 모든 인터랙티브 요소가 Tab으로 도달 가능
- **작업:** 누락된 tabindex 또는 포커스 처리 수정
- **상태:** [ ] TODO

#### [B] Task 4.2.3: ARIA 라벨 구현
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 스크린 리더가 모든 인터랙티브 요소 안내
- **작업:** 필요한 곳에 aria-label 추가
- **상태:** [ ] TODO

#### [B] Task 4.2.4: Lighthouse Accessibility 90+ 달성
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** Lighthouse 감사에서 Accessibility >= 90
- **작업:** 남은 접근성 이슈 수정
- **상태:** [ ] TODO

---

### M4.3: E2E 테스트

#### [S] Task 4.3.1: Playwright 설정
- **유형:** 구조적(STRUCTURAL)
- **테스트:** `npm run test:e2e`가 Playwright 실행
- **작업:** Playwright 설치 및 설정
- **상태:** [ ] TODO

#### [B] Task 4.3.2: E2E 테스트 작성: 진단 흐름
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 시작부터 결과까지 진단 완료
- **작업:** 진단용 Playwright 테스트 작성
- **참조:** [03-UserFlow.md](./03-UserFlow.md) 섹션 2
- **상태:** [ ] TODO

#### [B] Task 4.3.3: E2E 테스트 작성: 계산기 흐름
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 입력부터 결과까지 계산기 완료
- **작업:** 계산기용 Playwright 테스트 작성
- **참조:** [03-UserFlow.md](./03-UserFlow.md) 섹션 3
- **상태:** [ ] TODO

#### [B] Task 4.3.4: E2E 테스트 작성: 상담 흐름
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 상담 폼 제출 완료
- **작업:** 상담용 Playwright 테스트 작성
- **참조:** [03-UserFlow.md](./03-UserFlow.md) 섹션 4
- **상태:** [ ] TODO

#### [B] Task 4.3.5: E2E 테스트 작성: 인증 흐름
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** 로그인과 로그아웃이 올바르게 작동
- **작업:** 인증용 Playwright 테스트 작성
- **참조:** [03-UserFlow.md](./03-UserFlow.md) 섹션 5
- **상태:** [ ] TODO

---

## 배포

### M5.1: 프로덕션 배포

#### [S] Task 5.1.1: Vercel 프로젝트 생성
- **유형:** 구조적(STRUCTURAL)
- **테스트:** Vercel 프로젝트가 저장소에 연결
- **작업:** Vercel 프로젝트 설정
- **상태:** [ ] TODO

#### [B] Task 5.1.2: 환경 변수 설정
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** Vercel에 프로덕션 환경 변수 설정
- **작업:** 모든 필수 환경 변수 추가
- **상태:** [ ] TODO

#### [B] Task 5.1.3: 커스텀 도메인 설정
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** ihonguide.com이 Vercel 배포로 해석
- **작업:** Vercel에서 DNS와 도메인 설정
- **상태:** [ ] TODO

#### [B] Task 5.1.4: 자동 배포 활성화
- **유형:** 동작적(BEHAVIORAL)
- **테스트:** main으로 push 시 배포 트리거
- **작업:** GitHub 연동 설정
- **상태:** [ ] TODO

---

# 요약

## Phase별 태스크 수

| Phase | 구조적 | 동작적 | 합계 |
|-------|--------|--------|------|
| M0: 초기화 | 14 | 18 | 32 |
| M1: UI 컴포넌트 | 20 | 29 | 49 |
| M2: 핵심 기능 | 16 | 65 | 81 |
| M3: 관리자, 보안, SEO, 분석 | 9 | 35 | 44 |
| M4: 테스트 및 최적화 | 2 | 12 | 14 |
| M5: 배포 | 1 | 3 | 4 |
| **합계** | **62** | **162** | **224** |

## 실행 규칙 리마인더

1. **모든 문서를 먼저 읽지 않고 코딩 시작하지 않기**
2. **한 번에 하나의 태스크만**
3. **먼저 실패하는 테스트 작성 (Red)**
4. **통과하기 위한 최소 코드 작성 (Green)**
5. **Green 상태에서만 리팩토링**
6. **각 태스크 후 커밋**
7. **각 태스크 완료 후 중단하고 "go" 대기**
