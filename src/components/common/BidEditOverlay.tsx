"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function BidEditOverlay({ task, onClose, onSave }: any) {
  const [quotedPrice, setQuotedPrice] = useState(task?.quotedPrice || "");
  const [description, setDescription] = useState(task?.description || "");

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
      <div className="w-full max-w-md bg-white h-full p-6 overflow-y-auto shadow-lg rounded-l-2xl">
        {/* Header: Top section mimicking the image */}
        <div className="mb-6">
          
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-semibold text-gray-800">
              Google Sheet automation AI
            </h2>
            <button onClick={onClose}>
              <X className="text-gray-500 hover:text-gray-800" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-green-600 font-medium flex items-center">
              ✓ <span className="ml-1">Payment Verified</span>
            </span>
            <span className="text-yellow-500">★★★★☆</span>
            {/* <span className="ml-auto text-xs text-blue-400 flex gap-1">Posted 6 hours ago
                <Heart
              size={18}
              className="text-white p-1 fill-white bg-blue-400 rounded-full"
            />
            </span> */}
          </div>
        </div>
        <hr className="my-6 border-gray-200" />

        
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Your Application</h3>

       
        <div className="flex flex-col gap-4">
         
          <div>
            <label className="text-sm font-semibold text-gray-700">Quoted Price</label>
            <input
              type="number"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={quotedPrice}
              onChange={(e) => setQuotedPrice(e.target.value)}
              placeholder="Budget"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea
              rows={4}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=""
            />
          </div>
        </div>

       
        <div className="mt-6">
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition font-semibold"
            onClick={() => {
              const updatedTask = { ...task, quotedPrice, description };
              onSave(updatedTask);
              onClose();
            }}
          >
           Save
          </button>
        </div>
      </div>
    </div>
  );
}
