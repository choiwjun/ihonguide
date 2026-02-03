# AEO (Answer Engine Optimization) 작업 완료 보고

## 개요

AI 답변 엔진(ChatGPT, Google AI 개요, Perplexity, Bing Copilot 등)이 이혼준비 사이트 콘텐츠를 **이해·신뢰·인용**하기 쉽도록 AEO 작업을 적용했습니다.

---

## 완료 항목

### 1. 전략 및 데이터

| 항목 | 파일 | 설명 |
|------|------|------|
| AEO 전략 문서 | `docs/AEO-STRATEGY.md` | 원칙, 체크리스트, 타겟 질문 |
| AEO 데이터 | `lib/aeo-data.ts` | 요약문, FAQ 8개, 용어 정의 7개, HowTo 절차 5단계 |

### 2. 구조적 데이터 (JSON-LD)

| 스키마 | 용도 |
|--------|------|
| **FAQPage** | 자주 묻는 질문 8개 (전역) |
| **HowTo** | 이혼 준비 절차 5단계 |
| **DefinedTerm** | 용어 정의 7개 (이혼, 협의이혼, 재판이혼, 양육비, 양육권, 재산분할, 위자료) |

- 적용 위치: `app/layout.tsx` (모든 페이지에 주입)

### 3. UI 컴포넌트

| 컴포넌트 | 파일 | 용도 |
|----------|------|------|
| AnswerBlock | `components/seo/AnswerBlock.tsx` | 질문(H2)+답변 블록 |
| DefinitionCard | `components/seo/DefinitionCard.tsx` | 용어 정의 카드 |
| HowToSteps | `components/seo/HowToSteps.tsx` | 절차 단계 표시 |
| AeoSummarySection | `components/landing/AeoSummarySection.tsx` | 메인 "이혼 준비란?" 요약 |

### 4. 페이지 적용

| 페이지 | 적용 내용 |
|--------|-----------|
| **메인 (/)** | AeoSummarySection – "이혼 준비란?" 50단어 내외 요약 2개 + 가이드 링크 |
| **가이드 (/guide)** | 이혼 준비 절차(HowToSteps), 자주 묻는 질문(AnswerBlock 8개), 용어 정의(DefinitionCard 7개) |

---

## 데이터 요약

### SHORT_SUMMARIES (50단어 내외)

- `divorcePreparation` – 이혼 준비 절차·기간
- `agreedDivorce` – 협의이혼 정의
- `childSupport` – 양육비 계산
- `propertyDivision` – 재산분할
- `divorceConsultation` – 무료 상담

### FAQ (8개)

1. 이혼 준비는 얼마나 걸리나요?
2. 양육비는 어떻게 계산하나요?
3. 재산분할은 어떻게 하나요?
4. 이혼 상담은 무료인가요?
5. 이혼 유형 진단은 어떻게 하나요?
6. 협의이혼과 재판이혼의 차이는?
7. 양육권은 어떻게 정해지나요?
8. 이혼 준비 시 필요한 서류는?

### 용어 정의 (7개)

이혼, 협의이혼, 재판이혼, 양육비, 양육권, 재산분할, 위자료

### HowTo (5단계)

1. 이혼 유형 파악  
2. 재산·자녀 사항 정리  
3. 서류 준비  
4. 전문가 상담  
5. 이혼 신고 또는 소송  

---

## 측정 제안

- **Google 리치 결과 테스트**: FAQ, HowTo 스키마 검증  
- **검색 콘솔**: AI 개요·피처드 스니펫 노출 여부  
- **브랜드 검색**: "이혼준비" / "ihonjunbi" 검색 시 AI 답변 인용 빈도  

---

## 참고

- 전략 상세: `docs/AEO-STRATEGY.md`
- 데이터 수정: `lib/aeo-data.ts`
- 스키마 추가: `components/seo/JsonLd.tsx`
