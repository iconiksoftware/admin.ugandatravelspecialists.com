import React, { useState } from 'react';

import styles from './styles.module.scss';

const AddCarPage: React.FC = () => {
  const [carData, setCarData] = useState({
    name: '',
    imageUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('New car data submitted:', carData);

    // In a real application, you would send this data to a backend API.

    // Display a custom success message
    const alertBox = document.createElement('div');
    alertBox.className = styles.customAlert;
    alertBox.innerHTML = `
      <p class="${styles.alertMessage}">Car "${carData.name}" added successfully!</p>
      <button onclick="this.parentNode.remove()" class="${styles.alertButton}">
        OK
      </button>
    `;
    document.body.appendChild(alertBox);

    // Clear the form after submission
    setCarData({ name: '', imageUrl: '' });
  };

  return (
    <div className={styles.addCarPage}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h1>Add New Car</h1>
          <p>Fill in the details below to add a new car to your fleet.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.addForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Car Model</label>
            <input
              type="text"
              id="name"
              name="name"
              value={carData.name}
              onChange={handleChange}
              placeholder="e.g., Toyota Land Cruiser"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={carData.imageUrl}
              onChange={handleChange}
              placeholder="e.g., https://example.com/car.jpg"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCarPage;
