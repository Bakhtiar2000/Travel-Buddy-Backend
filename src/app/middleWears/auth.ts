import { NextFunction, Request, Response } from "express";
import config from "../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../errors/apiError";
import httpStatus from "http-status";
import { verifyToken } from "../modules/auth/auth.utils";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
      }
      const verifiedUser = verifyToken(
        token,
        config.access_token_secret as Secret
      );

      if (!verifiedUser) {
        throw new ApiError(httpStatus.FORBIDDEN, "Unauthorized Access");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
