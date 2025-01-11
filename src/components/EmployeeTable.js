import React from 'react';
import '../style/EmployeeTable.css';

function EmployeeTable({ employees, onRowClick, onSort, sortField, sortOrder }) {
  console.log(employees, "emp")
  const getSortSymbol = (field) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? '↑' : '↓';
    }
    return '↕'; 
  };

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th onClick={() => onSort('id')}>ID {getSortSymbol('id')}</th>
          <th onClick={() => onSort('firstName')}>Name {getSortSymbol('firstName')}</th>
          <th >Contact No</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id} onClick={() => onRowClick(employee)}>
            <td>{employee.id}</td>
            <td className="name-column">
              <img
                src={employee.image}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="avatar"
              />
              <span>{`${employee.firstName} ${employee.lastName}`}</span>
            </td>
            <td>{`${employee.phone}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
