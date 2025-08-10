import React, { useState, type ReactNode } from 'react';

import styles from './styles.module.scss';

// Props for an individual tab
interface Tab {
  label: string;
  content: ReactNode;
  id: string; // Unique identifier for the tab
}

// Props for the Tabs component
interface TabsProps {
  tabs: Tab[]; // Array of tab objects
  initialTabId?: string; // Optional ID of the tab to be active on initial render
}

const Tabs: React.FC<TabsProps> = ({ tabs, initialTabId }) => {
  // Determine initial active tab based on prop or first tab's ID
  const [activeTabId, setActiveTabId] = useState(initialTabId || (tabs.length > 0 ? tabs[0].id : ''));

  // If no tabs are provided, render nothing
  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabHeaders}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabHeader} ${activeTabId === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTabId(tab.id)}
            role="tab"
            aria-selected={activeTabId === tab.id}
            aria-controls={`tab-panel-${tab.id}`}
            id={`tab-header-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {tabs.map((tab) => (
          // Render the content of the active tab
          <div
            key={tab.id}
            className={`${styles.tabPanel} ${activeTabId === tab.id ? styles.active : ''}`}
            role="tabpanel"
            id={`tab-panel-${tab.id}`}
            aria-labelledby={`tab-header-${tab.id}`}
            hidden={activeTabId !== tab.id} // Hide non-active tabs for accessibility
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
