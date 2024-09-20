import { Status } from "@prisma/client";
import prisma from "../../utils/prisma";

const getAllTravelBuddiesFromDB = async (tripId: string) => {
  const result = await prisma.travelBuddyRequest.findMany({
    where: {
      tripId: tripId,
    },
    include: {
      user: true,
    },
  });
  return result;
};

const respondToTravelBuddyRequest = async (
  buddyId: string,
  payload: { tripId: string; status: Status }
) => {
  const result = await prisma.travelBuddyRequest.update({
    where: {
      // unique identifier
      userId_tripId: {
        userId: buddyId,
        tripId: payload.tripId,
      },
    },
    data: {
      status: payload.status,
    },
  });
  return result;
};

export const travelBuddyServices = {
  getAllTravelBuddiesFromDB,
  respondToTravelBuddyRequest,
};
