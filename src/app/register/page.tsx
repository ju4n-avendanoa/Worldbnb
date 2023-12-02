"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/validations/userSchema";
import Link from "next/link";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(SignUpSchema),
  });

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
      const responseData = await response.json();
      console.log(responseData);
      reset();
    } catch (error: any) {}
  };

  return (
    <div className="flex justify-center">
      <div className="w-2/3 lg:w-1/3 border shadow-2xl p-4">
        <h1 className="text-2xl text-center font-bold my-4">Register</h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="your name"
            className="border border-black rounded-md p-2"
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
            className="border border-black rounded-md p-2"
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
            className="border border-black rounded-md p-2"
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
            className="border border-black rounded-md p-2"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword?.message}
            </p>
          )}
          <button
            className="border rounded-md bg-blue-400 p-2 hover:bg-blue-300"
            disabled={isSubmitting}
          >
            Login
          </button>
        </form>
        <p className="text-sm lg:text-base text-center p-2">
          Don&apos;t have an account yet?{" "}
          <Link href={"/register"} className="text-blue-400 ml-2">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
