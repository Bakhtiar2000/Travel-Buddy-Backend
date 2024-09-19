import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: null,
  });
});

export const userControllers = {
  createUser,
};
