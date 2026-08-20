"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Listing } from "@/lib/listings";

type Groep = {
  key: string;
  lat: number;
  lng: number;
  precisie: "address" | "city";
  stad: string;
  panden: Listing[];
};

// Precieze pin (2 panden met echte straatnaam): klein, hoekig, ink. Gemeente-
// pin (18 panden zonder straatnaam): groter en lichter, met een telling — zo
// oogt het nooit als een exact adres dat we niet hebben. DivIcon i.p.v. het
// standaard Leaflet-pinnetje, want dat vereist afbeeldingen bundelen die met
// Next/Turbopack niet vanzelf meekomen.
function maakIcon(groep: Groep) {
  if (groep.precisie === "address") {
    return L.divIcon({
      className: "",
      html: `<span style="display:flex;align-items:center;justify-content:center;width:18px;height:18px;background:#1C1B18;border:2px solid #F4F2ED;box-shadow:0 1px 4px rgba(0,0,0,.35);"></span>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
  }
  return L.divIcon({
    className: "",
    html: `<span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:#6B6146;color:#F4F2ED;font:600 12px Inter,sans-serif;box-shadow:0 1px 6px rgba(0,0,0,.35);">${groep.panden.length}</span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

export default function AanbodMap({ listings }: { listings: Listing[] }) {
  const groepen = useMemo<Groep[]>(() => {
    const map = new Map<string, Groep>();
    for (const l of listings) {
      if (!l.location) continue;
      const key =
        l.location.precision === "address" ? `adres-${l.slug}` : `stad-${l.city}`;
      const bestaand = map.get(key);
      if (bestaand) {
        bestaand.panden.push(l);
      } else {
        map.set(key, {
          key,
          lat: l.location.lat,
          lng: l.location.lng,
          precisie: l.location.precision,
          stad: l.city,
          panden: [l],
        });
      }
    }
    return Array.from(map.values());
  }, [listings]);

  if (!groepen.length) return null;

  return (
    <div className="frere-map h-[560px] w-full overflow-hidden border border-ink/10">
      <MapContainer
        center={[51.0, 5.55]}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Carto Positron: rustige, licht-grijze basis (geen key, gratis) —
            gecombineerd met de sepia-tint in globals.css leest hij warmer,
            dichter bij het taupe/ink-kader van de site dan standaard OSM-tiles. */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-medewerkers &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />
        {groepen.map((groep) => (
          <Marker key={groep.key} position={[groep.lat, groep.lng]} icon={maakIcon(groep)}>
            <Popup>
              <div className="min-w-[180px] font-body">
                {groep.precisie === "city" && (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-support">
                    Gemeente {groep.stad} — indicatieve ligging
                  </p>
                )}
                <ul className="space-y-1.5">
                  {groep.panden.map((p) => (
                    <li key={p.slug} className="text-sm text-ink">
                      <span className="font-semibold">{p.type}</span>{" "}
                      <span className="tabular">{p.priceLabel}</span>
                      {p.street ? <span className="block text-xs text-support">{p.street}</span> : null}
                    </li>
                  ))}
                </ul>
                <a
                  href={`/aanbod?stad=${encodeURIComponent(groep.stad)}`}
                  className="mt-3 inline-block text-xs font-semibold text-accent-deep underline decoration-1 underline-offset-4"
                >
                  Bekijk in lijst
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
