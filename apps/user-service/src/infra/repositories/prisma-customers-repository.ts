import { CustomerRepository } from "../../application/repositories/customer-repository";
import { CustomerEntity, CustomerOnlyOneBetEntity } from "../../domain/customer-entity/customer";
import { prisma } from "../database/prisma/prisma";
import { PayloadCustomer, TokenService } from "../core/auth-global-core";
import { Password } from '../core/password-hash'
import { InputCustomerAuth, InputExpireIn24SpeedAuth, OutPutCustomerAuth } from "../../interfaces";

export class PrismaCustomersRepository implements CustomerRepository {
  authExpireIn24(customer: InputExpireIn24SpeedAuth): Promise<OutPutCustomerAuth> {
    try {
      const tokenService = new TokenService();
      const customerPayload: PayloadCustomer = { numberPhone: customer.numberPhone };
      const accessToken = tokenService.createAccessToken(customerPayload, { expiresIn: '1h' });
      return Promise.resolve({ accessToken });
    } catch (error) {
      throw new Error('Erro ao autenticar o cliente: ' + error.message);
    }
  }

  auth(customer: InputCustomerAuth): Promise<OutPutCustomerAuth> {

    try {
      const tokenService = new TokenService();
      const customerPayload: PayloadCustomer = { numberPhone: customer.numberPhone };
      const accessToken = tokenService.createAccessToken(customerPayload, { expiresIn: '1h' });
      return Promise.resolve({ accessToken });
    } catch (error) {
      throw new Error('Erro ao autenticar o cliente: ' + error.message);
    }

  }

  async list(): Promise<null | CustomerEntity[]> {
    const allCustomer = await prisma.customer.findMany({});
    return allCustomer
  }

  async findCustomerById(uuid: string): Promise<null | CustomerEntity> {
    const customer = await prisma.customer.findUnique({
      where: { uuid },
    })

    if (!customer) {
      return null
    }

    return customer
  }


  async findCustomerByDateCreation(createdAt: Date): Promise<null | CustomerEntity> {
    const customer = await prisma.customer.findUnique({
      //@ts-ignore
      where: { createdAt: createdAt }
    })

    if (!customer) {
      return null
    }

    return customer
  }


  async findByNumberPhone(numberPhone: string): Promise<CustomerEntity | null> {
    const customer = await prisma.customer.findUnique({
      where: { numberPhone },
    })

    if (!customer) {
      return null
    }

    return customer
  }

  async findByNumberPhoneOnlyOneBet(numberPhone: string): Promise<CustomerOnlyOneBetEntity | null> {

    const customer = await prisma.customerOnlyOneBet.findUnique({
      where: { numberPhone },
    })



    if (!customer) {
      return null
    }

    return customer
  }
  async createCustomerOnlyOneBet(customer: CustomerOnlyOneBetEntity): Promise<CustomerOnlyOneBetEntity> {

    const customerCreated = await prisma.customerOnlyOneBet.create({
      data: {
        uuid: customer.uuid,
        numberPhone: customer.numberPhone,

      }
    })

    return customerCreated

  }


  async create(customer: CustomerEntity): Promise<CustomerEntity> {
    console.info(customer)
    const storedPasswordHash = await Password.hashPassword(customer.password);

    const customerCreated = await prisma.customer.create({
      data: {
        uuid: customer.uuid,
        password: storedPasswordHash,
        firstName: customer.firstName,
        lastName: customer.lastName,
        numberPhone: customer.numberPhone, 
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt

      }
    })

    return customerCreated
  }
}