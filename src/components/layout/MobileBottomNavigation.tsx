import { CalendarDays, Home, Landmark, ListChecks, Newspaper, Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  ['/', '홈', Home],
  ['/subscriptions', '리스트', Search],
  ['/calendar', '캘린더', CalendarDays],
  ['/news', '뉴스', Newspaper],
  ['/guide', '가이드', ListChecks],
  ['/loan', '대출', Landmark],
] as const;

export default function MobileBottomNavigation() {
  return (
    <nav className="mobile-nav" aria-label="모바일 주요 메뉴">
      {items.map(([to, label, Icon]) => (
        <NavLink key={to} to={to}>
          <Icon aria-hidden="true" size={20} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
