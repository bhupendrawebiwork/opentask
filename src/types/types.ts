export type Task = {
  id: string;
  title: string;
  description: string;

  location: {
    city: string;
    home: string;
    phone: string;
    state: string;
    street: string;
    country: string;
    addressLine1: string;
    addressLine2: string;
  };

  estimateBudget: number;
  deadline: string; // or Date if parsed
  note?: string;

  media: string[];
  archived: boolean;

  paymentStatus: "INITIATED" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  progressStatus: "PENDING" | "ASSIGNED" | "IN_PROGRESS" | "DONE" | "CANCELLED";

  ownerId: string;

  bids?: any[]; // you can define Bid type separately
  transactions?: any[]; // define TaskTransaction type if needed
  messages?: any[];
  feedbacks?: any[];

  createdAt: string; // or Date
  updatedAt: string; // or Date
};

export interface Bid {
  id: string;
  offeredPrice: number;
  offeredEstimatedTime: number;
  comment?: string;
  refWorkItems: string[];
  status: "APPLY" | "ACCEPTED" | "REJECTED" | "WITHDRAWN";
  taskId: string;
  userId: string;
  createdAt: string;

  user?: {
    id: string;
    name: string;
    email: string;
    isVerified?: boolean;
    phone: string;
    profile: UserProfile;
  };
}

export interface Chat {
  id: string;
  bidId: string;
  taskId: string;
  taskerId: string;
  posterId: string;
  lastMessageId: string | null;
  isTaskerRead: boolean;
  isPosterRead: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  bid: Bid;
  task: Task;
  poster: UserWithProfile;
  tasker: UserWithProfile;
  lastMessage: Message | null;
  user: UserWithProfile;
}

export interface UserWithProfile {
  id: string;
  name: string;
  profile: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  avatar: string | null;
  aggrRating: number;
  preferredLanguage: string[];
  services: string[];
  bankAccountInfo: any; // define better if known
  taskRating: number;
  posterRating: number;
  location: any; // define better if known (GeoJSON, coordinates, etc.)
}

export interface Message {
  id: string;
  chatId: string;
  text: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
}
