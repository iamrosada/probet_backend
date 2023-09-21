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
}

type Input = {
  password: string;
  firstName: string;
  lastName: string;
  numberPhone: string;
  createdAt: Date;
  updatedAt: Date
};
