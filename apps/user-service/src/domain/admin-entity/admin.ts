export interface AdminEntity {
  uuid: string;
  email: string
  numberPhone: string;
  password: string;
  accessToken?: string;
  forgotPasswordAccessToken?: number;
  forgotPasswordExpiresIn?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}