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
  });

  describe('links', () => {
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

    it('should render contact link', () => {
      render(<Footer />);

      const link = screen.getByRole('link', { name: '문의하기' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/contact');
    });
  });

  describe('contact info', () => {
    it('should render contact email', () => {
      render(<Footer />);

      expect(screen.getByText(/support@ihonguide.com/)).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should have surface background', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('bg-surface');
    });

    it('should have top border', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('border-t');
    });
  });
});
