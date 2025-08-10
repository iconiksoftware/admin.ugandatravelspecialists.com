import { useNavigate } from 'react-router';
import React, { useState, useMemo } from 'react';

import styles from './styles.module.scss';

const DUMMY_PACKAGES = [
  {
    id: 1,
    name: 'Gorilla Trekking Adventure',
    imageUrl: 'https://i.pinimg.com/736x/7f/fe/13/7ffe13d2aefd56ae77ace088ea362321.jpg',
  },
  {
    id: 2,
    name: 'Wildlife Safari & Boat Cruise',
    imageUrl: 'https://i.pinimg.com/1200x/36/3f/56/363f569fe4c35e976b4840d6d928f6e5.jpg',
  },
  { id: 3, name: 'Cultural Heritage Tour', imageUrl: 'https://i.pinimg.com/736x/4f/e4/19/4fe4197b9e732b45db3446fefca29066.jpg' },
  { id: 4, name: 'Jinja Adventure Sports', imageUrl: 'https://i.pinimg.com/736x/b4/17/7e/b4177e96a2538cbdbe8a9b4b13bc862c.jpg' },
  { id: 5, name: 'Murchison Falls Explorer', imageUrl: 'https://i.pinimg.com/1200x/5c/ed/c6/5cedc6ac68d6c6c112048e9d1da6062f.jpg' },
  {
    id: 6,
    name: 'Rwenzori Mountain Climbing',
    imageUrl: 'https://i.pinimg.com/1200x/32/d1/a6/32d1a607064d26ed01a3ade9b8f4417e.jpg',
  },
];

const TourPackagesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredPackages = useMemo(() => {
    if (!searchQuery) {
      return DUMMY_PACKAGES;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return DUMMY_PACKAGES.filter((pkg) => pkg.name.toLowerCase().includes(lowerCaseQuery));
  }, [searchQuery]);

  const handleAddPackageClick = () => {
    navigate('/tour-packages/add');
  };

  return (
    <div className={styles.tourPackagesPage}>
      {/* Control Bar: Search and Call to Action */}
      <div className={styles.controlBar}>
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Search packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <button onClick={handleAddPackageClick} className={styles.ctaButton}>
          Add New Package
        </button>
      </div>

      {/* Packages Grid */}
      <div className={styles.packagesGrid}>
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg) => (
            <div key={pkg.id} className={styles.packageCard}>
              <div className={styles.cardImage} style={{ backgroundImage: `url(${pkg.imageUrl})` }}></div>
              <div className={styles.cardOverlay}>
                <h3 className={styles.packageName}>{pkg.name}</h3>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No packages found for "{searchQuery}".</p>
        )}
      </div>
    </div>
  );
};

export default TourPackagesPage;
