import { z } from "zod";

const createTripValidationSchema = z.object({
  body: z.object({
    destination: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    budget: z.number(),
    activities: z.array(z.string()),
  }),
});

export const tripValidations = {
  createTripValidationSchema,
};
