import { CustomerOnlyOneBetValue } from "../../domain/customer-value-only-one-bet/customer-value";
import { CustomerValue } from "../../domain/customer-value/customer-value";
import { CustomerRepository } from "../repositories/customer-repository";


export class CustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) { }

  public registerCustomer = async (
    password: string,
    firstName: string,
    lastName: string,
    numberPhone: string,

  ) => {

      const customerValue = new CustomerValue({
        password,
        firstName,
        lastName,
        numberPhone,
      });

      const customerCreated = await this.customerRepository.create(
        customerValue
      );
      return customerCreated


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

  public registerCustomerAndExpireAfterBet = async (numberPhone: string) => {

    const customerOnlyOneBetValue = new CustomerOnlyOneBetValue(
      { numberPhone }
    );
    const customer = await this.customerRepository.createCustomerOnlyOneBet(customerOnlyOneBetValue);
    return customer;

  };

  public AuthCustomerAndExpireAfterBet = async (numberPhone: string) => {

    const customer = await this.customerRepository.authExpireIn24({ numberPhone });
    return customer;

  };

  public AuthCustomerForLongPeriodBet = async (
    password: string,
    numberPhone: string,
    customerId?: string

  ) => {

    console.info(password, numberPhone, "AuthCustomerForLongPeriodBet ")

    const customer = await this.customerRepository.auth({ password, numberPhone }, customerId);
    return customer;


  }


  public findByNumberPhone = async (numberPhone: string) => {
    let customerAlreadyExist = await this.customerRepository.findByNumberPhone(numberPhone)
    return customerAlreadyExist
  }
  public findByNumberPhoneOnlyOneBet = async (numberPhone: string) => {
    let customerAlreadyExist = await this.customerRepository.findByNumberPhoneOnlyOneBet(numberPhone)
    return customerAlreadyExist
  }
}


type InputCustomerAuth = {
  numberPhone?: string;
  password?: string;
}




type InputExpireIn24SpeedAuth = {
  numberPhone: string;
}



type InputExpireIn24Speed = {
  numberPhone: string;
}
