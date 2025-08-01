'use client';

import { Briefcase, AlertCircle, Users, BarChart3 } from 'lucide-react';
import KpiCard from './KpiCard';

export default function KpiSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <KpiCard
        icon={<Briefcase className="h-6 w-6 text-blue-700" />}
        title="Active Jobs"
        value="1,247"
        change="+12% from yesterday"
        iconBg="bg-blue-200"
      />
      <KpiCard
        icon={<AlertCircle className="h-6 w-6 text-blue-500" />}
        title="Open Disputes"
        value="23"
        change="+3 from yesterday"
        iconBg="bg-blue-100"
      />
      <KpiCard
        icon={<Users className="h-6 w-6 text-blue-700" />}
        title="New Users Today"
        value="89"
        change="+18% from yesterday"
        iconBg="bg-blue-200"
      />
      <KpiCard
        icon={<BarChart3 className="h-6 w-6 text-blue-500" />}
        title="Job Volume - 24h"
        value="$15.2K"
        change="+8% from yesterday"
        iconBg="bg-blue-100"
      />
    </div>
  );
}
