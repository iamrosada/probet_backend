import { CustomerEntity } from "../customer-entity/customer";


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
    createdAt,
    updatedAt,
  }: Omit<
    CustomerEntity,
    "uuid"
  >) {
    this.uuid = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.numberPhone = numberPhone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
