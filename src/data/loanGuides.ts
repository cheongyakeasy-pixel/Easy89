import type { LoanGuide } from '../types/loan';

export const loanGuides: LoanGuide[] = [
  {
    id: 'jeonse-ready',
    title: '전세자금 준비 전 확인할 것',
    targetUser: '임대주택 또는 전세 전환 가능성을 함께 보는 사용자',
    summary: '보증금 규모, 소득 증빙, 기존 대출, 보증기관 조건을 먼저 확인합니다.',
    keyConditions: ['임대차 계약 형태', '보증금 규모', '소득 증빙 가능 여부', '기존 대출 현황'],
    cautionPoints: ['상품 조건은 시점에 따라 달라질 수 있어요.', '개인 한도는 금융기관 심사가 필요해요.'],
    officialUrl: 'https://nhuf.molit.go.kr',
    lastCheckedDate: '2026-06-03',
  },
  {
    id: 'policy-fund',
    title: '정책자금 조건 확인',
    targetUser: '디딤돌, 버팀목 등 정책자금을 검토하는 사용자',
    summary: '정책자금은 소득, 자산, 주택 가격, 세대 요건이 함께 적용됩니다.',
    keyConditions: ['부부합산 소득', '순자산', '주택 가격', '세대주 여부'],
    cautionPoints: ['청약 당첨과 대출 승인 여부는 별개입니다.', '공식 사이트의 최신 조건을 확인하세요.'],
    officialUrl: 'https://nhuf.molit.go.kr',
    lastCheckedDate: '2026-06-03',
  },
  {
    id: 'credit-income',
    title: '신용과 소득 서류 준비',
    targetUser: '청약 전 자금 계획을 점검하는 사용자',
    summary: '대출 상담 전 소득 증빙, 재직 증빙, 기존 부채 정보를 준비하면 확인이 빨라집니다.',
    keyConditions: ['재직 또는 사업 소득', '소득금액증명', '기존 부채', '신용점수'],
    cautionPoints: ['청약이지는 대출 가능 여부를 판단하지 않습니다.', '금융기관 상담 전 준비 항목으로만 활용하세요.'],
    officialUrl: 'https://www.fss.or.kr',
    lastCheckedDate: '2026-06-03',
  },
];
