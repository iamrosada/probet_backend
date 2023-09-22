import { AdminEntity } from "../admin-entity/admin";



export class AdminValue implements AdminEntity {
  uuid: string;
  email: string;
  password: string;
  numberPhone: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;

  constructor({
    password,
    email,
    numberPhone,
    createdAt,
    updatedAt,
  }: Omit<
    AdminEntity,
    "uuid"
  >) {
    //@ts-ignore
    this.uuid = uuid();
    this.password = password;
    this.email = email;
    this.numberPhone = numberPhone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
