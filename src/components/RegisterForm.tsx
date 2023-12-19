"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/validations/userSchema";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(SignUpSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) return;
      const user: Pick<Inputs, "email"> = await response.json();
      router.push(`/sendToken?email=${user.email}`);
      reset();
      return user;
    } catch (error: any) {}
  };

  return (
    <div className="flex justify-center pt-8">
      <div className="w-2/3 p-4 border shadow-2xl lg:w-1/3">
        <h1 className="my-4 text-2xl font-bold text-center">Register</h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="your name"
            className="p-2 border border-black rounded-md"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name?.message}</p>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="your@email.com"
            className="p-2 border border-black rounded-md"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email?.message}</p>
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            className="p-2 border border-black rounded-md"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password?.message}</p>
          )}
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="********"
            className="p-2 border border-black rounded-md"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword?.message}
            </p>
          )}
          <button
            className="p-2 bg-blue-400 border rounded-md hover:bg-blue-300"
            disabled={isSubmitting}
          >
            Sign up
          </button>
        </form>
        <p className="p-2 text-sm text-center lg:text-base">
          Do you have an account?
          <Link href={"/login"} className="ml-2 text-blue-400">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
