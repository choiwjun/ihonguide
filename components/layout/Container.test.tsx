import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  describe('basic rendering', () => {
    it('should render children', () => {
      render(<Container>Content</Container>);

      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('sizing', () => {
    it('should have lg size by default (max-w-5xl)', () => {
      render(<Container data-testid="container">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('max-w-5xl');
    });

    it('should apply sm size (max-w-xl)', () => {
      render(<Container size="sm" data-testid="container">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('max-w-xl');
    });

    it('should apply md size (max-w-3xl)', () => {
      render(<Container size="md" data-testid="container">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('max-w-3xl');
    });

    it('should apply xl size (max-w-6xl)', () => {
      render(<Container size="xl" data-testid="container">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('max-w-6xl');
    });
  });

  describe('styling', () => {
    it('should be centered with mx-auto', () => {
      render(<Container data-testid="container">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('mx-auto');
    });

    it('should have responsive padding', () => {
      render(<Container data-testid="container">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('px-4');
    });

    it('should have full width', () => {
      render(<Container data-testid="container">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('w-full');
    });
  });

  describe('custom className', () => {
    it('should merge custom className', () => {
      render(<Container className="custom-class" data-testid="container">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('custom-class');
      expect(container).toHaveClass('mx-auto');
    });
  });
});
