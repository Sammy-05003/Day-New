import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Environment } from '@react-three/drei';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Replace with your Mapbox token
mapboxgl.accessToken = 'your_mapbox_token';

const StateMap = ({ state }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(78.9629);
  const [lat, setLat] = useState(20.5937);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [lng, lat],
      zoom: zoom,
      projection: 'globe'
    });

    map.current.on('load', () => {
      // Add state boundary layer
      map.current.addSource('state-boundary', {
        type: 'geojson',
        data: `https://api.mapbox.com/geocoding/v5/mapbox.places/${state}.json?access_token=${mapboxgl.accessToken}&types=region`
      });

      map.current.addLayer({
        id: 'state-boundary-layer',
        type: 'fill',
        source: 'state-boundary',
        paint: {
          'fill-color': '#0080ff',
          'fill-opacity': 0.4
        }
      });

      // Add 3D terrain
      map.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      });

      map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      // Add atmosphere and stars
      map.current.setFog({
        color: 'rgb(186, 210, 235)',
        'high-color': 'rgb(36, 92, 223)',
        'horizon-blend': 0.02,
        'space-color': 'rgb(11, 11, 25)',
        'star-intensity': 0.6
      });
    });

    return () => map.current?.remove();
  }, [state]);

  return (
    <div ref={mapContainer} className="w-full h-full absolute inset-0" />
  );
};

interface Map3DProps {
  selectedState?: string;
  selectedZone?: string;
}

export default function Map3D({ selectedState, selectedZone }: Map3DProps) {
  if (!selectedState) {
    return (
      <div className="w-full h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-xl text-gray-400">Select a state to view its detailed map</div>
          <div className="text-sm text-gray-500">Interactive 3D map with terrain and satellite imagery</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 z-0" />
      <StateMap state={selectedState} />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <div className="text-white text-center">
          <div className="font-bold text-xl">{selectedState}</div>
          <div className="text-sm text-gray-300 mt-1">
            Interactive 3D Map with Terrain
          </div>
        </div>
      </div>
    </div>
  );
}