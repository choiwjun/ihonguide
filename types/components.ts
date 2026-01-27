/**
 * UI 컴포넌트 타입 정의
 * 참조: docs/05-DesignSystem.md
 */

import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

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

/**
 * Input 컴포넌트 Props
 * 참조: docs/05-DesignSystem.md 섹션 5.2
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 라벨 텍스트 */
  label?: string;
  /** 힌트 텍스트 */
  hint?: string;
  /** 에러 메시지 */
  error?: string;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
}

/**
 * Card 컴포넌트 Props
 * 참조: docs/05-DesignSystem.md 섹션 5.3
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 카드 내용 */
  children: ReactNode;
  /** 인터랙티브 모드 (호버 효과) */
  interactive?: boolean;
  /** 패딩 크기 */
  padding?: 'sm' | 'md' | 'lg';
}

/**
 * Card 패딩 크기별 스타일 설정
 */
export const CARD_PADDINGS = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
} as const;

export type CardPadding = keyof typeof CARD_PADDINGS;
