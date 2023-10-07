import { AdminUseCase } from "../../application/usecases/create-admin";
import { AuthAdminToDashboardUseCase } from "../../application/usecases/auth-admin-to-dashboard";
import { AdminEntity } from "../../domain/admin-entity/admin";

export class AdminController {
  constructor(private adminUseCase: AdminUseCase, private authAdminToDashboardUseCase: AuthAdminToDashboardUseCase) {
    this.insertCtrl = this.insertCtrl.bind(this);
    this.authCtrl = this.authCtrl.bind(this);
  }

  public async insertCtrl(input: Input) {
    const admin = await this.adminUseCase.registerAdmin(
      input.password,
      input.email,
      input.numberPhone,
      input.createdAt,
      input.updatedAt,
    );

    return admin;
  }


  public async authCtrl(input: InputAdminAuth) {
    const admin = await this.authAdminToDashboardUseCase.authentication(
      input
    );

    return admin;
  }
}
type InputAdminAuth = {
  email: string,
  password: string,
}
type Input = {
  password: string,
  email: string,
  numberPhone: string,
  createdAt: Date,
  updatedAt: Date
};

