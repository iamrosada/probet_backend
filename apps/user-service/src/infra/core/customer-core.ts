import { CustomerUseCase } from "../../application/usecases/create-customer";
import { CustomerController } from "../controller/customer";
import { PrismaCustomersRepository } from "../repositories/prisma-customers-repository";

/**
 * Iniciar Repository
 */
const customerRepo = new PrismaCustomersRepository();

/**
 * Iniciamos casos de uso
 */

const customerUseCase = new CustomerUseCase(customerRepo);

/**
 * Iniciar customer Controller
 */

export const customerCtrl = new CustomerController(customerUseCase);
