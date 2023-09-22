import { sign } from "jsonwebtoken";



export const createAccessToken = (userId: InputCustomerAuth) => {
  return sign(
    {
      user: userId,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "15m",
    }
  );
};

export const createRefreshToken = (userId: InputCustomerAuth) => {
  return sign(
    {
      user: userId,

    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};
