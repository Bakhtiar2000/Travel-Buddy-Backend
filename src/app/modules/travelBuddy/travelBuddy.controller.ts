import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { travelBuddyServices } from "./travelBuddy.service";
import httpStatus from "http-status";

const getAllTravelBuddies: RequestHandler = catchAsync(async (req, res) => {
  const result = await travelBuddyServices.getAllTravelBuddiesFromDB(
    req.params.tripId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Potential travel buddies retrieved successfully",
    data: result,
  });
});

const respondToTravelBuddyRequest: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await travelBuddyServices.respondToTravelBuddyRequest(
      req.params.buddyId,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Travel buddy request responded successfully",
      data: result,
    });
  }
);

export const travelBuddyControllers = {
  getAllTravelBuddies,
  respondToTravelBuddyRequest,
};
