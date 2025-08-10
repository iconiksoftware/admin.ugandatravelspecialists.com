import React, { useState } from 'react';

import styles from './styles.module.scss';

const AddTourPackagePage: React.FC = () => {
  const [packageData, setPackageData] = useState({
    name: '',
    imageUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPackageData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('New tour package data submitted:', packageData);

    // In a real application, you would send this data to a backend API.

    // Display a custom success message
    const alertBox = document.createElement('div');
    alertBox.className = styles.customAlert;
    alertBox.innerHTML = `
      <p class="${styles.alertMessage}">Tour package "${packageData.name}" added successfully!</p>
      <button onclick="this.parentNode.remove()" class="${styles.alertButton}">
        OK
      </button>
    `;
    document.body.appendChild(alertBox);

    // Clear the form after submission
    setPackageData({ name: '', imageUrl: '' });
  };

  return (
    <div className={styles.addTourPackagePage}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h1>Add New Tour Package</h1>
          <p>Fill in the details below to add a new tour package to your offerings.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.addForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Package Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={packageData.name}
              onChange={handleChange}
              placeholder="e.g., Gorilla Trekking Adventure"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={packageData.imageUrl}
              onChange={handleChange}
              placeholder="e.g., https://example.com/package.jpg"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Add Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTourPackagePage;
