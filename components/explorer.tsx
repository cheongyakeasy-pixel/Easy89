"use client";
import { useEffect, useState } from "react";
import { useExplorerTools } from "@/components/use-explorer-tools";
import { z } from "zod";
import { ArrowRight, Building2, CalendarDays, ChevronLeft, ChevronRight, Heart, House, Info, List, Map, MapPin, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApartmentCard } from "@/components/apartment-card";
import { DetailSheet } from "@/components/detail-sheet";
import { GeographicMap } from "@/components/geographic-map";
import { apartments, shortDate, type Apartment } from "@/lib/apartments";
const navigation = [{ id: "explore", label: "청약 지도", icon: Map }, { id: "calendar", label: "청약 일정", icon: CalendarDays }, { id: "saved", label: "관심 단지", icon: Heart }] as const;
const savedSchema = z.array(z.string());
export function Explorer() {
  const [view, setView] = useState("explore");
  const [query, setQuery] = useState("");
  useExplorerTools(setQuery);
  const [status, setStatus] = useState("전체");
  const [category, setCategory] = useState("전체 공급");
  const [budget, setBudget] = useState("전체 금액");
  const [sort, setSort] = useState("date");
  const [saved, setSaved] = useState<string[]>([]);
  const [selected, setSelected] = useState<Apartment | null>(null);
  const [mobileMap, setMobileMap] = useState(false);
  const [notice, setNotice] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(new Date(2026, 8, 1));
  useEffect(() => {
    try {
      const parsed = savedSchema.safeParse(JSON.parse(localStorage.getItem("cheongyak-favorites") || "[]"));
      if (parsed.success) setSaved(parsed.data);
    } catch (error) { if (error instanceof Error) setNotice("저장한 관심 단지를 읽지 못했어요. 다시 저장해주세요."); }
  }, []);
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(""), 3000); return () => clearTimeout(timer); }, [notice]);
  function toggleSave(id: string) {
    const next = saved.includes(id) ? saved.filter(value => value !== id) : [...saved, id];
    setSaved(next);
    try { localStorage.setItem("cheongyak-favorites", JSON.stringify(next)); setNotice(next.includes(id) ? "이 기기에 관심 단지를 저장했어요." : "관심 단지에서 해제했어요."); }
    catch (error) { if (error instanceof Error) setNotice("기기 저장공간을 사용할 수 없어 이번 화면에서만 유지돼요."); }
  }
  const savedIds = new Set(saved);
  const items = apartments.filter(apartment =>
    `${apartment.name} 서울 ${apartment.district} ${apartment.neighborhood}`.includes(query.trim()) &&
    (status === "전체" || status === apartment.status) &&
    (category === "전체 공급" || apartment.category === category) &&
    (budget === "전체 금액" || apartment.price <= Number(budget)) &&
    (view !== "saved" || savedIds.has(apartment.id))
  ).toSorted((a, b) => sort === "price" ? a.price - b.price : a.date.localeCompare(b.date));
  const monthPrefix = `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, "0")}`;
  const monthItems = items.filter(item => item.date.startsWith(monthPrefix));
  function clearFilters() { setQuery(""); setStatus("전체"); setCategory("전체 공급"); setBudget("전체 금액"); }
  return <main className="app-shell">
    <header className="app-header"><button className="brand" onClick={() => { setView("explore"); clearFilters(); }} aria-label="청약이지 홈"><span className="brand-symbol"><House size={23} /></span><span>청약<span className="brand-light">이지</span></span></button><span className="header-divider" /><span className="header-tagline">내 집 마련의 시작</span><div className="header-right"><span className="preview-tag">체험 버전</span><a className="official-header" href="https://www.applyhome.co.kr/" target="_blank" rel="noreferrer">청약홈<ArrowRight size={16} /></a></div></header>
    <Tabs className="workspace" value={view} onValueChange={setView}>
      <nav className="nav-rail" aria-label="주 메뉴"><TabsList className="primary-nav">{navigation.map(({ id, label, icon: Icon }) => <TabsTrigger value={id} key={id} className="nav-item"><Icon size={23} /><span>{label}</span>{id === "saved" && saved.length > 0 && <b className="nav-count">{saved.length}</b>}</TabsTrigger>)}</TabsList><div className="nav-bottom"><Building2 size={24} /><span>CHEONGYAK<br />EASY</span></div></nav>
      <div className="content-shell"><div className="filter-bar"><div className="search-box"><Search size={20} /><input aria-label="지역 또는 단지 검색" placeholder="지역, 단지명으로 찾아보세요" value={query} onChange={event => setQuery(event.target.value)} />{query && <button aria-label="검색 지우기" onClick={() => setQuery("")}>×</button>}</div><div className="filter-controls"><span className="filter-label"><SlidersHorizontal size={17} />조건</span><select aria-label="공급 유형" value={category} onChange={event => setCategory(event.target.value)}><option>전체 공급</option><option>민간분양</option><option>공공분양</option></select><select aria-label="분양가 상한" value={budget} onChange={event => setBudget(event.target.value)}><option>전체 금액</option><option value="800000000">800,000,000원 이하</option><option value="1000000000">1,000,000,000원 이하</option><option value="1500000000">1,500,000,000원 이하</option></select><Button variant="ghost" size="icon" aria-label="필터 초기화" onClick={clearFilters}><RotateCcw /></Button></div></div>
      <TabsContent value="explore" className="explore-content"><section className={`results-panel ${mobileMap ? "mobile-hidden" : ""}`}><div className="results-heading"><p className="eyebrow">나에게 맞는 내 집 찾기</p><h1>어디에 살고 싶으세요?</h1><p>관심 있는 동네의 청약을 한눈에 살펴보세요.</p></div><div className="status-filters">{["전체", "접수중", "접수예정", "접수마감"].map(value => <button key={value} onClick={() => setStatus(value)} aria-pressed={status === value} className={status === value ? "selected" : ""}>{value}{value === "접수중" && <i />}</button>)}</div><div className="result-summary"><span>서울 청약 <strong>{items.length}</strong>곳</span><select aria-label="정렬" value={sort} onChange={event => setSort(event.target.value)}><option value="date">청약 일정순</option><option value="price">낮은 분양가순</option></select></div><div className="apartment-list">{items.map(apartment => <ApartmentCard key={apartment.id} apartment={apartment} saved={savedIds.has(apartment.id)} onOpen={() => setSelected(apartment)} onSave={() => toggleSave(apartment.id)} />)}{items.length === 0 && <div className="empty-state"><Search /><h3>조건에 맞는 단지가 없어요</h3><p>지역명이나 검색 조건을 바꿔보세요.</p><Button variant="secondary" onClick={clearFilters}>조건 초기화</Button></div>}</div><div className="sample-note"><Info size={15} /><span>단지·금액·일정은 가상 예시입니다.</span></div></section><section className={`map-panel ${mobileMap ? "mobile-visible" : ""}`}><GeographicMap items={items} onSelect={setSelected} /><div className="map-hint"><MapPin size={18} /><span>지도 속 단지를 눌러 청약 정보를 확인하세요.</span></div></section><Button className="mobile-map-toggle" onClick={() => setMobileMap(!mobileMap)}>{mobileMap ? <List /> : <Map />}{mobileMap ? "목록 보기" : "지도 보기"}</Button></TabsContent>
      <TabsContent value="calendar" className="secondary-content"><div className="page-intro"><p className="eyebrow">일정을 놓치지 않도록</p><h1>청약 캘린더</h1><p>가상 예시 일정입니다. 실제 접수일은 모집공고를 확인해주세요.</p></div><div className="calendar-toolbar"><h2>{calendarMonth.getFullYear()}년 {calendarMonth.getMonth() + 1}월</h2><div><Button variant="ghost" size="icon" aria-label="이전 달" onClick={() => setCalendarMonth(current => new Date(current.getFullYear(), current.getMonth() - 1, 1))}><ChevronLeft /></Button><Button variant="secondary" onClick={() => setCalendarMonth(new Date(2026, 8, 1))}>예시 일정</Button><Button variant="ghost" size="icon" aria-label="다음 달" onClick={() => setCalendarMonth(current => new Date(current.getFullYear(), current.getMonth() + 1, 1))}><ChevronRight /></Button></div></div><div className="calendar-grid">{["일", "월", "화", "수", "목", "금", "토"].map(day => <div key={day} className="weekday">{day}</div>)}{Array.from({ length: calendarMonth.getDay() }, (_, index) => <div className="calendar-day blank" key={`blank-${index}`} />)}{Array.from({ length: new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate() }, (_, index) => <div className="calendar-day" key={`${monthPrefix}-${index + 1}`}><span>{index + 1}</span>{monthItems.filter(item => Number(item.date.slice(8)) === index + 1).map(item => <button key={item.id} onClick={() => setSelected(item)}>{item.name}<small>1순위 청약</small></button>)}</div>)}</div><section className="month-list"><h2>이번 달 청약 {monthItems.length}곳</h2>{monthItems.map(item => <button key={item.id} onClick={() => setSelected(item)}><span>{shortDate(item.date)}</span><strong>{item.name}</strong><ChevronRight size={18} /></button>)}{monthItems.length === 0 && <p>이 달에 등록된 예시 일정이 없어요.</p>}</section></TabsContent>
      <TabsContent value="saved" className="secondary-content"><div className="page-intro"><p className="eyebrow">차곡차곡 모아두는 내 집</p><h1>관심 단지 <span>{items.length}</span></h1><p>이 기기에 저장한 단지를 모아봤어요.</p></div><div className="saved-grid">{items.map(apartment => <ApartmentCard key={apartment.id} apartment={apartment} saved onOpen={() => setSelected(apartment)} onSave={() => toggleSave(apartment.id)} />)}</div>{items.length === 0 && <div className="empty-state"><Heart /><h3>{saved.length ? "검색 조건에 맞는 관심 단지가 없어요" : "아직 관심 단지를 저장하지 않았어요"}</h3><p>마음에 드는 단지의 하트를 눌러보세요.</p><Button onClick={() => { clearFilters(); setView("explore"); }}>청약 단지 둘러보기<ArrowRight /></Button></div>}</TabsContent></div>
    </Tabs><DetailSheet apartment={selected} saved={selected ? saved.includes(selected.id) : false} onClose={() => setSelected(null)} onSave={() => { if (selected) toggleSave(selected.id); }} />{notice && <div className="toast-message" role="status">{notice}</div>}
  </main>;
}
