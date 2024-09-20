import { Secret } from "jsonwebtoken";
import config from "../../config";
import prisma from "../../utils/prisma";
import { verifyToken } from "../auth/auth.utils";

const getAllProfilesFromDB = async (token: any) => {
  const user = verifyToken(token, config.access_token_secret as Secret);
  const result = await prisma.profile.findFirstOrThrow({
    where: {
      userId: user.id,
    },
  });
  return result;
};

const updateProfileIntoDB = async (
  token: any,
  payload: { bio?: string; age?: number }
) => {
  const user = verifyToken(token, config.access_token_secret as Secret);
  const result = await prisma.profile.update({
    where: {
      userId: user.id,
    },
    data: payload,
  });
  return result;
};

export const profileServices = {
  getAllProfilesFromDB,
  updateProfileIntoDB,
};
