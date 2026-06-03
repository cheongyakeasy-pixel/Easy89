import Button from '../ui/Button';
import TextField from '../ui/TextField';
import { getHousingTypeLabel, getNoticeStatusLabel, getSupplyTypeLabel } from '../../services/formatters';
import { getRegions } from '../../services/noticeService';
import type { HousingType, NoticeFilter, NoticeStatus, SupplyType } from '../../types/notice';

interface NoticeFilterBarProps {
  filter: NoticeFilter;
  onChange: (filter: NoticeFilter) => void;
  onReset: () => void;
}

const statuses: Array<NoticeStatus | 'all'> = ['all', 'open', 'upcoming', 'closed', 'announced'];
const housingTypes: Array<HousingType | 'all'> = ['all', 'public-rental', 'private-sale', 'public-sale', 'youth', 'newlywed'];
const supplyTypes: Array<SupplyType | 'all'> = ['all', 'special', 'general', 'priority', 'remaining'];

export default function NoticeFilterBar({ filter, onChange, onReset }: NoticeFilterBarProps) {
  const update = (patch: NoticeFilter) => onChange({ ...filter, ...patch });

  return (
    <section className="filter-bar" aria-label="청약 공고 필터">
      <TextField
        label="검색어"
        onChange={(event) => update({ query: event.target.value })}
        placeholder="지역, 공고명, 기관 검색"
        value={filter.query ?? ''}
      />
      <label className="field">
        <span>지역</span>
        <select value={filter.region ?? 'all'} onChange={(event) => update({ region: event.target.value })}>
          <option value="all">전체</option>
          {getRegions().map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </label>
      <div className="chip-row" aria-label="상태">
        {statuses.map((status) => (
          <button
            className={(filter.status ?? 'all') === status ? 'chip is-active' : 'chip'}
            key={status}
            onClick={() => update({ status })}
            type="button"
          >
            {status === 'all' ? '전체' : getNoticeStatusLabel(status)}
          </button>
        ))}
      </div>
      <div className="filter-grid">
        <label className="field">
          <span>주택 유형</span>
          <select
            value={filter.housingType ?? 'all'}
            onChange={(event) => update({ housingType: event.target.value as HousingType | 'all' })}
          >
            {housingTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'all' ? '전체' : getHousingTypeLabel(type)}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>공급 유형</span>
          <select
            value={filter.supplyType ?? 'all'}
            onChange={(event) => update({ supplyType: event.target.value as SupplyType | 'all' })}
          >
            {supplyTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'all' ? '전체' : getSupplyTypeLabel(type)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Button onClick={onReset} type="button" variant="neutral">
        필터 초기화
      </Button>
    </section>
  );
}
