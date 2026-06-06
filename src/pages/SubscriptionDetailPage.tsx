import { ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';
import Badge from '../components/ui/Badge';
import NoticeStatusBadge from '../components/notice/NoticeStatusBadge';
import ScheduleTimeline from '../components/notice/ScheduleTimeline';
import UnitSummaryTable from '../components/notice/UnitSummaryTable';
import KakaoLocationMap from '../components/notice/KakaoLocationMap';
import KakaoShareButton from '../components/notice/KakaoShareButton';
import {
  getHousingTypeLabel,
  getSupplyTypeLabel,
} from '../services/formatters';
import { getNoticeById } from '../services/noticeService';

export default function SubscriptionDetailPage() {
  const { id } = useParams();
  const notice = id ? getNoticeById(id) : undefined;

  if (!notice) {
    return (
      <EmptyState
        action={
          <Link to="/subscriptions">
            <Button variant="secondary">공고 목록 보기</Button>
          </Link>
        }
        description="주소가 바뀌었거나 아직 등록되지 않은 공고일 수 있어요."
        title="공고를 찾을 수 없어요."
      />
    );
  }

  return (
    <article className="page-stack detail-page">
      <header className="detail-header">
        <div className="cluster">
          <Badge tone="primary">{notice.organization}</Badge>
          <NoticeStatusBadge status={notice.status} />
          <Badge>{getSupplyTypeLabel(notice.supplyType)}</Badge>
        </div>
        <h1>{notice.title}</h1>
        <p>
          {notice.region} {notice.district} · {getHousingTypeLabel(notice.housingType)}
        </p>
      </header>

      <div className="detail-grid">
        <div className="page-stack">
          <Card>
            <h2>주요 일정</h2>
            <ScheduleTimeline notice={notice} />
          </Card>
          <Card>
            <h2>자격 확인 포인트</h2>
            <ul className="checklist">
              {notice.eligibilitySummary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2>공급 정보</h2>
            <UnitSummaryTable units={notice.unitSummary} />
          </Card>
          <Card>
            <h2>준비 서류</h2>
            <ul className="checklist">
              {notice.requiredDocuments.map((document) => (
                <li key={document}>{document}</li>
              ))}
            </ul>
          </Card>
        </div>
        <aside className="detail-aside">
          <Card>
            <h2>공식 확인</h2>
            <p className="meta">확인일 {notice.lastCheckedDate}</p>
            <p>청약이지는 정보를 정리해 보여주며, 최종 기준은 공식 공고문입니다.</p>
            <a className="button button--primary button--full" href={notice.sourceUrl} rel="noopener noreferrer" target="_blank">
              공식 공고 보기 <ExternalLink aria-hidden="true" size={16} />
            </a>
            <KakaoShareButton notice={notice} />
          </Card>
        </aside>
      </div>
      <KakaoLocationMap notice={notice} />
    </article>
  );
}
