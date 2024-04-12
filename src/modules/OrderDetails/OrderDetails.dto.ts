import { number, string } from "joi";

export interface IOrders {
  id: number;
  weight: string;
  content: string;
  measurement: string;
  shipmentPrice: number;
  senderName: string;
  recipientName: string;
  order_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreationIorderDetailsDTO {
  weight: string;
  content: string;
  measurement: string;
  shipment_price: number;
  sender_name: string;
  recipient_name?: string;
  user_id: number;
}

export interface OrderDetailsDTO {
  weight: string;
  content: string;
  measurement: string;
  shipmentPrice: number;
  senderName: string;
  recipientName: string;
}
