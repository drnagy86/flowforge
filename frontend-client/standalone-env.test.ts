import { describe, it, expect } from 'vitest';

describe('DOM environment', () => {
  it('should expose document', () => {
    expect(typeof document).toBe('object');
  });
});
