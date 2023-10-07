export interface CustomerEntity {
  uuid: string;
  firstName: string;
  lastName: string;
  numberPhone: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomerOnlyOneBetEntity {
  uuid: string;
  numberPhone: string;
  createdAt?: Date;
  updatedAt?: Date;
}