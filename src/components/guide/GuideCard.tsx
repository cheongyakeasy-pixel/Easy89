import Card from '../ui/Card';
import ChecklistBlock from './ChecklistBlock';
import type { Guide } from '../../types/guide';

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Card>
      <p className="eyebrow">{guide.category}</p>
      <h3>{guide.title}</h3>
      <p>{guide.summary}</p>
      {guide.sections[0]?.checklist ? <ChecklistBlock items={guide.sections[0].checklist} /> : null}
    </Card>
  );
}
