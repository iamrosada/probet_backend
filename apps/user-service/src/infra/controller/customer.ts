import { CustomerUseCase } from "../../application/usecases/create-customer";
import { InputCustomerAuth } from "../../interfaces";
import { TokenService } from "../core/auth-global-core";
import { Password } from "../core/password-hash";
import { OTPVerifyPhoneNumber } from "../core/verify-OTP-phone-core";
import { prisma } from "../database/prisma/prisma";

export class CustomerController {
  constructor(private customerUseCase: CustomerUseCase) {
    this.insertCtrl = this.insertCtrl.bind(this);
    this.FindCustomerByPhoneNumberCtrl =
      this.FindCustomerByPhoneNumberCtrl.bind(this)
    this.authCtrl = this.authCtrl.bind(this);
    this.authExpireIn24Ctrl = this.authExpireIn24Ctrl.bind(this);
    // this.FindByDateCtrl = this.FindByDateCtrl.bind(this);
    // this.FindByIdCtrl = this.FindByIdCtrl.bind(this);
    // this.FindAllCustomerCtrl = this.FindAllCustomerCtrl.bind(this);
  }

  public async insertCtrl(input: Input) {
    //console.log(input)
    const customerAlreadyExist = await this.FindCustomerByPhoneNumberCtrl(
      input.numberPhone
    );
    console.log(customerAlreadyExist, "fora promises");
    if (customerAlreadyExist) {
      //console.log((customerAlreadyExist), 'like promises')
      throw new Error("Error Customer Already Exist ");
    }
    try {
      const customer = await this.customerUseCase.registerCustomer(
        input.password,
        input.firstName,
        input.lastName,
        input.numberPhone
      );

      return customer;
    } catch (error) {
      // Trate o erro de forma apropriada, como retornar uma resposta de erro HTTP.
      throw new Error("Erro ao criar cliente: " + error.message);
    }
  }

  public async insertOnlyOneBetCtrl(numberPhone: string) {
    //console.log(input)
    const customerAlreadyExist = await this.FindCustomerByPhoneNumberOOBCtrl(
      numberPhone
    );
    if (customerAlreadyExist) {
      throw new Error("Error Customer Already Exist ");
    }
    try {
      const customer =
        await this.customerUseCase.registerCustomerAndExpireAfterBet(
          numberPhone
        );

      return customer;
    } catch (error) {
      // Trate o erro de forma apropriada, como retornar uma resposta de erro HTTP.
      throw new Error("Erro ao criar cliente: " + error.message);
    }
  }
  public async authCtrl(input: InputCustomerAuth) {
    const customerAlreadyExist = await this.FindCustomerByPhoneNumberCtrl(
      input.numberPhone
    );
    if (!customerAlreadyExist) {
      throw new Error("User or password incorrect");
    }

    const isPasswordValid = await Password.comparePassword(
      customerAlreadyExist.password,
      input.password
    );

    if (!isPasswordValid) {
      throw new Error("User or password incorrect");
    }
    //Enviar mensagem apenas se ter palavra passe valida
    //sconst sendOTP = await OTPVerifyPhoneNumber.sendVerificationCode("+244930260233")

    console.info(isPasswordValid, "inside");
    try {
      const token = await this.customerUseCase.AuthCustomerForLongPeriodBet(
        input.password,
        input.numberPhone,
        customerAlreadyExist.uuid
      );

      // await prisma.refreshToken.deleteMany({
      //   where: {
      //     customerId: customerAlreadyExist.uuid
      //   }
      // })
      const generateRefreshToken = new TokenService();

      const refreshToken = await generateRefreshToken.createRefreshToken(
        customerAlreadyExist.uuid
      );

      console.log("Password is valid. User authenticated.");

      return { token, refreshToken };
    } catch (error) {
      // Trate o erro de forma apropriada, como retornar uma resposta de erro HTTP.
      throw new Error("Erro na autenticação: " + error.message);
    }
  }

  public async authExpireIn24Ctrl(numberPhone: string) {
    const customerAlreadyExist = await this.FindCustomerByPhoneNumberOOBCtrl(
      numberPhone
    );
    if (customerAlreadyExist) {
      try {
        const customer =
          await this.customerUseCase.AuthCustomerAndExpireAfterBet(numberPhone);
        console.log("Password is valid. User authenticated.");

        return customer;
      } catch (error) {
        // Trate o erro de forma apropriada, como retornar uma resposta de erro HTTP.
        throw new Error("Erro na autenticação: " + error.message);
      }
    } else if (!customerAlreadyExist) {
      throw new Error("Error Customer Not Exist ");
    }
  }

  public async FindByDateCtrl(createdAt: Date) {
    try {
      const customer = await this.customerUseCase.getCustomerByDate(createdAt);
      return customer;
    } catch (error) {
      // Trate o erro de forma apropriada, como retornar uma resposta de erro HTTP.
      throw new Error("Erro ao buscar cliente por data: " + error.message);
    }
  }

  public async FindByIdCtrl(uuid: string) {
    try {
      const customer = await this.customerUseCase.getDetailCustomer(uuid);
      return customer;
    } catch (error) {
      // Trate o erro de forma apropriada, como retornar uma resposta de erro HTTP.
      throw new Error("Erro ao buscar cliente por ID: " + error.message);
    }
  }

  public async FindAllCustomerCtrl() {
    try {
      const customer = await this.customerUseCase.getListOfAllCustomer();
      return customer;
    } catch (error) {
      // Trate o erro de forma apropriada, como retornar uma resposta de erro HTTP.
      throw new Error("Erro ao buscar todos os clientes: " + error.message);
    }
  }

  public async FindCustomerByPhoneNumberCtrl(numberPhone: string) {
    try {
      const customer = await this.customerUseCase.findByNumberPhone(
        numberPhone
      );
      return customer;
    } catch (error) {
      // Trate o erro de forma apropriada, como retornar uma resposta de erro HTTP.
      throw new Error(
        "Erro ao buscar  cliente por numero de telefone: " + error.message
      );
    }
  }

  public async FindCustomerByPhoneNumberOOBCtrl(numberPhone: string) {
    try {
      const customer = await this.customerUseCase.findByNumberPhoneOnlyOneBet(
        numberPhone
      );
      return customer;
    } catch (error) {
      // Trate o erro de forma apropriada, como retornar uma resposta de erro HTTP.
      throw new Error(
        "Erro ao buscar  cliente por numero de telefone: " + error.message
      );
    }
  }
}

type Input = {
  password: string;
  firstName: string;
  lastName: string;
  numberPhone: string;
};
