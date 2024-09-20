import { NextFunction, Request, Response } from "express";
import config from "../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../errors/apiError";
import httpStatus from "http-status";
import { verifyToken } from "../modules/auth/auth.utils";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
      }
      const verifiedUser = verifyToken(
        token,
        config.access_token_secret as Secret
      );

      req.user = verifiedUser;
      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Unauthorized Access");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
