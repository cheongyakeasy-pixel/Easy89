import GuideCard from '../components/guide/GuideCard';
import PageHeader from '../components/layout/PageHeader';
import { listGuides } from '../services/guideService';

export default function GuidePage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="청약 가이드"
        description="공고를 보기 전에 알아두면 좋은 기본 개념과 준비 항목입니다."
      />
      <div className="card-grid">
        {listGuides().map((guide) => (
          <GuideCard guide={guide} key={guide.id} />
        ))}
      </div>
    </div>
  );
}
