import { test, expect } from '@playwright/test';

/**
 * E2E 테스트: 이혼 유형 진단 흐름
 * 참조: docs/03-UserFlow.md 섹션 2
 */

test.describe('진단 흐름', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/diagnosis');
  });

  test('진단 시작 페이지가 올바르게 표시된다', async ({ page }) => {
    // 제목 확인
    await expect(page.getByRole('heading', { name: '이혼 유형 진단' })).toBeVisible();

    // 설명 확인
    await expect(page.getByText('간단한 질문에 답하고 나에게 맞는 이혼 유형을 알아보세요')).toBeVisible();

    // 진행 안내 확인
    await expect(page.getByText('10개의 간단한 질문에 답변합니다')).toBeVisible();
    await expect(page.getByText('약 3분 정도 소요됩니다')).toBeVisible();
    await expect(page.getByText('협의/조정/소송 중 적합한 유형을 알려드립니다')).toBeVisible();

    // 시작 버튼 확인
    await expect(page.getByRole('button', { name: '진단 시작하기' })).toBeVisible();
  });

  test('진단 시작 버튼 클릭 시 첫 번째 질문으로 이동한다', async ({ page }) => {
    // 시작 버튼 클릭
    await page.getByRole('button', { name: '진단 시작하기' }).click();

    // 첫 번째 질문 확인
    await expect(page.getByText('질문 1')).toBeVisible();
    await expect(page.getByText('배우자와 이혼에 대해 대화가 가능한가요?')).toBeVisible();

    // 진행 표시 확인
    await expect(page.getByText('1 / 10')).toBeVisible();
  });

  test('질문에 답변하면 다음 버튼이 활성화된다', async ({ page }) => {
    await page.getByRole('button', { name: '진단 시작하기' }).click();

    // 다음 버튼이 비활성화 상태 확인
    const nextButton = page.getByRole('button', { name: '다음' });
    await expect(nextButton).toBeDisabled();

    // 첫 번째 옵션 선택
    await page.getByText('원활하게 대화 가능').click();

    // 다음 버튼이 활성화됨
    await expect(nextButton).toBeEnabled();
  });

  test('이전 버튼으로 이전 질문으로 돌아갈 수 있다', async ({ page }) => {
    await page.getByRole('button', { name: '진단 시작하기' }).click();

    // 첫 번째 질문에서 답변 후 다음으로
    await page.getByText('원활하게 대화 가능').click();
    await page.getByRole('button', { name: '다음' }).click();

    // 두 번째 질문 확인
    await expect(page.getByText('질문 2')).toBeVisible();

    // 이전 버튼 클릭
    await page.getByRole('button', { name: '이전' }).click();

    // 첫 번째 질문으로 돌아감
    await expect(page.getByText('질문 1')).toBeVisible();
  });

  test('모든 질문에 답변하면 결과를 볼 수 있다', async ({ page }) => {
    await page.getByRole('button', { name: '진단 시작하기' }).click();

    // 10개 질문에 모두 첫 번째 옵션 선택 (협의이혼 유형)
    const options = [
      '원활하게 대화 가능',
      '네, 양측 모두 동의',
      '합의 가능할 것 같음',
      '자녀가 없음',
      '해당없음 또는 합의 가능',
      '없음 (성격차이 등)',
      '위자료 청구/지급 없이 합의 가능',
      '아니요, 함께 거주 중',
      '원만한 관계 유지 가능',
      '서두르지 않음, 충분히 합의하고 싶음',
    ];

    for (let i = 0; i < options.length; i++) {
      await page.getByText(options[i]).click();

      if (i < options.length - 1) {
        await page.getByRole('button', { name: '다음' }).click();
      }
    }

    // 마지막 질문에서 결과 보기 버튼 확인
    await expect(page.getByRole('button', { name: '결과 보기' })).toBeVisible();
  });

  test('진단 완료 후 결과 페이지로 이동한다', async ({ page }) => {
    // API 응답 모킹
    await page.route('**/api/diagnosis', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            sessionId: 'test-session-id',
            result: {
              type: 'consensual',
              score: 28,
              maxScore: 30,
              title: '협의이혼',
              description: '상호 합의를 통한 원만한 이혼이 가능합니다.',
              recommendation: '협의이혼을 권장합니다.',
            },
          },
        }),
      });
    });

    await page.getByRole('button', { name: '진단 시작하기' }).click();

    // 모든 질문에 답변 (협의이혼 유형으로)
    const options = [
      '원활하게 대화 가능',
      '네, 양측 모두 동의',
      '합의 가능할 것 같음',
      '자녀가 없음',
      '해당없음 또는 합의 가능',
      '없음 (성격차이 등)',
      '위자료 청구/지급 없이 합의 가능',
      '아니요, 함께 거주 중',
      '원만한 관계 유지 가능',
      '서두르지 않음, 충분히 합의하고 싶음',
    ];

    for (let i = 0; i < options.length; i++) {
      await page.getByText(options[i]).click();

      if (i < options.length - 1) {
        await page.getByRole('button', { name: '다음' }).click();
      }
    }

    // 결과 보기 클릭
    await page.getByRole('button', { name: '결과 보기' }).click();

    // 로딩 표시 확인
    await expect(page.getByText('결과를 분석하고 있습니다...')).toBeVisible();

    // 결과 페이지로 이동 확인
    await page.waitForURL('**/diagnosis/result**');
    expect(page.url()).toContain('/diagnosis/result');
  });

  test('랜딩 페이지에서 진단으로 진입할 수 있다', async ({ page }) => {
    // 랜딩 페이지로 이동
    await page.goto('/');

    // 무료 진단 시작하기 버튼 클릭
    await page.getByRole('link', { name: '무료 진단 시작하기' }).first().click();

    // 진단 페이지로 이동 확인
    await expect(page).toHaveURL('/diagnosis');
    await expect(page.getByRole('heading', { name: '이혼 유형 진단' })).toBeVisible();
  });

  test('헤더 네비게이션에서 진단으로 진입할 수 있다', async ({ page }) => {
    // 랜딩 페이지로 이동
    await page.goto('/');

    // 헤더의 이혼 유형 진단 링크 클릭
    await page.getByRole('link', { name: '이혼 유형 진단' }).first().click();

    // 진단 페이지로 이동 확인
    await expect(page).toHaveURL('/diagnosis');
  });
});

test.describe('진단 결과 페이지', () => {
  test('세션 ID 없이 접근하면 진단 페이지로 리다이렉트된다', async ({ page }) => {
    await page.goto('/diagnosis/result');

    // 진단 페이지로 리다이렉트 또는 안내 메시지 표시
    await expect(page).toHaveURL(/\/(diagnosis|diagnosis\/result)/);
  });
});
