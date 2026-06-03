import { ExternalLink } from 'lucide-react';
import Card from '../ui/Card';
import type { LoanGuide } from '../../types/loan';

export default function LoanGuideCard({ guide }: { guide: LoanGuide }) {
  return (
    <Card>
      <p className="eyebrow">{guide.targetUser}</p>
      <h3>{guide.title}</h3>
      <p>{guide.summary}</p>
      <h4>확인할 조건</h4>
      <ul className="checklist">
        {guide.keyConditions.map((condition) => (
          <li key={condition}>{condition}</li>
        ))}
      </ul>
      <p className="meta">확인일 {guide.lastCheckedDate}</p>
      <a className="text-link" href={guide.officialUrl} rel="noopener noreferrer" target="_blank">
        공식 정보 확인 <ExternalLink aria-hidden="true" size={16} />
      </a>
    </Card>
  );
}
