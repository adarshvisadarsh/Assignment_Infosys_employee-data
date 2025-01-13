import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  const renderPagination = (currentPage, totalPages) => {
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={mockOnPageChange}
      />
    );
  };

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('renders correct number of page buttons', () => {
    renderPagination(1, 5);

    // Check for 5 page buttons (1 through 5)
    const pageButtons = screen.getAllByRole('button', { name: /\d+/ });
    expect(pageButtons).toHaveLength(5);
    expect(pageButtons[0]).toHaveTextContent('1');
    expect(pageButtons[4]).toHaveTextContent('5');
  });

  it('disables "Prev" button on the first page', () => {
    renderPagination(1, 5);

    const prevButton = screen.getByText('Prev');
    expect(prevButton).toBeDisabled();
  });

  it('disables "Next" button on the last page', () => {
    renderPagination(5, 5);

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange with the correct page number when a page button is clicked', () => {
    renderPagination(1, 5);

    const secondPageButton = screen.getByText('2');
    fireEvent.click(secondPageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with the previous page number when "Prev" is clicked', () => {
    renderPagination(2, 5);

    const prevButton = screen.getByText('Prev');
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange with the next page number when "Next" is clicked', () => {
    renderPagination(2, 5);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('highlights the active page button', () => {
    renderPagination(3, 5);

    const activeButton = screen.getByText('3');
    expect(activeButton).toHaveClass('active');
  });

  it('does not call onPageChange if a disabled button is clicked', () => {
    renderPagination(1, 5);

    const prevButton = screen.getByText('Prev');
    fireEvent.click(prevButton);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
