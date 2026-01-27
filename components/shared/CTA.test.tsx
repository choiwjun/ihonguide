import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CTA } from './CTA';

describe('CTA', () => {
  const defaultProps = {
    title: 'Test Title',
    buttonText: 'Click Me',
    href: '/test',
  };

  describe('rendering', () => {
    it('should render title', () => {
      render(<CTA {...defaultProps} />);

      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should render description when provided', () => {
      render(<CTA {...defaultProps} description="Test description" />);

      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('should not render description when not provided', () => {
      render(<CTA {...defaultProps} />);

      expect(screen.queryByText('Test description')).not.toBeInTheDocument();
    });

    it('should render button with correct text', () => {
      render(<CTA {...defaultProps} />);

      expect(screen.getByRole('link', { name: 'Click Me' })).toBeInTheDocument();
    });

    it('should render button with correct href', () => {
      render(<CTA {...defaultProps} />);

      expect(screen.getByRole('link', { name: 'Click Me' })).toHaveAttribute('href', '/test');
    });
  });

  describe('variants', () => {
    it('should have default variant styling (bg-surface)', () => {
      render(<CTA {...defaultProps} data-testid="cta" />);

      // The CTA wrapper div has the bg-surface class
      const wrapper = screen.getByText('Test Title').closest('div');
      expect(wrapper).toHaveClass('bg-surface');
    });

    it('should have primary variant styling', () => {
      render(<CTA {...defaultProps} variant="primary" />);

      const wrapper = screen.getByText('Test Title').closest('div');
      expect(wrapper).toHaveClass('bg-primary/10');
    });
  });

  describe('styling', () => {
    it('should have rounded corners', () => {
      render(<CTA {...defaultProps} />);

      const wrapper = screen.getByText('Test Title').closest('div');
      expect(wrapper).toHaveClass('rounded-xl');
    });

    it('should be centered', () => {
      render(<CTA {...defaultProps} />);

      const wrapper = screen.getByText('Test Title').closest('div');
      expect(wrapper).toHaveClass('text-center');
    });
  });
});
