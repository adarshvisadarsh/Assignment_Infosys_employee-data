import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header Component', () => {
  test('renders the title', () => {
    render(<Header title="Company Name" />);
    expect(screen.getByText('Company Name')).toBeInTheDocument();
  });

  test('renders the subtitle when provided', () => {
    render(<Header title="Company Name" subtitle="Employee Management System" />);
    expect(screen.getByText('Employee Management System')).toBeInTheDocument();
  });

  test('renders the subtitle1 when provided', () => {
    render(
      <Header
        title="Company Name"
        subtitle="Employee Management System"
        subtitle1="Welcome to the company dashboard"
      />
    );
    expect(screen.getByText('Welcome to the company dashboard')).toBeInTheDocument();
  });

  test('renders only the title when no subtitle or subtitle1 is provided', () => {
    render(<Header title="Company Name" />);
    expect(screen.getByText('Company Name')).toBeInTheDocument();
    expect(screen.queryByText('Employee Management System')).toBeNull();
    expect(screen.queryByText('Welcome to the company dashboard')).toBeNull();
  });

  test('renders title, subtitle, and subtitle1 together when all props are provided', () => {
    render(
      <Header
        title="Company Name"
        subtitle="Employee Management System"
        subtitle1="Welcome to the company dashboard"
      />
    );

    expect(screen.getByText('Company Name')).toBeInTheDocument();
    expect(screen.getByText('Employee Management System')).toBeInTheDocument();
    expect(screen.getByText('Welcome to the company dashboard')).toBeInTheDocument();
  });
});
