/**
 * LoginModal 컴포넌트 테스트
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginModal } from './LoginModal';

describe('LoginModal', () => {
  it('should not render when isOpen is false', () => {
    const { container } = render(
      <LoginModal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </LoginModal>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render when isOpen is true', () => {
    render(
      <LoginModal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </LoginModal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should call onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    render(
      <LoginModal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </LoginModal>
    );

    // 배경 오버레이 클릭
    const backdrop = document.querySelector('.bg-black\\/50');
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    expect(onClose).toHaveBeenCalled();
  });

  it('should call onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <LoginModal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </LoginModal>
    );

    const closeButton = screen.getByLabelText('닫기');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('should have correct accessibility attributes', () => {
    render(
      <LoginModal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </LoginModal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'login-modal-title');
  });
});
