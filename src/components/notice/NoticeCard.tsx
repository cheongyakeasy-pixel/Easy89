import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import NoticeStatusBadge from './NoticeStatusBadge';
import { formatKoreanDate, getHousingTypeLabel, getSupplyTypeLabel } from '../../services/formatters';
import type { SubscriptionNotice } from '../../types/notice';

export default function NoticeCard({ notice }: { notice: SubscriptionNotice }) {
  return (
    <Card className="notice-card">
      <div className="row row--between">
        <div className="cluster">
          <Badge tone="primary">{notice.organization}</Badge>
          <Badge>{getSupplyTypeLabel(notice.supplyType)}</Badge>
        </div>
        <NoticeStatusBadge status={notice.status} />
      </div>
      <h3>
        <Link to={`/subscription-detail/${notice.id}`}>{notice.title}</Link>
      </h3>
      <p className="meta">
        {notice.region} {notice.district} · {getHousingTypeLabel(notice.housingType)}
      </p>
      <dl className="notice-card__dates">
        <div>
          <dt>접수</dt>
          <dd className="date">
            {formatKoreanDate(notice.applicationStartDate)} - {formatKoreanDate(notice.applicationEndDate)}
          </dd>
        </div>
      </dl>
      <p>{notice.eligibilitySummary.slice(0, 2).join(' · ')}</p>
    </Card>
  );
}
