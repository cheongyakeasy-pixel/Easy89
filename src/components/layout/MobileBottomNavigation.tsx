import { CalendarDays, Home, Landmark, ListChecks, Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  ['/', '홈', Home],
  ['/subscriptions', '공고', Search],
  ['/calendar', '일정', CalendarDays],
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
