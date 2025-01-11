import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesRequest } from './redux/actions/employeeActions';
import { selectEmployees, selectLoading, selectError } from './redux/selectors/employeeSelectors';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from './components/Modal';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import _ from 'lodash';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const employees = useSelector(selectEmployees);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchEmployeesRequest());
  }, [dispatch]);

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filter employees based on search
  const filteredEmployees = employees.filter((employee) =>
    `${employee.firstName} ${employee.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Sort employees
  const sortedEmployees = _.orderBy(filteredEmployees, [sortField], [sortOrder]);

  // Paginate employees
  const paginatedEmployees = _.chunk(sortedEmployees, itemsPerPage)[currentPage - 1] || [];

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      {/* Header */}
      <Header title="Company Name" subtitle="Company Motto" subtitle1="Since (Company Establishment Date)" />

      {/* Search */}
      <SearchBar onSearch={handleSearch} />

      {/* Table */}
      <EmployeeTable
        employees={paginatedEmployees}
        onRowClick={handleRowClick}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Modal */}
      {selectedEmployee && (
        <EmployeeModal employee={selectedEmployee} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
