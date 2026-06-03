import type { ReactNode } from 'react';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({ action, description, title }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <SearchX aria-hidden="true" size={28} />
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
      {action}
    </div>
  );
}
