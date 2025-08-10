import React, { useState } from 'react';

import styles from './styles.module.scss';

const CustomersPage: React.FC = () => {
  const allCustomers = [
    { id: '1', name: 'Alice Johnson', phoneNumber: '+256 700 123456', address: 'Kampala, Uganda', createdAt: '2024-07-20' },
    { id: '2', name: 'Bob Smith', phoneNumber: '+256 701 654321', address: 'Entebbe, Uganda', createdAt: '2024-07-15' },
    { id: '3', name: 'Carol Davis', phoneNumber: '+256 702 987654', address: 'Jinja, Uganda', createdAt: '2024-07-10' },
    { id: '4', name: 'David Wilson', phoneNumber: '+256 703 555555', address: 'Mukono, Uganda', createdAt: '2024-07-05' },
    { id: '5', name: 'Eva Brown', phoneNumber: '+256 704 444444', address: 'Masaka, Uganda', createdAt: '2024-07-01' },
    { id: '6', name: 'Frank Taylor', phoneNumber: '+256 705 333333', address: 'Mbale, Uganda', createdAt: '2024-06-28' },
    { id: '7', name: 'Grace Lee', phoneNumber: '+256 706 222222', address: 'Gulu, Uganda', createdAt: '2024-06-20' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 3;

  const totalPages = Math.ceil(allCustomers.length / customersPerPage);

  const currentCustomers = allCustomers.slice((currentPage - 1) * customersPerPage, currentPage * customersPerPage);

  const handleAddCustomer = () => {
    alert('Add new customer clicked');
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className={styles.customersPage}>
      <div className={styles.customersPage__header}>
        <h1 className={styles.customersPage__title}>Customers</h1>
        <button className={styles.customersPage__addButton} onClick={handleAddCustomer} type="button">
          + Add New Customer
        </button>
      </div>

      <table className={styles.customersPage__table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Joined Date</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map(({ id, name, phoneNumber, address, createdAt }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{phoneNumber}</td>
              <td>{address}</td>
              <td>{new Date(createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.customersPage__pagination}>
        <button
          className={styles.customersPage__paginationButton}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          &larr; Back
        </button>
        <span className={styles.customersPage__paginationInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={styles.customersPage__paginationButton}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default CustomersPage;
