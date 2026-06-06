import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import NoticeCard from '../components/notice/NoticeCard';
import PageHeader from '../components/layout/PageHeader';
import RealEstateNewsList from '../components/news/RealEstateNewsList';
import { calendarEventLabels, formatKoreanDate } from '../services/formatters';
import { getUpcomingEvents } from '../services/calendarService';
import { getFeaturedNotices } from '../services/noticeService';

export default function HomePage() {
  const featuredNotices = getFeaturedNotices();
  const upcomingEvents = getUpcomingEvents(4);

  return (
    <div className="page-stack">
      <section className="hero">
        <p className="eyebrow">주택청약 정보 탐색</p>
        <h1>놓치기 쉬운 청약 일정과 공고를 한눈에 확인하세요.</h1>
        <p>
          청약이지는 공식 정보를 확인하기 전, 접수 일정과 자격 확인 포인트를 빠르게 정리해 보는
          반응형 정보 서비스입니다.
        </p>
        <div className="hero__actions">
          <Link to="/subscriptions">
            <Button>청약리스트 보기</Button>
          </Link>
          <Link to="/guide">
            <Button variant="secondary">청약 가이드</Button>
          </Link>
        </div>
      </section>

      <section className="section">
        <PageHeader title="주요 공고" description="현재 접수 중이거나 곧 접수할 공고입니다." />
        <div className="card-grid">
          {featuredNotices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
      </section>

      <section className="section two-column">
        <Card>
          <h2>마감 임박 일정</h2>
          <div className="event-list">
            {upcomingEvents.map((event) => (
              <Link key={event.id} to={`/subscription-detail/${event.noticeId}`}>
                <strong>{calendarEventLabels[event.type]}</strong>
                <span>{event.title}</span>
                <em className="date">{formatKoreanDate(event.date)}</em>
              </Link>
            ))}
          </div>
        </Card>
        <Card>
          <h2>자금 준비도 함께 확인하세요</h2>
          <p>
            대출 조건은 상품과 시점에 따라 달라질 수 있어요. 청약 전 필요한 서류와 공식 확인 경로를
            먼저 정리해 보세요.
          </p>
          <Link to="/loan">
            <Button fullWidth variant="secondary">
              대출 정보 확인
            </Button>
          </Link>
        </Card>
      </section>

      <section className="section">
        <PageHeader title="부동산뉴스" description="네이버 뉴스 경제/부동산 섹션의 최신 흐름을 확인하세요." />
        <RealEstateNewsList compact limit={4} />
      </section>
    </div>
  );
}
