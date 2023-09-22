import { AdminValue } from "../../domain/admin-value/admin-value";
import { AdminRepository } from "../repositories/admin-repository";


export class AdminUseCase {
  constructor(private readonly adminRepository: AdminRepository) { }

  public registerAdmin = async (
    password: string,
    email: string,
    numberPhone: string,
    createdAt: Date,
    updatedAt: Date
  ) => {

    let adminExist = this.adminRepository.findByEmail(email)

    if (!adminExist) {
      const adminValue = new AdminValue({
        password,
        email,
        numberPhone,
        createdAt,
        updatedAt,
      });
      const adminCreated = await this.adminRepository.create(
        adminValue
      );
      return adminCreated;
    }

  };

  public getDetailAdmin = async (uuid: string) => {
    // const customer = await this.customerRepository.findCustomerById(uuid);
    // return customer;
  };

}