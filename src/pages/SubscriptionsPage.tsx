import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, LayoutGrid, List, Search, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import NoticeCard from '../components/notice/NoticeCard';
import NoticeFilterBar from '../components/notice/NoticeFilterBar';
import PageHeader from '../components/layout/PageHeader';
import SubscriptionCalendarPreview from '../components/notice/SubscriptionCalendarPreview';
import {
  createNoticeSearchParams,
  listNotices,
  parseNoticeFilter,
} from '../services/noticeService';
import type { SubscriptionNotice } from '../types/notice';

type NoticeSortOption = 'latest' | 'deadline' | 'low-price';
type NoticeViewMode = 'card' | 'list';

const sortOptions: Array<{ label: string; value: NoticeSortOption }> = [
  { label: '최신순', value: 'latest' },
  { label: '마감임박순', value: 'deadline' },
  { label: '가격낮은순', value: 'low-price' },
];

function parseWon(value?: string) {
  if (!value) {
    return Number.MAX_SAFE_INTEGER;
  }

  const parsed = Number.parseInt(value.replace(/[^\d]/g, ''), 10);
  return Number.isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed;
}

function getLowestNoticePrice(notice: SubscriptionNotice) {
  return notice.unitSummary.reduce((lowestPrice, unit) => {
    const price = parseWon(unit.estimatedPriceText ?? unit.depositText);
    return Math.min(lowestPrice, price);
  }, Number.MAX_SAFE_INTEGER);
}

function sortNotices(notices: SubscriptionNotice[], sortOption: NoticeSortOption) {
  return [...notices].sort((a, b) => {
    switch (sortOption) {
      case 'deadline':
        return a.applicationEndDate.localeCompare(b.applicationEndDate);
      case 'low-price':
        return getLowestNoticePrice(a) - getLowestNoticePrice(b);
      case 'latest':
        return b.applicationStartDate.localeCompare(a.applicationStartDate);
    }
  });
}

function SortDropdown({
  onChange,
  value,
}: {
  onChange: (value: NoticeSortOption) => void;
  value: NoticeSortOption;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = sortOptions.find((option) => option.value === value) ?? sortOptions[0];

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, []);

  return (
    <div className={`sort-dropdown ${isOpen ? 'is-open' : ''}`} ref={dropdownRef}>
      <button
        aria-expanded={isOpen}
        aria-label="정렬 기준"
        className="sort-dropdown__trigger"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span>{selectedOption.label}</span>
        <ChevronDown aria-hidden="true" size={16} />
      </button>
      {isOpen ? (
        <div className="sort-dropdown__menu">
          {sortOptions.map((option) => (
            <button
              className={option.value === value ? 'is-active' : undefined}
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function HeaderSearch({
  onQueryChange,
  query,
}: {
  onQueryChange: (query?: string) => void;
  query?: string;
}) {
  const [isOpen, setIsOpen] = useState(Boolean(query));
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query) {
      setIsOpen(true);
    }
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (searchRef.current?.contains(event.target as Node)) {
        return;
      }

      if (!query?.trim()) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [query]);

  if (!isOpen && !query) {
    return (
      <div className="header-search" ref={searchRef}>
        <button
          aria-label="청약리스트 검색 열기"
          className="header-search__button"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <Search aria-hidden="true" size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="header-search header-search--open" ref={searchRef}>
      <div className="header-search__field">
        <Search aria-hidden="true" size={18} />
        <input
          aria-label="청약리스트 검색어"
          onChange={(event) => onQueryChange(event.target.value || undefined)}
          placeholder="지역, 공고명, 기관 검색"
          ref={inputRef}
          type="search"
          value={query ?? ''}
        />
        <button
          aria-label="검색어 지우기"
          className="header-search__clear"
          onClick={() => {
            onQueryChange(undefined);
            setIsOpen(false);
          }}
          type="button"
        >
          <X aria-hidden="true" size={18} />
        </button>
      </div>
    </div>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    return window.matchMedia('(min-width: 768px)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateDesktopState = () => setIsDesktop(mediaQuery.matches);

    updateDesktopState();
    mediaQuery.addEventListener('change', updateDesktopState);
    return () => mediaQuery.removeEventListener('change', updateDesktopState);
  }, []);

  return isDesktop;
}

export default function SubscriptionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState<NoticeSortOption>('latest');
  const [viewMode, setViewMode] = useState<NoticeViewMode>('card');
  const isDesktop = useIsDesktop();
  const filter = useMemo(() => parseNoticeFilter(searchParams), [searchParams]);
  const results = useMemo(() => sortNotices(listNotices(filter), sortOption), [filter, sortOption]);
  const effectiveViewMode: NoticeViewMode = isDesktop ? viewMode : 'list';

  return (
    <div className="page-stack">
      <SubscriptionCalendarPreview
        selectedDate={filter.dateFrom && filter.dateFrom === filter.dateTo ? filter.dateFrom : undefined}
        onSelectDate={(date) => {
          const isSameDate = filter.dateFrom === date && filter.dateTo === date;
          const nextFilter = isSameDate
            ? { ...filter, dateFrom: undefined, dateTo: undefined }
            : { ...filter, dateFrom: date, dateTo: date };
          setSearchParams(createNoticeSearchParams(nextFilter));
        }}
      />
      <div className="subscriptions-heading">
        <PageHeader title="청약리스트" />
        <HeaderSearch
          query={filter.query}
          onQueryChange={(query) => setSearchParams(createNoticeSearchParams({ ...filter, query }))}
        />
      </div>
      <NoticeFilterBar
        filter={filter}
        onChange={(nextFilter) => setSearchParams(createNoticeSearchParams(nextFilter))}
        onReset={() => setSearchParams(new URLSearchParams())}
      />
      <div className="results-toolbar">
        <p className="result-count">총 {results.length}개 공고</p>
        <div className="results-controls">
          <SortDropdown onChange={setSortOption} value={sortOption} />
          <div className="view-toggle" aria-label="보기 방식">
            <button
              aria-label="카드형 보기"
              aria-pressed={viewMode === 'card'}
              className={viewMode === 'card' ? 'is-active' : undefined}
              onClick={() => setViewMode('card')}
              type="button"
            >
              <LayoutGrid aria-hidden="true" size={22} />
            </button>
            <button
              aria-label="리스트형 보기"
              aria-pressed={viewMode === 'list'}
              className={viewMode === 'list' ? 'is-active' : undefined}
              onClick={() => setViewMode('list')}
              type="button"
            >
              <List aria-hidden="true" size={22} />
            </button>
          </div>
        </div>
      </div>
      {results.length > 0 ? (
        <div className={effectiveViewMode === 'card' ? 'card-grid' : 'notice-list'}>
          {results.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} variant={effectiveViewMode} />
          ))}
        </div>
      ) : (
        <EmptyState
          action={
            <Button onClick={() => setSearchParams(new URLSearchParams())} type="button" variant="secondary">
              필터 초기화
            </Button>
          }
          description="지역이나 상태 조건을 줄이면 더 많은 공고를 볼 수 있어요."
          title="조건에 맞는 공고가 없어요."
        />
      )}
    </div>
  );
}
