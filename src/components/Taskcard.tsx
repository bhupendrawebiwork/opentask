import { Heart, CheckCircle, Star, MapPin } from "lucide-react";

export default function TaskCard({ task, onClick }: any) {
  return (
    <div
      onClick={()=>onClick(task)}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 cursor-pointer hover:shadow-md transition"
    >
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-black">{task?.title}</h2>
        <span className="text-sm text-blue-500 font-medium flex gap-2">
          Posted {/* Ideally, you'd calculate this dynamically */}
          {task?.createdAt
            ? `${Math.floor(
                (Date.now() - new Date(task.createdAt).getTime()) /
                  (1000 * 60 * 60 * 24)
              )} Days Ago`
            : "N/A"}{" "}
          <Heart
            size={20}
            className="text-white p-1 fill-white cursor-pointer bg-blue-500 rounded-full"
          />
        </span>
      </div>

      <div className="flex items-center text-sm text-gray-500 mt-2 gap-4">
        <span className="flex items-center gap-1 text-green-600 font-medium">
          <CheckCircle size={16} /> Payment Verified
        </span>
        <span className="flex items-center gap-1 text-yellow-500">
          {[...Array(4)].map((_, i) => (
            <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
          ))}
          <Star size={14} strokeWidth={1.5} className="text-yellow-500" />
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={14} className="text-gray-500" />
          {task?.address
            ? `${task.address.addressLine1}, ${task.address.street}, ${task.address.city} ${task.address.state} ${task.address.country}`
            : "No address"}
        </span>
      </div>

      <div className="flex gap-6">
        <div className="mt-2">
          <span className="text-sm font-semibold text-gray-500">Budget :–</span>{" "}
          <span className="text-gray-700 text-sm">
            {/* {"  Fixed Est. Budget "} */}$
            {task?.estimatedAmount?.toLocaleString()}
          </span>
        </div>
        <div className="text-sm text-gray-600 mt-2">
          (Proposals <span className="font-medium">Less than 8</span>)
        </div>
      </div>

      <p className="text-gray-500 text-sm mt-2">{task?.description}</p>

      <div className="mt-4 flex gap-2 flex-wrap">
        {["API", "INTEGRATION", "AI", "CREATION"].map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
