import { Request, Response } from "express";
import { CustomerUseCase } from "../../application/usecases/create-customer";

export class CustomerController {
  constructor(private customerUseCase: CustomerUseCase) {
    this.insertCtrl = this.insertCtrl.bind(this);
  }

  public async insertCtrl(input: Input) {
    const customer = await this.customerUseCase.registerCustomer(
      input.password,
      input.firstName,
      input.lastName,
      input.numberPhone,
      input.createdAt,
      input.updatedAt,
    );

    return customer;
  }

  public async authCtrl(password: string, numberPhone: string) {
    const customer = await this.customerUseCase.AuthCustomerForLongPeriodBet(
      {
        password,
        numberPhone
      }

    );

    return customer;
  }

  public async authExpireIn24Ctrl(numberPhone: string) {
    const customer = await this.customerUseCase.AuthCustomerAndExpireAfterBet(
      {
        numberPhone
      }

    );

    return customer;
  }

  public async FindByDateCtrl(createdAt: Date) {
    const customer = await this.customerUseCase.getCustomerByDate(
      createdAt
    );

    return customer;
  }

  public async FindByIdCtrl(uuid: string) {
    const customer = await this.customerUseCase.getDetailCustomer(
      uuid
    );

    return customer;
  }

  public async FindAllCustomerCtrl() {
    const customer = await this.customerUseCase.getListOfAllCustomer();

    return customer;
  }
}

type Input = {
  password: string;
  firstName: string;
  lastName: string;
  numberPhone: string;
  createdAt: Date;
  updatedAt: Date
};
