import { useEffect, useState } from 'react';
import { fetchRealEstateNews } from '../services/newsService';
import type { RealEstateNewsResponse } from '../types/news';

const REFRESH_INTERVAL_MS = 60_000;

export function useRealEstateNews() {
  const [data, setData] = useState<RealEstateNewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let controller: AbortController | null = null;

    const loadNews = async () => {
      controller?.abort();
      controller = new AbortController();

      try {
        const news = await fetchRealEstateNews(controller.signal);
        if (!isMounted) {
          return;
        }
        setData(news);
        setError(null);
      } catch (caughtError) {
        if (!isMounted || (caughtError instanceof DOMException && caughtError.name === 'AbortError')) {
          return;
        }
        setError('부동산 뉴스를 불러오지 못했어요.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadNews();
    const intervalId = window.setInterval(loadNews, REFRESH_INTERVAL_MS);

    return () => {
      isMounted = false;
      controller?.abort();
      window.clearInterval(intervalId);
    };
  }, []);

  return { data, error, isLoading };
}
