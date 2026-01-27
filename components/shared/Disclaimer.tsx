import { cn } from '@/lib/utils/cn';

interface DisclaimerProps {
  /** 추가 className */
  className?: string;
}

/**
 * Disclaimer (면책 고지) 컴포넌트
 * 법적 고지를 표시합니다
 */
export function Disclaimer({ className }: DisclaimerProps) {
  return (
    <div
      className={cn(
        'bg-surface/50 border border-border rounded-lg p-4',
        'text-xs text-text-muted',
        className
      )}
    >
      <p className="font-medium text-text-secondary mb-1">면책 고지</p>
      <p>
        본 서비스에서 제공하는 정보는 일반적인 안내 목적으로만 제공되며,
        법률 자문을 대체할 수 없습니다. 개별 사안에 대한 정확한 법률 상담은
        반드시 변호사 또는 전문가와 상담하시기 바랍니다.
      </p>
    </div>
  );
}
