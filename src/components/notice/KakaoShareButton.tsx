import { MessageCircle } from 'lucide-react';
import Button from '../ui/Button';
import type { SubscriptionNotice } from '../../types/notice';
import { formatKoreanDate, getHousingTypeLabel, getSupplyTypeLabel } from '../../services/formatters';

declare global {
  interface Window {
    Kakao?: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: {
          objectType: 'text';
          text: string;
          link: {
            mobileWebUrl: string;
            webUrl: string;
          };
        }) => void;
      };
    };
  }
}

let kakaoTalkLoader: Promise<void> | null = null;

function loadKakaoTalkSdk() {
  if (window.Kakao) {
    return Promise.resolve();
  }

  if (kakaoTalkLoader) {
    return kakaoTalkLoader;
  }

  kakaoTalkLoader = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-kakao-talk-sdk="true"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => reject(new Error('카카오톡 SDK를 불러오지 못했어요.')));
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.kakaoTalkSdk = 'true';
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('카카오톡 SDK를 불러오지 못했어요.'));
    document.head.appendChild(script);
  });

  return kakaoTalkLoader;
}

function getShareUrl(notice: SubscriptionNotice) {
  if (typeof window === 'undefined') {
    return 'https://cheongyakeasy.vercel.app';
  }
  return `${window.location.origin}/subscription-detail/${notice.id}`;
}

export default function KakaoShareButton({ notice }: { notice: SubscriptionNotice }) {
  const appKey =
    (import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY as string | undefined) ??
    (import.meta.env.VITE_KAKAO_MAP_APP_KEY as string | undefined);

  const shareNotice = async () => {
    if (!appKey) {
      window.alert('카카오 JavaScript 키를 설정하면 카카오톡 공유를 사용할 수 있어요.');
      return;
    }

    try {
      await loadKakaoTalkSdk();

      if (!window.Kakao) {
        throw new Error('카카오톡 SDK가 준비되지 않았어요.');
      }

      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(appKey);
      }

      const url = getShareUrl(notice);
      window.Kakao.Share.sendDefault({
        objectType: 'text',
        text: [
          `[청약이지] ${notice.title}`,
          `${notice.region} ${notice.district} · ${getHousingTypeLabel(notice.housingType)} · ${getSupplyTypeLabel(notice.supplyType)}`,
          `접수 ${formatKoreanDate(notice.applicationStartDate)} - ${formatKoreanDate(notice.applicationEndDate)}`,
        ].join('\n'),
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      });
    } catch {
      window.alert('카카오톡 공유를 시작하지 못했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <Button fullWidth onClick={shareNotice} type="button" variant="secondary">
      <MessageCircle aria-hidden="true" size={16} />
      카카오톡 공유
    </Button>
  );
}
