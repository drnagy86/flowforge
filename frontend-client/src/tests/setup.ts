// src/tests/setup.ts
import '@testing-library/jest-dom';
import { beforeAll } from 'vitest';
import { vi } from 'vitest';
// console.log('✅ Test setup loaded');

// src/tests/setup.ts

beforeAll(() => {
    if (typeof window.IntersectionObserver === 'undefined') {
      class MockIntersectionObserver {
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
      }
      (window as any).IntersectionObserver = MockIntersectionObserver;
    }
  });
  