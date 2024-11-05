import React from 'react';
import { AlertTriangle, TrendingUp, Package } from 'lucide-react';
import { WEAPONS, AMMUNITION } from '../data/weapons';

export default function StockMonitor() {
  const getCriticalItems = () => {
    const criticalWeapons = WEAPONS.filter(w => w.stock <= w.criticalLevel);
    const criticalAmmo = Object.values(AMMUNITION).flat()
      .filter(a => a.stock <= a.criticalLevel);
    return { weapons: criticalWeapons, ammo: criticalAmmo };
  };

  const { weapons: criticalWeapons, ammo: criticalAmmo } = getCriticalItems();

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-md rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <AlertTriangle className="mr-2 text-red-500" />
          Critical Stock Levels
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Weapons</h4>
            {criticalWeapons.map(weapon => (
              <div key={weapon.id} className="mb-4 bg-red-500/10 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{weapon.name}</p>
                    <p className="text-sm text-gray-300">{weapon.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-400">Stock: {weapon.stock}</p>
                    <p className="text-sm text-gray-300">Critical: {weapon.criticalLevel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Ammunition</h4>
            {criticalAmmo.map(ammo => (
              <div key={ammo.id} className="mb-4 bg-red-500/10 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{ammo.name}</p>
                    <p className="text-sm text-gray-300">{ammo.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-400">Stock: {ammo.stock}</p>
                    <p className="text-sm text-gray-300">Critical: {ammo.criticalLevel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <TrendingUp className="mr-2 text-green-500" />
          Production Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Weapons Production</h4>
            {WEAPONS.map(weapon => (
              <div key={weapon.id} className="mb-4 bg-green-500/10 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{weapon.name}</p>
                    <p className="text-sm text-gray-300">{weapon.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400">{weapon.monthlyProduction}/month</p>
                    <p className="text-sm text-gray-300">Current: {weapon.stock}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Ammunition Production</h4>
            {Object.values(AMMUNITION).flat().map(ammo => (
              <div key={ammo.id} className="mb-4 bg-green-500/10 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{ammo.name}</p>
                    <p className="text-sm text-gray-300">{ammo.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400">{ammo.monthlyProduction}/month</p>
                    <p className="text-sm text-gray-300">Current: {ammo.stock}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}