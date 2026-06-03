import type { PropsWithChildren } from 'react';

type BadgeTone = 'primary' | 'neutral' | 'positive' | 'cautionary' | 'negative';

interface BadgeProps {
  tone?: BadgeTone;
}

export default function Badge({ children, tone = 'neutral' }: PropsWithChildren<BadgeProps>) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}
