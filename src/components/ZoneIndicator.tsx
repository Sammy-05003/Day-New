import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

interface ZoneIndicatorProps {
  level: 'normal' | 'medium' | 'critical';
}

export default function ZoneIndicator({ level }: ZoneIndicatorProps) {
  const config = {
    normal: {
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    medium: {
      icon: AlertCircle,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10'
    },
    critical: {
      icon: AlertTriangle,
      color: 'text-red-500',
      bg: 'bg-red-500/10'
    }
  }[level];

  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
      <Icon className="w-4 h-4 mr-1" />
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </div>
  );
}