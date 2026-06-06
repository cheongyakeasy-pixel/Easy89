import type { RealEstateNewsResponse } from '../types/news';

const NEWS_ENDPOINT = '/api/real-estate-news';

export async function fetchRealEstateNews(signal?: AbortSignal): Promise<RealEstateNewsResponse> {
  const response = await fetch(`${NEWS_ENDPOINT}?t=${Date.now()}`, {
    headers: {
      Accept: 'application/json',
    },
    signal,
  });

  if (!response.ok) {
    throw new Error('부동산 뉴스를 불러오지 못했어요.');
  }

  return response.json() as Promise<RealEstateNewsResponse>;
}
