export interface AdminEntity {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accessToken?: string;
  forgotPasswordAccessToken?: number;
  forgotPasswordExpiresIn?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ForgotPasswordResponse {
  accessToken: number;
  expiresIn: Date;
}
