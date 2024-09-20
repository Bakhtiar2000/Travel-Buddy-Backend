import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { profileServices } from "./profile.service";

const getAllProfiles: RequestHandler = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await profileServices.getAllProfilesFromDB(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export const profileControllers = {
  getAllProfiles,
};
