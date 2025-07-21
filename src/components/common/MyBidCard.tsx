"use client";
import { CheckCircle, Star, Pencil } from "lucide-react";

export default function MyBidCard({ bid, onEdit }) {
  const {
    taskTitle,
    taskDescription,
    client,
    application,
  } = bid;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
      {/* Task Info */}
      <h2 className="text-xl font-semibold text-gray-900">{taskTitle}</h2>
      <p className="text-gray-600 mt-1 mb-4 text-sm">{taskDescription}</p>

      {/* Client Info */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-1">Client Info</h3>
        <div className="text-sm text-gray-600 flex items-center gap-4 flex-wrap">
          <span>{client.name}</span>
          {client.verified && (
            <span className="flex items-center gap-1 text-green-600">
              <CheckCircle size={16} /> Payment Verified
            </span>
          )}
          <span className="flex text-yellow-500">
            {[...Array(client.rating)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
            ))}
            {[...Array(5 - client.rating)].map((_, i) => (
              <Star key={i} size={14} strokeWidth={1.5} />
            ))}
          </span>
        </div>
      </div>

      {/* Application Info */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Your Application</h3>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Budget:</strong> ₹{application.budget} ({application.costType})
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Expected Date:</strong> {application.date}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Message:</strong> {application.comment}
        </p>
        {application.transcript && (
          <p className="text-sm text-gray-500 italic">🗣 "{application.transcript}"</p>
        )}
      </div>

      <button
        onClick={onEdit}
        className="px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center gap-2"
      >
        <Pencil size={16} /> Edit Application
      </button>
    </div>
  );
}
