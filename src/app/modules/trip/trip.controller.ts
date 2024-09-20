import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { tripServices } from "./trip.service";
import pick from "../../utils/pick";
import httpStatus from "http-status";
import { tripFilterableFields } from "./trip.constant";

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

const getAllTrips: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, tripFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await tripServices.getAllTripsFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trips are fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
export const tripControllers = {
  createTrip,
  getAllTrips,
};
