import Badge from '../ui/Badge';
import type { NoticeStatus } from '../../types/notice';
import { getNoticeStatusLabel } from '../../services/formatters';

const toneByStatus: Record<NoticeStatus, 'positive' | 'cautionary' | 'negative' | 'primary'> = {
  open: 'positive',
  upcoming: 'primary',
  closed: 'negative',
  announced: 'cautionary',
};

export default function NoticeStatusBadge({ status }: { status: NoticeStatus }) {
  return <Badge tone={toneByStatus[status]}>{getNoticeStatusLabel(status)}</Badge>;
}
