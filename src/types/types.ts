export type Task = {
  id: string;
  title: string;
  description: string;
  address: {
    city: string;
    home: string;
    phone: string;
    state: string;
    street: string;
    country: string;
    addressLine1: string;
    addressLine2: string;
  };
  estimatedAmount: number;
  expectedCompletionDate: string; // or Date if parsed
  budgetComment: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH'; // based on the example
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | string; // extend as needed
  media: string[];
  createdAt: string; // or Date
  userId: string;
};
