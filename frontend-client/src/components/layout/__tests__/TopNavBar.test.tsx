import { describe, it, expect, vi, beforeEach } from 'vitest';

// Needs to be defined before mocking react-router-dom
const navigateSpy = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateSpy,
    BrowserRouter: actual.BrowserRouter,
  };
});

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopNavBar from '../TopNavBar';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = () =>
  render(
    <BrowserRouter>
      <TopNavBar />
    </BrowserRouter>
  );

describe('TopNavBar', () => {
  beforeEach(() => {
    sessionStorage.clear();
    navigateSpy.mockClear();
  });

  it('renders the FlowForge brand and navigates home', async () => {
    renderWithRouter();
    const logo = screen.getByText('FlowForge');
    expect(logo).toBeInTheDocument();
    await userEvent.click(logo);
    expect(navigateSpy).toHaveBeenCalledWith('/');
  });

  it('shows Sign In button when not logged in and navigates on click', async () => {
    renderWithRouter();
    const signInBtn = screen.getByRole('button', { name: /sign in/i });
    expect(signInBtn).toBeInTheDocument();
    await userEvent.click(signInBtn);
    expect(navigateSpy).toHaveBeenCalledWith('/login');
  });

  it('shows Account menu when logged in and signs out', async () => {
    sessionStorage.setItem('accessToken', 'mock-token');
    renderWithRouter();

    const accountBtn = screen.getByRole('button', { name: /account/i });
    expect(accountBtn).toBeInTheDocument();
    await userEvent.click(accountBtn);

    const signOutOption = await screen.findByRole('button', { name: /sign out/i });
    expect(signOutOption).toBeInTheDocument();
    await userEvent.click(signOutOption);

    expect(sessionStorage.getItem('accessToken')).toBeNull();
    expect(navigateSpy).toHaveBeenCalledWith('/');
  });

  it('closes dropdown menu when clicking outside', async () => {
    sessionStorage.setItem('accessToken', 'mock-token');
    renderWithRouter();

    const accountBtn = screen.getByRole('button', { name: /account/i });
    await userEvent.click(accountBtn);
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(document.body);
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(screen.queryByRole('button', { name: /sign out/i })).not.toBeInTheDocument();
  });
});
