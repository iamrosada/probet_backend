import jwt from "jsonwebtoken";
import { v4 as uuidV4 } from 'uuid'
import { prisma } from "../database/prisma/prisma";
import dayjs, { unix } from "dayjs";


export interface PayloadCustomer {
  uuid: string;
}
export class TokenService {
  JWT_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  constructor() {
    // Secret key for signing access tokens (use a strong secret)
    this.JWT_SECRET = "Probet";

    // Secret key for signing refresh tokens (use a strong secret)
    this.REFRESH_TOKEN_SECRET = "Probet";
  }

  createAccessToken(customer: PayloadCustomer) {
    // Default token expiration: 24 hours
    const expiresIn = "26s";

    const payload = {
      customer: customer.uuid,
      // Add any other user-related data to the payload as needed
    };

    const accessToken = jwt.sign(payload, this.JWT_SECRET, { expiresIn });

    return accessToken;
  }

  //function to refresh the token
  async createRefreshToken(customerId: string) {
    try {
      const expireIn = dayjs().add(15, "second").unix();
      const uuid = uuidV4();

      const customerIsLogged = await prisma.refreshToken.findFirst({
        where: { customerId }
      });

      console.debug(customerIsLogged)
      if (customerIsLogged) {
        const generateRefreshToken = await prisma.refreshToken.update({
          where: { customerId },
          data: {
            customerId,
            expireIn
          }
        });
        return generateRefreshToken;
      }

      const generateRefreshToken = await prisma.refreshToken.create({
        data: {
          uuid,
          customerId,
          expireIn
        }
      });

      return generateRefreshToken
    } catch (error) {
      console.error("Error creating or updating refresh token:", error);
      throw new Error("Failed to create or update refresh token.");
    }
  }


  async refreshTokenUseCase(refresh_token: string) {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        uuid: refresh_token
      }
    })

    if (!refreshToken) {
      throw new Error("Refresh token invalid")
    }

    const refreshTokenExpired = dayjs().isAfter(unix(refreshToken.expireIn))

    const customerId = refreshToken.uuid as unknown as PayloadCustomer
    const token = this.createAccessToken(customerId)

    if (refreshTokenExpired) {

      await prisma.refreshToken.delete({
        where: { customerId: refreshToken.customerId }
      })

      const newRefreshToken = await this.createRefreshToken(refreshToken.customerId)

      return { token, refreshToken: newRefreshToken }

    }



    return token
  }

  async refreshTokenController(refresh_token: string) {


    const token = await this.refreshTokenUseCase(refresh_token)

    return token
  }
}
