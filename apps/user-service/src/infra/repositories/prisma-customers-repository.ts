import { verify, sign } from "jsonwebtoken";
import { CustomerRepository } from "../../application/repositories/customer-repository";
import { CustomerEntity, CustomerEntitySpeed } from "../../domain/customer-entity/customer";
import { prisma } from "../database/prisma/prisma";
import { createAccessToken } from "../core/auth-global-core";

export class PrismaCustomersRepository implements CustomerRepository {
  authExpireIn24(customer: { numberPhone: string; }): Promise<{ accessToken: string }> {
    const accessToken = createAccessToken(customer)

    return accessToken
  }

  auth(customer: { numberPhone: string; password: string; }): Promise<{ accessToken: string }> {

    const accessToken = createAccessToken(customer)

    return accessToken

  }
  async list(): Promise<null | CustomerEntity[]> {
    return await prisma.customer.findMany({});
  }

  async findCustomerById(id: string): Promise<null | CustomerEntity> {
    const customer = await prisma.customer.findUnique({
      where: { id },
    })

    if (!customer) {
      return null
    }

    return customer
  }

  async findCustomerByDateCreation(createdAt: Date): Promise<null | CustomerEntity> {
    const customer = await prisma.customer.findUnique({
      where: { createdAt },
    })

    if (!customer) {
      return null
    }

    return customer
  }


  async findByNumberPhone(phone: string): Promise<CustomerEntity | null> {
    const customer = await prisma.customer.findUnique({
      where: { phone },
    })

    if (!customer) {
      return null
    }

    return customer
  }

  async createCustomerFor24h(customer: CustomerEntitySpeed): Promise<void> {
    await prisma.customer.create({
      data: {
        uuid: customer.uuid,
        numberPhone: customer.numberPhone,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt
      }
    })

  }


  async create(customer: CustomerEntity) {
    await prisma.customer.create({
      data: {
        uui: customer.uuid,
        password: customer.password,
        firstName: customer.firstName,
        lastName: customer.lastName,
        numberPhone: customer.numberPhone,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt
      }
    })
  }
}