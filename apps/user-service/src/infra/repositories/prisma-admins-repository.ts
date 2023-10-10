
import { AdminRepository } from "../../application/repositories/admin-repository";
import { AdminEntity } from "../../domain/admin-entity/admin";
import { prisma } from "../database/prisma/prisma";

export class PrismaAdminRepository implements AdminRepository {
  authAdmin(email: string, password: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: string): Promise<AdminEntity | null> {
    throw new Error("Method not implemented.");
    // const admin = await prisma.admin.findUnique({
    //   where: { email },

    // })

    // if (!admin) {
    //   return null
    // }

    // return admin

  }
  async create(admin: AdminEntity): Promise<void> {
    await prisma.admin.create({
      data: {
        uuid: admin.uuid,
        email: admin.email,
        numberPhone: admin.numberPhone,
        password: admin.password,

      }
    })
  }

}

type InputAdminAuth = {
  email: string,
  password: string,
}