import { CustomerEntity, CustomerEntitySpeed } from "../../domain/customer-entity/customer";
import { CustomerRepository } from "../repositories/customer-repository";



export class AuthCustomerToPlayUseCase {
  constructor(private readonly customerRepository: CustomerRepository) { }

  public authentication = async (customer: CustomerEntity) => {

    let customerExist = this.customerRepository.findByNumberPhone(customer.numberPhone)

    if (!customerExist) {
      const response = this.customerRepository.auth({
        numberPhone: customer.numberPhone,
        password: customer.password
      });
      return response;
    }

  };


  public authExpireIn24 = (customer: CustomerEntitySpeed) => {
    let customerExist = this.customerRepository.findByNumberPhone(customer.numberPhone)

    if (!customerExist) {
      const response = this.customerRepository.authExpireIn24({
        numberPhone: customer.numberPhone,
      });
      return response;
    }
  }
}