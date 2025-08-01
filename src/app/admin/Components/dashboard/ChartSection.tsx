'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from './ChartCard';

const pieData = [
  { name: 'Plumbing', value: 35.5 },
  { name: 'Electrical', value: 25.2 },
  { name: 'Cleaning', value: 18.7 },
  { name: 'Painting', value: 12.3 },
  { name: 'Other', value: 8.3 },
];

const COLORS = ['#2563eb', '#22c55e', '#facc15', '#f97316', '#ef4444'];

const barData = [
  { day: 'Mon', volume: 2000 },
  { day: 'Tue', volume: 2700 },
  { day: 'Wed', volume: 2200 },
  { day: 'Thu', volume: 3100 },
  { day: 'Fri', volume: 2800 },
  { day: 'Sat', volume: 1600 },
  { day: 'Sun', volume: 1400 },
];

// Custom label function to render percentage outside with name
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  name,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20; // Move labels outside
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#000"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={700}
    >
      {`${name}: ${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Pie Chart */}
      <ChartCard title="Job Category Distribution">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#8884d8"
              labelLine
              label={renderCustomizedLabel}
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Bar Chart */}
      <ChartCard title="Task Volume by Day">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="volume" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
