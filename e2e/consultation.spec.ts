import { test, expect } from '@playwright/test';

/**
 * E2E 테스트: 상담 신청 흐름
 * 참조: docs/03-UserFlow.md 섹션 4
 */

test.describe('상담 신청 흐름', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/consultation');
  });

  test('상담 신청 페이지가 올바르게 표시된다', async ({ page }) => {
    // 제목 확인
    await expect(page.getByRole('heading', { name: '상담 신청' })).toBeVisible();

    // 설명 확인
    await expect(page.getByText('전문 상담사가 빠르게 연락드리겠습니다.')).toBeVisible();

    // 입력 필드 확인
    await expect(page.getByLabel('이름')).toBeVisible();
    await expect(page.getByLabel('연락처')).toBeVisible();
    await expect(page.getByLabel(/이메일/)).toBeVisible();
    await expect(page.getByLabel('상담 유형')).toBeVisible();
    await expect(page.getByLabel('상담 내용')).toBeVisible();

    // 동의 체크박스 확인
    await expect(page.getByText('개인정보 수집 및 이용에 동의합니다.')).toBeVisible();
    await expect(page.getByText('마케팅 정보 수신에 동의합니다.')).toBeVisible();

    // 제출 버튼 확인
    await expect(page.getByRole('button', { name: '상담 신청하기' })).toBeVisible();
  });

  test('이름을 입력할 수 있다', async ({ page }) => {
    const nameInput = page.getByLabel('이름');
    await nameInput.fill('홍길동');
    await expect(nameInput).toHaveValue('홍길동');
  });

  test('연락처를 입력할 수 있다', async ({ page }) => {
    const phoneInput = page.getByLabel('연락처');
    await phoneInput.fill('010-1234-5678');
    await expect(phoneInput).toHaveValue('010-1234-5678');
  });

  test('이메일을 입력할 수 있다', async ({ page }) => {
    const emailInput = page.getByLabel(/이메일/);
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');
  });

  test('상담 유형을 선택할 수 있다', async ({ page }) => {
    const consultationTypeSelect = page.getByLabel('상담 유형');

    // 기본값 확인
    await expect(consultationTypeSelect).toHaveValue('이혼상담');

    // 다른 유형 선택
    await consultationTypeSelect.selectOption('양육비상담');
    await expect(consultationTypeSelect).toHaveValue('양육비상담');
  });

  test('상담 내용을 입력할 수 있다', async ({ page }) => {
    const messageTextarea = page.getByLabel('상담 내용');
    const testMessage = '이혼 절차에 대해 상담을 받고 싶습니다. 재산분할과 양육권에 대해 알고 싶습니다.';

    await messageTextarea.fill(testMessage);
    await expect(messageTextarea).toHaveValue(testMessage);
  });

  test('개인정보 동의를 체크할 수 있다', async ({ page }) => {
    // 개인정보 동의 체크박스 찾기
    const privacyCheckbox = page.locator('input[type="checkbox"]').first();

    // 체크하기
    await privacyCheckbox.check();
    await expect(privacyCheckbox).toBeChecked();

    // 체크 해제하기
    await privacyCheckbox.uncheck();
    await expect(privacyCheckbox).not.toBeChecked();
  });

  test('마케팅 동의를 체크할 수 있다', async ({ page }) => {
    // 마케팅 동의 체크박스 찾기 (두 번째 체크박스)
    const marketingCheckbox = page.locator('input[type="checkbox"]').nth(1);

    // 체크하기
    await marketingCheckbox.check();
    await expect(marketingCheckbox).toBeChecked();
  });

  test('필수 입력값 없이 제출하면 오류가 표시된다', async ({ page }) => {
    // 바로 제출 시도
    await page.getByRole('button', { name: '상담 신청하기' }).click();

    // 오류 메시지 확인
    await expect(page.getByText('이름을 입력해주세요.')).toBeVisible();
    await expect(page.getByText('연락처를 입력해주세요.')).toBeVisible();
    await expect(page.getByText('상담 내용을 입력해주세요.')).toBeVisible();
    await expect(page.getByText('개인정보 수집 및 이용에 동의해주세요.')).toBeVisible();
  });

  test('이름이 너무 짧으면 오류가 표시된다', async ({ page }) => {
    // 1글자 이름 입력
    await page.getByLabel('이름').fill('홍');
    await page.getByRole('button', { name: '상담 신청하기' }).click();

    // 오류 메시지 확인
    await expect(page.getByText('이름은 2자 이상 입력해주세요.')).toBeVisible();
  });

  test('연락처가 올바르지 않으면 오류가 표시된다', async ({ page }) => {
    // 잘못된 연락처 입력
    await page.getByLabel('연락처').fill('123');
    await page.getByRole('button', { name: '상담 신청하기' }).click();

    // 오류 메시지 확인
    await expect(page.getByText('올바른 연락처를 입력해주세요.')).toBeVisible();
  });

  test('이메일 형식이 잘못되면 오류가 표시된다', async ({ page }) => {
    // 잘못된 이메일 입력
    await page.getByLabel(/이메일/).fill('invalid-email');
    await page.getByRole('button', { name: '상담 신청하기' }).click();

    // 오류 메시지 확인
    await expect(page.getByText('올바른 이메일 형식이 아닙니다.')).toBeVisible();
  });

  test('상담 내용이 너무 짧으면 오류가 표시된다', async ({ page }) => {
    // 짧은 상담 내용 입력
    await page.getByLabel('상담 내용').fill('상담요청');
    await page.getByRole('button', { name: '상담 신청하기' }).click();

    // 오류 메시지 확인
    await expect(page.getByText('상담 내용은 10자 이상 입력해주세요.')).toBeVisible();
  });

  test('모든 필수 입력값을 입력하면 상담 신청이 완료된다', async ({ page }) => {
    // API 응답 모킹
    await page.route('**/api/consultation', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            id: 'test-consultation-id',
            createdAt: new Date().toISOString(),
            estimatedResponseTime: '영업일 기준 24시간 이내',
          },
        }),
      });
    });

    // 필수 입력값 입력
    await page.getByLabel('이름').fill('홍길동');
    await page.getByLabel('연락처').fill('010-1234-5678');
    await page.getByLabel('상담 내용').fill('이혼 절차에 대해 상담을 받고 싶습니다. 재산분할과 양육권에 대해 알고 싶습니다.');

    // 개인정보 동의
    await page.locator('input[type="checkbox"]').first().check();

    // 제출
    await page.getByRole('button', { name: '상담 신청하기' }).click();

    // 로딩 상태 확인
    await expect(page.getByRole('button', { name: '신청 중...' })).toBeVisible();

    // 성공 메시지 확인
    await expect(page.getByText('상담 신청이 완료되었습니다')).toBeVisible();
  });

  test('선택 입력값(이메일, 마케팅 동의)도 함께 제출할 수 있다', async ({ page }) => {
    // API 응답 모킹
    await page.route('**/api/consultation', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            id: 'test-consultation-id',
            createdAt: new Date().toISOString(),
            estimatedResponseTime: '영업일 기준 24시간 이내',
          },
        }),
      });
    });

    // 필수 입력값 입력
    await page.getByLabel('이름').fill('홍길동');
    await page.getByLabel('연락처').fill('010-1234-5678');
    await page.getByLabel(/이메일/).fill('hong@example.com');
    await page.getByLabel('상담 유형').selectOption('재산분할상담');
    await page.getByLabel('상담 내용').fill('재산분할에 대해 상담을 받고 싶습니다. 아파트와 예금 분할에 대해 알고 싶습니다.');

    // 동의 체크
    await page.locator('input[type="checkbox"]').first().check();
    await page.locator('input[type="checkbox"]').nth(1).check();

    // 제출
    await page.getByRole('button', { name: '상담 신청하기' }).click();

    // 성공 메시지 확인
    await expect(page.getByText('상담 신청이 완료되었습니다')).toBeVisible();
  });

  test('헤더 네비게이션에서 상담 신청으로 진입할 수 있다', async ({ page }) => {
    // 랜딩 페이지로 이동
    await page.goto('/');

    // 헤더의 상담 신청 링크 클릭
    await page.getByRole('link', { name: '상담 신청' }).first().click();

    // 상담 신청 페이지로 이동 확인
    await expect(page).toHaveURL('/consultation');
    await expect(page.getByRole('heading', { name: '상담 신청' })).toBeVisible();
  });
});

test.describe('상담 신청 완료 페이지', () => {
  test('완료 페이지에서 새 상담 신청을 할 수 있다', async ({ page }) => {
    // API 응답 모킹
    await page.route('**/api/consultation', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            id: 'test-consultation-id',
            createdAt: new Date().toISOString(),
            estimatedResponseTime: '영업일 기준 24시간 이내',
          },
        }),
      });
    });

    await page.goto('/consultation');

    // 상담 신청 완료
    await page.getByLabel('이름').fill('홍길동');
    await page.getByLabel('연락처').fill('010-1234-5678');
    await page.getByLabel('상담 내용').fill('이혼 절차에 대해 상담을 받고 싶습니다.');
    await page.locator('input[type="checkbox"]').first().check();
    await page.getByRole('button', { name: '상담 신청하기' }).click();

    // 성공 페이지 확인
    await expect(page.getByText('상담 신청이 완료되었습니다')).toBeVisible();

    // 새 상담 신청 버튼 클릭
    await page.getByRole('button', { name: '새 상담 신청' }).click();

    // 폼이 다시 표시됨
    await expect(page.getByRole('heading', { name: '상담 신청' })).toBeVisible();
    await expect(page.getByLabel('이름')).toBeVisible();
  });
});
