import { useEffect, useMemo, useRef, useState } from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import Card from '../ui/Card';
import type { SubscriptionNotice } from '../../types/notice';

declare global {
  interface Window {
    kakao?: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: unknown) => unknown;
        LatLng: new (lat: number, lng: number) => unknown;
        Marker: new (options: unknown) => { setMap: (map: unknown) => void };
        InfoWindow: new (options: unknown) => { open: (map: unknown, marker: unknown) => void };
        services: {
          Status: {
            OK: string;
          };
          Geocoder: new () => {
            addressSearch: (
              address: string,
              callback: (result: Array<{ x: string; y: string }>, status: string) => void,
            ) => void;
          };
        };
      };
    };
  }
}

let kakaoMapsLoader: Promise<void> | null = null;

function loadKakaoMaps(appKey: string) {
  if (window.kakao?.maps) {
    return Promise.resolve();
  }

  if (kakaoMapsLoader) {
    return kakaoMapsLoader;
  }

  kakaoMapsLoader = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-kakao-map-sdk="true"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => window.kakao?.maps.load(resolve));
      existingScript.addEventListener('error', () => reject(new Error('카카오맵 SDK를 불러오지 못했어요.')));
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.dataset.kakaoMapSdk = 'true';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services&autoload=false`;
    script.onload = () => window.kakao?.maps.load(resolve);
    script.onerror = () => reject(new Error('카카오맵 SDK를 불러오지 못했어요.'));
    document.head.appendChild(script);
  });

  return kakaoMapsLoader;
}

export default function KakaoLocationMap({ notice }: { notice: SubscriptionNotice }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState('지도를 불러오는 중입니다.');
  const appKey =
    (import.meta.env.VITE_KAKAO_MAP_APP_KEY as string | undefined) ??
    (import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY as string | undefined);
  const address = useMemo(
    () => notice.address ?? `${notice.region} ${notice.district}`,
    [notice.address, notice.district, notice.region],
  );
  const kakaoMapSearchUrl = useMemo(
    () => `https://map.kakao.com/link/search/${encodeURIComponent(address)}`,
    [address],
  );

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (!appKey) {
      setMessage('카카오맵 API 키를 설정하면 위치 지도가 표시됩니다.');
      return;
    }

    let isMounted = true;

    loadKakaoMaps(appKey)
      .then(() => {
        if (!isMounted || !window.kakao?.maps || !mapRef.current) {
          return;
        }

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result, status) => {
          if (!isMounted || !window.kakao?.maps || !mapRef.current) {
            return;
          }

          if (status !== window.kakao.maps.services.Status.OK || result.length === 0) {
            setMessage('주소를 지도에서 찾지 못했어요. 공식 공고의 위치 정보를 함께 확인하세요.');
            return;
          }

          const position = new window.kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
          const map = new window.kakao.maps.Map(mapRef.current, {
            center: position,
            level: 4,
          });
          const marker = new window.kakao.maps.Marker({ position });
          marker.setMap(map);
          const infoWindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:8px 10px;font-size:12px;font-weight:700;white-space:nowrap;">${notice.title}</div>`,
          });
          infoWindow.open(map, marker);
          setMessage('');
        });
      })
      .catch(() => {
        if (isMounted) {
          setMessage('카카오맵을 불러오지 못했어요. 잠시 후 다시 확인해주세요.');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [address, appKey, notice.title]);

  return (
    <Card className="location-map-card">
      <div className="location-map-card__header">
        <div>
          <p className="eyebrow">위치</p>
          <h2>매물 위치</h2>
          <p>
            <MapPin aria-hidden="true" size={16} />
            {address}
          </p>
        </div>
        <a className="button button--secondary location-map-card__link" href={kakaoMapSearchUrl} rel="noopener noreferrer" target="_blank">
          카카오맵 열기 <ExternalLink aria-hidden="true" size={16} />
        </a>
      </div>
      <div className="kakao-map" ref={mapRef} aria-label={`${notice.title} 위치 지도`}>
        {message ? <p>{message}</p> : null}
      </div>
      <p className="meta">지도 위치는 주소 검색 결과 기준입니다. 최종 위치는 공식 공고문을 확인하세요.</p>
    </Card>
  );
}
