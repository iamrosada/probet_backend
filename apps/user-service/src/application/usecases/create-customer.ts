import { CustomerValue } from "../../domain/customer-value/customer-value";
import { CustomerRepository } from "../repositories/customer-repository";


export class CustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) { }

  public registerCustomer = async (
    password: string,
    firstName: string,
    lastName: string,
    numberPhone: string,
    createdAt: Date,
    updatedAt: Date
  ) => {

    let customerExist = await this.customerRepository.findByNumberPhone(numberPhone)

    if (!customerExist) {

      const customerValue = new CustomerValue({
        password,
        firstName,
        lastName,
        numberPhone,
        createdAt,
        updatedAt,
      });
      const customerCreated = await this.customerRepository.create(
        customerValue
      );
      return customerCreated
    }

  };

  public getDetailCustomer = async (uuid: string) => {
    const customer = await this.customerRepository.findCustomerById(uuid);
    return customer;
  };

  public getListOfAllCustomer = async () => {
    const customers = await this.customerRepository.list();
    return customers;
  };

  public getCustomerByDate = async (createdAt: Date) => {
    const customer = await this.customerRepository.findCustomerByDateCreation(createdAt);
    return customer;
  };

  public registerCustomerAndExpireAfterBet = async (input: InputExpireIn24Speed) => {
    let customerExist = await this.customerRepository.findByNumberPhone(input.numberPhone)

    if (!customerExist) {
    const customer = await this.customerRepository.createCustomerFor24h(input);
    return customer;
    }
  };

  public AuthCustomerAndExpireAfterBet = async (input: InputExpireIn24SpeedAuth) => {

    let customerExist = await this.customerRepository.findByNumberPhone(input.numberPhone)

    if (!customerExist) {
      const customer = await this.customerRepository.authExpireIn24(input);
      return customer;
    }


  };

  public AuthCustomerForLongPeriodBet = async (input: InputCustomerAuth) => {
    let customerExist = await this.customerRepository.findByNumberPhone(input.numberPhone)

    if (!customerExist) {
      const customer = await this.customerRepository.auth(input);
      return customer;
    }

  };
}

