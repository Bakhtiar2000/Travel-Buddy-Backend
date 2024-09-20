import { Secret } from "jsonwebtoken";
import prisma from "../../utils/prisma";
import { verifyToken } from "../auth/auth.utils";
import config from "../../config";
import { TPaginationOptions } from "../../interfaces/pagination";
import { Prisma } from "@prisma/client";
import calculatePagination from "../../utils/calculatePagination";
import { tripSearchableFields } from "./trip.constant";

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

const getAllTripsFromDB = async (params: any, options: TPaginationOptions) => {
  const andConditions: Prisma.TripWhereInput[] = [];

  const { searchTerm, ...filteredData } = params;
  const { page, limit, skip } = calculatePagination(options);

  if (params.searchTerm) {
    andConditions.push({
      OR: tripSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filteredData).length > 0) {
    andConditions.push({
      AND: Object.keys(filteredData).map((key) => ({
        [key]: {
          equals: (filteredData as any)[key],
        },
      })),
    });
  }

  const result = await prisma.trip.findMany({
    where: {
      AND: andConditions,
    },
    skip: skip,
    take: limit,
    orderBy: options.sortBy
      ? options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            [options.sortBy]: "asc",
          }
      : {
          createdAt: "desc",
        },
  });
  const total = await prisma.trip.count({
    where: {
      AND: andConditions,
    },
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const tripServices = {
  createTripIntoDB,
  getAllTripsFromDB,
};
