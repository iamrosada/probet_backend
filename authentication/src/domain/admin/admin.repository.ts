import { AdminEntity, ForgotPasswordResponse } from "./admin.entity";

export interface AdminRepository {
  findAdminById(uuid: string): Promise<AdminEntity | null>;
  registerAdmin(Admin: AdminEntity): Promise<AdminEntity | null>;
  listAdmin(): Promise<AdminEntity[] | null>;
  forgotPassword(uuid: string): Promise<ForgotPasswordResponse>;
}
