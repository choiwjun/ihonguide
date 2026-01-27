import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  describe('basic rendering', () => {
    it('should render text input', () => {
      render(<Input type="text" placeholder="Enter text" />);

      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should have border style', () => {
      render(<Input placeholder="Test" />);

      const input = screen.getByPlaceholderText('Test');
      expect(input).toHaveClass('border');
      expect(input).toHaveClass('border-border');
    });

    it('should have rounded corners', () => {
      render(<Input placeholder="Test" />);

      const input = screen.getByPlaceholderText('Test');
      expect(input).toHaveClass('rounded-lg');
    });
  });

  describe('with label', () => {
    it('should render label when provided', () => {
      render(<Input label="Email" placeholder="Enter email" />);

      const label = screen.getByText('Email');
      expect(label).toBeInTheDocument();
    });

    it('should associate label with input', () => {
      render(<Input label="Email" placeholder="Enter email" />);

      const input = screen.getByLabelText('Email');
      expect(input).toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('should show error message', () => {
      render(<Input error="This field is required" placeholder="Test" />);

      const errorMessage = screen.getByText('This field is required');
      expect(errorMessage).toBeInTheDocument();
    });

    it('should have error border color', () => {
      render(<Input error="Error" placeholder="Test" />);

      const input = screen.getByPlaceholderText('Test');
      expect(input).toHaveClass('border-error');
    });
  });

  describe('hint text', () => {
    it('should show hint text', () => {
      render(<Input hint="Enter your email address" placeholder="Test" />);

      const hint = screen.getByText('Enter your email address');
      expect(hint).toBeInTheDocument();
    });
  });

  describe('disabled state', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled placeholder="Disabled" />);

      const input = screen.getByPlaceholderText('Disabled');
      expect(input).toBeDisabled();
    });
  });

  describe('fullWidth', () => {
    it('should have full width when fullWidth is true', () => {
      render(<Input fullWidth placeholder="Full width" />);

      const wrapper = screen.getByPlaceholderText('Full width').closest('div');
      expect(wrapper).toHaveClass('w-full');
    });
  });
});
