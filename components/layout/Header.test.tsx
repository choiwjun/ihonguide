import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock useAuth hook
const mockSignOut = vi.fn();
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    isLoading: false,
    signOut: mockSignOut,
  }),
}));

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('should render header element', () => {
      render(<Header />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('should render logo with link to home', () => {
      render(<Header />);

      const logo = screen.getByRole('link', { name: '이혼준비' });
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('href', '/');
    });
  });

  describe('navigation', () => {
    it('should render navigation links', () => {
      render(<Header />);

      expect(screen.getByRole('link', { name: '홈' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '이혼 유형 진단' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '양육비 계산기' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '가이드' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '상담 신청' })).toBeInTheDocument();
    });

    it('should have correct href for nav items', () => {
      render(<Header />);

      expect(screen.getByRole('link', { name: '이혼 유형 진단' })).toHaveAttribute('href', '/diagnosis');
      expect(screen.getByRole('link', { name: '양육비 계산기' })).toHaveAttribute('href', '/calculator');
    });
  });

  describe('auth buttons', () => {
    it('should show login link when not authenticated', () => {
      render(<Header />);

      const loginLinks = screen.getAllByRole('link', { name: '로그인' });
      expect(loginLinks.length).toBeGreaterThan(0);
    });
  });

  describe('mobile menu', () => {
    it('should render mobile menu button', () => {
      render(<Header />);

      expect(screen.getByRole('button', { name: '메뉴 열기' })).toBeInTheDocument();
    });

    it('should toggle mobile menu on button click', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: '메뉴 열기' });
      fireEvent.click(menuButton);

      expect(screen.getByRole('button', { name: '메뉴 닫기' })).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should be sticky at top', () => {
      render(<Header />);

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('sticky');
      expect(header).toHaveClass('top-0');
    });

    it('should have border at bottom', () => {
      render(<Header />);

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('border-b');
    });

    it('should have white background with blur', () => {
      render(<Header />);

      const header = screen.getByRole('banner');
      expect(header).toHaveClass('backdrop-blur-sm');
    });
  });
});
