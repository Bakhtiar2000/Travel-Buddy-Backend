import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError, ZodIssue } from "zod";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errorMessage = "Something went wrong!";
  let errorSources = err;

  if (err instanceof ZodError) {
    errorMessage = err.issues
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.message + " ";
      }, "")
      .trim();
    errorSources = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: errorMessage,
    errorDetails: errorSources,
  });
};
export default globalErrorHandler;
