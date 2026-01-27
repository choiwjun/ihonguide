import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Providers } from './providers';

describe('Providers', () => {
  it('should render children correctly', () => {
    render(
      <Providers>
        <div data-testid="child">Test Child</div>
      </Providers>
    );

    expect(screen.getByTestId('child')).toBeDefined();
    expect(screen.getByText('Test Child')).toBeDefined();
  });

  it('should render multiple children', () => {
    render(
      <Providers>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
      </Providers>
    );

    expect(screen.getByTestId('child1')).toBeDefined();
    expect(screen.getByTestId('child2')).toBeDefined();
  });
});
