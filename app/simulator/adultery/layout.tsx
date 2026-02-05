/**
 * 상간녀 손해배상 청구 시뮬레이터 - 레이아웃
 * Adultery Lawsuit Simulator - Layout
 *
 * @TASK Adultery Simulator Layout with Metadata
 * @SPEC SEO Optimization
 */

import type { ReactNode } from 'react';
import { metadata as adulteryMetadata } from './metadata';

export const metadata = adulteryMetadata;

interface AdulterySimulatorLayoutProps {
  children: ReactNode;
}

export default function AdulterySimulatorLayout({ children }: AdulterySimulatorLayoutProps) {
  return <>{children}</>;
}
