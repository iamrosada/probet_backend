import { v4 as uuid } from "uuid";
import { AdminEntity } from "./admin.entity";

export class AdminValue implements AdminEntity {
  uuid: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  accessToken?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;

  constructor({
    email,
    password,
    firstName,
    lastName,
    accessToken,
    createdAt,
    updatedAt,
  }: Omit<
    AdminEntity,
    "uuid" | "forgotPasswordAccessToken" | "forgotPasswordExpiresIn"
  >) {
    this.uuid = uuid();
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.accessToken = accessToken;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
