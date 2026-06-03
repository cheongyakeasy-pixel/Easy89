import type { CalendarEventType, HousingType, NoticeStatus, SupplyType } from '../types/notice';

export const statusLabels: Record<NoticeStatus, string> = {
  open: '접수 중',
  upcoming: '접수 예정',
  closed: '접수 마감',
  announced: '발표 완료',
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
