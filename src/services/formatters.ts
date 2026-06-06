import type {
  AreaRange,
  CalendarEventType,
  HousingType,
  NoticeStatus,
  PriceRange,
  RegulationCondition,
  SupplyType,
} from '../types/notice';

export const statusLabels: Record<NoticeStatus, string> = {
  open: '접수중',
  upcoming: '접수예정',
  closed: '접수마감',
  announced: '발표완료',
};

export const housingTypeLabels: Record<HousingType, string> = {
  'public-rental': '공공임대',
  'private-sale': '민영주택',
  'public-sale': '공공분양',
  youth: '청년',
  newlywed: '신혼',
};

export const supplyTypeLabels: Record<SupplyType, string> = {
  special: '특별공급',
  general: '일반공급',
  priority: '우선공급',
  remaining: '잔여공급',
};

export const areaRangeLabels: Record<AreaRange, string> = {
  'under-40': '40㎡ 미만',
  '40-59': '40~59㎡',
  '60-84': '60~84㎡',
  'over-85': '85㎡ 이상',
};

export const priceRangeLabels: Record<PriceRange, string> = {
  'under-400m': '4억 미만',
  '400m-700m': '4억~7억',
  '700m-1b': '7억~10억',
  'over-1b': '10억 이상',
};

export const regulationConditionLabels: Record<RegulationCondition, string> = {
  'regulated-area': '규제지역',
  'non-regulated-area': '비규제지역',
  'public-housing-district': '공공택지',
  'price-cap': '분양가상한제',
};

export const calendarEventLabels: Record<CalendarEventType, string> = {
  'application-start': '접수 시작',
  'application-end': '접수 마감',
  winner: '당첨 발표',
  contract: '계약',
};

export function formatKoreanDate(date: string) {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return '확인 필요';
  }
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).format(parsed);
}

export function getDaysUntil(date: string, baseDate = new Date()) {
  const target = new Date(`${date}T00:00:00`);
  if (Number.isNaN(target.getTime())) {
    return 0;
  }
  const base = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
  return Math.ceil((target.getTime() - base.getTime()) / 86_400_000);
}

export function getNoticeStatusLabel(status: NoticeStatus) {
  return statusLabels[status];
}

export function getHousingTypeLabel(type: HousingType) {
  return housingTypeLabels[type];
}

export function getSupplyTypeLabel(type: SupplyType) {
  return supplyTypeLabels[type];
}

export function getAreaRangeLabel(range: AreaRange) {
  return areaRangeLabels[range];
}

export function getPriceRangeLabel(range: PriceRange) {
  return priceRangeLabels[range];
}

export function getRegulationConditionLabel(condition: RegulationCondition) {
  return regulationConditionLabels[condition];
}
