import { notices } from '../data/notices';
import type { HousingType, NoticeFilter, NoticeStatus, SubscriptionNotice, SupplyType } from '../types/notice';

const housingTypes: Array<HousingType | 'all'> = [
  'all',
  'public-rental',
  'private-sale',
  'public-sale',
  'youth',
  'newlywed',
];
const supplyTypes: Array<SupplyType | 'all'> = ['all', 'special', 'general', 'priority', 'remaining'];
const statuses: Array<NoticeStatus | 'all'> = ['all', 'open', 'upcoming', 'closed', 'announced'];

function isWithinDateRange(notice: SubscriptionNotice, filter: NoticeFilter) {
  if (filter.dateFrom && notice.applicationEndDate < filter.dateFrom) {
    return false;
  }
  if (filter.dateTo && notice.applicationStartDate > filter.dateTo) {
    return false;
  }
  return true;
}

function matchesQuery(notice: SubscriptionNotice, query?: string) {
  if (!query?.trim()) {
    return true;
  }
  const normalized = query.trim().toLowerCase();
  return [
    notice.title,
    notice.organization,
    notice.region,
    notice.district,
    notice.address ?? '',
  ]
    .join(' ')
    .toLowerCase()
    .includes(normalized);
}

export function listNotices(filter: NoticeFilter = {}) {
  return notices
    .filter((notice) => matchesQuery(notice, filter.query))
    .filter((notice) => !filter.region || filter.region === 'all' || notice.region === filter.region)
    .filter((notice) => !filter.status || filter.status === 'all' || notice.status === filter.status)
    .filter(
      (notice) =>
        !filter.housingType ||
        filter.housingType === 'all' ||
        notice.housingType === filter.housingType,
    )
    .filter(
      (notice) =>
        !filter.supplyType || filter.supplyType === 'all' || notice.supplyType === filter.supplyType,
    )
    .filter((notice) => isWithinDateRange(notice, filter))
    .sort((a, b) => a.applicationStartDate.localeCompare(b.applicationStartDate));
}

export function getNoticeById(id: string) {
  return notices.find((notice) => notice.id === id);
}

export function getFeaturedNotices() {
  return notices
    .filter((notice) => notice.featured || notice.status === 'open')
    .slice(0, 3);
}

export function getRegions() {
  return Array.from(new Set(notices.map((notice) => notice.region))).sort();
}

export function parseNoticeFilter(searchParams: URLSearchParams): NoticeFilter {
  const housingType = searchParams.get('housingType');
  const supplyType = searchParams.get('supplyType');
  const status = searchParams.get('status');

  return {
    query: searchParams.get('q') || undefined,
    region: searchParams.get('region') || undefined,
    housingType: housingTypes.includes(housingType as HousingType | 'all')
      ? (housingType as HousingType | 'all')
      : 'all',
    supplyType: supplyTypes.includes(supplyType as SupplyType | 'all')
      ? (supplyType as SupplyType | 'all')
      : 'all',
    status: statuses.includes(status as NoticeStatus | 'all') ? (status as NoticeStatus | 'all') : 'all',
    dateFrom: searchParams.get('dateFrom') || undefined,
    dateTo: searchParams.get('dateTo') || undefined,
  };
}

export function createNoticeSearchParams(filter: NoticeFilter) {
  const params = new URLSearchParams();
  if (filter.query) params.set('q', filter.query);
  if (filter.region && filter.region !== 'all') params.set('region', filter.region);
  if (filter.status && filter.status !== 'all') params.set('status', filter.status);
  if (filter.housingType && filter.housingType !== 'all') params.set('housingType', filter.housingType);
  if (filter.supplyType && filter.supplyType !== 'all') params.set('supplyType', filter.supplyType);
  if (filter.dateFrom) params.set('dateFrom', filter.dateFrom);
  if (filter.dateTo) params.set('dateTo', filter.dateTo);
  return params;
}
