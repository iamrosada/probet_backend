import { v4 as uuid } from "uuid";
import { AdminEntity } from "./admin.entity";

export class AdminValue implements AdminEntity {
  uuid: string;
  name: string;
  email: string;
  password: string;

  constructor({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    this.uuid = uuid();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
