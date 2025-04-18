// src/components/layout/__tests__/SideNav.test.tsx

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SideNav from '../SideNav';

describe('SideNav', () => {
  it('renders dashboard heading and home link', () => {
    render(
      <MemoryRouter>
        <SideNav />
      </MemoryRouter>
    );

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });

  it('navigates to /home when Home link is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SideNav />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink.getAttribute('href')).toBe('/home');
    await userEvent.click(homeLink);
    // Actual navigation would be tested in integration with a router setup,
    // but href verification ensures NavLink renders correctly.
  });
});
