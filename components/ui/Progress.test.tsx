import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar, ProgressSteps } from './Progress';

describe('ProgressBar', () => {
  describe('rendering', () => {
    it('should render progress bar', () => {
      render(<ProgressBar value={50} />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should have correct aria attributes', () => {
      render(<ProgressBar value={50} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    });
  });

  describe('styling', () => {
    it('should have surface background', () => {
      render(<ProgressBar value={50} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveClass('bg-surface');
    });

    it('should have rounded corners', () => {
      render(<ProgressBar value={50} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveClass('rounded');
    });

    it('should have fixed height', () => {
      render(<ProgressBar value={50} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveClass('h-2');
    });
  });

  describe('fill width', () => {
    it('should show 0% when value is 0', () => {
      render(<ProgressBar value={0} />);

      const fill = screen.getByRole('progressbar').firstChild as HTMLElement;
      expect(fill).toHaveStyle({ width: '0%' });
    });

    it('should show 50% when value is 50', () => {
      render(<ProgressBar value={50} />);

      const fill = screen.getByRole('progressbar').firstChild as HTMLElement;
      expect(fill).toHaveStyle({ width: '50%' });
    });

    it('should show 100% when value is 100', () => {
      render(<ProgressBar value={100} />);

      const fill = screen.getByRole('progressbar').firstChild as HTMLElement;
      expect(fill).toHaveStyle({ width: '100%' });
    });

    it('should clamp value to 0 when negative', () => {
      render(<ProgressBar value={-10} />);

      const fill = screen.getByRole('progressbar').firstChild as HTMLElement;
      expect(fill).toHaveStyle({ width: '0%' });
    });

    it('should clamp value to 100 when over 100', () => {
      render(<ProgressBar value={150} />);

      const fill = screen.getByRole('progressbar').firstChild as HTMLElement;
      expect(fill).toHaveStyle({ width: '100%' });
    });
  });

  describe('fill styling', () => {
    it('should have primary background for fill', () => {
      render(<ProgressBar value={50} />);

      const fill = screen.getByRole('progressbar').firstChild as HTMLElement;
      expect(fill).toHaveClass('bg-primary');
    });

    it('should have transition for fill', () => {
      render(<ProgressBar value={50} />);

      const fill = screen.getByRole('progressbar').firstChild as HTMLElement;
      expect(fill).toHaveClass('transition-all');
    });
  });
});

describe('ProgressSteps', () => {
  describe('rendering', () => {
    it('should render correct number of steps', () => {
      render(<ProgressSteps current={2} total={5} />);

      const steps = screen.getAllByRole('listitem');
      expect(steps).toHaveLength(5);
    });

    it('should display step numbers', () => {
      render(<ProgressSteps current={2} total={3} />);

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  describe('step states', () => {
    it('should mark completed steps with primary-light background', () => {
      render(<ProgressSteps current={3} total={5} />);

      const steps = screen.getAllByRole('listitem');
      expect(steps[0]).toHaveClass('bg-primary-light');
      expect(steps[1]).toHaveClass('bg-primary-light');
    });

    it('should mark current step with primary background', () => {
      render(<ProgressSteps current={3} total={5} />);

      const steps = screen.getAllByRole('listitem');
      expect(steps[2]).toHaveClass('bg-primary');
    });

    it('should mark pending steps with surface background', () => {
      render(<ProgressSteps current={2} total={5} />);

      const steps = screen.getAllByRole('listitem');
      expect(steps[2]).toHaveClass('bg-surface');
      expect(steps[3]).toHaveClass('bg-surface');
      expect(steps[4]).toHaveClass('bg-surface');
    });
  });

  describe('styling', () => {
    it('should have circular steps', () => {
      render(<ProgressSteps current={1} total={3} />);

      const steps = screen.getAllByRole('listitem');
      steps.forEach((step) => {
        expect(step).toHaveClass('rounded-full');
      });
    });

    it('should have fixed size for steps', () => {
      render(<ProgressSteps current={1} total={3} />);

      const steps = screen.getAllByRole('listitem');
      steps.forEach((step) => {
        expect(step).toHaveClass('w-8');
        expect(step).toHaveClass('h-8');
      });
    });
  });
});
