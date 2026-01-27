import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Disclaimer } from './Disclaimer';

describe('Disclaimer', () => {
  describe('rendering', () => {
    it('should render disclaimer title', () => {
      render(<Disclaimer />);

      expect(screen.getByText('면책 고지')).toBeInTheDocument();
    });

    it('should render disclaimer text', () => {
      render(<Disclaimer />);

      expect(screen.getByText(/법률 자문을 대체할 수 없습니다/)).toBeInTheDocument();
    });

    it('should mention consulting with lawyer', () => {
      render(<Disclaimer />);

      expect(screen.getByText(/변호사 또는 전문가와 상담/)).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should have surface background', () => {
      render(<Disclaimer data-testid="disclaimer" />);

      const wrapper = screen.getByText('면책 고지').closest('div');
      expect(wrapper).toHaveClass('bg-surface/50');
    });

    it('should have border', () => {
      render(<Disclaimer />);

      const wrapper = screen.getByText('면책 고지').closest('div');
      expect(wrapper).toHaveClass('border');
    });

    it('should have rounded corners', () => {
      render(<Disclaimer />);

      const wrapper = screen.getByText('면책 고지').closest('div');
      expect(wrapper).toHaveClass('rounded-lg');
    });

    it('should have small text', () => {
      render(<Disclaimer />);

      const wrapper = screen.getByText('면책 고지').closest('div');
      expect(wrapper).toHaveClass('text-xs');
    });
  });

  describe('custom className', () => {
    it('should merge custom className', () => {
      render(<Disclaimer className="custom-class" />);

      const wrapper = screen.getByText('면책 고지').closest('div');
      expect(wrapper).toHaveClass('custom-class');
    });
  });
});
