import { Outlet } from 'react-router-dom';
import DesktopTopNavigation from './DesktopTopNavigation';
import MobileBottomNavigation from './MobileBottomNavigation';

export default function AppLayout() {
  return (
    <div className="app-shell">
      <DesktopTopNavigation />
      <main className="app-main">
        <Outlet />
      </main>
      <MobileBottomNavigation />
    </div>
  );
}
