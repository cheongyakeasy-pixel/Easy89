import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import PageHeader from '../components/layout/PageHeader';
import { calendarEventLabels, formatKoreanDate } from '../services/formatters';
import { getCalendarEvents } from '../services/calendarService';

export default function CalendarPage() {
  const events = getCalendarEvents();

  return (
    <div className="page-stack">
      <PageHeader
        title="청약 일정"
        description="접수 시작, 접수 마감, 당첨 발표, 계약 일정을 날짜순으로 확인하세요."
      />
      <Card>
        <div className="event-list event-list--full">
          {events.map((event) => (
            <Link key={event.id} to={`/subscription-detail/${event.noticeId}`}>
              <Badge tone={event.type === 'application-end' ? 'cautionary' : 'primary'}>
                {calendarEventLabels[event.type]}
              </Badge>
              <span>{event.title}</span>
              <em className="date">{formatKoreanDate(event.date)}</em>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
