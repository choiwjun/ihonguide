# Design System (기초 디자인 시스템)

## 이혼준비 (ihonguide.com) - Design System

**디자인 콘셉트:** "차분한 동반자" (Calm Companion)

> 힘든 상황에서 옆에 앉아 조용히 함께 정리해주는 친구 같은 느낌

---

## 1. 디자인 원칙

| 원칙 | 설명 | 적용 |
|------|------|------|
| **차분함 (Calm)** | 불안한 사용자에게 안정감 제공 | 부드러운 색상, 여백, 느린 전환 |
| **신뢰감 (Trust)** | 정보의 신뢰성 전달 | 정돈된 레이아웃, 명확한 타이포 |
| **따뜻함 (Warmth)** | 공감과 위로 전달 | 따뜻한 색온도, 부드러운 모서리 |
| **명확함 (Clarity)** | 복잡한 정보의 쉬운 전달 | 계층적 구조, 충분한 여백 |

---

## 2. 색상 팔레트 (Color Palette)

### 2.1 Primary Colors

| 역할 | 이름 | HEX | RGB | 용도 |
|------|------|-----|-----|------|
| **Primary** | Sage Green | `#7C9A82` | 124, 154, 130 | 주요 CTA, 강조 |
| **Primary Light** | Soft Sage | `#A8C5AE` | 168, 197, 174 | 호버, 배경 |
| **Primary Dark** | Deep Sage | `#5A7A60` | 90, 122, 96 | 액티브, 텍스트 |

### 2.2 Neutral Colors

| 역할 | 이름 | HEX | RGB | 용도 |
|------|------|-----|-----|------|
| **Background** | Warm Ivory | `#FDFBF7` | 253, 251, 247 | 메인 배경 |
| **Surface** | Soft Cream | `#F7F4EF` | 247, 244, 239 | 카드, 섹션 배경 |
| **Border** | Warm Gray 200 | `#E8E4DF` | 232, 228, 223 | 구분선, 테두리 |
| **Text Primary** | Charcoal | `#2D2D2D` | 45, 45, 45 | 본문 텍스트 |
| **Text Secondary** | Warm Gray 600 | `#6B6560` | 107, 101, 96 | 보조 텍스트 |
| **Text Muted** | Warm Gray 400 | `#9C958E` | 156, 149, 142 | 비활성, 힌트 |

### 2.3 Accent & Feedback Colors

| 역할 | 이름 | HEX | RGB | 용도 |
|------|------|-----|-----|------|
| **Accent** | Soft Coral | `#E8A598` | 232, 165, 152 | 보조 강조, 알림 |
| **Success** | Calm Green | `#7CB77C` | 124, 183, 124 | 성공 상태 |
| **Warning** | Warm Amber | `#D4A574` | 212, 165, 116 | 경고 |
| **Error** | Soft Rose | `#D4847C` | 212, 132, 124 | 에러 |
| **Info** | Muted Blue | `#7C9AB0` | 124, 154, 176 | 정보 |

### 2.4 CSS Variables

```css
:root {
  /* Primary */
  --color-primary: #7C9A82;
  --color-primary-light: #A8C5AE;
  --color-primary-dark: #5A7A60;

  /* Background & Surface */
  --color-bg: #FDFBF7;
  --color-surface: #F7F4EF;
  --color-border: #E8E4DF;

  /* Text */
  --color-text: #2D2D2D;
  --color-text-secondary: #6B6560;
  --color-text-muted: #9C958E;

  /* Accent */
  --color-accent: #E8A598;

  /* Feedback */
  --color-success: #7CB77C;
  --color-warning: #D4A574;
  --color-error: #D4847C;
  --color-info: #7C9AB0;
}
```

### 2.5 Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C9A82',
          light: '#A8C5AE',
          dark: '#5A7A60',
        },
        surface: '#F7F4EF',
        border: '#E8E4DF',
        text: {
          DEFAULT: '#2D2D2D',
          secondary: '#6B6560',
          muted: '#9C958E',
        },
        accent: '#E8A598',
        success: '#7CB77C',
        warning: '#D4A574',
        error: '#D4847C',
        info: '#7C9AB0',
      },
      backgroundColor: {
        DEFAULT: '#FDFBF7',
      },
    },
  },
}
```

---

## 3. 타이포그래피 (Typography)

### 3.1 폰트 패밀리

| 용도 | 폰트 | Fallback | 특징 |
|------|------|----------|------|
| **본문** | Pretendard | -apple-system, sans-serif | 가독성, 현대적 |
| **강조 헤드라인** | Noto Serif KR | Georgia, serif | 감성적, 신뢰감 |

```css
:root {
  --font-sans: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-serif: 'Noto Serif KR', Georgia, 'Times New Roman', serif;
}
```

### 3.2 폰트 로드

```html
<!-- Pretendard -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" />

