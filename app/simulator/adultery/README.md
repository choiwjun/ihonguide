# 상간녀 손해배상 청구 시뮬레이터 페이지

## 📋 개요

배우자의 부정행위로 인한 손해배상 청구 가능성과 예상 위자료를 분석하는 시뮬레이터 페이지입니다.

## 🎯 주요 기능

### 1. 클라이언트 컴포넌트
- ✅ 'use client' 지시자 사용
- ✅ Zustand 스토어 통합 (useAdulterySimulatorStore)
- ✅ 실시간 상태 관리

### 2. 폼 및 결과 표시
- ✅ AdulterySimulatorForm 컴포넌트 표시
- ✅ AdulterySimulatorResult 컴포넌트 표시 (결과 존재 시)
- ✅ 폼 제출 핸들러 (setInput + calculate)
- ✅ 결과 표시 시 자동 스크롤

### 3. 상태 관리
- ✅ 로딩 상태 (isLoading)
- ✅ 에러 상태 (error)
- ✅ 재시도 기능
- ✅ 재계산 기능 (reset)

### 4. 히어로 섹션
- ✅ 페이지 제목: "상간녀 손해배상 청구 시뮬레이터"
- ✅ 설명 문구
- ✅ 주요 특징 3가지 (정확한 분석, 위자료 산정, 리스크 평가)
- ✅ 그라디언트 배경

### 5. 정보 섹션
- ✅ 상간녀 소송이란?
  - 성립 요건
  - 청구 가능 대상
- ✅ 언제 이용하나요?
  - 4가지 사용 케이스
- ✅ 법적 고지 및 면책사항

### 6. SEO 최적화
- ✅ metadata 파일 (title, description, keywords)
- ✅ Open Graph 태그
- ✅ Twitter Card
- ✅ JSON-LD 구조화 데이터 (Service Schema)
- ✅ Canonical URL

### 7. 디자인
- ✅ Light Transparency Design System
- ✅ 반응형 레이아웃 (모바일 우선)
- ✅ 부드러운 전환 애니메이션
- ✅ 인쇄 친화적 스타일 (print:hidden)

### 8. 에러 핸들링
- ✅ 사용자 친화적 에러 메시지
- ✅ 재시도 버튼
- ✅ 처음부터 다시 버튼

## 📁 파일 구조

```
app/simulator/adultery/
├── page.tsx          # 메인 페이지 (클라이언트 컴포넌트)
├── layout.tsx        # 레이아웃 (메타데이터 적용)
├── metadata.ts       # SEO 메타데이터 및 JSON-LD
└── README.md         # 이 문서
```

## 🔗 의존성

### 컴포넌트
- `@/components/layout/Container` - 레이아웃 컨테이너
- `@/components/ui/Card` - 카드 컴포넌트
- `@/components/simulator/AdulterySimulatorForm` - 입력 폼
- `@/components/simulator/AdulterySimulatorResult` - 결과 표시

### 상태 관리
- `@/stores/adulterySimulatorStore` - Zustand 스토어

### 타입
- `@/types/adulterySimulator` - AdulterySimulatorInput 타입

## 🎨 디자인 시스템

### 색상
- Primary: brand-primary (Teal)
- Success: Emerald
- Warning: Amber
- Error: Red
- Info: Blue

### 레이아웃
- Container: size="md" (max-w-3xl)
- Spacing: py-8 md:py-12
- Gap: space-y-8

### 타이포그래피
- 제목: text-3xl md:text-4xl lg:text-5xl font-bold
- 설명: text-lg md:text-xl text-gray-600
- 본문: text-sm text-gray-700

## 🔄 워크플로우

```
사용자 접속
    ↓
히어로 섹션 표시
    ↓
폼 입력 (AdulterySimulatorForm)
    ↓
제출 버튼 클릭
    ↓
handleSubmit() → setInput() + calculate()
    ↓
로딩 상태 표시 (isLoading=true)
    ↓
[성공] 결과 표시 (AdulterySimulatorResult)
    ↓
자동 스크롤 (resultRef)
    ↓
[재계산] reset() → 처음으로 돌아감
```

## 📊 상태 흐름

```typescript
// 초기 상태
{
  input: null,
  result: null,
  isLoading: false,
  error: null
}

// 폼 제출 시
handleSubmit(data) → setInput(data) → calculate()

// 계산 중
{
  input: AdulterySimulatorInput,
  result: null,
  isLoading: true,
  error: null
}

// 계산 완료
{
  input: AdulterySimulatorInput,
  result: AdulterySimulatorResult,
  isLoading: false,
  error: null
}

// 에러 발생
{
  input: AdulterySimulatorInput,
  result: null,
  isLoading: false,
  error: "오류 메시지"
}

// 재계산
reset() → 초기 상태로 복귀
```

## 🧪 테스트 시나리오

### 1. 기본 플로우
1. 페이지 접속
2. 폼에 데이터 입력
3. "분석 시작" 버튼 클릭
4. 로딩 스피너 확인
5. 결과 표시 확인
6. 자동 스크롤 확인

### 2. 에러 핸들링
1. 잘못된 데이터 입력
2. 에러 메시지 확인
3. "다시 시도" 버튼 클릭
4. 정상 동작 확인

### 3. 재계산
1. 결과 표시 상태에서
2. "다시 시뮬레이션하기" 버튼 클릭
3. 폼으로 돌아가는지 확인
4. 상태 초기화 확인

### 4. 반응형
1. 모바일 뷰 확인 (< 640px)
2. 태블릿 뷰 확인 (640px ~ 1024px)
3. 데스크톱 뷰 확인 (> 1024px)

### 5. SEO
1. 메타 태그 확인 (head)
2. JSON-LD 확인 (script)
3. Open Graph 이미지 확인

## 🚀 배포 체크리스트

- [ ] TypeScript 컴파일 에러 없음
- [ ] ESLint 경고 없음
- [ ] npm run build 성공
- [ ] 모든 링크 동작 확인
- [ ] 이미지 경로 확인 (Open Graph)
- [ ] 메타데이터 내용 검증
- [ ] 모바일 반응형 테스트
- [ ] 접근성 테스트 (키보드, 스크린 리더)
- [ ] 성능 테스트 (Lighthouse)

## 📝 주의사항

1. **법적 고지 필수**: 본 시뮬레이터는 참고용이며 법률 자문을 대체할 수 없음
2. **개인정보 보호**: 입력 데이터는 서버에 저장되지 않음 (클라이언트 사이드)
3. **브라우저 호환성**: 최신 브라우저 권장 (Chrome, Firefox, Safari, Edge)
4. **스크롤 동작**: 결과 표시 시 자동 스크롤 (headerOffset: 80px)

## 🔗 관련 문서

- [Adultery Simulator Store](../../../stores/adulterySimulatorStore.ts)
- [Adultery Simulator Types](../../../types/adulterySimulator.ts)
- [Adultery Calculation Logic](../../../lib/simulator/adultery.ts)
- [Adultery Simulator Form Component](../../../components/simulator/AdulterySimulatorForm.tsx)
- [Adultery Simulator Result Component](../../../components/simulator/AdulterySimulatorResult.tsx)
- [Design System](../../../docs/05-DesignSystem.md)

## 📅 변경 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2026-02-05 | 초기 페이지 생성 - 메인 페이지, 메타데이터, 레이아웃 |

## 👥 작성자

- Claude Code (Frontend Specialist)
- Task: Adultery Simulator Main Page
- Spec: Light Transparency Design System
