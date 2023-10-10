export type InputCustomerAuth = {
  numberPhone?: string;
  password?: string;
}
export type InputAdminAuth = {
  email?: string;
  password?: string;
}

export type OutPutCustomerAuth = {
  accessToken?: string;
}

export type InputExpireIn24SpeedAuth = {
  numberPhone?: string;
}


export type InputCreateSpeed = InputExpireIn24SpeedAuth

export type InputExpireIn24Speed = {
  numberPhone: string;
}
