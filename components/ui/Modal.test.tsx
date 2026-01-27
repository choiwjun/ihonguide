import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render children when open', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('should not render when closed', () => {
      render(<Modal {...defaultProps} isOpen={false} />);

      expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
    });

    it('should render title when provided', () => {
      render(<Modal {...defaultProps} title="Test Title" />);

      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });
  });

  describe('overlay', () => {
    it('should have semi-transparent overlay background', () => {
      render(<Modal {...defaultProps} />);

      const overlay = screen.getByRole('dialog').parentElement;
      expect(overlay).toHaveClass('bg-black/40');
    });

    it('should have backdrop blur', () => {
      render(<Modal {...defaultProps} />);

      const overlay = screen.getByRole('dialog').parentElement;
      expect(overlay).toHaveClass('backdrop-blur-sm');
    });
  });

  describe('container styles', () => {
    it('should have white background', () => {
      render(<Modal {...defaultProps} />);

      const container = screen.getByRole('dialog');
      expect(container).toHaveClass('bg-white');
    });

    it('should have rounded corners', () => {
      render(<Modal {...defaultProps} />);

      const container = screen.getByRole('dialog');
      expect(container).toHaveClass('rounded-2xl');
    });

    it('should have shadow', () => {
      render(<Modal {...defaultProps} />);

      const container = screen.getByRole('dialog');
      expect(container).toHaveClass('shadow-xl');
    });
  });

  describe('close behavior', () => {
    it('should call onClose when overlay is clicked', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      const overlay = screen.getByRole('dialog').parentElement;
      fireEvent.click(overlay!);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose when modal content is clicked', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      const content = screen.getByText('Modal content');
      fireEvent.click(content);

      expect(onClose).not.toHaveBeenCalled();
    });

    it('should call onClose when Escape key is pressed', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('should have role="dialog"', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should have aria-modal="true"', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('should have aria-labelledby when title is provided', () => {
      render(<Modal {...defaultProps} title="My Title" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby');
    });
  });
});
