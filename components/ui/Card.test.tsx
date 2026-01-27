import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  describe('basic rendering', () => {
    it('should render children', () => {
      render(<Card>Card content</Card>);

      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('should have white background', () => {
      render(<Card>Content</Card>);

      const card = screen.getByText('Content').closest('div');
      expect(card).toHaveClass('bg-white');
    });

    it('should have border', () => {
      render(<Card>Content</Card>);

      const card = screen.getByText('Content').closest('div');
      expect(card).toHaveClass('border');
      expect(card).toHaveClass('border-border');
    });

    it('should have rounded corners (rounded-xl)', () => {
      render(<Card>Content</Card>);

      const card = screen.getByText('Content').closest('div');
      expect(card).toHaveClass('rounded-xl');
    });

    it('should have shadow', () => {
      render(<Card>Content</Card>);

      const card = screen.getByText('Content').closest('div');
      expect(card).toHaveClass('shadow-sm');
    });
  });

  describe('padding sizes', () => {
    it('should have medium padding by default (p-6)', () => {
      render(<Card>Content</Card>);

      const card = screen.getByText('Content').closest('div');
      expect(card).toHaveClass('p-6');
    });

    it('should have small padding when padding="sm"', () => {
      render(<Card padding="sm">Content</Card>);

      const card = screen.getByText('Content').closest('div');
      expect(card).toHaveClass('p-4');
    });

    it('should have large padding when padding="lg"', () => {
      render(<Card padding="lg">Content</Card>);

      const card = screen.getByText('Content').closest('div');
      expect(card).toHaveClass('p-8');
    });
  });

  describe('interactive mode', () => {
    it('should have hover styles when interactive', () => {
      render(<Card interactive>Interactive Card</Card>);

      const card = screen.getByText('Interactive Card').closest('div');
      expect(card).toHaveClass('cursor-pointer');
      expect(card).toHaveClass('transition-all');
    });

    it('should not have cursor-pointer when not interactive', () => {
      render(<Card>Non-interactive Card</Card>);

      const card = screen.getByText('Non-interactive Card').closest('div');
      expect(card).not.toHaveClass('cursor-pointer');
    });
  });

  describe('custom className', () => {
    it('should merge custom className', () => {
      render(<Card className="custom-class">Content</Card>);

      const card = screen.getByText('Content').closest('div');
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveClass('bg-white');
    });
  });
});
