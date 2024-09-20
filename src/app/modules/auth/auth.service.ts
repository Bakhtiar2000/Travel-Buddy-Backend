import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";

type TRegisterData = {
  name: string;
  email: string;
  password: string;
  profile: {
    bio: string;
    age: number;
  };
};

const registerUser = async (payload: TRegisterData) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  const userData = {
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });
    await transactionClient.profile.create({
      data: {
        bio: payload.profile.bio,
        age: payload.profile.age,
        userId: createdUserData.id,
      },
    });

    return {
      id: createdUserData.id,
      name: createdUserData.name,
      email: createdUserData.email,
      createdAt: createdUserData.createdAt,
      updatedAt: createdUserData.updatedAt,
    };
  });
  return result;
};

export const authServices = {
  registerUser,
};
