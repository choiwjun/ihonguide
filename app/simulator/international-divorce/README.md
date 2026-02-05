# 국제이혼 시뮬레이터

외국인 배우자와의 이혼 시 적용되는 법률, 관할 법원, 예상 비용과 절차를 시뮬레이션하는 페이지입니다.

## 📁 파일 구조

```
app/simulator/international-divorce/
├── page.tsx              # 메인 시뮬레이터 페이지 (Client Component)
├── layout.tsx            # SEO 메타데이터 및 JSON-LD
├── README.md            # 문서 (이 파일)
└── __tests__/
    └── page.test.tsx    # 컴포넌트 테스트
```

## 🎯 주요 기능

### 1. 인트로 섹션
- 시뮬레이터 소개
- 주요 기능 안내
- 국제이혼 개념 설명
- 지원 국가 목록 (10개국)
- 법률 자문 고지

### 2. 정보 입력 폼
- 혼인 신고 국가
- 현재 거주 국가
- 부부 국적
- 혼인 기간
- 자녀 유무 및 거주 국가
- 필수 입력 검증

### 3. 시뮬레이션 결과
- **적용 법률**: 어느 나라 법이 적용되는지
- **관할 법원**: 어느 법원에서 재판하는지
- **예상 기간**: 6개월 ~ 18개월
- **예상 비용**: 500만원 ~ 1,500만원
- **필수 서류**: 혼인관계증명서, 여권, 공증서류 등
- **절차 단계**: 6단계 프로세스
- **주의사항**: 국제사법, 헤이그 협약 등

## 🛠️ 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Light Transparency Design System
- **State Management**: React useState (로컬 상태)
- **Testing**: Vitest + React Testing Library

## 📋 타입 정의

### InternationalDivorceInput
```typescript
interface InternationalDivorceInput {
  marriageCountry: string;        // 혼인 신고 국가
  residenceCountry: string;       // 현재 거주 국가
  spouseNationality: string;      // 배우자 국적
  myNationality: string;          // 본인 국적
  marriageDuration: number;       // 혼인 기간 (년)
  hasChildren: boolean;           // 자녀 유무
  childrenResidence?: string;     // 자녀 거주 국가
  propertyLocation: string[];     // 재산 위치 (다국적 재산)
  preferredJurisdiction?: string; // 선호 관할
}
```

### SimulationResult
```typescript
interface SimulationResult {
  applicableLaw: string;          // 적용 법률
  jurisdiction: string;           // 관할 법원
  estimatedDuration: string;      // 예상 소요 기간
  estimatedCost: {
    min: number;
    max: number;
    currency: string;
  };
  requiredDocuments: string[];    // 필수 서류
  procedureSteps: string[];       // 절차 단계
  considerations: string[];       // 고려사항
  warnings: string[];             // 경고사항
}
```

## 🎨 디자인 시스템

### Light Transparency Design (Variant 3)
- **Card**: 투명 유리 효과 (`bg-white/65`, `backdrop-blur-[16px]`)
- **Primary Color**: Deep Teal (`#0f766e`)
- **Border**: 부드러운 테두리 (`border-white/60`)
- **Shadow**: 섬세한 그림자 (teal tint)

### 반응형 브레이크포인트
- Mobile: 기본 (1열 그리드)
- Tablet (md): 768px+ (2열 그리드)
- Desktop (lg): 1024px+

## 🧪 테스트

### 실행 방법
```bash
npm test app/simulator/international-divorce
```

### 테스트 커버리지
- ✅ Intro Phase 렌더링
- ✅ Form Phase 입력 검증
- ✅ Calculation Phase 로딩 상태
- ✅ Result Phase 결과 표시
- ✅ 접근성 (ARIA, 키보드 네비게이션)
- ✅ 반응형 레이아웃

## 🔗 API 연동 (향후 구현)

현재는 Mock 데이터를 사용하며, 향후 백엔드 API 연동이 필요합니다:

```typescript
// TODO: 실제 API 연동
const response = await fetch('/api/simulator/international-divorce', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(input),
});
```

### 필요한 API 엔드포인트
- `POST /api/simulator/international-divorce`: 시뮬레이션 실행
- 입력: `InternationalDivorceInput`
- 출력: `SimulationResult`

## 📊 SEO 최적화

### Metadata (layout.tsx)
- **Title**: "국제이혼 시뮬레이터 - 준거법, 관할, 비용 예측"
- **Description**: 외국인 배우자 이혼 준비 가이드
- **Keywords**: 국제이혼, 외국인 배우자 이혼, 국제사법, 준거법, 헤이그 협약
- **Canonical URL**: `/simulator/international-divorce`

### JSON-LD 구조화 데이터
```json
{
  "@type": "WebApplication",
  "applicationCategory": "LegalService",
  "provider": {
    "@type": "LegalService",
    "serviceType": "국제이혼 법률 정보 제공"
  }
}
```

## 🖨️ 인쇄 최적화

결과 페이지는 인쇄 친화적으로 디자인되었습니다:
- 버튼 숨김
- 배경 제거
- 페이지 브레이크 최적화
- 링크 URL 표시

### 인쇄 버튼
```tsx
<Button onClick={() => window.print()}>결과 출력</Button>
```

## 🌍 지원 국가 (v1.0)

| 국가 | 코드 | 국기 |
|------|------|------|
| 대한민국 | KR | 🇰🇷 |
| 미국 | US | 🇺🇸 |
| 일본 | JP | 🇯🇵 |
| 중국 | CN | 🇨🇳 |
| 캐나다 | CA | 🇨🇦 |
| 호주 | AU | 🇦🇺 |
| 영국 | GB | 🇬🇧 |
| 독일 | DE | 🇩🇪 |
| 프랑스 | FR | 🇫🇷 |
| 싱가포르 | SG | 🇸🇬 |

## 🚀 배포

### 빌드
```bash
npm run build
```

### 로컬 개발
```bash
npm run dev
# http://localhost:3000/simulator/international-divorce
```

## ⚠️ 법률 고지

본 시뮬레이터는 일반적인 정보 제공을 목적으로 하며, 개별 사안에 대한 법률 자문이 아닙니다. 실제 이혼 절차 진행 전 반드시 국제이혼 전문 변호사와 상담하시기 바랍니다.

## 📝 변경 이력

### v1.0.0 (2026-02-05)
- ✅ 초기 버전 출시
- ✅ 10개국 지원
- ✅ 기본 시뮬레이션 로직
- ✅ SEO 최적화
- ✅ 인쇄 기능
- ✅ 테스트 커버리지 80%+

### 향후 계획
- [ ] 실제 API 연동
- [ ] 추가 국가 지원 (30개국+)
- [ ] 다국어 지원 (영어, 일본어, 중국어)
- [ ] 재산 분할 상세 시뮬레이션
- [ ] 양육권 관련 시뮬레이션

## 🤝 기여

버그 리포트, 기능 요청은 이슈로 등록해주세요.

## 📄 라이선스

Copyright © 2026 이혼준비. All rights reserved.
