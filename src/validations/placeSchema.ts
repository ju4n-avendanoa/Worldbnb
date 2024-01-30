import { z } from "zod";

const Perks = z.object({
  wifi: z.boolean(),
  pet: z.boolean(),
  parking: z.boolean(),
  tv: z.boolean(),
  privateEntrance: z.boolean(),
  kitchen: z.boolean(),
  washer: z.boolean(),
  pool: z.boolean(),
  airConditioner: z.boolean(),
  breakfast: z.boolean(),
  gym: z.boolean(),
  cleaningService: z.boolean(),
});

export const PlaceSchema = z.object({
  title: z
    .string()
    .min(4, { message: "must be at least 4 characters long" })
    .max(60, { message: "must be maximum 60 characters long" }),
  address: z
    .string()
    .min(4, { message: "must be at least 4 characters long" })
    .max(60, { message: "must be maximum 60 characters long" }),
  description: z
    .string()
    .min(5, { message: "must be at least 4 characters long" }),

  perks: Perks,
  extraInfo: z
    .string()
    .min(5, { message: "must be at least 4 characters long" }),
  checkIn: z.coerce
    .number()
    .gte(0, "Check-in hours must be between 0 and 23 hours.")
    .lte(23, "Check-in hours must be between 0 and 23 hours."),
  checkOut: z.coerce
    .number()
    .gte(0, "Check-out hours must be between 0 and 23 hours.")
    .lte(23, "Check-out hours must be between 0 and 23 hours."),
  maxGuests: z.coerce
    .number()
    .gte(1, "Minimum number of guests must be minimum 1"),
});
