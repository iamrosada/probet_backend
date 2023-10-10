import { CustomerOnlyOneBetEntity } from "../customer-entity/customer";
import { v4 as uuid } from "uuid";


export class CustomerOnlyOneBetValue implements CustomerOnlyOneBetEntity {
  uuid: string;
  firstName: string;
  numberPhone: string;
  lastName: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;

  constructor({
    numberPhone,

  }: Omit<
    CustomerOnlyOneBetEntity,
    "uuid" | "createdAt" |
    "updatedAt"
  >) {
    //@ts-ignore
    this.uuid = uuid();
    this.numberPhone = numberPhone;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
