/**
 * InternationalDivorceForm Component Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InternationalDivorceForm } from './InternationalDivorceForm';

describe('InternationalDivorceForm', () => {
  const mockOnSubmit = vi.fn();

  it('renders the form with all sections', () => {
    render(<InternationalDivorceForm onSubmit={mockOnSubmit} isSubmitting={false} />);

    // Check main heading
    expect(screen.getByText('국제이혼 시뮬레이터')).toBeInTheDocument();

    // Check all sections are present (use getAllByText for duplicated text)
    const petitionerSections = screen.getAllByText(/청구인 정보/);
    expect(petitionerSections.length).toBeGreaterThan(0);

    const respondentSections = screen.getAllByText(/피청구인 정보/);
    expect(respondentSections.length).toBeGreaterThan(0);

    expect(screen.getByText('혼인 정보')).toBeInTheDocument();
    expect(screen.getByText('자녀 정보')).toBeInTheDocument();
    expect(screen.getByText('재산 정보')).toBeInTheDocument();
    expect(screen.getByText('협조 상황')).toBeInTheDocument();
    expect(screen.getByText(/선호하는 관할 국가/)).toBeInTheDocument();
  });

  it('shows children fields when checkbox is checked', () => {
    render(<InternationalDivorceForm onSubmit={mockOnSubmit} isSubmitting={false} />);

    const childrenCheckbox = screen.getByLabelText('자녀가 있습니까?');
    expect(childrenCheckbox).not.toBeChecked();

    // Click the checkbox
    fireEvent.click(childrenCheckbox);

    // Children fields should now be visible
    expect(screen.getByText('자녀 연령')).toBeInTheDocument();
    expect(screen.getByText('자녀 현재 거주 국가')).toBeInTheDocument();
    expect(screen.getByText('양육권')).toBeInTheDocument();
  });

  it('allows adding and removing assets', () => {
    render(<InternationalDivorceForm onSubmit={mockOnSubmit} isSubmitting={false} />);

    // Initially no assets
    expect(screen.queryByText('재산 1')).not.toBeInTheDocument();

    // Add an asset
    const addAssetButton = screen.getByText('+ 재산 추가');
    fireEvent.click(addAssetButton);

    // Asset should appear
    expect(screen.getByText('재산 1')).toBeInTheDocument();

    // Add another asset
    fireEvent.click(addAssetButton);
    expect(screen.getByText('재산 2')).toBeInTheDocument();

    // Remove first asset (index 0)
    const removeButtons = screen.getAllByText('제거');
    fireEvent.click(removeButtons[0]);

    // After removing first asset, only "재산 2" should remain (but it will become "재산 1")
    // Because we're removing by index, the second asset moves to first position
    expect(screen.queryByText('재산 1')).toBeInTheDocument();
    expect(screen.queryByText('재산 2')).not.toBeInTheDocument();
  });

  it('allows adding and removing child ages', () => {
    render(<InternationalDivorceForm onSubmit={mockOnSubmit} isSubmitting={false} />);

    // Enable children section
    const childrenCheckbox = screen.getByLabelText('자녀가 있습니까?');
    fireEvent.click(childrenCheckbox);

    // Add child age
    const addChildButton = screen.getByText('+ 자녀 추가');
    fireEvent.click(addChildButton);

    // Age input should appear
    const ageInputs = screen.getAllByPlaceholderText('나이');
    expect(ageInputs.length).toBe(1);

    // Add another child
    fireEvent.click(addChildButton);
    const updatedAgeInputs = screen.getAllByPlaceholderText('나이');
    expect(updatedAgeInputs.length).toBe(2);

    // Remove first child
    const removeButtons = screen.getAllByText('제거');
    fireEvent.click(removeButtons[0]);

    // Only one age input should remain
    const finalAgeInputs = screen.getAllByPlaceholderText('나이');
    expect(finalAgeInputs.length).toBe(1);
  });

  it('has submit and reset buttons', () => {
    render(<InternationalDivorceForm onSubmit={mockOnSubmit} isSubmitting={false} />);

    expect(screen.getByText('분석 시작')).toBeInTheDocument();
    expect(screen.getByText('초기화')).toBeInTheDocument();
  });

  it('shows loading state when submitting', () => {
    render(<InternationalDivorceForm onSubmit={mockOnSubmit} isSubmitting={true} />);

    expect(screen.getByText('분석 중...')).toBeInTheDocument();
  });

  it('disables buttons when submitting', () => {
    render(<InternationalDivorceForm onSubmit={mockOnSubmit} isSubmitting={true} />);

    const submitButton = screen.getByText('분석 중...');
    const resetButton = screen.getByText('초기화');

    expect(submitButton).toBeDisabled();
    expect(resetButton).toBeDisabled();
  });

  it('renders all country options in selects', () => {
    render(<InternationalDivorceForm onSubmit={mockOnSubmit} isSubmitting={false} />);

    const petitionerNationalitySelect = screen.getByLabelText('국적', { selector: '#petitioner-nationality' });
    const options = petitionerNationalitySelect.querySelectorAll('option');

    // Should have 13 countries (KR, US, JP, CN, GB, CA, AU, FR, DE, VN, PH, TH, OTHER)
    expect(options.length).toBe(13);
  });

  it('renders all marriage type options', () => {
    render(<InternationalDivorceForm onSubmit={mockOnSubmit} isSubmitting={false} />);

    expect(screen.getByText('민사혼')).toBeInTheDocument();
    expect(screen.getByText('종교혼')).toBeInTheDocument();
    expect(screen.getByText('둘 다')).toBeInTheDocument();
    expect(screen.getByText('사실혼')).toBeInTheDocument();
  });

  it('renders all cooperation level options', () => {
    render(<InternationalDivorceForm onSubmit={mockOnSubmit} isSubmitting={false} />);

    expect(screen.getByText('협조적')).toBeInTheDocument();
    expect(screen.getByText('중립적')).toBeInTheDocument();
    expect(screen.getByText('비협조적')).toBeInTheDocument();
    expect(screen.getByText('적대적')).toBeInTheDocument();
  });

  it('resets form when reset button is clicked', () => {
    render(<InternationalDivorceForm onSubmit={mockOnSubmit} isSubmitting={false} />);

    // Change marriage duration
    const durationInput = screen.getByLabelText('혼인 기간 (년)') as HTMLInputElement;
    fireEvent.change(durationInput, { target: { value: '5' } });

    // Enable children
    const childrenCheckbox = screen.getByLabelText('자녀가 있습니까?');
    fireEvent.click(childrenCheckbox);

    // Click reset
    const resetButton = screen.getByText('초기화');
    fireEvent.click(resetButton);

    // Form should be reset
    expect(durationInput).toHaveValue(null);
    expect(childrenCheckbox).not.toBeChecked();
  });
});
