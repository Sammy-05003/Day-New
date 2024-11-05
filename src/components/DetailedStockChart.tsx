import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface DetailedStockChartProps {
  data: Array<{
    name: string;
    current: number;
    critical: number;
    production: number;
  }>;
  title: string;
}

export default function DetailedStockChart({ data, title }: DetailedStockChartProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.5)"
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: 'none',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="current" name="Current Stock" fill="#4ade80" />
            <Bar dataKey="critical" name="Critical Level" fill="#ef4444" />
            <Bar dataKey="production" name="Monthly Production" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}