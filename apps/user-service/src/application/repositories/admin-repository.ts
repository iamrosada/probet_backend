import { AdminEntity } from "../../domain/admin-entity/admin";


export interface AdminRepository {
  authAdmin(email: string, password: string): Promise<string>
  create(admin: AdminEntity): Promise<void>
  findByEmail(email?: string): Promise<AdminEntity | null>
}




