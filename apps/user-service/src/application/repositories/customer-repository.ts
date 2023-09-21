import {
  CustomerEntity, CustomerEntitySpeed,
} from '../../domain/customer-entity/customer';

export interface CustomerRepository {
  authExpireIn24(customer: InputExpireIn24Speed): Promise<string>
  auth(customer: InputCustomer): Promise<string>
  create(customer: CustomerEntity): Promise<void>;
  createCustomerFor24h(customer: CustomerEntitySpeed): Promise<void>
  findByNumberPhone(phone: string): Promise<CustomerEntity | null>
  list(customers: CustomerEntity): Promise<CustomerEntity[] | void>
}






type InputCustomer = {
  uuid: string;
  numberPhone: string;
  password: string;
  accessToken?: string;
  forgotPasswordAccessToken?: number;
  forgotPasswordExpiresIn?: Date;
}

type InputExpireIn24Speed = {
  uuid: string;
  numberPhone: string;
  accessToken?: string;
  forgotPasswordAccessToken?: number;
  forgotPasswordExpiresIn?: Date;
}

