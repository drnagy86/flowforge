// frontend-client/src/pages/__tests__/loginPage.test.tsx

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../loginPage';
import * as authService from '../../features/auth/authService';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../features/auth/authService', () => ({
  signIn: vi.fn(),
  signUp: vi.fn(),
}));

const renderPage = () =>
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it('renders sign-in inputs and sign-in button by default', () => {
    renderPage();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('submits login and redirects if accessToken is returned', async () => {
    const mockSignIn = authService.signIn as ReturnType<typeof vi.fn>;
    mockSignIn.mockResolvedValue({ AccessToken: 'fake-token' });

    const locationSpy = vi.spyOn(window, 'location', 'get');
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { href: '', assign: vi.fn() },
    });

    renderPage();
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'Password123!');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'Password123!');
    expect(window.location.href).toBe('/home');

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: locationSpy,
    });
  });

  it('logs error if sign-in response does not contain AccessToken', async () => {
    const mockSignIn = authService.signIn as ReturnType<typeof vi.fn>;
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockSignIn.mockResolvedValue({}); // missing AccessToken

    renderPage();
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'Password123!');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(consoleSpy).toHaveBeenCalledWith(
      'SignIn session or AccessToken is undefined.'
    );
    consoleSpy.mockRestore();
  });

  it('alerts if login fails', async () => {
    const mockSignIn = authService.signIn as ReturnType<typeof vi.fn>;
    mockSignIn.mockRejectedValue(new Error('Failed'));
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    renderPage();
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrong');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('Sign in failed'));
  });

  it('toggles to sign-up form and shows confirm password', async () => {
    renderPage();
    await userEvent.click(screen.getByRole('button', { name: /need an account/i }));
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('alerts if passwords do not match in sign-up mode', async () => {
    renderPage();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    await userEvent.click(screen.getByRole('button', { name: /need an account/i }));

    await userEvent.type(screen.getByLabelText(/email/i), 'new@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'pass1');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'pass2');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(alertSpy).toHaveBeenCalledWith('Passwords do not match');
  });

  it('calls signUp and navigates to /confirm on success', async () => {
    const mockSignUp = authService.signUp as ReturnType<typeof vi.fn>;
    mockSignUp.mockResolvedValue({});

    renderPage();
    await userEvent.click(screen.getByRole('button', { name: /need an account/i }));

    await userEvent.type(screen.getByLabelText(/email/i), 'new@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'MyPass123!');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'MyPass123!');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(mockSignUp).toHaveBeenCalledWith('new@example.com', 'MyPass123!');
  });
});
