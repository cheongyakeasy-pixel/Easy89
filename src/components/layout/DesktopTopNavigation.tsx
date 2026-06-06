import { NavLink } from 'react-router-dom';

const items = [
  ['/', '홈'],
  ['/subscriptions', '청약리스트'],
  ['/calendar', '캘린더'],
  ['/news', '부동산뉴스'],
  ['/guide', '가이드'],
  ['/loan', '대출 정보'],
];

export default function DesktopTopNavigation() {
  return (
    <nav className="desktop-nav" aria-label="주요 메뉴">
      <NavLink className="brand" to="/">
        청약이지
      </NavLink>
      <div>
        {items.slice(1).map(([to, label]) => (
          <NavLink key={to} to={to}>
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
