export type NoticeStatus = 'open' | 'upcoming' | 'closed' | 'announced';
export type HousingType =
  | 'public-rental'
  | 'private-sale'
  | 'public-sale'
  | 'youth'
  | 'newlywed';
export type SupplyType = 'special' | 'general' | 'priority' | 'remaining';

export interface UnitSummary {
  areaType: string;
  supplyCount: number;
  estimatedPriceText?: string;
  depositText?: string;
  monthlyRentText?: string;
}

export interface SubscriptionNotice {
  id: string;
  title: string;
  organization: '청약홈' | 'LH' | 'SH' | 'GH' | '기타';
  region: string;
  district: string;
  address?: string;
  housingType: HousingType;
  supplyType: SupplyType;
  status: NoticeStatus;
  applicationStartDate: string;
  applicationEndDate: string;
  winnerAnnouncementDate?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  moveInDateText?: string;
  eligibilitySummary: string[];
  unitSummary: UnitSummary[];
  requiredDocuments: string[];
  sourceUrl: string;
  lastCheckedDate: string;
  featured?: boolean;
}

export interface NoticeFilter {
  query?: string;
  region?: string;
  housingType?: HousingType | 'all';
  supplyType?: SupplyType | 'all';
  status?: NoticeStatus | 'all';
  dateFrom?: string;
  dateTo?: string;
}

export type CalendarEventType =
  | 'application-start'
  | 'application-end'
  | 'winner'
  | 'contract';

export interface CalendarEvent {
  id: string;
  noticeId: string;
  title: string;
  date: string;
  type: CalendarEventType;
  region: string;
  status: NoticeStatus;
}
