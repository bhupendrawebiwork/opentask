// export type Task = {
//   id: string;
//   title: string;
//   description: string;
//   address: {
//     city: string;
//     home: string;
//     phone: string;
//     state: string;
//     street: string;
//     country: string;
//     addressLine1: string;
//     addressLine2: string;
//   };
//   estimatedAmount: number;
//   expectedCompletionDate: string; // or Date if parsed
//   budgetComment: string;
//   priority: 'LOW' | 'MEDIUM' | 'HIGH'; // based on the example
//   status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | string; // extend as needed
//   media: string[];
//   createdAt: string; // or Date
//   userId: string;
// };

export type Task = {
  id: string;
  title: string;
  description: string;

  location:  {
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

  paymentStatus: 'INITIATED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  progressStatus: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';

  ownerId: string;

  bids?: any[]; // you can define Bid type separately
  transactions?: any[]; // define TaskTransaction type if needed
  messages?: any[];
  feedbacks?: any[];

  createdAt: string; // or Date
  updatedAt: string; // or Date
};

