import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE_MB = 10;

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
  title: z.string().min(1, { message: "Title cannot be empty" }),
  address: z.string().min(1, { message: "Address cannot be empty" }),
  description: z.string().min(1, { message: "Description cannot be empty" }),
  perks: Perks,
  photos: z.any().refine((files) => {
    if (!files || files.length === 0) {
      return true;
    }

    const acceptedTypes = ACCEPTED_IMAGE_TYPES.includes(files[0].type);
    const withinSizeLimit = files[0].size / (1024 * 1024) <= MAX_FILE_SIZE_MB;

    return acceptedTypes && withinSizeLimit;
  }, `Only .jpg, .jpeg, .png, and .webp formats are supported. Maximum file size is ${MAX_FILE_SIZE_MB}MB.`),
  extraInfo: z.string().min(1, { message: "extra Info cannot be empty" }),
  checkIn: z.coerce
    .number()
    .gt(0, "Check-in hours must be between 0 and 23 hours.")
    .lte(23, "Check-in hours must be between 0 and 23 hours."),
  checkOut: z.coerce
    .number()
    .gt(0, "Check-out hours must be between 0 and 23 hours.")
    .lte(23, "Check-out hours must be between 0 and 23 hours."),
  maxGuests: z.coerce
    .number()
    .gt(0, "Minimum number of guests must be minimum 1"),
  country: z
    .string()
    .refine((value) => typeof value === "string" && value.trim() !== "", {
      message: "Country must be non-empty.",
    }),
  currency: z.string(),
  price: z.coerce.number().gte(1, "Price must be greater than 1"),
});
