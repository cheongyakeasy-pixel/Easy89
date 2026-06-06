import PageHeader from '../components/layout/PageHeader';
import RealEstateNewsList from '../components/news/RealEstateNewsList';

export default function RealEstateNewsPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="부동산뉴스"
        description="네이버 뉴스 경제/부동산 섹션의 최신 기사를 1분마다 갱신해 보여드립니다."
      />
      <RealEstateNewsList />
    </div>
  );
}
