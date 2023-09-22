import { AdminEntity } from "../../domain/admin-entity/admin";


export interface AdminRepository {
  auth(admin: InputAdminAuth): Promise<string>
  create(admin: AdminEntity): Promise<void>
  findByEmail(email: string): Promise<AdminEntity | null>
}




