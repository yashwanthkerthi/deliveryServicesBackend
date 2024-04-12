export interface Address {
  id: number;
  from_address: string;
  from_email: string;
  from_name: string;
  from_mobile_number: string;
  from_pincode: string;
  to_address: string;
  to_email: string;
  to_name: string;
  to_mobile_number: string;
  to_pincode: string;
  user_id:number;
}

export interface CreationAddressDTO {
  from_address: string;
  from_email: string;
  from_name: string;
  from_mobile_number: string;
  from_pincode: string;
  to_address: string;
  to_email: string;
  to_name: string;
  to_mobile_number: string;
  to_pincode: string;
  user_id: number;
}

export interface UserAddressDTO {
  from_address: string;
  from_email: string;
  from_name: string;
  from_mobile_number: string;
  from_pincode: string;
  to_address : string;
  to_email : string;
  to_name: string;
  to_mobile_number: string;
  to_pincode: string;
  user_id: number;
}
