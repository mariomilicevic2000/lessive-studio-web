"use client"

import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Polygon = dynamic(() => import("react-leaflet").then((mod) => mod.Polygon), { ssr: false })
const CircleMarker = dynamic(() => import("react-leaflet").then((mod) => mod.CircleMarker), { ssr: false })
const Tooltip = dynamic(() => import("react-leaflet").then((mod) => mod.Tooltip), { ssr: false })

const FACILITY_POSITION: [number, number] = [43.4724707, 16.650429]

// Hull tracing the actual served settlements (Poljica hinterland + coast),
// rather than a circle that overstates coverage past the real geography.
// Coordinates verified against settlement-level GPS data (geoview.info, mapcarta, db-city).
const DELIVERY_ZONE: [number, number][] = [
  [43.5193, 16.5553], // Žrnovnica
  [43.493, 16.6029], // Srinjine
  [43.4639, 16.71529], // Gata
  [43.4586, 16.6777], // Naklice
  [43.4447, 16.6886], // Omiš
  [43.4465, 16.6351], // Dugi Rat
]

const SETTLEMENTS: { name: string; position: [number, number] }[] = [
  { name: "Žrnovnica", position: [43.5193, 16.5553] },
  { name: "Srinjine", position: [43.493, 16.6029] },
  { name: "Gata", position: [43.4639, 16.71529] },
  { name: "Naklice", position: [43.4586, 16.6777] },
  { name: "Omiš", position: [43.4447, 16.6886] },
  { name: "Dugi Rat", position: [43.4465, 16.6351] },
]

export default function LocationMap() {
  return (
    <div className="h-[400px] w-full grayscale">
      <MapContainer
        center={FACILITY_POSITION}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon
          positions={DELIVERY_ZONE}
          pathOptions={{ color: "#000000", weight: 2, dashArray: "6 6", fillOpacity: 0.05 }}
        />
        {SETTLEMENTS.map((settlement) => (
          <CircleMarker
            key={settlement.name}
            center={settlement.position}
            radius={4}
            pathOptions={{ color: "#000000", fillColor: "#000000", fillOpacity: 0.6, weight: 1 }}
          >
            <Tooltip direction="top" offset={[0, -4]} opacity={1}>
              {settlement.name}
            </Tooltip>
          </CircleMarker>
        ))}
        <CircleMarker
          center={FACILITY_POSITION}
          radius={6}
          pathOptions={{ color: "#000000", fillColor: "#000000", fillOpacity: 1 }}
        >
          <Tooltip direction="top" offset={[0, -6]} opacity={1}>
            Tugare
          </Tooltip>
        </CircleMarker>
      </MapContainer>
    </div>
  )
}
