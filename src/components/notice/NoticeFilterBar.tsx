import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import Button from '../ui/Button';
import {
  getAreaRangeLabel,
  getHousingTypeLabel,
  getNoticeStatusLabel,
  getPriceRangeLabel,
  getRegulationConditionLabel,
  getSupplyTypeLabel,
} from '../../services/formatters';
import { getRegions, listNotices } from '../../services/noticeService';
import type {
  AreaRange,
  HousingType,
  NoticeFilter,
  NoticeStatus,
  PriceRange,
  RegulationCondition,
  SupplyType,
} from '../../types/notice';

interface NoticeFilterBarProps {
  filter: NoticeFilter;
  onChange: (filter: NoticeFilter) => void;
  onReset: () => void;
}

const statuses: Array<NoticeStatus | 'all'> = ['all', 'open', 'upcoming', 'closed', 'announced'];
const housingTypes: Array<HousingType | 'all'> = ['all', 'public-rental', 'private-sale', 'public-sale', 'youth', 'newlywed'];
const supplyTypes: Array<SupplyType | 'all'> = ['all', 'special', 'general', 'priority', 'remaining'];
const areaRanges: Array<AreaRange | 'all'> = ['all', 'under-40', '40-59', '60-84', 'over-85'];
const priceRanges: Array<PriceRange | 'all'> = ['all', 'under-400m', '400m-700m', '700m-1b', 'over-1b'];
const regulationConditions: Array<RegulationCondition | 'all'> = [
  'all',
  'regulated-area',
  'non-regulated-area',
  'public-housing-district',
  'price-cap',
];

interface DropdownOption<T extends string> {
  label: string;
  value: T;
}

