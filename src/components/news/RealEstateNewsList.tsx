import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRealEstateNews } from '../../hooks/useRealEstateNews';
import Card from '../ui/Card';
import Skeleton from '../ui/Skeleton';

interface RealEstateNewsListProps {
  limit?: number;
  compact?: boolean;
}

export default function RealEstateNewsList({ compact = false, limit }: RealEstateNewsListProps) {
  const { data, error, isLoading } = useRealEstateNews();
  const items = data?.items.slice(0, limit) ?? [];

  if (isLoading) {
    return (
      <div className={compact ? 'news-list news-list--compact' : 'news-list'}>
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  if (error || items.length === 0) {
    return (
      <Card>
        <p className="meta">{error ?? '새로 표시할 부동산 뉴스가 없어요.'}</p>
        <a className="text-link" href="https://news.naver.com/breakingnews/section/101/260" rel="noopener noreferrer" target="_blank">
          네이버 부동산 뉴스 보기 <ExternalLink aria-hidden="true" size={16} />
        </a>
      </Card>
    );
  }

  return (
    <div className={compact ? 'news-list news-list--compact' : 'news-list'}>
      {items.map((item) => (
        <a className="news-item" href={item.url} key={item.id} rel="noopener noreferrer" target="_blank">
          {item.imageUrl ? <img alt="" loading="lazy" src={item.imageUrl} /> : <span className="news-item__thumb" aria-hidden="true" />}
          <div>
            <strong>{item.title}</strong>
            {item.summary ? <p>{item.summary}</p> : null}
            <span>
              {item.press}
              {item.press && item.publishedAtText ? ' · ' : ''}
              {item.publishedAtText}
            </span>
          </div>
        </a>
      ))}
      {compact ? (
        <Link className="text-link" to="/news">
          부동산뉴스 더보기
        </Link>
      ) : null}
    </div>
  );
}
