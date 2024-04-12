export interface ITrackShipment {
  tracking_id: number;
  box_id: number;
  status: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreationITrackShipmentDTO {
  tracking_id: number;
  status: string;
}

export interface TrackShipmentDetailsDTO {
  trackingId: number;
  status: string;
}
