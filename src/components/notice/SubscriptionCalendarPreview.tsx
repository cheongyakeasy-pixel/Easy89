import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Badge from '../ui/Badge';
import { calendarEventLabels } from '../../services/formatters';
import { getCalendarEvents } from '../../services/calendarService';

interface SubscriptionCalendarPreviewProps {
  selectedDate?: string;
  onSelectDate: (date: string) => void;
}

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getMonthDays(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const cells: Array<Date | null> = [];

  for (let index = 0; index < firstDay.getDay(); index += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    cells.push(new Date(year, month, day));
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  return cells;
}

export default function SubscriptionCalendarPreview({
  onSelectDate,
  selectedDate,
}: SubscriptionCalendarPreviewProps) {
  const [viewDate, setViewDate] = useState(() => {
    const firstEvent = getCalendarEvents()[0];
    return firstEvent ? new Date(`${firstEvent.date}T00:00:00`) : new Date();
  });

  const events = useMemo(() => getCalendarEvents(), []);
  const eventsByDate = useMemo(() => {
    return events.reduce<Record<string, typeof events>>((acc, event) => {
      acc[event.date] = [...(acc[event.date] ?? []), event];
      return acc;
    }, {});
  }, [events]);

  const monthDays = getMonthDays(viewDate);
  const monthLabel = `${viewDate.getFullYear()}년 ${viewDate.getMonth() + 1}월`;
  const todayKey = toDateKey(new Date());

  const moveMonth = (amount: number) => {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  };

  return (
    <section className="calendar-preview" aria-label="청약리스트 캘린더">
      <div className="calendar-preview__intro">
        <div>
          <p className="eyebrow">캘린더</p>
          <h1>청약 일정을 먼저 확인하세요.</h1>
          <p>접수 시작, 접수 마감, 당첨 발표일을 달력에서 선택하면 리스트가 해당 날짜로 좁혀집니다.</p>
        </div>
      </div>

      <div className="calendar-preview__chips" aria-label="일정 유형">
        <Badge tone="primary">전체 일정</Badge>
        <Badge tone="positive">접수 시작</Badge>
        <Badge tone="cautionary">접수 마감</Badge>
        <Badge tone="neutral">당첨 발표</Badge>
      </div>

      <div className="calendar-card">
        <div className="calendar-card__header">
          <button aria-label="이전 달" onClick={() => moveMonth(-1)} type="button">
            <ChevronLeft aria-hidden="true" size={20} />
          </button>
          <strong>{monthLabel}</strong>
          <button aria-label="다음 달" onClick={() => moveMonth(1)} type="button">
            <ChevronRight aria-hidden="true" size={20} />
          </button>
        </div>

        <div className="calendar-weekdays">
          {weekdays.map((weekday) => (
            <span key={weekday}>{weekday}</span>
          ))}
        </div>

        <div className="calendar-grid" role="grid" aria-label={monthLabel}>
          {monthDays.map((date, index) => {
            if (!date) {
              return <div className="calendar-cell calendar-cell--empty" key={`empty-${index}`} />;
            }

            const dateKey = toDateKey(date);
            const dayEvents = eventsByDate[dateKey] ?? [];
            const isSelected = selectedDate === dateKey;
            const isToday = todayKey === dateKey;

            return (
              <button
                className={`calendar-cell ${isSelected ? 'is-selected' : ''} ${isToday ? 'is-today' : ''}`}
                key={dateKey}
                onClick={() => onSelectDate(dateKey)}
                type="button"
              >
                <span className="calendar-cell__day">{date.getDate()}</span>
                <span className="calendar-cell__events">
                  {dayEvents.slice(0, 2).map((event) => (
                    <span className={`calendar-event-dot calendar-event-dot--${event.type}`} key={event.id}>
                      <span className="calendar-event-dot__label">
                        {calendarEventLabels[event.type]} · {event.title}
                      </span>
                    </span>
                  ))}
                  {dayEvents.length > 2 ? <em>+{dayEvents.length - 2}</em> : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
