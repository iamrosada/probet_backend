import { AuthAdminToDashboardUseCase } from "../../application/usecases/auth-admin-to-dashboard";
import { AdminUseCase } from "../../application/usecases/create-admin";
import { AdminController } from "../controller/admin.ctrl";
import { PrismaAdminRepository } from "../repositories/prisma-admins-repository";

/**
 * Iniciar Repository
 */
const adminRepo = new PrismaAdminRepository();

/**
 * Iniciamos casos de uso
 */

const adminUseCase = new AdminUseCase(adminRepo);
const adminAuthUseCase = new AuthAdminToDashboardUseCase(adminRepo);

/**
 * Iniciar admin Controller
 */

export const adminCtrl = new AdminController(adminUseCase, adminAuthUseCase);
