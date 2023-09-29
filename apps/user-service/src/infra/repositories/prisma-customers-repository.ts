import { CustomerRepository } from "../../application/repositories/customer-repository";
import { CustomerEntity, CustomerEntitySpeed } from "../../domain/customer-entity/customer";
import { prisma } from "../database/prisma/prisma";
import { createAccessToken } from "../core/auth-global-core";
import { Password } from '../core/password-hash'

export class PrismaCustomersRepository implements CustomerRepository {
  authExpireIn24(customer: { numberPhone: string; }): Promise<{ accessToken: string }> {
    try {
      const accessToken = createAccessToken(customer);
      return Promise.resolve({ accessToken });
    } catch (error) {
      throw new Error('Erro ao autenticar o cliente: ' + error.message);
    }
  }

  auth(customer: { numberPhone: string; password: string; }): Promise<{ accessToken: string }> {

    try {
      const accessToken = createAccessToken(customer);
      return Promise.resolve({ accessToken });
    } catch (error) {
      throw new Error('Erro ao autenticar o cliente: ' + error.message);
    }

  }
  async list(): Promise<null | CustomerEntity[]> {
    return await prisma.customer.findMany({});
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

  async createCustomerFor24h(customer: CustomerEntitySpeed): Promise<void> {
    await prisma.customerOnlyOneBet.create({
      data: {
        uuid: customer.uuid,
        numberPhone: customer.numberPhone,

      }
    })

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