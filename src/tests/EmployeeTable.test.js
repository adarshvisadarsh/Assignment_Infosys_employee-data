import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeTable from '../components/EmployeeTable';

describe('EmployeeTable', () => {
  const employees = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      phone: '123-456-7890',
      image: 'https://via.placeholder.com/50',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '987-654-3210',
      image: 'https://via.placeholder.com/50',
    },
  ];

  const onSortMock = jest.fn();
  const onRowClickMock = jest.fn();

  test('renders the employee table with headers', () => {
    render(
      <EmployeeTable
        employees={employees}
        onRowClick={onRowClickMock}
        onSort={onSortMock}
        sortField="id"
        sortOrder="asc"
      />
    );

    // Check headers using role and text matchers
    const idHeader = screen.getByRole('columnheader', { name: /id/i });
    const nameHeader = screen.getByRole('columnheader', { name: /name/i });
    const contactHeader = screen.getByRole('columnheader', { name: /contact no/i });

    expect(idHeader).toBeInTheDocument();
    expect(nameHeader).toBeInTheDocument();
    expect(contactHeader).toBeInTheDocument();
  });

  test('calls onSort when clicking on a sortable column header', () => {
    render(
      <EmployeeTable
        employees={employees}
        onRowClick={onRowClickMock}
        onSort={onSortMock}
        sortField="id"
        sortOrder="asc"
      />
    );

    const idHeader = screen.getByRole('columnheader', { name: /id/i });
    fireEvent.click(idHeader);

    expect(onSortMock).toHaveBeenCalledWith('id');
  });

  test('renders the employee rows', () => {
    render(
      <EmployeeTable
        employees={employees}
        onRowClick={onRowClickMock}
        onSort={onSortMock}
        sortField="id"
        sortOrder="asc"
      />
    );

    // Check rows
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('calls onRowClick when a row is clicked', () => {
    render(
      <EmployeeTable
        employees={employees}
        onRowClick={onRowClickMock}
        onSort={onSortMock}
        sortField="id"
        sortOrder="asc"
      />
    );

    const firstRow = screen.getByText('John Doe').closest('tr');
    fireEvent.click(firstRow);

    expect(onRowClickMock).toHaveBeenCalledWith(employees[0]);
  });
});
