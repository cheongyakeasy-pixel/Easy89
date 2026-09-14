export type Apartment = {
  readonly id: string; readonly name: string; readonly district: string; readonly neighborhood: string;
  readonly lat: number; readonly lng: number; readonly price: number; readonly units: number;
  readonly area: string; readonly date: string;
  readonly status: "접수중" | "접수예정" | "접수마감";
  readonly category: "민간분양" | "공공분양";
};
export const apartments: readonly Apartment[] = [
  { id: "seongsu", name: "성수 리버포레", district: "성동구", neighborhood: "성수동", lat: 37.5445, lng: 127.0447, price: 1240000000, units: 248, area: "59 · 84", date: "2026-09-14", status: "접수중", category: "민간분양" },
  { id: "mapo", name: "마포 센트럴파크", district: "마포구", neighborhood: "아현동", lat: 37.5538, lng: 126.9558, price: 980000000, units: 164, area: "59 · 74 · 84", date: "2026-09-15", status: "접수중", category: "민간분양" },
  { id: "jangwi", name: "장위 그린스퀘어", district: "성북구", neighborhood: "장위동", lat: 37.615, lng: 127.047, price: 720000000, units: 326, area: "49 · 59 · 84", date: "2026-09-21", status: "접수예정", category: "공공분양" },
  { id: "bangbae", name: "방배 포레스트힐", district: "서초구", neighborhood: "방배동", lat: 37.481, lng: 126.993, price: 1680000000, units: 192, area: "59 · 84 · 114", date: "2026-09-22", status: "접수예정", category: "민간분양" },
  { id: "godeok", name: "고덕 어반테라스", district: "강동구", neighborhood: "고덕동", lat: 37.558, lng: 127.151, price: 870000000, units: 418, area: "59 · 84", date: "2026-09-24", status: "접수예정", category: "공공분양" },
  { id: "yeongdeungpo", name: "여의 리버스테이", district: "영등포구", neighborhood: "신길동", lat: 37.509, lng: 126.923, price: 910000000, units: 156, area: "59 · 74", date: "2026-09-28", status: "접수예정", category: "민간분양" },
  { id: "eunpyeong", name: "은평 북한산뷰", district: "은평구", neighborhood: "불광동", lat: 37.616, lng: 126.931, price: 640000000, units: 284, area: "49 · 59 · 74", date: "2026-09-07", status: "접수마감", category: "공공분양" },
  { id: "dongdaemun", name: "청량리 스카이가든", district: "동대문구", neighborhood: "전농동", lat: 37.578, lng: 127.056, price: 830000000, units: 210, area: "59 · 84", date: "2026-09-17", status: "접수예정", category: "민간분양" },
] as const;
export const money = (value: number) => `${value.toLocaleString("ko-KR")}원`;
export const shortDate = (date: string) => `${Number(date.slice(5, 7))}.${date.slice(8)}`;
