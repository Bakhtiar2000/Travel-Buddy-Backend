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

export const travelBuddyServices = {
  getAllTravelBuddiesFromDB,
};
