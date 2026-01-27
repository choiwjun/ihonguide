'use client';

import { useEffect, useId, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils/cn';
import type { ModalProps } from '@/types';

/**
 * Modal 컴포넌트
 * 참조: docs/05-DesignSystem.md 섹션 5.4
 * 접근성: focus trap, ESC 키 닫기, aria-modal
 */
export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // Focus trap: Tab 키로 모달 내부에서만 이동
  const handleTabKey = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Tab' || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // 열릴 때 현재 포커스 저장
      previousFocusRef.current = document.activeElement as HTMLElement;

      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleTabKey);
      document.body.style.overflow = 'hidden';

      // 모달 내 첫 번째 포커스 가능한 요소로 포커스 이동
      setTimeout(() => {
        const focusable = modalRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      }, 0);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabKey);
      document.body.style.overflow = '';

      // 닫힐 때 이전 포커스로 복원
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, handleEscape, handleTabKey]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className={cn(
        // Overlay styles
        'fixed inset-0 z-50',
        'flex items-center justify-center',
        'bg-black/40 backdrop-blur-sm',
        // Animation
        'transition-opacity duration-200 ease-out'
      )}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={cn(
          // Container styles
          'bg-white',
          'rounded-2xl',
          'shadow-xl',
          'max-w-md w-[90%]',
          'max-h-[90vh]',
          'p-8',
          'overflow-auto',
          // Animation
          'transition-all duration-200 ease-out'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2
            id={titleId}
            className="text-xl font-semibold text-text mb-4"
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );

  if (typeof window === 'undefined') {
    return null;
  }

  return createPortal(modalContent, document.body);
}
