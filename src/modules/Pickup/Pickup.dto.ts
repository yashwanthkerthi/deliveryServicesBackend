export interface IPickupDetailsDTO {
  id: number;
  date: Date;
  time: string;
  location: string;
  user_id: number;
  order_id: number;
  created_at: Date;
  updated_at: Date;
}
export interface CreationIPickupDetailsDTO {
  date: Date;
  time: string;
  location: string;
  user_id: number;
  order_id: number;
}

export interface PickupDetailsDTO {
  date: Date;
  time: string;
  location: string;
}
