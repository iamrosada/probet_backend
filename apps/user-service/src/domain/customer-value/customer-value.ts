import { CustomerEntity } from "../customer-entity/customer";
import { v4 as uuid } from "uuid";


export class CustomerValue implements CustomerEntity {
  uuid: string;
  password: string;
  firstName: string;
  numberPhone: string;
  lastName: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;

  constructor({
    password,
    firstName,
    lastName,
    numberPhone,

  }: Omit<
    CustomerEntity,
    "uuid" | "createdAt" |
    "updatedAt"
  >) {
    //@ts-ignore
    this.uuid = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.numberPhone = numberPhone;
    this.createdAt = new Date();

    this.updatedAt = new Date();
  }
}
