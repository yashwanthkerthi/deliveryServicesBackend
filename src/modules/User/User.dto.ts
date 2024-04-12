export interface UserSignupDetailsDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
}

export interface UserLoginDetailsDTO {
  email: string;
  password: string;
}

export interface UserJwtDetailsDTO {
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface IUsers {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreationIUsersDTO {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile_number: string;
  user_role: number;
}

// export interface UserSignupDetailsDTO {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }


