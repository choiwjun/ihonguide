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

    it('should have primary background color class', () => {
      render(<Button variant="primary">Primary</Button>);

      const button = screen.getByRole('button', { name: 'Primary' });
      expect(button).toHaveClass('bg-primary');
    });

    it('should have white text color', () => {
      render(<Button variant="primary">Primary</Button>);

      const button = screen.getByRole('button', { name: 'Primary' });
      expect(button).toHaveClass('text-white');
    });

    it('should have hover state class', () => {
      render(<Button variant="primary">Primary</Button>);

      const button = screen.getByRole('button', { name: 'Primary' });
      expect(button).toHaveClass('hover:bg-primary-dark');
    });
  });

  describe('secondary variant', () => {
    it('should have surface background color', () => {
      render(<Button variant="secondary">Secondary</Button>);

      const button = screen.getByRole('button', { name: 'Secondary' });
      expect(button).toHaveClass('bg-surface');
    });

    it('should have border', () => {
      render(<Button variant="secondary">Secondary</Button>);

      const button = screen.getByRole('button', { name: 'Secondary' });
      expect(button).toHaveClass('border');
      expect(button).toHaveClass('border-border');
    });

    it('should have text color', () => {
      render(<Button variant="secondary">Secondary</Button>);

      const button = screen.getByRole('button', { name: 'Secondary' });
      expect(button).toHaveClass('text-text');
    });
  });

  describe('ghost variant', () => {
    it('should have transparent background', () => {
      render(<Button variant="ghost">Ghost</Button>);

      const button = screen.getByRole('button', { name: 'Ghost' });
      expect(button).toHaveClass('bg-transparent');
    });

    it('should have primary text color', () => {
      render(<Button variant="ghost">Ghost</Button>);

      const button = screen.getByRole('button', { name: 'Ghost' });
      expect(button).toHaveClass('text-primary');
    });
  });

  describe('sizes', () => {
    it('should render medium size by default', () => {
      render(<Button>Medium</Button>);

      const button = screen.getByRole('button', { name: 'Medium' });
      expect(button).toHaveClass('h-10');
    });

    it('should render small size', () => {
      render(<Button size="sm">Small</Button>);

      const button = screen.getByRole('button', { name: 'Small' });
      expect(button).toHaveClass('h-8');
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
});
