"use client";
import {
  ClipboardList,
  MapPin,
  Calculator,
  Image as ImageIcon,
  FileText,
} from "lucide-react";

const Sidebar = () => {
  const steps = [
    { icon: ClipboardList, label: "Task Details", active: true },
    { icon: MapPin, label: "Location", active: false },
    { icon: Calculator, label: "Estimated Budget", active: false },
    { icon: ImageIcon, label: "Media", active: false },
    { icon: FileText, label: "Preview", active: false },
  ];

  return (
    <div className="w-64 p-10  min-h-screen" style={{backgroundColor:"#F7F5F8"}}>
      <h2 className="text-lg font-semibold mb-12 text-black text-start ml-4">Task Post Steps</h2>
      <div className="relative flex justify-center">
        {/* Vertical line */}
        <div className="absolute left-5 top-6 bottom-4 w-1 bg-gray-200 z-0"></div>

        {/* Step items */}
        <ul className="space-y-14 z-10 relative">
          {steps.map((step, index) => (
            <li key={index} className="flex items-center gap-6 ">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                  step.active
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-gray-200 text-gray-600 border-gray-200"
                }`}
              >
                <step.icon size={18} />
              </div>
              <span
                className={`text-sm font-medium ${
                  step.active ? "text-gray-900 font-semibold" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
