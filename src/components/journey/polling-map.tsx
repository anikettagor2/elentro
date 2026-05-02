"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Fix for default marker icons in React Leaflet
const icon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function PollingMap() {
  const [position, setPosition] = useState<[number, number]>([28.6139, 77.2090]); // Delhi

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  return (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', background: '#09090b' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>
            <div className="text-black font-sans">
              <p className="font-bold">Your Potential Polling Station</p>
              <p className="text-xs">Sector 12, Main Hall</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      
      {/* Overlay UI */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-zinc-950/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 max-w-[200px]">
        <h4 className="text-white text-xs font-bold uppercase mb-2">Polling Logistics</h4>
        <p className="text-zinc-500 text-[10px] leading-tight">Finding the nearest ECI verified station based on your coordinates.</p>
      </div>
    </div>
  );
}
