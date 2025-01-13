import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
    render(<SearchBar onSearch={mockOnSearch} />);
  });

  it('renders the search input and button', () => {
    const input = screen.getByPlaceholderText('Search by name...');
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('updates the input value when the user types', () => {
    const input = screen.getByPlaceholderText('Search by name...');

    fireEvent.change(input, { target: { value: 'John Doe' } });

    expect(input).toHaveValue('John Doe');
  });

  it('calls onSearch with the correct search term when the button is clicked', () => {
    const input = screen.getByPlaceholderText('Search by name...');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'John Doe' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('John Doe');
  });

  it('does not clear the input value after clicking search', () => {
    const input = screen.getByPlaceholderText('Search by name...');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Jane Smith' } });
    fireEvent.click(button);

    expect(input).toHaveValue('Jane Smith');
  });

  it('calls onSearch with an empty string when the search button is clicked without input', () => {
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
