import { z } from "zod";

const FileInfoSchema = z.object({
  lastModified: z.number(),
  lastModifiedDate: z.coerce.date(),
  name: z.string(),
  size: z.number(),
  type: z.string(),
  webkitRelativePath: z.string(),
});
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
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
  photos: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
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