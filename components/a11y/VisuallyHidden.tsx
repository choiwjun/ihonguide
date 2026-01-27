/**
 * VisuallyHidden 컴포넌트
 * 스크린 리더에서만 읽히는 텍스트를 제공
 */

interface VisuallyHiddenProps {
  children: React.ReactNode;
  as?: 'span' | 'div';
}

export function VisuallyHidden({ children, as: Component = 'span' }: VisuallyHiddenProps) {
  return <Component className="sr-only">{children}</Component>;
}
