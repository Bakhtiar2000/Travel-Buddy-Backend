import { z } from "zod";

const respondTravelBuddyValidationSchema = z.object({
  body: z.object({
    tripId: z.string(),
    status: z.string(),
  }),
});

export const travelBuddyValidations = {
  respondTravelBuddyValidationSchema,
};
