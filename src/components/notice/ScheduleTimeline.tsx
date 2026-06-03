import { formatKoreanDate } from '../../services/formatters';
import type { SubscriptionNotice } from '../../types/notice';

export default function ScheduleTimeline({ notice }: { notice: SubscriptionNotice }) {
  const items = [
    ['접수 시작', notice.applicationStartDate],
    ['접수 마감', notice.applicationEndDate],
    ['당첨 발표', notice.winnerAnnouncementDate],
    ['계약 시작', notice.contractStartDate],
    ['계약 종료', notice.contractEndDate],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <ol className="timeline">
      {items.map(([label, date]) => (
        <li key={label}>
          <strong>{label}</strong>
          <span className="date">{formatKoreanDate(date)}</span>
        </li>
      ))}
    </ol>
  );
}
