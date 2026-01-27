'use client';

import { useEffect, useId, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils/cn';
import type { ModalProps } from '@/types';

/**
 * Modal 컴포넌트
 * 참조: docs/05-DesignSystem.md 섹션 5.4
 */
export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const titleId = useId();

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

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
