import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import {
  Menu,
  X,
  Home,
  // Users,
  LogOut,
  // FileChartColumn,
  // ChartArea,
  // Contact,
  // BanknoteArrowUp,
  TentTree,
  Bus,
  Package,
} from 'lucide-react';

import styles from './styles.module.scss';
import AuthContext from '../../context/AuthContext';

const dashboardNavSections = [
  {
    title: 'General',
    items: [
      { path: '/', label: 'Home', icon: Home },
      // { path: '/customers', label: 'Customers', icon: Users },
      { path: '/cars', label: 'Cars', icon: Bus },
      { path: '/destinations', label: 'Destinations', icon: TentTree },
      { path: '/tour-packages', label: 'Tour packages', icon: Package },
    ],
  },
  // {
  //   title: 'Finance',
  //   items: [
  //     { path: '/reports', label: 'Reports', icon: FileChartColumn },
  //     { path: '/expenses', label: 'Expenses', icon: BanknoteArrowUp },
  //   ],
  // },
  // {
  //   title: 'Management',
  //   items: [
  //     { path: '/reports', label: 'Reports', icon: ChartArea },
  //     { path: '/staff', label: 'Staff', icon: Contact },
  //     { path: '/audit-logs', label: 'Audit logs', icon: FileChartColumn },
  //   ],
  // },
];

const DashboardLayout: React.FC = () => {
  const { user } = useContext(AuthContext);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  const getCurrentPageTitle = () => {
    const allNavItems = dashboardNavSections.flatMap((section) => section.items);

    const currentItem = allNavItems.find((item) => {
      return location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path + '/'));
    });

    if (currentItem) {
      return currentItem.label;
    }

    // Fallback for root dashboard or unrecognized paths
    if (location.pathname === '/dashboard') {
      return 'Dashboard Overview';
    }
    return 'Dashboard'; // Default title
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Close drawer on route change (for mobile)
  useEffect(() => {
    closeDrawer();
  }, [location.pathname]);

  return (
    <div className={styles.dashboardLayout}>
      {/* Sidebar / Drawer */}
      <aside className={`${styles.sidebar} ${isDrawerOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <NavLink to="/" className={styles.logo} onClick={closeDrawer}>
            <img src="/images/sidebar-logo.png" alt="Uganda Travel Specialist Logo" />
          </NavLink>

          {/* Close button visible only on mobile when drawer is open */}
          <button className={styles.closeMobileDrawerButton} onClick={closeDrawer} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <nav className={styles.navbarNav}>
          {dashboardNavSections.map((section, sectionIndex) => (
            <div key={section.title} className={styles.navSection}>
              <h4 className={styles.navSectionHeader}>{section.title}</h4>
              <ul>
                {section.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
                      onClick={closeDrawer}
                      end={item.path === '/dashboard'}
                    >
                      <item.icon size={20} className={styles.navIcon} />
                      <span className={styles.navLabel}>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
              {/* Add a divider after each section except the last one */}
              {sectionIndex < dashboardNavSections.length - 1 && <div className={styles.sectionDivider}></div>}
            </div>
          ))}
        </nav>

        {/* Bottom actions like Settings, Logout */}
        <div className={styles.sidebarFooter}>
          <ul>
            <li>
              {/* <NavLink to="/account" className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)} onClick={closeDrawer}>
                <Settings size={20} className={styles.navIcon} />
                <span className={styles.navLabel}>Account</span>
              </NavLink> */}
            </li>
            <li>
              <button
                className={styles.logoutButton}
                onClick={() => {
                  console.log('Logging out...');
                  closeDrawer();
                }}
              >
                <LogOut size={20} className={styles.navIcon} />
                <span className={styles.navLabel}>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        {/* Top bar for mobile toggle and general info */}
        <header className={styles.topbar}>
          {/* Menu toggle button visible only on mobile */}
          <button className={styles.menuToggleButton} onClick={handleDrawerToggle} aria-label="Open menu">
            <Menu size={28} />
          </button>
          <h1 className={styles.topbarTitle}>{getCurrentPageTitle()}</h1>
          <div className={styles.userProfile}>
            {user && (
              <>
                <p className={styles.userName}>{user.name}</p>
                <img src={user.photoUrl} alt={user.name} className={styles.userAvatar} />
                {/* Optional: Add user name or dropdown */}
              </>
            )}
          </div>
        </header>

        {/* Content of the current dashboard page */}
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>

      {/* Overlay for mobile drawer */}
      {isDrawerOpen && <div className={styles.overlay} onClick={closeDrawer}></div>}
    </div>
  );
};

export default DashboardLayout;
