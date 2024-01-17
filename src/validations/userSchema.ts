import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "must be at least 2 character long" })
      .max(60, { message: "must be maximum 60 characters long" }),
    email: z.string().email({ message: "please enter a valid email" }),
    password: z
      .string()
      .min(8, { message: "must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password must match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email({ message: "please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "must be at least 8 characters long" }),
});

export const verificationEmail = z.object({
  email: z.string().email({ message: "please enter a valid email" }),
});
