// src/pages/__tests__/landingPage.test.tsx

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import LandingPage from '../landingPage';
import { BrowserRouter } from 'react-router-dom';

const renderPage = () => {
  render(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  );
};

describe('LandingPage', () => {
  beforeEach(() => {
    // Clear any mocks or side effects here if needed
  });

  it('renders the hero section headline', () => {
    renderPage();
    expect(
      screen.getByRole('heading', { name: /build real\. ship smart\./i })
    ).toBeInTheDocument();
  });

  it('renders the feature cards section', () => {
    renderPage();

    const featureCardHeadings = screen.getAllByRole('heading', { level: 3 });

    expect(featureCardHeadings.some((h) => h.textContent?.toLowerCase().includes('auth'))).toBe(true);
    expect(featureCardHeadings.some((h) => h.textContent?.toLowerCase().includes('serverless'))).toBe(true);
    expect(featureCardHeadings.some((h) => h.textContent?.toLowerCase().includes('ai support'))).toBe(true);
  });

  it('renders the architecture diagram section', () => {
    renderPage();

    expect(
      screen.getByText((text) =>
        text.includes('React + TypeScript') &&
        text.includes('API Gateway') &&
        text.includes('DynamoDB')
      )
    ).toBeInTheDocument();
  });

  it('renders the user workflow section', () => {
    renderPage();

    expect(screen.getByText(/sales/i)).toBeInTheDocument();
    expect(screen.getByText(/partner form/i)).toBeInTheDocument();
    expect(screen.getByText(/approval/i)).toBeInTheDocument();
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
