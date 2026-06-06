import type { RouteObject } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import CalendarPage from './pages/CalendarPage';
import GuidePage from './pages/GuidePage';
import HomePage from './pages/HomePage';
import LoanPage from './pages/LoanPage';
import NotFoundPage from './pages/NotFoundPage';
import RealEstateNewsPage from './pages/RealEstateNewsPage';
import SubscriptionDetailPage from './pages/SubscriptionDetailPage';
import SubscriptionsPage from './pages/SubscriptionsPage';

export const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/subscriptions', element: <SubscriptionsPage /> },
      { path: '/subscription-detail/:id', element: <SubscriptionDetailPage /> },
      { path: '/calendar', element: <CalendarPage /> },
      { path: '/news', element: <RealEstateNewsPage /> },
      { path: '/guide', element: <GuidePage /> },
      { path: '/loan', element: <LoanPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