<!-- Noto Serif KR -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&display=swap" rel="stylesheet" />
```

### 3.3 타이포 스케일

| 이름 | 크기 | 행간 | 굵기 | 용도 |
|------|------|------|------|------|
| **Display** | 48px (3rem) | 1.2 | 600 | 히어로 헤드라인 |
| **H1** | 36px (2.25rem) | 1.3 | 600 | 페이지 타이틀 |
| **H2** | 28px (1.75rem) | 1.35 | 600 | 섹션 타이틀 |
| **H3** | 22px (1.375rem) | 1.4 | 500 | 서브섹션 |
| **H4** | 18px (1.125rem) | 1.45 | 500 | 카드 타이틀 |
| **Body Large** | 18px (1.125rem) | 1.7 | 400 | 강조 본문 |
| **Body** | 16px (1rem) | 1.7 | 400 | 기본 본문 |
| **Body Small** | 14px (0.875rem) | 1.6 | 400 | 보조 텍스트 |
| **Caption** | 12px (0.75rem) | 1.5 | 400 | 캡션, 라벨 |

### 3.4 타이포 CSS

```css
/* Display - 히어로 헤드라인 */
.text-display {
  font-family: var(--font-serif);
  font-size: 3rem;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.02em;
}

/* H1 - 페이지 타이틀 */
.text-h1 {
  font-family: var(--font-sans);
  font-size: 2.25rem;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: -0.01em;
}

/* Body - 기본 본문 */
.text-body {
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.7;
  font-weight: 400;
}
```

---

## 4. 간격 시스템 (Spacing)

### 4.1 Base Unit: 4px

| 토큰 | 값 | Tailwind | 용도 |
|------|-----|----------|------|
| **space-1** | 4px | `p-1` | 아이콘 내부 |
| **space-2** | 8px | `p-2` | 요소 내부 최소 |
| **space-3** | 12px | `p-3` | 버튼 패딩 |
| **space-4** | 16px | `p-4` | 카드 내부 |
| **space-5** | 20px | `p-5` | 요소 간 기본 |
| **space-6** | 24px | `p-6` | 섹션 내부 |
| **space-8** | 32px | `p-8` | 컴포넌트 간 |
| **space-10** | 40px | `p-10` | 섹션 간 |
| **space-12** | 48px | `p-12` | 대형 섹션 |
| **space-16** | 64px | `p-16` | 페이지 섹션 |
| **space-20** | 80px | `p-20` | 히어로 섹션 |

### 4.2 컨테이너 너비

| 이름 | 값 | 용도 |
|------|-----|------|
| **sm** | 640px | 콘텐츠 (블로그) |
| **md** | 768px | 폼, 진단 |
| **lg** | 1024px | 기본 페이지 |
| **xl** | 1280px | 대시보드 |

---

## 5. 컴포넌트 스타일

### 5.1 버튼 (Button)

#### 크기

| 크기 | 높이 | 패딩 | 폰트 |
|------|------|------|------|
| Small | 32px (h-8) | 12px (px-3) | 14px (text-sm) |
| Medium | 40px (h-10) | 16px (px-4) | 16px (text-base) |
| Large | 48px (h-12) | 24px (px-6) | 18px (text-lg) |

#### 스타일 변형

**Primary Button**
```css
.btn-primary {
  background-color: var(--color-primary);
  color: white;
  border-radius: 8px;
  font-weight: 500;
  transition: all 200ms ease-out;
}
.btn-primary:hover {
  background-color: var(--color-primary-dark);
}
.btn-primary:active {
  transform: scale(0.98);
}
.btn-primary:disabled {
  background-color: var(--color-text-muted);
  cursor: not-allowed;
}
```

**Secondary Button**
```css
.btn-secondary {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 8px;
}
.btn-secondary:hover {
  background-color: var(--color-border);
}
```

**Ghost Button**
```css
.btn-ghost {
  background-color: transparent;
  color: var(--color-primary);
}
.btn-ghost:hover {
  background-color: rgba(124, 154, 130, 0.1);
}
```

### 5.2 입력 필드 (Input)

```css
.input {
  height: 48px;
  padding: 0 16px;
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 16px;
  color: var(--color-text);
  transition: all 200ms ease-out;
}

.input::placeholder {
  color: var(--color-text-muted);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(124, 154, 130, 0.2);
}

