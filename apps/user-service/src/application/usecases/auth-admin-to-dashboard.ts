import { AdminRepository } from "../repositories/admin-repository";


export class AuthAdminToDashboardUseCase {
  constructor(private readonly adminRepository: AdminRepository) { }

  public authentication = async (admin: InputAdminAuth) => {

    let AdminExist = this.adminRepository.findByEmail(admin.email)

    if (!AdminExist) {
      const response = this.adminRepository.auth({
        email: admin.email,
        password: admin.password
      });
      return response;
    }

  };



}

