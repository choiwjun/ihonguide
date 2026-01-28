import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  describe('basic rendering', () => {
    it('should render footer element', () => {
      render(<Footer />);

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should render copyright text', () => {
      render(<Footer />);

      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
    });

    it('should render brand name', () => {
      render(<Footer />);

      expect(screen.getByText('이혼준비')).toBeInTheDocument();
    });
  });

  describe('service links', () => {
    it('should render diagnosis link', () => {
      render(<Footer />);

      const link = screen.getByRole('link', { name: '이혼 유형 진단' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/diagnosis');
    });

    it('should render calculator link', () => {
      render(<Footer />);

      const link = screen.getByRole('link', { name: '양육비 계산기' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/calculator');
    });

    it('should render consultation link', () => {
      render(<Footer />);

      const link = screen.getByRole('link', { name: '상담 신청' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/consultation');
    });
  });

  describe('support links', () => {
    it('should render privacy policy link', () => {
      render(<Footer />);

      const link = screen.getByRole('link', { name: '개인정보처리방침' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/privacy');
    });

    it('should render terms link', () => {
      render(<Footer />);

      const link = screen.getByRole('link', { name: '이용약관' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/terms');
    });
  });

  describe('contact info', () => {
    it('should render contact email', () => {
      render(<Footer />);

      const emailLink = screen.getByRole('link', { name: '문의하기' });
      expect(emailLink).toHaveAttribute('href', 'mailto:support@ihonguide.com');
    });
  });

  describe('styling', () => {
    it('should have dark background', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('bg-[#1c1917]');
    });
  });
});
