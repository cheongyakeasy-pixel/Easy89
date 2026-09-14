import { ArrowUpRight, Building2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { money, shortDate, type Apartment } from "@/lib/apartments";
export function StatusBadge({ status }: { readonly status: Apartment["status"] }) {
  return <span className={`status ${status === "접수중" ? "open" : status === "접수마감" ? "closed" : "upcoming"}`}>{status}</span>;
}
export function ApartmentCard({ apartment, saved, onOpen, onSave }: {
  readonly apartment: Apartment; readonly saved: boolean; readonly onOpen: () => void; readonly onSave: () => void;
}) {
  return <article className="apartment-card">
    <div className="card-top"><span className="category">{apartment.category}</span><Button variant="ghost" size="icon" aria-label={`${apartment.name} ${saved ? "관심 해제" : "관심 저장"}`} aria-pressed={saved} onClick={onSave}><Heart className={saved ? "saved" : ""} /></Button></div>
    <button className="card-main" onClick={onOpen}>
      <div className="card-heading"><h3>{apartment.name}</h3><ArrowUpRight size={18} /></div>
      <p className="location">서울 {apartment.district} {apartment.neighborhood}</p>
      <div className="price">{money(apartment.price)}<span>부터</span></div>
      <div className="card-meta"><Building2 size={15} /><span>{apartment.units}세대</span><i />전용 {apartment.area}m²</div>
      <div className="card-bottom"><StatusBadge status={apartment.status} /><span>1순위 <b>{shortDate(apartment.date)}</b></span></div>
    </button>
  </article>;
}
