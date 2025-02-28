// Requests
export enum Interval {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export interface CreatePlanRequest {
  name: string;
  priceId: string;
  interval: Interval;
  amount: number;
  trialDays?: number;
}

// Responses
export interface BasePlanResponse {
  id: string;
  name: string;
  priceId: string;
  interval: Interval;
  amount: number;
  trialDays?: number;
  createdAt: string;
  updatedAt: string;
}
