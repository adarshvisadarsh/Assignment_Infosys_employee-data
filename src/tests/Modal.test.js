import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';

describe('Modal Component', () => {
  const mockEmployee = {
    image: 'https://via.placeholder.com/150',
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    university: 'MIT',
    company: { title: 'Software Engineer' },
    email: 'john.doe@example.com',
    address: { country: 'USA' },
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(<Modal employee={mockEmployee} onClose={mockOnClose} />);
  });

  it('renders the modal with employee details', () => {
    // Check if the modal displays employee details
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Age: 30/i)).toBeInTheDocument();
    expect(screen.getByText(/University: MIT/i)).toBeInTheDocument();
    expect(screen.getByText(/Job Title: Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Email: john.doe@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Country: USA/i)).toBeInTheDocument();

    // Check if the employee image is rendered
    const image = screen.getByAltText(/John Doe/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockEmployee.image);
  });

  it('calls onClose when the close button is clicked', () => {
    const closeButton = screen.getByText(/×/i); // Close button
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the backdrop is clicked', () => {
    const backdrop = screen.getByRole('presentation'); // Use a role or class if specified
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal content is clicked', () => {
    const modalContent = screen.getByText(/John Doe/i).parentElement; // Get modal content
    fireEvent.click(modalContent);

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
