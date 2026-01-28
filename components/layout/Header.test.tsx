import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
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

      const logoLink = screen.getAllByRole('link').find(link => link.getAttribute('href') === '/');
      expect(logoLink).toBeInTheDocument();
    });

    it('should render brand name', () => {
      render(<Header />);

      expect(screen.getByText('이혼준비')).toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    it('should render navigation links', () => {
      render(<Header />);

      expect(screen.getAllByRole('link', { name: '이혼 유형 진단' }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('link', { name: '양육비 계산기' }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('link', { name: '상담 신청' }).length).toBeGreaterThan(0);
    });

    it('should have correct href for nav items', () => {
      render(<Header />);

      const diagnosisLinks = screen.getAllByRole('link', { name: '이혼 유형 진단' });
      expect(diagnosisLinks[0]).toHaveAttribute('href', '/diagnosis');

      const calculatorLinks = screen.getAllByRole('link', { name: '양육비 계산기' });
      expect(calculatorLinks[0]).toHaveAttribute('href', '/calculator');

      const consultationLinks = screen.getAllByRole('link', { name: '상담 신청' });
      expect(consultationLinks[0]).toHaveAttribute('href', '/consultation');
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
      expect(header).toHaveClass('backdrop-blur-md');
    });
  });
});
