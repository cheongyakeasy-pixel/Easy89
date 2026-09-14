"use client";
import { Building2, CalendarDays, ExternalLink, Heart, MapPin, X } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/apartment-card";
import { money, type Apartment } from "@/lib/apartments";
export function DetailSheet({ apartment, saved, onClose, onSave }: {
  readonly apartment: Apartment | null; readonly saved: boolean; readonly onClose: () => void; readonly onSave: () => void;
}) {
  return <Sheet open={apartment !== null} onOpenChange={open => { if (!open) onClose(); }}>
    <SheetContent className="detail-sheet" showCloseButton={false}>
      {apartment && <><div className="detail-top"><span>단지 정보</span><SheetClose asChild><Button variant="ghost" size="icon" aria-label="상세 닫기"><X /></Button></SheetClose></div>
      <div className="detail-body"><div className="detail-symbol"><Building2 size={36} /></div><div className="detail-badges"><StatusBadge status={apartment.status} /><span>{apartment.category}</span></div>
      <SheetTitle className="detail-title">{apartment.name}</SheetTitle>
      <SheetDescription className="detail-address"><MapPin size={16} />서울특별시 {apartment.district} {apartment.neighborhood}</SheetDescription>
      <div className="detail-price"><span>분양가 · 예시</span><strong>{money(apartment.price)}</strong><small>최저 공급금액 기준</small></div>
      <dl className="detail-facts"><div><dt>공급 세대수</dt><dd>{apartment.units}세대</dd></div><div><dt>전용 면적</dt><dd>{apartment.area}m²</dd></div><div><dt>공급 유형</dt><dd>{apartment.category}</dd></div></dl>
      <section className="detail-schedule"><h3><CalendarDays size={20} />청약 일정</h3><div><i /><span>1순위 청약 접수</span><b>{apartment.date.replaceAll("-", ".")}</b></div><p>그 외 일정은 실제 모집공고에서 확인해주세요.</p></section>
      <div className="data-notice"><strong>서비스 체험용 단지예요</strong><p>단지명, 위치, 분양가와 일정은 가상 예시입니다. 실제 공급 여부와 자격 조건은 청약홈 모집공고를 확인해주세요.</p></div>
      </div><div className="detail-actions"><Button variant="secondary" className="save-detail" onClick={onSave} aria-pressed={saved}><Heart className={saved ? "saved" : ""} />{saved ? "관심 저장됨" : "관심 저장"}</Button><Button asChild className="official-link"><a href="https://www.applyhome.co.kr/" target="_blank" rel="noreferrer">청약홈 바로가기<ExternalLink /></a></Button><p>관심 단지는 이 기기에만 저장돼요.</p></div></>}
    </SheetContent>
  </Sheet>;
}
