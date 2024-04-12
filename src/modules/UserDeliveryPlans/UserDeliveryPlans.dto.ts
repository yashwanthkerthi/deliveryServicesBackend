export interface IUserPlans {
  plan_id: number;
  plan_name: string;
  user_id: number;
  order_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreationIUserPlansDTO {
  plan_id: number;
  plan_name: string;
  order_id: number;
  user_id: number;
}

export interface UserPlansDTO {
  planId: number;
  planName: string;
}
