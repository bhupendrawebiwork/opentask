"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 1. Task data shape based on your API
export interface TaskData {
  title: string;
  description: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    home: string;
    street: string;
    state: string;
    city: string;
    country: string;
    phone: string;
  };
  estimatedAmount: number;
  expectedCompletionDate: string;
  budgetComment: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  media: string[];
}

// 2. Context type
interface TaskContextType {
  taskData: Partial<TaskData>;
  setTaskData: React.Dispatch<React.SetStateAction<Partial<TaskData>>>;
}

// 3. Create context
export const TaskContext = createContext<TaskContextType | null>(null);

// 4. Provider component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [taskData, setTaskData] = useState<Partial<TaskData>>({});

  return (
    <TaskContext.Provider value={{ taskData, setTaskData }}>
      {children}
    </TaskContext.Provider>
  );
};

// 5. Custom hook to use context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
