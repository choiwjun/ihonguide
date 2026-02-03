# AEO (Answer Engine Optimization) 전략

## AEO란?

**Answer Engine Optimization**은 ChatGPT, Google AI 개요, Perplexity, Bing Copilot 등 **AI 답변 엔진**이 우리 콘텐츠를 이해·신뢰하고, 사용자 질문에 대해 **인용·요약**할 수 있도록 최적화하는 작업입니다.

- **SEO**: 검색 결과에서 노출·클릭 유도  
- **AEO**: AI 답변에서 인용·출처로 노출 (제로클릭 환경 대응)

---

## 핵심 원칙

### 1. Answer-Ready 콘텐츠
- **50단어 이내 요약**을 문단 맨 앞에 배치 (스니펫용)
- **질문을 H2/H3 제목**으로 사용 (예: "이혼 준비는 얼마나 걸리나요?")
- **한 질문당 한 답변** 구조

### 2. 구조화 (Schema.org)
- `FAQPage`: 자주 묻는 질문·답변
- `HowTo`: 절차·단계 설명
- `Definition`: 용어 정의 (이혼, 협의이혼, 양육비 등)
- `QAPage`: 질문-답변 페이지 (필요 시)

### 3. E-E-A-T 시그널
- **Experience**: 실제 사례·경험 언급
- **Expertise**: 전문가 감수·출처 명시
- **Authoritativeness**: 정확한 법·기준 인용
- **Trustworthiness**: 연락처, 약관, 개인정보처리방침

### 4. 인용하기 쉬운 형식
- 짧은 문장, 불릿·번호 목록, 표 활용
- "~이다", "~한다" 형태의 **단정적 문장**
- 출처 URL 명시 (같은 사이트 내 링크)

---

## 구현 체크리스트

- [x] FAQ JSON-LD (확장)
- [x] HowTo JSON-LD (이혼 준비 절차 등)
- [x] 정의(Definition) 데이터 및 스키마
- [x] 50단어 이내 요약 블록
- [x] 질문형 H2/H3 콘텐츠 구조
- [x] AEO 전용 데이터 파일 (`lib/aeo-data.ts`)
- [x] AnswerBlock / DefinitionCard 컴포넌트
- [ ] 블로그 글에 Answer 요약 블록 적용
- [ ] 실적 측정 (AI 인용 모니터링)

---

## 타겟 질문 예시 (이혼 도메인)

| 질문 | 타겟 페이지 | 형식 |
|------|-------------|------|
| 이혼 준비는 얼마나 걸리나요? | /guide, FAQ | FAQ |
| 양육비는 어떻게 계산하나요? | /calculator, FAQ | FAQ + HowTo |
| 협의이혼이란? | /guide, 정의 | Definition |
| 이혼 절차가 어떻게 되나요? | /guide | HowTo |
| 재산분할은 어떻게 하나요? | /guide, FAQ | FAQ |
| 이혼 상담은 무료인가요? | /consultation, FAQ | FAQ |

---

## 측정 방안

- Google Search Console: AI 개요 노출 여부
- 브랜드/URL 검색: AI 답변에서 "이혼준비" 인용 빈도
- FAQ/HowTo 스키마 검증: Google 리치 결과 테스트
