import { z } from "zod";

const createUserRegistrationValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }),
    email: z.string({ required_error: "Email is required!" }),
    password: z.string({ required_error: "Password is required" }),
    profile: z.object({
      bio: z.string({ required_error: "Profile Bio is required" }),
      age: z.number().min(0).max(100),
    }),
  }),
});

export const authValidations = {
  createUserRegistrationValidation,
};
