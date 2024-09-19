import { User } from "@prisma/client";

const createUserIntoDB = async (payload: User) => {
  console.log(payload);
};

export const userServices = {
  createUserIntoDB,
};
