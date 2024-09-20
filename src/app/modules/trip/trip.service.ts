import { Secret } from "jsonwebtoken";
import prisma from "../../utils/prisma";
import { verifyToken } from "../auth/auth.utils";
import config from "../../config";

type TTripData = {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  activities: string[];
};

const createTripIntoDB = async (token: any, payload: TTripData) => {
  const verifiedUser = verifyToken(token, config.access_token_secret as Secret);

  const createdTripData = await prisma.trip.create({
    data: {
      ...payload,
      userId: verifiedUser.id,
    },
  });
  return createdTripData;
};

export const tripServices = {
  createTripIntoDB,
};
