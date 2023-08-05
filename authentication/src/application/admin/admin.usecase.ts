import { AdminRepository } from "../../domain/admin/admin.repository";
import { AdminValue } from "../../domain/admin/admin.value";

export class AdminUseCase {
  constructor(private readonly adminRepository: AdminRepository) {}

  public registerAdmin = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    accessToken: string,
    createdAt: Date,
    updatedAt: Date
  ) => {
    const adminValue = new AdminValue({
      email,
      password,
      firstName,
      lastName,
      accessToken,
      createdAt,
      updatedAt,
    });
    const adminCreated = await this.adminRepository.registerAdmin(adminValue);
    return adminCreated;
  };

  public getDetailAdmin = async (uuid: string) => {
    const admin = await this.adminRepository.findAdminById(uuid);
    return admin;
  };
}
