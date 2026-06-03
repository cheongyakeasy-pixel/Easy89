import type { Guide } from '../types/guide';

export const guides: Guide[] = [
  {
    id: 'basic',
    title: '청약이 처음이라면 먼저 볼 것',
    category: 'basic',
    summary: '청약통장, 공급유형, 공고문에서 먼저 확인할 항목을 정리합니다.',
    sections: [
      {
        heading: '공고문에서 먼저 볼 항목',
        body: '지역, 공급유형, 접수일, 당첨자 발표일, 자격 기준, 제출 서류를 먼저 확인하세요.',
        checklist: ['접수 기간 확인', '공급 유형 확인', '공식 출처 저장'],
      },
    ],
    relatedLinks: [{ label: '청약홈', url: 'https://www.applyhome.co.kr' }],
  },
  {
    id: 'eligibility',
    title: '자격 확인 순서',
    category: 'eligibility',
    summary: '무주택, 세대구성, 거주지, 소득과 자산 기준을 순서대로 확인합니다.',
    sections: [
      {
        heading: '자격은 단정하지 말고 확인하세요',
        body: '청약이지는 판단을 대신하지 않습니다. 공고문 기준과 공식 사이트 안내를 함께 확인해야 합니다.',
        checklist: ['무주택 요건', '지역 우선공급', '소득 기준', '자산 기준'],
      },
    ],
    relatedLinks: [{ label: 'LH청약플러스', url: 'https://apply.lh.or.kr' }],
  },
  {
    id: 'score',
    title: '가점과 순위 이해하기',
    category: 'score',
    summary: '민영주택과 공공주택에서 자주 나오는 순위와 가점 항목을 구분합니다.',
    sections: [
      {
        heading: '가점은 항목별 근거가 필요해요',
        body: '부양가족, 무주택 기간, 청약통장 가입기간 등은 공고별 계산 기준을 확인해야 합니다.',
      },
    ],
    relatedLinks: [{ label: '청약홈 가점 안내', url: 'https://www.applyhome.co.kr' }],
  },
  {
    id: 'documents',
    title: '서류 준비 체크리스트',
    category: 'documents',
    summary: '주민등록등본, 가족관계증명서, 소득 증빙 등 자주 필요한 서류를 정리합니다.',
    sections: [
      {
        heading: '발급일 기준을 확인하세요',
        body: '공고마다 서류 발급 인정 기간이 다를 수 있습니다. 제출 전 공고문 기준일을 확인하세요.',
        checklist: ['주민등록등본', '가족관계증명서', '소득금액증명', '청약통장 가입확인서'],
      },
    ],
    relatedLinks: [{ label: '정부24', url: 'https://www.gov.kr' }],
  },
  {
    id: 'process',
    title: '신청부터 계약까지 흐름',
    category: 'process',
    summary: '공고 확인, 접수, 당첨자 발표, 서류 제출, 계약까지 흐름을 봅니다.',
    sections: [
      {
        heading: '일정은 캘린더에 따로 기록하세요',
        body: '접수 마감, 당첨자 발표, 서류 제출, 계약 일정은 각각 다르므로 같은 공고 안에서도 나눠 확인해야 합니다.',
      },
    ],
    relatedLinks: [{ label: 'SH서울주택도시공사', url: 'https://www.i-sh.co.kr' }],
  },
];
