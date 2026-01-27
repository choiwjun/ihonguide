import { describe, it, expect } from 'vitest';

describe('Test Setup', () => {
  it('should run a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should have vitest globals working', () => {
    expect(true).toBeTruthy();
  });
});
