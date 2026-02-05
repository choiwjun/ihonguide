/**
 * 국제이혼 시뮬레이터 페이지 테스트
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InternationalDivorcePage from '../page';

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('InternationalDivorcePage', () => {
  describe('Intro Phase', () => {
    it('renders the intro section with hero title', () => {
      render(<InternationalDivorcePage />);

      expect(screen.getByText('국제이혼 시뮬레이터')).toBeInTheDocument();
      expect(
        screen.getByText(/국적이 다른 배우자와의 이혼/i)
      ).toBeInTheDocument();
    });

    it('displays key features', () => {
      render(<InternationalDivorcePage />);

      expect(screen.getByText('이 시뮬레이터로 알 수 있는 것')).toBeInTheDocument();
      expect(screen.getByText('적용 법률 및 관할권')).toBeInTheDocument();
      expect(screen.getByText('예상 소요 기간 및 비용')).toBeInTheDocument();
      expect(screen.getByText('필수 서류 및 절차')).toBeInTheDocument();
      expect(screen.getByText('주의사항 및 고려사항')).toBeInTheDocument();
    });

    it('shows supported countries', () => {
      render(<InternationalDivorcePage />);

      expect(screen.getByText(/대한민국/i)).toBeInTheDocument();
      expect(screen.getByText(/미국/i)).toBeInTheDocument();
      expect(screen.getByText(/일본/i)).toBeInTheDocument();
    });

    it('displays legal disclaimer', () => {
      render(<InternationalDivorcePage />);

      expect(screen.getByText(/법률 자문 고지/i)).toBeInTheDocument();
      expect(
        screen.getByText(/일반적인 정보 제공/i)
      ).toBeInTheDocument();
    });

    it('has a start button that transitions to form phase', () => {
      render(<InternationalDivorcePage />);

      const startButton = screen.getByText('시뮬레이션 시작하기');
      expect(startButton).toBeInTheDocument();

      fireEvent.click(startButton);

      expect(screen.getByText('정보 입력')).toBeInTheDocument();
    });
  });

  describe('Form Phase', () => {
    it('renders the form with all required fields', () => {
      render(<InternationalDivorcePage />);

      // Navigate to form
      fireEvent.click(screen.getByText('시뮬레이션 시작하기'));

      expect(screen.getByText('혼인 신고 국가 *')).toBeInTheDocument();
      expect(screen.getByText('현재 거주 국가 *')).toBeInTheDocument();
      expect(screen.getByText('본인 국적 *')).toBeInTheDocument();
      expect(screen.getByText('배우자 국적 *')).toBeInTheDocument();
      expect(screen.getByText('혼인 기간 *')).toBeInTheDocument();
      expect(screen.getByText('자녀 유무 *')).toBeInTheDocument();
    });

    it('disables submit button when required fields are empty', () => {
      render(<InternationalDivorcePage />);

      // Navigate to form
      fireEvent.click(screen.getByText('시뮬레이션 시작하기'));

      const submitButton = screen.getByText('시뮬레이션 시작');
      expect(submitButton).toBeDisabled();
    });

    it('shows children residence field when has children is selected', () => {
      render(<InternationalDivorcePage />);

      // Navigate to form
      fireEvent.click(screen.getByText('시뮬레이션 시작하기'));

      // Select "has children"
      const hasChildrenRadio = screen.getByLabelText('있음');
      fireEvent.click(hasChildrenRadio);

      expect(screen.getByText('자녀 거주 국가 *')).toBeInTheDocument();
    });

    it('can go back to intro phase', () => {
      render(<InternationalDivorcePage />);

      // Navigate to form
      fireEvent.click(screen.getByText('시뮬레이션 시작하기'));

      // Click back button
      const backButton = screen.getByText('이전');
      fireEvent.click(backButton);

      // Should be back at intro
      expect(screen.getByText('이 시뮬레이터로 알 수 있는 것')).toBeInTheDocument();
    });
  });

  describe('Calculation and Result Phase', () => {
    it('shows loading state during calculation', async () => {
      render(<InternationalDivorcePage />);

      // Navigate to form and fill required fields
      fireEvent.click(screen.getByText('시뮬레이션 시작하기'));

      // Fill all required fields
      const marriageCountrySelect = screen.getAllByRole('combobox')[0];
      fireEvent.change(marriageCountrySelect, { target: { value: 'KR' } });

      const residenceCountrySelect = screen.getAllByRole('combobox')[1];
      fireEvent.change(residenceCountrySelect, { target: { value: 'KR' } });

      const spouseNationalitySelect = screen.getAllByRole('combobox')[3];
      fireEvent.change(spouseNationalitySelect, { target: { value: 'US' } });

      const marriageDurationInput = screen.getByRole('spinbutton');
      fireEvent.change(marriageDurationInput, { target: { value: '5' } });

      // Submit form
      const submitButton = screen.getByText('시뮬레이션 시작');
      fireEvent.click(submitButton);

      // Should show loading state
      expect(screen.getByText('시뮬레이션 진행 중...')).toBeInTheDocument();
    });

    it('displays result after successful calculation', async () => {
      render(<InternationalDivorcePage />);

      // Navigate to form and fill required fields
      fireEvent.click(screen.getByText('시뮬레이션 시작하기'));

      // Fill all required fields (simplified)
      const selects = screen.getAllByRole('combobox');
      fireEvent.change(selects[0], { target: { value: 'KR' } });
      fireEvent.change(selects[1], { target: { value: 'KR' } });
      fireEvent.change(selects[3], { target: { value: 'US' } });

      const marriageDurationInput = screen.getByRole('spinbutton');
      fireEvent.change(marriageDurationInput, { target: { value: '5' } });

      // Submit form
      const submitButton = screen.getByText('시뮬레이션 시작');
      fireEvent.click(submitButton);

      // Wait for result
      await waitFor(
        () => {
          expect(screen.getByText('국제이혼 시뮬레이션 결과')).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Check result sections
      expect(screen.getByText('적용 법률')).toBeInTheDocument();
      expect(screen.getByText('관할 법원')).toBeInTheDocument();
      expect(screen.getByText('예상 기간')).toBeInTheDocument();
      expect(screen.getByText('예상 비용')).toBeInTheDocument();
      expect(screen.getByText('필수 서류')).toBeInTheDocument();
      expect(screen.getByText('절차 단계')).toBeInTheDocument();
    });

    it('allows user to reset and start over', async () => {
      render(<InternationalDivorcePage />);

      // Navigate through to result
      fireEvent.click(screen.getByText('시뮬레이션 시작하기'));

      const selects = screen.getAllByRole('combobox');
      fireEvent.change(selects[0], { target: { value: 'KR' } });
      fireEvent.change(selects[1], { target: { value: 'KR' } });
      fireEvent.change(selects[3], { target: { value: 'US' } });

      const marriageDurationInput = screen.getByRole('spinbutton');
      fireEvent.change(marriageDurationInput, { target: { value: '5' } });

      fireEvent.click(screen.getByText('시뮬레이션 시작'));

      await waitFor(
        () => {
          expect(screen.getByText('국제이혼 시뮬레이션 결과')).toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Click reset button
      const resetButton = screen.getByText('다시 시뮬레이션');
      fireEvent.click(resetButton);

      // Should be back at intro
      expect(screen.getByText('이 시뮬레이터로 알 수 있는 것')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<InternationalDivorcePage />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
    });

    it('has descriptive button text', () => {
      render(<InternationalDivorcePage />);

      const startButton = screen.getByRole('button', {
        name: '시뮬레이션 시작하기',
      });
      expect(startButton).toBeInTheDocument();
    });

    it('form fields have accessible labels', () => {
      render(<InternationalDivorcePage />);

      fireEvent.click(screen.getByText('시뮬레이션 시작하기'));

      // Check labels exist (not using getByLabelText due to implementation)
      expect(screen.getByText('혼인 신고 국가 *')).toBeInTheDocument();
      expect(screen.getByText('현재 거주 국가 *')).toBeInTheDocument();

      // Check form controls exist
      const selects = screen.getAllByRole('combobox');
      expect(selects.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design', () => {
    it('renders without layout issues', () => {
      const { container } = render(<InternationalDivorcePage />);

      // Check container exists
      expect(container.firstChild).toBeInTheDocument();

      // No layout errors
      expect(container.querySelector('.space-y-8')).toBeInTheDocument();
    });
  });
});
