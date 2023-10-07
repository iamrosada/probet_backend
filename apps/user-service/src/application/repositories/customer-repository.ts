import {
  CustomerEntity, CustomerOnlyOneBetEntity,
} from '../../domain/customer-entity/customer';
import { InputExpireIn24SpeedAuth, OutPutCustomerAuth, InputCustomerAuth, InputCreateSpeed } from '../../interfaces';

export interface CustomerRepository {
  authExpireIn24(customer: InputExpireIn24SpeedAuth): Promise<OutPutCustomerAuth>
  auth(customer: InputCustomerAuth, customerId?: string): Promise<OutPutCustomerAuth>
  create(customer: Omit<CustomerEntity, 'uuid'>): Promise<CustomerEntity>;
  createCustomerOnlyOneBet(customer: InputCreateSpeed): Promise<CustomerOnlyOneBetEntity>
  findByNumberPhone(phone: string): Promise<CustomerEntity | null>
  findByNumberPhoneOnlyOneBet(phone: string): Promise<CustomerOnlyOneBetEntity | null>
  list(): Promise<CustomerEntity[] | null>
  findCustomerById(id: string): Promise<CustomerEntity | null>
  findCustomerByDateCreation(createdAt: Date): Promise<CustomerEntity | null>
}





