import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError, ZodIssue } from "zod";
import ApiError from "../errors/apiError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let message = "Something went wrong!";
  let errorDetails = err;

  if (err instanceof ZodError) {
    message = err.issues
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.message + " ";
      }, "")
      .trim();
    errorDetails = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    });
  } else if (err instanceof ApiError) {
    message = err.message;
    errorDetails = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorDetails = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: message,
    errorDetails: errorDetails,
  });
};
export default globalErrorHandler;
