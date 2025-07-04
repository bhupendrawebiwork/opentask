"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ClipboardList,
  MapPin,
  Calculator,
  Image as ImageIcon,
  FileText,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const steps = [
    { icon: ClipboardList, label: "Task Details", slug: "task-details" },
    { icon: MapPin, label: "Location", slug: "location" },
    { icon: Calculator, label: "Estimated Budget", slug: "estimated-budget" },
    { icon: ImageIcon, label: "Media", slug: "media" },
    { icon: FileText, label: "Preview", slug: "preview-task" },
  ];

  const currentStep = steps.findIndex((step) =>
    pathname.includes(`/${step.slug}`)
  );

  return (
    <div
      className="w-64 p-10 min-h-screen"
      style={{ backgroundColor: "#F7F5F8" }}
    >
      <h2 className="text-lg font-semibold mb-12 text-black text-start ml-4">
        Task Post Steps
      </h2>
      <ul className="relative z-10">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <li key={index} className="relative flex items-center gap-6 mb-0">
              <div className="flex flex-col items-center z-10">
                <Link href={`/${step.slug}`}>
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors duration-300
                      ${
                        isActive || isCompleted
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-gray-200 text-gray-600 border-gray-200"
                      }
                    `}
                  >
                    <step.icon size={18} />
                  </div>
                </Link>

                {/* Line below */}
                {index < steps.length - 1 && (
                  <div
                    className={`w-1 h-14 mt-1 transition-colors duration-300 ${
                      index < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>

              <Link
                href={`/${step.slug}`}
                className={`text-start ${
                  index !== steps.length - 1 ? "mb-14" : ""
                }`}
              >
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isActive || isCompleted
                      ? "text-gray-900 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
