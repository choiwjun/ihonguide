/**
 * API 입력 검증 유틸리티 테스트
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { validateRequest, sanitizeInput, maskSensitiveData } from './validate';

describe('validateRequest', () => {
  const testSchema = z.object({
    name: z.string().min(1),
    age: z.number().positive(),
  });

  it('should validate correct data', async () => {
    const request = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ name: 'John', age: 25 }),
    });

    const result = await validateRequest(request, testSchema);

    expect(result.success).toBe(true);
    expect(result.data).toEqual({ name: 'John', age: 25 });
  });

  it('should return error for invalid data', async () => {
    const request = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ name: '', age: -5 }),
    });

    const result = await validateRequest(request, testSchema);

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('should return error for invalid JSON', async () => {
    const request = new Request('http://localhost', {
      method: 'POST',
      body: 'invalid json',
    });

    const result = await validateRequest(request, testSchema);

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('should return error for missing fields', async () => {
    const request = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ name: 'John' }),
    });

    const result = await validateRequest(request, testSchema);

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});

describe('sanitizeInput', () => {
  it('should remove HTML tags', () => {
    const input = '<script>alert("xss")</script>Hello';
    const result = sanitizeInput(input);
    expect(result).toBe('alert("xss")Hello');
  });

  it('should remove javascript: protocol', () => {
    const input = 'javascript:alert(1)';
    const result = sanitizeInput(input);
    expect(result).toBe('alert(1)');
  });

  it('should remove event handlers', () => {
    const input = 'onclick=alert(1) Hello';
    const result = sanitizeInput(input);
    expect(result).toBe('Hello'); // trim() removes leading space
  });

  it('should trim whitespace', () => {
    const input = '  Hello World  ';
    const result = sanitizeInput(input);
    expect(result).toBe('Hello World');
  });

  it('should handle normal text', () => {
    const input = 'Normal text without any issues';
    const result = sanitizeInput(input);
    expect(result).toBe('Normal text without any issues');
  });
});

describe('maskSensitiveData', () => {
  it('should mask phone numbers', () => {
    const data = { name: 'John', phone: '010-1234-5678' };
    const result = maskSensitiveData(data);
    expect(result.name).toBe('John');
    expect(result.phone).toBe('01***');
  });

  it('should mask email addresses', () => {
    const data = { userEmail: 'test@example.com' };
    const result = maskSensitiveData(data);
    expect(result.userEmail).toBe('te***');
  });

  it('should mask passwords', () => {
    const data = { password: 'secret123' };
    const result = maskSensitiveData(data);
    expect(result.password).toBe('se***');
  });

  it('should not mask non-sensitive fields', () => {
    const data = { name: 'John', age: 25 };
    const result = maskSensitiveData(data);
    expect(result.name).toBe('John');
    expect(result.age).toBe(25);
  });

  it('should handle empty strings', () => {
    const data = { phone: '' };
    const result = maskSensitiveData(data);
    expect(result.phone).toBe('');
  });
});
