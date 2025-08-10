import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

import './styles/index.scss';

import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import useOnlineStatus from './hooks/useOnlineStatus';
import ProtectedRoute from './components/ProtectedRoute';
import AuditLogsPage from './pages/AuditLogsPage';
import { useEffect, useRef } from 'react';
import { AuthProvider } from './context/AuthContext';
import CustomersPage from './pages/CustomersPage';
import ReportsPage from './pages/ReportsPage';
import ExpensesPage from './pages/ExpensesPage';
import StaffPage from './pages/StaffPage';
import DestinationsPage from './pages/DestinationsPage';
import AddDestinationPage from './pages/AddDestinationPage';
import CarsPage from './pages/CarsPage';
import AddCarPage from './pages/AddCarPage';
import TourPackagesPage from './pages/TourPackagesPage';
import AddTourPackagePage from './pages/AddTourPackage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    Component: () => (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: HomePage },
      { path: '/audit-logs', Component: AuditLogsPage },
      { path: '/customers', Component: CustomersPage },
      {
        path: '/destinations',
        children: [
          { index: true, Component: DestinationsPage },
          { path: 'add', Component: AddDestinationPage },
        ],
      },
      {
        path: '/tour-packages',
        children: [
          { index: true, Component: TourPackagesPage },
          { path: 'add', Component: AddTourPackagePage },
        ],
      },
      {
        path: '/cars',
        children: [
          { index: true, Component: CarsPage },
          { path: 'add', Component: AddCarPage },
        ],
      },
      { path: '/reports', Component: ReportsPage },
      { path: '/expenses', Component: ExpensesPage },
      { path: '/staff', Component: StaffPage },
      { path: '/audit-logs', Component: AuditLogsPage },
    ],
  },
  { path: '/login', Component: LoginPage },
]);

function App() {
  const isOnline = useOnlineStatus();

  const offlineToastId = useRef<string | number | null>(null);

  useEffect(() => {
    if (!isOnline) {
      if (offlineToastId.current === null) {
        offlineToastId.current = toast.warning('Your offline. Please check your internet connection.', {
          position: 'top-center',
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          closeButton: true,
          toastId: 'offline-warning',
        });
      }
    } else {
      if (offlineToastId.current !== null) {
        toast.dismiss(offlineToastId.current);
        offlineToastId.current = null;

        toast.success('🎉 You are back online!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  }, [isOnline]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
