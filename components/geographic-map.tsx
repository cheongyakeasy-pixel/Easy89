"use client";
import { useEffect, useRef, useState } from "react";
import { LocateFixed, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Apartment } from "@/lib/apartments";
type Point = { readonly x: number; readonly y: number };
function project(lat: number, lng: number, zoom: number): Point {
  const scale = 256 * 2 ** zoom;
  const sin = Math.sin(lat * Math.PI / 180);
  return { x: (lng + 180) / 360 * scale, y: (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * scale };
}
export function GeographicMap({ items, onSelect }: { readonly items: readonly Apartment[]; readonly onSelect: (apartment: Apartment) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<Point | null>(null);
  const [size, setSize] = useState({ width: 1000, height: 800 });
  const [zoom, setZoom] = useState(12);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [tileError, setTileError] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => { if (entry) setSize({ width: entry.contentRect.width, height: entry.contentRect.height }); });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const center = project(37.554, 127.006, zoom);
  const origin = { x: center.x - size.width / 2 - offset.x, y: center.y - size.height / 2 - offset.y };
  const tiles = [];
  for (let x = Math.floor(origin.x / 256); x <= Math.floor((origin.x + size.width) / 256); x++) {
    for (let y = Math.floor(origin.y / 256); y <= Math.floor((origin.y + size.height) / 256); y++) {
      tiles.push(<img key={`${retry}-${zoom}-${x}-${y}`} className="map-tile" src={`https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`} alt="" draggable={false} width={256} height={256} style={{ left: x * 256 - origin.x, top: y * 256 - origin.y }} onLoad={() => setTileError(false)} onError={() => setTileError(true)} />);
    }
  }
  function changeZoom(delta: number) {
    const next = Math.min(15, Math.max(10, zoom + delta));
    const factor = 2 ** (next - zoom);
    setOffset(current => ({ x: current.x * factor, y: current.y * factor }));
    setZoom(next);
  }
  return <div className="geographic-map" ref={ref} role="region" aria-label="서울 청약 단지 지도" tabIndex={0}
    onKeyDown={event => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        setOffset(current => ({ x: current.x + (event.key === "ArrowLeft" ? 60 : event.key === "ArrowRight" ? -60 : 0), y: current.y + (event.key === "ArrowUp" ? 60 : event.key === "ArrowDown" ? -60 : 0) }));
      }
    }} onPointerDown={event => {
      if (event.target instanceof Element && event.target.closest("button, a")) return;
      drag.current = { x: event.clientX, y: event.clientY };
      event.currentTarget.setPointerCapture(event.pointerId);
    }} onPointerMove={event => {
      const previous = drag.current;
      if (!previous) return;
      setOffset(current => ({ x: current.x + event.clientX - previous.x, y: current.y + event.clientY - previous.y }));
      drag.current = { x: event.clientX, y: event.clientY };
    }} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
    {tiles}
    <div className="map-region"><span>서울특별시</span><span className="region-divider" />전체 지역</div>
    {items.map(apartment => {
      const point = project(apartment.lat, apartment.lng, zoom);
      return <button key={apartment.id} className={`map-marker ${apartment.status === "접수중" ? "active" : ""} ${apartment.status === "접수마감" ? "ended" : ""}`} style={{ left: point.x - origin.x, top: point.y - origin.y }} onClick={() => onSelect(apartment)} aria-label={`${apartment.name} 상세 보기`}><span>{apartment.status}</span><strong>{apartment.name}</strong><small>{apartment.area.split(" · ").at(-1)}m² · {apartment.units}세대</small></button>;
    })}
    <div className="map-controls"><Button variant="outline" size="icon-lg" onClick={() => { setZoom(12); setOffset({ x: 0, y: 0 }); }} aria-label="서울 중심으로 이동"><LocateFixed /></Button><div><Button variant="outline" size="icon-lg" onClick={() => changeZoom(1)} disabled={zoom === 15} aria-label="지도 확대"><Plus /></Button><Button variant="outline" size="icon-lg" onClick={() => changeZoom(-1)} disabled={zoom === 10} aria-label="지도 축소"><Minus /></Button></div></div>
    {tileError && <div className="map-error">지도를 불러오지 못했어요.<Button variant="secondary" onClick={() => { setTileError(false); setRetry(current => current + 1); }}>지도 다시 불러오기</Button></div>}
    <div className="map-legend"><span><i className="legend-blue" />접수중</span><span><i />접수예정</span><span><i className="legend-grey" />마감</span></div>
    <div className="map-attribution"><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap</a></div>
  </div>;
}
