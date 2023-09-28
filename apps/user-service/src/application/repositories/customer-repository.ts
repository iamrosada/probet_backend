import {
  CustomerEntity,
} from '../../domain/customer-entity/customer';

export interface CustomerRepository {
  authExpireIn24(customer: InputExpireIn24SpeedAuth): Promise<OutPutCustomerAuth>
  auth(customer: InputCustomerAuth): Promise<OutPutCustomerAuth>
  create(customer: Omit<CustomerEntity, 'uuid'>): Promise<CustomerEntity>;
  createCustomerFor24h(customer: InputCreateSpeed): Promise<void>
  findByNumberPhone(phone: string): Promise<CustomerEntity | null>
  list(): Promise<CustomerEntity[] | null>
  findCustomerById(id: string): Promise<CustomerEntity | null>
  findCustomerByDateCreation(createdAt: Date): Promise<CustomerEntity | null>
}


type InputCustomerAuth = {
  numberPhone?: string;
  password?: string;
}
type InputAdminAuth = {
  email?: string;
  password?: string;
}

type OutPutCustomerAuth = {
  accessToken?: string;
}

type InputExpireIn24SpeedAuth = {
  numberPhone: string;
}


type InputCreateSpeed = InputExpireIn24SpeedAuth

type InputExpireIn24Speed = {
  numberPhone: string;
}




