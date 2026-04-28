export interface PromotionFormValues {
  name: string;
  plan: string;
  discount: number;
  description?: string;
  // duration: number;
  status?: boolean;
  startDate?: string;
  endDate?: string;
  type: string;
}

export interface EditPromotionFormValues {
  name?: string;
  plan?: string;
  description?: string;
  discount?: number;
  // duration: number;
  status?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface PromotionDetail {
  name: string;
  plan: string;
  discount: number;
  startDate?: string;
  endDate?: string;
}
