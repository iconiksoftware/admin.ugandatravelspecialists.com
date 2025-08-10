import React, { useState } from 'react';

import styles from './styles.module.scss';

const AddDestinationPage: React.FC = () => {
  const [destinationData, setDestinationData] = useState({
    name: '',
    imageUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDestinationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('New destination data submitted:', destinationData);

    // In a real application, you would send this data to a backend API.

    // Display a custom success message
    const alertBox = document.createElement('div');
    alertBox.className = styles.customAlert;
    alertBox.innerHTML = `
      <p class="${styles.alertMessage}">Destination "${destinationData.name}" added successfully!</p>
      <button onclick="this.parentNode.remove()" class="${styles.alertButton}">
        OK
      </button>
    `;
    document.body.appendChild(alertBox);

    // Clear the form after submission
    setDestinationData({ name: '', imageUrl: '' });
  };

  return (
    <div className={styles.addDestinationPage}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h1>Add New Destination</h1>
          <p>Fill in the details below to add a new destination to your list.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.addForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Destination Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={destinationData.name}
              onChange={handleChange}
              placeholder="e.g., Murchison Falls"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={destinationData.imageUrl}
              onChange={handleChange}
              placeholder="e.g., https://example.com/image.jpg"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Add Destination
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDestinationPage;
