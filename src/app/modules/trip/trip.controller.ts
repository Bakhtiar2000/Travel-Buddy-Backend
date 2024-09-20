import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { tripServices } from "./trip.service";

const createTrip: RequestHandler = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await tripServices.createTripIntoDB(token, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Trip created successfully",
    data: result,
  });
});
export const tripControllers = {
  createTrip,
};
