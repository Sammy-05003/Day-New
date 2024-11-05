import React from 'react';
import { Shield } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Shield className="h-10 w-10 text-blue-500" />
        <div className="absolute inset-0 bg-blue-500 blur-lg opacity-50 animate-pulse" />
      </div>
      <div className="font-black text-2xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient">
        DEFENSE LEDGER
      </div>
    </div>
  );
}