# 배포 가이드

이혼준비(ihonguide.com) Vercel 배포 가이드

---

## 1. Vercel 프로젝트 생성

### 1.1 Vercel 계정 연결

1. [Vercel](https://vercel.com)에 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 연결 (ihonguide)
4. Import 클릭

### 1.2 프로젝트 설정

- **Framework Preset**: Next.js (자동 감지)
- **Root Directory**: `./` (기본값)
- **Build Command**: `npm run build` (기본값)
- **Output Directory**: `.next` (기본값)
- **Install Command**: `npm install` (기본값)

---

## 2. 환경 변수 설정

Vercel 프로젝트 설정 > Environment Variables에서 다음 환경 변수를 추가합니다.

### 2.1 필수 환경 변수

| 변수명 | 설명 | 환경 |
|--------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 익명 키 | All |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 서비스 역할 키 | All |
| `NEXT_PUBLIC_APP_URL` | 앱 URL (https://ihonguide.com) | Production |
| `NEXT_PUBLIC_APP_URL` | 앱 URL (https://staging.ihonguide.com) | Preview |

### 2.2 OAuth 환경 변수

| 변수명 | 설명 | 환경 |
|--------|------|------|
| `KAKAO_CLIENT_ID` | 카카오 앱 REST API 키 | All |
| `KAKAO_CLIENT_SECRET` | 카카오 앱 시크릿 키 | All |
| `NAVER_CLIENT_ID` | 네이버 앱 Client ID | All |
| `NAVER_CLIENT_SECRET` | 네이버 앱 Client Secret | All |

### 2.3 Analytics 환경 변수

| 변수명 | 설명 | 환경 |
|--------|------|------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 측정 ID | Production |

### 2.4 환경별 설정

- **Production**: 실제 서비스용 키 사용
- **Preview**: 테스트용 키 사용 (별도 Supabase 프로젝트 권장)
- **Development**: 로컬 개발용 (`.env.local` 사용)

---

## 3. 커스텀 도메인 설정

### 3.1 도메인 추가

1. Vercel 프로젝트 > Settings > Domains
2. "Add Domain" 클릭
3. `ihonguide.com` 입력
4. "Add" 클릭

### 3.2 DNS 설정

도메인 등록 기관(가비아, 카페24 등)에서 다음 DNS 레코드를 추가합니다.

#### A 레코드 (루트 도메인)
```
Type: A
Name: @
Value: 76.76.21.21
```

#### CNAME 레코드 (www 서브도메인)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3.3 SSL 인증서

- Vercel이 자동으로 Let's Encrypt SSL 인증서를 발급합니다.
- 도메인 확인 후 수분 내 HTTPS 활성화

---

## 4. 자동 배포 설정

### 4.1 Git 연동

Vercel은 GitHub와 연동되면 자동으로 다음과 같이 배포됩니다:

| 브랜치 | 배포 유형 | URL |
|--------|----------|-----|
| `main` | Production | ihonguide.com |
| 기타 브랜치 | Preview | *.vercel.app |
| PR | Preview | *.vercel.app |

### 4.2 배포 설정 변경

Project Settings > Git에서 설정 가능:

- **Production Branch**: `main` (기본값)
- **Ignored Build Step**: 특정 조건에서 빌드 스킵
- **Root Directory**: 모노레포 사용 시 변경

### 4.3 배포 보호

Project Settings > Deployment Protection에서:

- **Vercel Authentication**: Preview 배포 접근 제한
- **Password Protection**: 비밀번호로 Preview 보호

---

## 5. Supabase 설정

### 5.1 OAuth 리다이렉트 URL 설정

Supabase Dashboard > Authentication > URL Configuration에서:

- **Site URL**: `https://ihonguide.com`
- **Redirect URLs**:
  - `https://ihonguide.com/auth/callback`
  - `https://*.vercel.app/auth/callback` (Preview용)

### 5.2 카카오 OAuth 설정

1. [Kakao Developers](https://developers.kakao.com) 접속
2. 앱 설정 > 플랫폼 > Web 플랫폼 등록
3. 사이트 도메인: `https://ihonguide.com`
4. Redirect URI: `https://[SUPABASE_PROJECT_REF].supabase.co/auth/v1/callback`

### 5.3 네이버 OAuth 설정

1. [Naver Developers](https://developers.naver.com) 접속
2. 애플리케이션 등록 > API 설정
3. 서비스 URL: `https://ihonguide.com`
4. Callback URL: `https://[SUPABASE_PROJECT_REF].supabase.co/auth/v1/callback`

---

## 6. 배포 체크리스트

### 배포 전 확인사항

- [ ] 모든 테스트 통과 (`npm run test:run`)
- [ ] 빌드 성공 (`npm run build`)
- [ ] 린트 통과 (`npm run lint`)
- [ ] 환경 변수 모두 설정
- [ ] Supabase OAuth 리다이렉트 URL 설정
- [ ] 카카오/네이버 OAuth 리다이렉트 URL 설정

### 배포 후 확인사항

- [ ] 메인 페이지 로딩
- [ ] 진단 기능 작동
- [ ] 계산기 기능 작동
- [ ] 상담 신청 작동
- [ ] 소셜 로그인 작동
- [ ] SSL 인증서 활성화
- [ ] Google Analytics 데이터 수집

---

## 7. 롤백

### Vercel 대시보드에서 롤백

1. Deployments 탭 이동
2. 이전 배포 선택
3. "..." 메뉴 > "Promote to Production" 클릭

### Git을 통한 롤백

```bash
git revert HEAD
git push origin main
```

---

## 8. 모니터링

### Vercel Analytics

- Project Settings > Analytics에서 활성화
- Web Vitals, 페이지뷰, 방문자 등 확인

### Vercel Logs

- Project > Logs에서 실시간 로그 확인
- 함수 로그, 빌드 로그 등 확인 가능

### 알림 설정

- Project Settings > Notifications
- Slack, Email 등으로 배포 알림 수신

---

## 참고 자료

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
