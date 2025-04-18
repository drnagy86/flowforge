// src/pages/__tests__/homePage.test.tsx

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// 👇 Declare before mock
const navigateSpy = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateSpy,
    BrowserRouter: actual.BrowserRouter,
  };
});

import HomePage from '../homePage';

const mockToken = (value: object) =>
  btoa(JSON.stringify({ alg: 'none' })) +
  '.' +
  btoa(JSON.stringify(value)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') +
  '.signature';

const renderPage = () => render(<HomePage />);

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    sessionStorage.idToken = mockToken({ sub: '123', email: 'test@example.com' });
    sessionStorage.accessToken = mockToken({ scope: 'read:stuff' });
    sessionStorage.refreshToken = 'refresh-token';
  });

  it('renders dashboard content', () => {
    renderPage();
    expect(screen.getByText(/welcome to flowforge/i)).toBeInTheDocument();
    expect(screen.getByText(/developer dashboard/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('logs out and navigates to login', async () => {
    renderPage();
    await userEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(sessionStorage.getItem('idToken')).toBeNull();
    expect(navigateSpy).toHaveBeenCalledWith('/login');
  });
});
