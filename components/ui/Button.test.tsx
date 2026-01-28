import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  describe('primary variant', () => {
    it('should render with primary variant by default', () => {
      render(<Button>Click me</Button>);

      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toBeInTheDocument();
    });

    it('should have primary styles', () => {
      render(<Button variant="primary">Primary</Button>);

      const button = screen.getByRole('button', { name: 'Primary' });
      expect(button).toHaveClass('text-white');
    });
  });

  describe('secondary variant', () => {
    it('should have secondary styles', () => {
      render(<Button variant="secondary">Secondary</Button>);

      const button = screen.getByRole('button', { name: 'Secondary' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('ghost variant', () => {
    it('should have transparent background', () => {
      render(<Button variant="ghost">Ghost</Button>);

      const button = screen.getByRole('button', { name: 'Ghost' });
      expect(button).toHaveClass('bg-transparent');
    });
  });

  describe('sizes', () => {
    it('should render medium size by default', () => {
      render(<Button>Medium</Button>);

      const button = screen.getByRole('button', { name: 'Medium' });
      expect(button).toHaveClass('h-11');
    });

    it('should render small size', () => {
      render(<Button size="sm">Small</Button>);

      const button = screen.getByRole('button', { name: 'Small' });
      expect(button).toHaveClass('h-9');
    });

    it('should render large size', () => {
      render(<Button size="lg">Large</Button>);

      const button = screen.getByRole('button', { name: 'Large' });
      expect(button).toHaveClass('h-12');
    });
  });

  describe('disabled state', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole('button', { name: 'Disabled' });
      expect(button).toBeDisabled();
    });
  });

  describe('loading state', () => {
    it('should be disabled when loading', () => {
      render(<Button isLoading>Loading</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should show spinner svg when loading', () => {
      render(<Button isLoading>Loading</Button>);

      const button = screen.getByRole('button');
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('animate-spin');
    });
  });

  describe('fullWidth', () => {
    it('should have full width class when fullWidth is true', () => {
      render(<Button fullWidth>Full Width</Button>);

      const button = screen.getByRole('button', { name: 'Full Width' });
      expect(button).toHaveClass('w-full');
    });
  });

  describe('base styles', () => {
    it('should have rounded corners', () => {
      render(<Button>Test</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-lg');
    });

    it('should have font-bold', () => {
      render(<Button>Test</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('font-bold');
    });
  });
});
