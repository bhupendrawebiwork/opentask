'use client';

import { Flag, AlertTriangle, Megaphone } from 'lucide-react';
import QuickActionCard from './QuickActionCard';

export default function QuickActionsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <QuickActionCard
        icon={<Flag className="text-blue-700 w-5 h-5" />}
        title="Moderate Flagged Content"
        description="Review and moderate flagged jobs and user content."
        buttonText="Review Now"
        buttonColor="bg-blue-700 hover:bg-blue-800"
        onClick={() => console.log('Review Now')}
      />

      <QuickActionCard
        icon={<AlertTriangle className="text-blue-500 w-5 h-5" />}
        title="View Escalated Disputes"
        description="Handle escalated disputes between users."
        buttonText="View Disputes"
        buttonColor="bg-blue-500 hover:blue-700"
        onClick={() => console.log('View Disputes')}
        
      />

      <QuickActionCard
        icon={<Megaphone className="text-blue-700 w-5 h-5" />}
        title="Broadcast Announcement"
        description="Send platform-wide announcements to users."
        buttonText="Create Announcement"
        buttonColor="bg-blue-700 hover:bg-blue-800"
        onClick={() => console.log('Create Announcement')}
      />
    </div>
  );
}
