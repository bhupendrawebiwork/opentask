import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserRole = "client" | "provider" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: Date
}

export interface Task {
  id: string
  title: string
  description: string
  location: string
  budget: number
  deadline: Date
  status: "open" | "assigned" | "in_progress" | "completed" | "cancelled"
  clientId: string
  providerId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Bid {
  id: string
  taskId: string
  providerId: string
  amount: number
  message: string
  status: "pending" | "accepted" | "rejected"
  createdAt: Date
}

interface AppState {
  // User state
  user: User | null
  isAuthenticated: boolean

  // Tasks state
  tasks: Task[]
  userTasks: Task[]

  // Bids state
  bids: Bid[]

  // UI state
  isLoading: boolean
  error: string | null

  // Actions
  setUser: (user: User | null) => void
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  setBids: (bids: Bid[]) => void
  addBid: (bid: Bid) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  logout: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      tasks: [],
      userTasks: [],
      bids: [],
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setTasks: (tasks) => set({ tasks }),

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
          userTasks: state.user?.id === task.clientId ? [...state.userTasks, task] : state.userTasks,
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
          userTasks: state.userTasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
          userTasks: state.userTasks.filter((task) => task.id !== id),
        })),

      setBids: (bids) => set({ bids }),

      addBid: (bid) => set((state) => ({ bids: [...state.bids, bid] })),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          userTasks: [],
          bids: [],
        }),
    }),
    {
      name: "taskconnect-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
