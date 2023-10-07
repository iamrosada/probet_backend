import { AdminRepository } from "../repositories/admin-repository";


export class AuthAdminToDashboardUseCase {
  constructor(private readonly adminRepository: AdminRepository) { }

  public authentication = async (admin: InputAdminAuth) => {

    let AdminExist = this.adminRepository.findByEmail(admin.email)
    if (!AdminExist) {
      //@ts-ignores

      const response = this.adminRepository.authAdmin({

      });
      return response;
    }

  };



}


type InputAdminAuth = {
  email: string,
  password: string,
}