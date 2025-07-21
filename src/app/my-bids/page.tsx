"use client";

import MyBidCard from "@/components/common/MyBidCard";

export default function MyBidsPage() {
  const myBids = [
    {
      taskTitle: "Google Sheet automation AI",
      taskDescription: "Automate entries between two Google Sheets.",
      client: {
        name: "Ankit Sharma",
        rating: 4,
        verified: true,
      },
      application: {
        budget: 3500,
        costType: "Fixed",
        date: "2025-07-25",
        comment: "Can deliver in 1 day. Have built similar scripts.",
        transcript: "Namaste, Imran hoon. 10 saal se kaam kar raha hoon.",
      },
    },
   
  ];

  const handleEdit = (bid) => {
    console.log("Editing bid:", bid);
    // Open edit overlay or navigate to edit page
  };

  return (
    <div className="p-6 max-w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Bids</h1>
      {myBids.map((bid, index) => (
        <MyBidCard key={index} bid={bid} onEdit={() => handleEdit(bid)} />
      ))}
    </div>
  );
}
