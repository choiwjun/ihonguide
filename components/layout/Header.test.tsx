import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
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
