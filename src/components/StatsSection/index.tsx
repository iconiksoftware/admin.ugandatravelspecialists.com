import React from 'react';
import { type LucideIcon } from 'lucide-react';

import styles from './styles.module.scss';

// Define the shape of a single stat item
interface StatItem {
  title: string;
  value: string;
  icon: LucideIcon; // LucideIcon is the type for components imported from 'lucide-react'
  description: string;
}

// Define the props for the StatsSection component
interface StatsSectionProps {
  stats: StatItem[]; // Array of stat items to display
  sectionTitle?: string; // Optional title for the entire stats section
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats, sectionTitle }) => {
  return (
    <section className={styles.statsSection}>
      {sectionTitle && <h2>{sectionTitle}</h2>}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIconWrapper}>
              <stat.icon size={28} className={styles.statIcon} /> {/* Render Lucide icon component */}
            </div>
            <p className={styles.statValue}>{stat.value}</p>
            <h3 className={styles.statTitle}>{stat.title}</h3>
            <p className={styles.statDescription}>{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