.input:disabled {
  background-color: var(--color-surface);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.input-error {
  border-color: var(--color-error);
}
.input-error:focus {
  box-shadow: 0 0 0 3px rgba(212, 132, 124, 0.2);
}
```

**라벨 & 힌트**
```css
.label {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
  font-weight: 500;
}

.hint {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 4px;
}

.error-message {
  font-size: 12px;
  color: var(--color-error);
  margin-top: 4px;
}
```

### 5.3 카드 (Card)

```css
.card {
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.card-interactive {
  transition: all 200ms ease-out;
  cursor: pointer;
}
.card-interactive:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}
```

### 5.4 모달 (Modal)

```css
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
}

.modal-container {
  background-color: white;
  border-radius: 16px;
  max-width: 480px;
  width: 90%;
  max-height: 90vh;
  padding: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* 애니메이션 */
.modal-enter {
  opacity: 0;
  transform: scale(0.95);
}
.modal-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: all 200ms ease-out;
}
.modal-exit {
  opacity: 1;
  transform: scale(1);
}
.modal-exit-active {
  opacity: 0;
  transform: scale(0.95);
  transition: all 200ms ease-out;
}
```

### 5.5 진행 표시 (Progress)

```css
.progress-bar {
  height: 8px;
  background-color: var(--color-surface);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 4px;
  transition: width 300ms ease-out;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
}

.progress-step {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
}

.progress-step-pending {
  background-color: var(--color-surface);
  color: var(--color-text-muted);
}

.progress-step-active {
  background-color: var(--color-primary);
  color: white;
}

.progress-step-completed {
  background-color: var(--color-primary-light);
  color: var(--color-primary-dark);
}
```

---

## 6. 애니메이션 (Motion)

### 6.1 원칙

| 원칙 | 설명 |
|------|------|
| **부드러움** | 급격한 움직임 피함, ease-out 사용 |
| **의미 있는** | 상태 변화를 명확히 전달 |
| **절제된** | 과한 애니메이션은 불안 유발 |

### 6.2 Timing

```css
:root {
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;

  --ease-out: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}
```

### 6.3 페이지 전환

```css
/* 페이지 진입 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-enter {
  animation: fadeInUp 300ms var(--ease-out);
}

/* 스크롤 reveal */
@keyframes revealUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal {
  animation: revealUp 500ms var(--ease-out);
}
```

### 6.4 Framer Motion 예시

```jsx
// 페이지 전환
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// 스태거 효과
const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
```

---

## 7. 레이아웃 (Layout)

### 7.1 그리드

```css
.container {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 16px;
}

@media (min-width: 768px) {
  .container {
    padding: 0 24px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 32px;
  }
}

.grid {
  display: grid;
  gap: 24px;
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 768px) {
  .grid-2, .grid-3 {
    grid-template-columns: 1fr;
  }
}
```

### 7.2 섹션 간격

```css
.section {
  padding: 64px 0;
}

.section-sm {
  padding: 40px 0;
}

.section-lg {
  padding: 80px 0;
}

@media (max-width: 768px) {
  .section {
    padding: 48px 0;
  }
  .section-lg {
    padding: 64px 0;
  }
}
```

---

## 8. 접근성 체크리스트

| 항목 | 기준 | 체크 |
|------|------|------|
| **색상 대비** | WCAG AA (4.5:1 텍스트, 3:1 UI) | ☐ |
| **포커스 링** | 모든 인터랙티브 요소에 visible | ☐ |
| **키보드 탐색** | Tab 순서 논리적, 모달 focus trap | ☐ |
| **텍스트 크기** | 최소 14px, 확대 가능 | ☐ |
| **터치 타겟** | 최소 44x44px | ☐ |
| **대체 텍스트** | 모든 이미지에 alt | ☐ |
| **스크린 리더** | 의미 있는 heading 구조 | ☐ |
| **색상만으로 구분 X** | 아이콘/텍스트 병행 | ☐ |

### 포커스 스타일

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* 마우스 클릭 시 outline 숨김 */
:focus:not(:focus-visible) {
  outline: none;
}
```

---

## 9. 아이콘

### 9.1 권장 아이콘 라이브러리

- **Lucide Icons** (추천): 깔끔하고 일관된 스타일
- **Heroicons**: Tailwind와 잘 어울림

### 9.2 아이콘 크기

| 크기 | 용도 |
|------|------|
| 16px | 인라인, 버튼 내부 |
| 20px | 기본 |
| 24px | 네비게이션, 강조 |
| 32px | 피처 아이콘 |
| 48px | 빈 상태, 일러스트 |

### 9.3 아이콘 색상

- 기본: `text-secondary` (#6B6560)
- 강조: `text-primary` (#7C9A82)
- 피드백: 각 피드백 색상 사용
