import jwt from "jsonwebtoken";

interface TokenOptions {
  expiresIn?: string;
}
export interface PayloadCustomer {
  numberPhone: string;
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

  createAccessToken(customer: PayloadCustomer, options: TokenOptions) {
    // Default token expiration: 24 hours
    const expiresIn = options.expiresIn || "24h";

    const payload = {
      customer: customer.numberPhone,
      // Add any other user-related data to the payload as needed
    };

    const accessToken = jwt.sign(payload, this.JWT_SECRET, { expiresIn });

    return accessToken;
  }

  createRefreshToken(customer: PayloadCustomer, options: TokenOptions) {
    // Default token expiration: 30 days
    const expiresIn = options.expiresIn || "30d";

    const payload = {
      customer: customer.numberPhone,
      // Add any other user-related data to the payload as needed
    };

    const refreshToken = jwt.sign(payload, this.REFRESH_TOKEN_SECRET, {
      expiresIn,
    });

    return refreshToken;
  }
}
