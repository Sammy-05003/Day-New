export const WEAPONS = [
  // Assault Rifles
  {
    id: 'rifle1',
    name: 'AK-203',
    type: 'Assault Rifle',
    image: 'https://images.unsplash.com/photo-1632435499152-18838be77960',
    description: '7.62×39mm assault rifle with enhanced accuracy',
    stock: 2500,
    criticalLevel: 1000,
    monthlyProduction: 500
  },
  {
    id: 'rifle2',
    name: 'INSAS',
    type: 'Assault Rifle',
    image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f',
    description: '5.56×45mm NATO standard issue rifle',
    stock: 3500,
    criticalLevel: 1200,
    monthlyProduction: 600
  },
  // Shotguns
  {
    id: 'shotgun1',
    name: 'SPAS-15',
    type: 'Combat Shotgun',
    image: 'https://images.unsplash.com/photo-1584552532191-cdc87c607b44',
    description: '12 gauge combat shotgun',
    stock: 1200,
    criticalLevel: 500,
    monthlyProduction: 200
  },
  // Sniper Rifles
  {
    id: 'sniper1',
    name: 'Dragunov SVD',
    type: 'Sniper Rifle',
    image: 'https://images.unsplash.com/photo-1584552532191-cdc87c607b44',
    description: '7.62×54mmR semi-automatic sniper',
    stock: 800,
    criticalLevel: 300,
    monthlyProduction: 100
  },
  // Machine Guns
  {
    id: 'mg1',
    name: 'PKM',
    type: 'Machine Gun',
    image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f',
    description: '7.62×54mmR general-purpose machine gun',
    stock: 1500,
    criticalLevel: 600,
    monthlyProduction: 200
  },
  // Grenades
  {
    id: 'grenade1',
    name: 'F-1',
    type: 'Hand Grenade',
    image: 'https://images.unsplash.com/photo-1584552532191-cdc87c607b44',
    description: 'Defensive fragmentation grenade',
    stock: 10000,
    criticalLevel: 4000,
    monthlyProduction: 2000
  },
  // Missiles
  {
    id: 'missile1',
    name: 'BrahMos',
    type: 'Cruise Missile',
    image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f',
    description: 'Supersonic cruise missile',
    stock: 100,
    criticalLevel: 40,
    monthlyProduction: 10
  },
  {
    id: 'missile2',
    name: 'Prithvi',
    type: 'Ballistic Missile',
    image: 'https://images.unsplash.com/photo-1584552532191-cdc87c607b44',
    description: 'Surface-to-surface ballistic missile',
    stock: 150,
    criticalLevel: 50,
    monthlyProduction: 15
  }
];

export const AMMUNITION = {
  'rifle1': [
    { 
      id: 'ammo1', 
      name: '7.62×39mm', 
      type: 'Standard FMJ',
      image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f',
      stock: 150000,
      criticalLevel: 50000,
      monthlyProduction: 30000
    }
  ],
  'shotgun1': [
    { 
      id: 'ammo4', 
      name: '12 Gauge', 
      type: 'Buckshot',
      image: 'https://images.unsplash.com/photo-1584552532191-cdc87c607b44',
      stock: 100000,
      criticalLevel: 40000,
      monthlyProduction: 25000
    }
  ],
  'missile1': [
    {
      id: 'missile_warhead1',
      name: 'BrahMos Warhead',
      type: 'Conventional',
      image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f',
      stock: 50,
      criticalLevel: 20,
      monthlyProduction: 5
    }
  ],
  'grenade1': [
    {
      id: 'grenade_fuse1',
      name: 'F-1 Fuse',
      type: 'Time Delay',
      image: 'https://images.unsplash.com/photo-1584552532191-cdc87c607b44',
      stock: 15000,
      criticalLevel: 5000,
      monthlyProduction: 3000
    }
  ]
};