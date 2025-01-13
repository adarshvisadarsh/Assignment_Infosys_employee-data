import React from 'react';
import '../style/Modal.css';

function Modal({ employee, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <img src={employee.image} alt={`${employee.firstName} ${employee.lastName}`} />
        <h2>{employee.firstName} {employee.lastName}</h2>
        <p>Age: {employee.age}</p>
        <p>University: {employee.university}</p>
        <p>Job Title: {employee.company.title}</p>
        <p>Email: {employee.email}</p>
        <p>Country: {employee.address.country}</p>
      </div>
    </div>
  );
}

export default Modal;
