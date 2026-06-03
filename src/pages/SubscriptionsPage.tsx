import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import NoticeCard from '../components/notice/NoticeCard';
import NoticeFilterBar from '../components/notice/NoticeFilterBar';
import PageHeader from '../components/layout/PageHeader';
import {
  createNoticeSearchParams,
  listNotices,
  parseNoticeFilter,
} from '../services/noticeService';

export default function SubscriptionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = useMemo(() => parseNoticeFilter(searchParams), [searchParams]);
  const results = listNotices(filter);

  return (
    <div className="page-stack">
      <PageHeader
        title="청약 공고"
        description="지역, 상태, 주택 유형을 기준으로 공고를 찾아보세요."
      />
      <NoticeFilterBar
        filter={filter}
        onChange={(nextFilter) => setSearchParams(createNoticeSearchParams(nextFilter))}
        onReset={() => setSearchParams(new URLSearchParams())}
      />
      <p className="result-count">총 {results.length}개 공고</p>
      {results.length > 0 ? (
        <div className="card-grid">
          {results.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
      ) : (
        <EmptyState
          action={
            <Button onClick={() => setSearchParams(new URLSearchParams())} type="button" variant="secondary">
              필터 초기화
            </Button>
          }
          description="지역이나 상태 조건을 줄이면 더 많은 공고를 볼 수 있어요."
          title="조건에 맞는 공고가 없어요."
        />
      )}
    </div>
  );
}
