import { listNotices } from './noticeService';
import type { CalendarEvent, NoticeFilter, SubscriptionNotice } from '../types/notice';

function eventsFromNotice(notice: SubscriptionNotice): CalendarEvent[] {
  const events: CalendarEvent[] = [
    {
      id: `${notice.id}-start`,
      noticeId: notice.id,
      title: notice.title,
      date: notice.applicationStartDate,
      type: 'application-start',
      region: notice.region,
      status: notice.status,
    },
    {
      id: `${notice.id}-end`,
      noticeId: notice.id,
      title: notice.title,
      date: notice.applicationEndDate,
      type: 'application-end',
      region: notice.region,
      status: notice.status,
    },
  ];

  if (notice.winnerAnnouncementDate) {
    events.push({
      id: `${notice.id}-winner`,
      noticeId: notice.id,
      title: notice.title,
      date: notice.winnerAnnouncementDate,
      type: 'winner',
      region: notice.region,
      status: notice.status,
    });
  }

  if (notice.contractStartDate) {
    events.push({
      id: `${notice.id}-contract`,
      noticeId: notice.id,
      title: notice.title,
      date: notice.contractStartDate,
      type: 'contract',
      region: notice.region,
      status: notice.status,
    });
  }

  return events;
}

export function getCalendarEvents(filter: NoticeFilter = {}) {
  return listNotices(filter)
    .flatMap(eventsFromNotice)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getUpcomingEvents(limit = 5) {
  const today = new Date().toISOString().slice(0, 10);
  return getCalendarEvents()
    .filter((event) => event.date >= today)
    .slice(0, limit);
}
