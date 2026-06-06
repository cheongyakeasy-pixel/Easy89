import { notices } from '../data/notices';
import type {
  AreaRange,
  HousingType,
  NoticeFilter,
  NoticeStatus,
  PriceRange,
  RegulationCondition,
  SubscriptionNotice,
  SupplyType,
  UnitSummary,
} from '../types/notice';

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
const areaRanges: Array<AreaRange | 'all'> = ['all', 'under-40', '40-59', '60-84', 'over-85'];
const priceRanges: Array<PriceRange | 'all'> = ['all', 'under-400m', '400m-700m', '700m-1b', 'over-1b'];
const regulationConditions: Array<RegulationCondition | 'all'> = [
  'all',
  'regulated-area',
  'non-regulated-area',
  'public-housing-district',
  'price-cap',
];

function parseArea(areaType: string) {
  const parsed = Number.parseInt(areaType, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function parseKoreanWon(value?: string) {
  if (!value) {
    return undefined;
  }
  const parsed = Number.parseInt(value.replace(/[^\d]/g, ''), 10);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function getUnitPrice(unit: UnitSummary) {
  return parseKoreanWon(unit.estimatedPriceText ?? unit.depositText);
}

function isAreaInRange(area: number, range: AreaRange) {
  switch (range) {
    case 'under-40':
      return area < 40;
    case '40-59':
      return area >= 40 && area <= 59;
    case '60-84':
      return area >= 60 && area <= 84;
    case 'over-85':
      return area >= 85;
  }
}

function isPriceInRange(price: number, range: PriceRange) {
  switch (range) {
    case 'under-400m':
      return price < 400_000_000;
    case '400m-700m':
      return price >= 400_000_000 && price < 700_000_000;
    case '700m-1b':
      return price >= 700_000_000 && price < 1_000_000_000;
    case 'over-1b':
      return price >= 1_000_000_000;
  }
}

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

function matchesAreaRange(notice: SubscriptionNotice, areaRange?: AreaRange | 'all') {
  if (!areaRange || areaRange === 'all') {
    return true;
  }
  return notice.unitSummary.some((unit) => {
    const area = parseArea(unit.areaType);
    return area !== undefined && isAreaInRange(area, areaRange);
  });
}

function matchesPriceRange(notice: SubscriptionNotice, priceRange?: PriceRange | 'all') {
  if (!priceRange || priceRange === 'all') {
    return true;
  }
  return notice.unitSummary.some((unit) => {
    const price = getUnitPrice(unit);
    return price !== undefined && isPriceInRange(price, priceRange);
  });
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
    .filter((notice) => matchesAreaRange(notice, filter.areaRange))
    .filter((notice) => matchesPriceRange(notice, filter.priceRange))
    .filter(
      (notice) =>
        !filter.regulationCondition ||
        filter.regulationCondition === 'all' ||
        notice.regulationCondition === filter.regulationCondition,
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
  const areaRange = searchParams.get('areaRange');
  const priceRange = searchParams.get('priceRange');
  const regulationCondition = searchParams.get('regulationCondition');

  return {
    query: searchParams.get('q') || undefined,
    region: searchParams.get('region') || undefined,
    housingType: housingTypes.includes(housingType as HousingType | 'all')
      ? (housingType as HousingType | 'all')
      : 'all',
    supplyType: supplyTypes.includes(supplyType as SupplyType | 'all')
      ? (supplyType as SupplyType | 'all')
      : 'all',
    areaRange: areaRanges.includes(areaRange as AreaRange | 'all')
      ? (areaRange as AreaRange | 'all')
      : 'all',
    priceRange: priceRanges.includes(priceRange as PriceRange | 'all')
      ? (priceRange as PriceRange | 'all')
      : 'all',
    regulationCondition: regulationConditions.includes(regulationCondition as RegulationCondition | 'all')
      ? (regulationCondition as RegulationCondition | 'all')
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
  if (filter.areaRange && filter.areaRange !== 'all') params.set('areaRange', filter.areaRange);
  if (filter.priceRange && filter.priceRange !== 'all') params.set('priceRange', filter.priceRange);
  if (filter.regulationCondition && filter.regulationCondition !== 'all') {
    params.set('regulationCondition', filter.regulationCondition);
  }
  if (filter.dateFrom) params.set('dateFrom', filter.dateFrom);
  if (filter.dateTo) params.set('dateTo', filter.dateTo);
  return params;
}
