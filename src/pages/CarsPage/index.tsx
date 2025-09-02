import React, { useState, useMemo } from 'react';

import styles from './styles.module.scss';
import { useNavigate } from 'react-router';
import { useCars } from '../../api/carsApi';

const CarsPage: React.FC = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const { data: cars } = useCars();

  const filteredCars = useMemo(() => {
    if (!searchQuery) {
      return cars;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return cars.filter((car) => car.name.toLowerCase().includes(lowerCaseQuery));
  }, [searchQuery, cars]);

  const handleAddCarClick = () => {
    // In a real application, you would navigate to the add car route.
    navigate('/cars/add');
    console.log('Navigating to Add Car page...');
  };

  return (
    <div className={styles.carsPage}>
      {/* Control Bar: Search and Call to Action */}
      <div className={styles.controlBar}>
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Search cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <button onClick={handleAddCarClick} className={styles.ctaButton}>
          Add New Car
        </button>
      </div>

      {/* Cars Grid */}
      <div className={styles.carsGrid}>
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car.id} className={styles.carCard}>
              <div className={styles.cardImage} style={{ backgroundImage: `url(${car.primaryPhotoUrl})` }}></div>
              <div className={styles.cardOverlay}>
                <h3 className={styles.carName}>{car.name}</h3>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No cars found.</p>
        )}
      </div>
    </div>
  );
};

export default CarsPage;
