export { }


declare global {
  type InputCustomerAuth = {
    numberPhone: string;
    password: string;
  }
  type InputAdminAuth = {
    email: string;
    password: string;
  }

  type OutPutCustomerAuth = {
    accessToken?: string;
  }

  type InputExpireIn24SpeedAuth = {
    numberPhone: string;
  }


  type InputCreateSpeed = InputExpireIn24SpeedAuth

  type InputExpireIn24Speed = {
    numberPhone: string;
  }



}