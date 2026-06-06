import { describe, expect, it } from 'vitest';
import { getCalendarEvents } from './calendarService';
import { listNotices, parseNoticeFilter } from './noticeService';

describe('noticeService', () => {
  it('filters notices by region and status', () => {
    const results = listNotices({ region: '서울', status: 'open' });
    expect(results.every((notice) => notice.region === '서울' && notice.status === 'open')).toBe(true);
  });

  it('filters notices by query', () => {
    const results = listNotices({ query: '마포' });
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toContain('마포');
  });

  it('filters notices by area, price, and regulation condition', () => {
    const results = listNotices({
      areaRange: '60-84',
      priceRange: '700m-1b',
      regulationCondition: 'regulated-area',
    });

    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('applyhome-seoul-private-2026-06');
  });

  it('normalizes invalid query values', () => {
    const filter = parseNoticeFilter(
      new URLSearchParams('status=wrong&housingType=bad&areaRange=huge&priceRange=cheap&regulationCondition=nope'),
    );
    expect(filter.status).toBe('all');
    expect(filter.housingType).toBe('all');
    expect(filter.areaRange).toBe('all');
    expect(filter.priceRange).toBe('all');
    expect(filter.regulationCondition).toBe('all');
  });

  it('creates sorted calendar events', () => {
    const events = getCalendarEvents();
    expect(events.length).toBeGreaterThan(0);
    expect(events.map((event) => event.date)).toEqual(
      [...events.map((event) => event.date)].sort(),
    );
  });
});
