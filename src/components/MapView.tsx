'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GroupLocation } from '@/lib/supabase';

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for current user
const currentUserIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icon for other users
const otherUserIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapViewProps {
  locations: GroupLocation[];
  currentUser: string;
}

function FitBounds({ locations }: { locations: GroupLocation[] }) {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(
        locations.map((loc) => [loc.latitude, loc.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export default function MapView({ locations, currentUser }: MapViewProps) {
  // Default center (will be overridden by FitBounds if locations exist)
  const defaultCenter: [number, number] = [40.7128, -74.006];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={10}
      className="h-[60vh] rounded-lg shadow-lg"
      style={{ height: '60vh' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
          icon={location.user_name === currentUser ? currentUserIcon : otherUserIcon}
        >
          <Popup>
            <div className="text-center">
              <p className="font-bold text-gray-900">
                {location.user_name}
                {location.user_name === currentUser && ' (You)'}
              </p>
              <p className="text-xs text-gray-500">
                {formatTime(location.updated_at)}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {locations.length > 0 && <FitBounds locations={locations} />}
    </MapContainer>
  );
}
