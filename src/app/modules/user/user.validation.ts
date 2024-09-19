import { z } from "zod";

const createUserValidation = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  user: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z.string({
      required_error: "Email is required!",
    }),
  }),
});

export const userValidations = {
  createUserValidation,
};
