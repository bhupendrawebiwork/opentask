"use client";

import MyBidCard from "@/components/common/MyBidCard";
import { useAuthStore } from "@/store/useAuthStore";
import { useBidStore } from "@/store/useBidStore";
import { useEffect } from "react";

export default function MyBidsPage() {
  const { authUser } = useAuthStore();
  const { myBids, fetchBidsForUser } = useBidStore();

  const handleEdit = (bid: any) => {
    console.log("Editing bid:", bid);
    // Open edit overlay or navigate to edit page
  };

  useEffect(() => {
    if (authUser?.id) {
      fetchBidsForUser(authUser.id);
    }
  }, [authUser]);

  return (
    <div className="p-6 max-w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Bids</h1>
      {myBids.map((bid, index) => (
        <MyBidCard key={index} bid={bid} onEdit={() => handleEdit(bid)} />
      ))}
    </div>
  );
}