function DropdownFilter<T extends string>({
  id,
  isOpen,
  onChange,
  onToggle,
  options,
  title,
  value,
}: {
  id: string;
  isOpen: boolean;
  onChange: (value: T) => void;
  onToggle: (id: string) => void;
  options: Array<DropdownOption<T>>;
  title: string;
  value: T;
}) {
  const selectedOption = options.find((option) => option.value === value);
  const displayText = value === 'all' ? title : selectedOption?.label ?? title;

  return (
    <div className={`filter-dropdown ${isOpen ? 'is-open' : ''}`}>
      <button
        aria-expanded={isOpen}
        aria-label={`${title} 필터`}
        className="filter-dropdown__trigger"
        onClick={() => onToggle(id)}
        type="button"
      >
        <span>{displayText}</span>
        <ChevronDown aria-hidden="true" size={16} />
      </button>
      {isOpen ? (
        <div className="filter-dropdown__menu">
          {options.map((option) => (
            <button
              className={option.value === value ? 'is-active' : undefined}
              key={option.value}
              onClick={() => {
                onChange(option.value);
                onToggle('');
              }}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function NoticeFilterControls({
  filter,
  onChange,
}: {
  filter: NoticeFilter;
  onChange: (patch: NoticeFilter) => void;
}) {
  const [openDropdownId, setOpenDropdownId] = useState('');
  const controlsRef = useRef<HTMLDivElement>(null);
  const statusCounts = useMemo(
    () =>
      statuses.reduce<Record<NoticeStatus | 'all', number>>(
        (counts, status) => ({
          ...counts,
          [status]: listNotices({ ...filter, status }).length,
        }),
        {
          all: 0,
          open: 0,
          upcoming: 0,
          closed: 0,
          announced: 0,
        },
      ),
    [filter],
  );
  const toggleDropdown = (id: string) => {
    setOpenDropdownId((current) => (current === id ? '' : id));
  };

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!controlsRef.current?.contains(event.target as Node)) {
        setOpenDropdownId('');
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, []);

  return (
    <div className="notice-filter-controls" ref={controlsRef}>
      <div className="chip-row" aria-label="상태">
        {statuses.map((status) => (
          <button
            className={(filter.status ?? 'all') === status ? 'chip is-active' : 'chip'}
            key={status}
            onClick={() => {
              setOpenDropdownId('');
              onChange({ status });
            }}
            type="button"
          >
            <span>{status === 'all' ? '전체' : getNoticeStatusLabel(status)}</span>
            <span className="chip__count">({statusCounts[status]})</span>
          </button>
        ))}
      </div>
      <div className="filter-grid">
        <DropdownFilter
          id="region"
          isOpen={openDropdownId === 'region'}
          title="지역"
          value={filter.region ?? 'all'}
          onChange={(region) => onChange({ region })}
          onToggle={toggleDropdown}
          options={[
            { label: '전체', value: 'all' },
            ...getRegions().map((region) => ({ label: region, value: region })),
          ]}
        />
        <DropdownFilter
          id="housingType"
          isOpen={openDropdownId === 'housingType'}
          title="모집유형"
          value={filter.housingType ?? 'all'}
          onChange={(housingType) => onChange({ housingType })}
          onToggle={toggleDropdown}
          options={housingTypes.map((type) => ({
            label: type === 'all' ? '전체' : getHousingTypeLabel(type),
            value: type,
          }))}
        />
        <DropdownFilter
          id="areaRange"
          isOpen={openDropdownId === 'areaRange'}
          title="전용면적"
          value={filter.areaRange ?? 'all'}
          onChange={(areaRange) => onChange({ areaRange })}
          onToggle={toggleDropdown}
          options={areaRanges.map((range) => ({
            label: range === 'all' ? '전체' : getAreaRangeLabel(range),
            value: range,
          }))}
        />
        <DropdownFilter
          id="supplyType"
          isOpen={openDropdownId === 'supplyType'}
          title="분양유형"
          value={filter.supplyType ?? 'all'}
          onChange={(supplyType) => onChange({ supplyType })}
          onToggle={toggleDropdown}
          options={supplyTypes.map((type) => ({
            label: type === 'all' ? '전체' : getSupplyTypeLabel(type),
            value: type,
          }))}
        />
        <DropdownFilter
          id="priceRange"
          isOpen={openDropdownId === 'priceRange'}
          title="분양가"
          value={filter.priceRange ?? 'all'}
          onChange={(priceRange) => onChange({ priceRange })}
          onToggle={toggleDropdown}
          options={priceRanges.map((range) => ({
            label: range === 'all' ? '전체' : getPriceRangeLabel(range),
            value: range,
          }))}
        />
        <DropdownFilter
          id="regulationCondition"
          isOpen={openDropdownId === 'regulationCondition'}
          title="규제조건"
          value={filter.regulationCondition ?? 'all'}
          onChange={(regulationCondition) => onChange({ regulationCondition })}
          onToggle={toggleDropdown}
          options={regulationConditions.map((condition) => ({
            label: condition === 'all' ? '전체' : getRegulationConditionLabel(condition),
            value: condition,
          }))}
        />
      </div>
    </div>
  );
}

export default function NoticeFilterBar({ filter, onChange, onReset }: NoticeFilterBarProps) {
  const update = (patch: NoticeFilter) => onChange({ ...filter, ...patch });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [draftFilter, setDraftFilter] = useState(filter);

  useEffect(() => {
    if (!isSheetOpen) {
      setDraftFilter(filter);
    }
  }, [filter, isSheetOpen]);

  useEffect(() => {
    if (!isSheetOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSheetOpen]);

  const updateDraft = (patch: NoticeFilter) => setDraftFilter((current) => ({ ...current, ...patch }));

  return (
    <>
      <section className="filter-bar filter-bar--desktop" aria-label="청약리스트 필터">
        <div className="filter-controls">
          <NoticeFilterControls filter={filter} onChange={update} />
          <Button onClick={onReset} type="button" variant="neutral">
            필터 초기화
          </Button>
        </div>
      </section>

      <section className="filter-mobile" aria-label="청약리스트 모바일 필터">
        <Button
          className="filter-mobile__trigger"
          fullWidth
          onClick={() => {
            setDraftFilter(filter);
            setIsSheetOpen(true);
          }}
          type="button"
          variant="secondary"
        >
          <SlidersHorizontal aria-hidden="true" size={18} />
          필터 설정
        </Button>
      </section>

      {isSheetOpen ? (
        <div className="filter-sheet" role="presentation">
          <button
            aria-label="필터 닫기"
            className="filter-sheet__scrim"
            onClick={() => setIsSheetOpen(false)}
            type="button"
          />
          <section aria-label="청약리스트 필터 설정" aria-modal="true" className="filter-sheet__panel" role="dialog">
            <div className="filter-sheet__header">
              <h2>필터 설정</h2>
              <button aria-label="필터 닫기" onClick={() => setIsSheetOpen(false)} type="button">
                <X aria-hidden="true" size={20} />
              </button>
            </div>
            <div className="filter-sheet__body">
              <NoticeFilterControls filter={draftFilter} onChange={updateDraft} />
            </div>
            <div className="filter-sheet__actions">
              <Button
                onClick={() => {
                  onReset();
                  setDraftFilter({});
                  setIsSheetOpen(false);
                }}
                type="button"
                variant="neutral"
              >
                초기화
              </Button>
              <Button
                onClick={() => {
                  onChange(draftFilter);
                  setIsSheetOpen(false);
                }}
                type="button"
              >
                적용
              </Button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
