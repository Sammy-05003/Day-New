import React from 'react';
import { WEAPONS, AMMUNITION } from '../data/weapons';

interface WeaponSelectorProps {
  selectedWeapon: string;
  selectedAmmo: string;
  onWeaponChange: (weapon: string) => void;
  onAmmoChange: (ammo: string) => void;
}

export default function WeaponSelector({
  selectedWeapon,
  selectedAmmo,
  onWeaponChange,
  onAmmoChange,
}: WeaponSelectorProps) {
  const weapon = WEAPONS.find((w) => w.id === selectedWeapon);
  const ammoOptions = selectedWeapon && AMMUNITION[selectedWeapon] ? AMMUNITION[selectedWeapon] : [];

  if (!WEAPONS || WEAPONS.length === 0) {
    return (
      <div className="text-center p-4 bg-red-500/10 rounded-lg">
        <p className="text-red-400">No weapons data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {WEAPONS.map((w) => (
          <div
            key={w.id}
            onClick={() => onWeaponChange(w.id)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all transform hover:scale-105 ${
              selectedWeapon === w.id
                ? 'border-blue-500 scale-105 shadow-lg shadow-blue-500/50'
                : 'border-transparent hover:border-gray-500'
            }`}
          >
            <div className="relative h-48">
              <img
                src={w.image}
                alt={w.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg">{w.name}</h3>
                <p className="text-gray-200 text-sm">{w.type}</p>
              </div>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-sm">
              <p className="text-gray-300 text-sm">{w.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedWeapon && ammoOptions.length > 0 && (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Select Ammunition</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ammoOptions.map((ammo) => (
              <div
                key={ammo.id}
                onClick={() => onAmmoChange(ammo.id)}
                className={`cursor-pointer rounded-lg overflow-hidden border transition-all ${
                  selectedAmmo === ammo.id
                    ? 'border-blue-500 scale-105 shadow-lg shadow-blue-500/50'
                    : 'border-gray-600 hover:border-gray-400'
                }`}
              >
                <div className="relative h-32">
                  <img
                    src={ammo.image}
                    alt={ammo.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1584552532191-cdc87c607b44?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-medium">{ammo.name}</h4>
                    <p className="text-gray-200 text-sm">{ammo.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}