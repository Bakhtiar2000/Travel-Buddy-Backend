import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import { generateToken } from "./auth.utils";
import config from "../../config";
import { Secret } from "jsonwebtoken";

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

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }

  const tokenPayload = {
    email: userData.email,
    name: userData.name,
  };

  const accessToken = generateToken(
    tokenPayload,
    config.access_token_secret as Secret,
    config.access_token_expires_in as string
  );
  const refreshToken = generateToken(
    tokenPayload,
    config.refresh_token_secret as Secret,
    config.refresh_token_expires_in as string
  );

  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    accessToken,
    refreshToken,
  };
};

export const authServices = {
  registerUser,
  loginUser,
};
