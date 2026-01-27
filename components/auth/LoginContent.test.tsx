/**
 * LoginContent 컴포넌트 테스트
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginContent } from './LoginContent';

// Mock auth functions
const mockSignInWithKakao = vi.fn();
const mockSignInWithNaver = vi.fn();

vi.mock('@/lib/auth', () => ({
  signInWithKakao: () => mockSignInWithKakao(),
  signInWithNaver: () => mockSignInWithNaver(),
}));

describe('LoginContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render login title', () => {
    render(<LoginContent />);
    expect(screen.getByRole('heading', { name: '로그인' })).toBeInTheDocument();
  });

  it('should render Kakao login button', () => {
    render(<LoginContent />);
    expect(screen.getByLabelText('카카오 계정으로 로그인')).toBeInTheDocument();
    expect(screen.getByText('카카오로 시작하기')).toBeInTheDocument();
  });

  it('should render Naver login button', () => {
    render(<LoginContent />);
    expect(screen.getByLabelText('네이버 계정으로 로그인')).toBeInTheDocument();
    expect(screen.getByText('네이버로 시작하기')).toBeInTheDocument();
  });

  it('should call signInWithKakao when Kakao button is clicked', async () => {
    mockSignInWithKakao.mockResolvedValue({ data: {} });

    render(<LoginContent />);

    const kakaoButton = screen.getByLabelText('카카오 계정으로 로그인');
    fireEvent.click(kakaoButton);

    await waitFor(() => {
      expect(mockSignInWithKakao).toHaveBeenCalled();
    });
  });

  it('should call signInWithNaver when Naver button is clicked', async () => {
    mockSignInWithNaver.mockResolvedValue({ data: {} });

    render(<LoginContent />);

    const naverButton = screen.getByLabelText('네이버 계정으로 로그인');
    fireEvent.click(naverButton);

    await waitFor(() => {
      expect(mockSignInWithNaver).toHaveBeenCalled();
    });
  });

  it('should show error message when login fails', async () => {
    mockSignInWithKakao.mockResolvedValue({ error: '로그인에 실패했습니다.' });

    render(<LoginContent />);

    const kakaoButton = screen.getByLabelText('카카오 계정으로 로그인');
    fireEvent.click(kakaoButton);

    await waitFor(() => {
      expect(screen.getByText('로그인에 실패했습니다.')).toBeInTheDocument();
    });
  });

  it('should render terms and privacy links', () => {
    render(<LoginContent />);
    expect(screen.getByText('이용약관')).toBeInTheDocument();
    expect(screen.getByText('개인정보처리방침')).toBeInTheDocument();
  });
});
