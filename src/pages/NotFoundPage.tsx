import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';

export default function NotFoundPage() {
  return (
    <EmptyState
      action={
        <Link to="/">
          <Button variant="secondary">홈으로 이동</Button>
        </Link>
      }
      description="주소를 다시 확인하거나 홈에서 필요한 정보를 찾아보세요."
      title="페이지를 찾을 수 없어요."
    />
  );
}
