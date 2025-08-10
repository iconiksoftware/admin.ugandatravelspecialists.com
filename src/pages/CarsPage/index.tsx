import React, { useState, useMemo } from 'react';

import styles from './styles.module.scss';
import { useNavigate } from 'react-router';

const DUMMY_CARS = [
  { id: 1, name: 'Toyota Land Cruiser', imageUrl: 'https://i.pinimg.com/474x/91/64/93/916493a05f47c24a5f9082bb2118caae.jpg' },
  { id: 2, name: 'Toyota Hiace', imageUrl: 'https://i.pinimg.com/1200x/9a/a6/da/9aa6daf8b3270018d6e45513bd063ac4.jpg' },
  { id: 3, name: '2023 Ford Ranger Raptor', imageUrl: 'https://i.pinimg.com/474x/94/16/90/941690a03e7f062a6b0a70ebc2075166.jpg' },
  { id: 4, name: 'Subaru Forester', imageUrl: 'https://i.pinimg.com/1200x/52/ad/b2/52adb257d557f10a1aded20db99a4fd0.jpg' },
  { id: 6, name: 'Mitsubishi Pajero', imageUrl: 'https://i.pinimg.com/736x/7f/91/f2/7f91f2241e3920adec0828fa8973a83e.jpg' },
  { id: 7, name: 'Toyota Rav4', imageUrl: 'https://i.pinimg.com/1200x/cb/76/30/cb763012e46985a3c4e4027398f00f49.jpg' },
  { id: 8, name: '1989 Land Rover Defender', imageUrl: 'https://i.pinimg.com/1200x/f1/0a/ba/f10abaabd3635841d8fc340e24aefa90.jpg' },
];

const CarsPage: React.FC = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCars = useMemo(() => {
    if (!searchQuery) {
      return DUMMY_CARS;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return DUMMY_CARS.filter((car) => car.name.toLowerCase().includes(lowerCaseQuery));
  }, [searchQuery]);

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
              <div className={styles.cardImage} style={{ backgroundImage: `url(${car.imageUrl})` }}></div>
              <div className={styles.cardOverlay}>
                <h3 className={styles.carName}>{car.name}</h3>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No cars found for "{searchQuery}".</p>
        )}
      </div>
    </div>
  );
};

export default CarsPage;
