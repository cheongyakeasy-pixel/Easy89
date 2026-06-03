import LoanGuideCard from '../components/loan/LoanGuideCard';
import Card from '../components/ui/Card';
import PageHeader from '../components/layout/PageHeader';
import { listLoanGuides } from '../services/guideService';

export default function LoanPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="대출 정보"
        description="청약 전 자금 준비와 대출 확인 포인트를 정리합니다."
      />
      <Card className="notice-card">
        <h2>개인별 대출 가능 여부를 판단하지 않아요</h2>
        <p>
          청약이지의 대출 정보는 준비 항목 안내입니다. 실제 조건, 한도, 금리는 금융기관과 공식
          사이트에서 확인해야 합니다.
        </p>
      </Card>
      <div className="card-grid">
        {listLoanGuides().map((guide) => (
          <LoanGuideCard guide={guide} key={guide.id} />
        ))}
      </div>
    </div>
  );
}
