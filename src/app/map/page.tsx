'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { supabase, GroupLocation } from '@/lib/supabase';

// Dynamically import map to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => <div className="h-[60vh] bg-gray-200 animate-pulse rounded-lg" />
});

export default function MapPage() {
  const [groupCode, setGroupCode] = useState('');
  const [userName, setUserName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [locations, setLocations] = useState<GroupLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  // Load saved session from localStorage
  useEffect(() => {
    const savedGroup = localStorage.getItem('travelvibes_group');
    const savedName = localStorage.getItem('travelvibes_name');
    if (savedGroup && savedName) {
      setGroupCode(savedGroup);
      setUserName(savedName);
      setIsJoined(true);
    }
  }, []);

  const fetchLocations = useCallback(async () => {
    if (!groupCode || !supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('group_locations')
      .select('*')
      .eq('group_code', groupCode.toUpperCase());

    if (error) {
      setError('Failed to fetch locations');
    } else {
      setLocations(data || []);
    }
    setLoading(false);
  }, [groupCode]);

  // Fetch locations when joined
  useEffect(() => {
    if (isJoined && groupCode) {
      fetchLocations();
    }
  }, [isJoined, groupCode, fetchLocations]);

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupCode.trim() || !userName.trim()) return;

    localStorage.setItem('travelvibes_group', groupCode.toUpperCase());
    localStorage.setItem('travelvibes_name', userName);
    setGroupCode(groupCode.toUpperCase());
    setIsJoined(true);
  };

  const handleLeave = () => {
    localStorage.removeItem('travelvibes_group');
    localStorage.removeItem('travelvibes_name');
    setIsJoined(false);
    setLocations([]);
  };

  const updateMyLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    if (!supabase) {
      setError('Database connection not available');
      return;
    }

    setUpdating(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (!supabase) {
          setError('Database connection not available');
          setUpdating(false);
          return;
        }

        const { latitude, longitude } = position.coords;

        const { error } = await supabase
          .from('group_locations')
          .upsert({
            group_code: groupCode,
            user_name: userName,
            latitude,
            longitude,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'group_code,user_name'
          });

        if (error) {
          setError('Failed to update location');
        } else {
          await fetchLocations();
        }
        setUpdating(false);
      },
      (err) => {
        setError(`Location error: ${err.message}`);
        setUpdating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  if (!isJoined) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Join Your Group</h1>
          <p className="text-gray-600 mb-6">Enter a group code to see your travel companions on the map.</p>

          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label htmlFor="groupCode" className="block text-sm font-medium text-gray-700 mb-1">
                Group Code
              </label>
              <input
                type="text"
                id="groupCode"
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value)}
                placeholder="e.g., FAMILY2024"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g., John"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Join Group
            </button>
          </form>

          <a href="/" className="block text-center text-blue-600 mt-4 hover:underline">
            Back to Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">TravelVibes</h1>
            <p className="text-sm text-gray-600">Group: {groupCode}</p>
          </div>
          <button
            onClick={handleLeave}
            className="text-gray-600 hover:text-gray-900"
          >
            Leave Group
          </button>
        </div>
      </header>

      {/* Map */}
      <div className="p-4">
        <MapView locations={locations} currentUser={userName} />
      </div>

      {/* Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 space-y-3">
        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            onClick={updateMyLocation}
            disabled={updating}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {updating ? 'Updating...' : 'Update My Location'}
          </button>

          <button
            onClick={fetchLocations}
            disabled={loading}
            className="px-4 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition disabled:opacity-50"
          >
            {loading ? '...' : 'Refresh'}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          {locations.length} member{locations.length !== 1 ? 's' : ''} in group
        </p>
      </div>
    </main>
  );
}
