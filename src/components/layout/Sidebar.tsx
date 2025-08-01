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
    { icon: ClipboardList, label: "Task Details", slug: "my-tasks/create-task" },
    { icon: MapPin, label: "Location", slug: "my-tasks/location" },
    { icon: Calculator, label: "Estimated Budget", slug: "my-tasks/estimated-budget" },
    { icon: ImageIcon, label: "Media", slug: "my-tasks/media" },
    { icon: FileText, label: "Preview", slug: "my-tasks/preview-task" },
  ];

  const currentStep = steps.findIndex((step) =>
    pathname.includes(`/${step.slug}`)
  );

  return (
    <div className="w-60 py-10 px-6 m-6 h-150 bg-[#11315B] rounded-2xl">
      <h2 className="text-white text-lg font-semibold mb-10 ml-2">Post Task</h2>
      <ul className="space-y-6">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <li key={index} className="flex items-center gap-3">
              <div>
                <Link href={`/${step.slug}`}>
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all
                      ${
                        isActive
                          ? "bg-white text-[#11315B] border-white"
                          : "bg-[#11315B] text-white border-white"
                      }
                    `}
                  >
                    <step.icon size={18} />
                  </div>
                </Link>
              </div>

              <Link href={`/${step.slug}`}>
                <span
                  className={`text-sm transition-all ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-white/70"
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
