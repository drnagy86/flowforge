// src/tests/env-check.test.ts
import { describe, it, expect } from 'vitest';

describe('Environment', () => {
  it('should have access to document', () => {
    expect(document).toBeDefined();
  });
});
