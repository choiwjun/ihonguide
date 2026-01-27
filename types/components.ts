/**
 * UI 컴포넌트 타입 정의
 * 참조: docs/05-DesignSystem.md
 */

import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Button 컴포넌트 Props
 * 참조: docs/05-DesignSystem.md 섹션 5.1
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 변형 스타일 */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** 버튼 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 버튼 내용 */
  children: ReactNode;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 로딩 상태 */
  isLoading?: boolean;
}

/**
 * Button 크기별 스타일 설정
 */
export const BUTTON_SIZES = {
  sm: {
    height: 'h-8',
    padding: 'px-3',
    fontSize: 'text-sm',
  },
  md: {
    height: 'h-10',
    padding: 'px-4',
    fontSize: 'text-base',
  },
  lg: {
    height: 'h-12',
    padding: 'px-6',
    fontSize: 'text-lg',
  },
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZES;
export type ButtonVariant = ButtonProps['variant'];
