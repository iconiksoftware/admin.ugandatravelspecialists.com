import React, { useState, useMemo } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router';

// Dummy data for destinations in Uganda
const DUMMY_DESTINATIONS = [
  {
    id: 1,
    name: 'Bwindi Impenetrable National Park',
    imageUrl: 'https://www.bwindinationalparkuganda.com/wp-content/uploads/2019/02/gorilla-trekking-700x450.jpg',
  },
  {
    id: 2,
    name: 'Murchison Falls National Park',
    imageUrl: 'https://www.murchisonfallsparkuganda.com/wp-content/uploads/2019/04/Murchison-Falls-750x450.jpg',
  },
  {
    id: 3,
    name: 'Queen Elizabeth National Park',
    imageUrl: 'https://www.queenelizabethparkuganda.com/wp-content/uploads/2023/11/Queen-Elizabeth-National-Park-730x450.jpg',
  },
  {
    id: 4,
    name: 'Jinja (Source of the Nile)',
    imageUrl: 'https://www.africanmeccasafaris.com/wp-content/uploads/jinjanileriver4.jpg',
  },
  {
    id: 5,
    name: 'Lake Bunyonyi',
    imageUrl: 'https://www.mgahinganationalpark.org/wp-content/uploads/2021/12/3-Days-Lake-Bunyonyi-Safari-1.jpg',
  },
  {
    id: 6,
    name: 'Kidepo Valley National Park',
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/657b302ad0d11e71b22b40c3/1705507517446-A2MRD79GEC80NSH24OVP/photo_1979.jpg',
  },
  {
    id: 7,
    name: 'Sipi Falls',
    imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/8d/ca/50/mt-elgon-3-days-2-nights.jpg?w=1200&h=1200&s=1',
  },
  {
    id: 8,
    name: 'Mgahinga Gorilla National Park',
    imageUrl: 'https://www.insidemgahinganationalpark.com/wp-content/uploads/2021/12/Wild-Adventure-1024x683.jpg',
  },
];

const DestinationsPage: React.FC = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = useMemo(() => {
    if (!searchQuery) {
      return DUMMY_DESTINATIONS;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    return DUMMY_DESTINATIONS.filter((destination) => destination.name.toLowerCase().includes(lowerCaseQuery));
  }, [searchQuery]);

  const handleAddDestinationClick = () => {
    navigate('/destinations/add');
  };

  return (
    <div className={styles.destinationsPage}>
      {/* Control Bar: Search and Call to Action */}
      <div className={styles.controlBar}>
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <button onClick={handleAddDestinationClick} className={styles.ctaButton}>
          Add New Destination
        </button>
      </div>

      {/* Destinations Grid */}
      <div className={styles.destinationsGrid}>
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <div key={destination.id} className={styles.destinationCard}>
              <div className={styles.cardImage} style={{ backgroundImage: `url(${destination.imageUrl})` }}></div>
              <div className={styles.cardOverlay}>
                <h3 className={styles.destinationName}>{destination.name}</h3>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No destinations found for "{searchQuery}".</p>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;
