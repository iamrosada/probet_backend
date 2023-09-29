import { CustomerUseCase } from '../../application/usecases/create-customer';
import { InputCustomerAuth } from '../../interfaces';
import { Password } from '../core/password-hash';

export class CustomerController {
  constructor(private customerUseCase: CustomerUseCase) {
    this.insertCtrl = this.insertCtrl.bind(this);
    this.FindCustomerByPhoneNumberCtrl = this.FindCustomerByPhoneNumberCtrl.bind(this)
    // this.authCtrl = this.authCtrl.bind(this);
    // this.authExpireIn24Ctrl = this.authExpireIn24Ctrl.bind(this);
    // this.FindByDateCtrl = this.FindByDateCtrl.bind(this);
    // this.FindByIdCtrl = this.FindByIdCtrl.bind(this);
    // this.FindAllCustomerCtrl = this.FindAllCustomerCtrl.bind(this);
  }

  public async insertCtrl(input: Input) {
    //console.log(input)
    const customerAlreadyExist = await this.FindCustomerByPhoneNumberCtrl(input.numberPhone)
    console.log(customerAlreadyExist, 'fora promises')
    if (customerAlreadyExist) {
      //console.log((customerAlreadyExist), 'like promises')
      throw new Error('Error Customer Already Exist ');
    }
    try {
      const customer = await this.customerUseCase.registerCustomer(
        input.password,
        input.firstName,
        input.lastName,
        input.numberPhone,
      );

      return customer;
    } catch (error) {
      // Trate o erro de forma apropriada, como retornar uma resposta de erro HTTP.
      throw new Error('Erro ao criar cliente: ' + error.message);
    }
  }

  public async authCtrl(input: InputCustomerAuth) {

    const customerAlreadyExist = await this.FindCustomerByPhoneNumberCtrl(input.numberPhone)
    if (customerAlreadyExist) {

      const isPasswordValid = await Password.comparePassword(customerAlreadyExist.password, input.password);
      console.info(isPasswordValid, "out side")


      if (isPasswordValid) {
        console.info(isPasswordValid, "inside")
        try {

          const customer = await this.customerUseCase.AuthCustomerForLongPeriodBet(
            input.password,
            input.numberPhone
          );
          console.log('Password is valid. User authenticated.');

          return customer;
        } catch (error) {
          // Trate o erro de forma apropriada, como retornar uma resposta de erro HTTP.
          throw new Error('Erro na autenticação: ' + error.message);
        }
      } else {
        throw new Error('Password is not valid. Authentication failed. ');
      }


    } else if (!customerAlreadyExist) {
      throw new Error('Error Customer Not Exist ');
    }


  }

  public async authExpireIn24Ctrl(numberPhone: string) {
    try {
      const customer = await this.customerUseCase.AuthCustomerAndExpireAfterBet({
        numberPhone,
      });

      return customer;
    } catch (error) {
      // Trate o erro de forma apropriada, como retornar uma resposta de erro HTTP.
      throw new Error('Erro na autenticação com expiração: ' + error.message);
    }
  }

  public async FindByDateCtrl(createdAt: Date) {
    try {
      const customer = await this.customerUseCase.getCustomerByDate(createdAt);
      return customer;
    } catch (error) {
      // Trate o erro de forma apropriada, como retornar uma resposta de erro HTTP.
      throw new Error('Erro ao buscar cliente por data: ' + error.message);
    }
  }

  public async FindByIdCtrl(uuid: string) {
    try {
      const customer = await this.customerUseCase.getDetailCustomer(uuid);
      return customer;
    } catch (error) {
      // Trate o erro de forma apropriada, como retornar uma resposta de erro HTTP.
      throw new Error('Erro ao buscar cliente por ID: ' + error.message);
    }
  }

  public async FindAllCustomerCtrl() {
    try {
      const customer = await this.customerUseCase.getListOfAllCustomer();
      return customer;
    } catch (error) {
      // Trate o erro de forma apropriada, como retornar uma resposta de erro HTTP.
      throw new Error('Erro ao buscar todos os clientes: ' + error.message);
    }
  }

  public async FindCustomerByPhoneNumberCtrl(numberPhone: string) {
    try {
      const customer = await this.customerUseCase.findByNumberPhone(numberPhone);
      return customer;
    } catch (error) {
      // Trate o erro de forma apropriada, como retornar uma resposta de erro HTTP.
      throw new Error('Erro ao buscar  cliente por numero de telefone: ' + error.message);
    }
  }
}

type Input = {
  password: string;
  firstName: string;
  lastName: string;
  numberPhone: string;
};
