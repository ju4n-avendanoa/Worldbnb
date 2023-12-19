"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/validations/userSchema";
import { signIn } from "next-auth/react";
import Link from "next/link";

type Inputs = {
  email: string;
  password: string;
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: Inputs) => {
    try {
      console.log("aca");
      console.log(data);
      // const res = await signIn("credentials", {
      //   ...data,
      //   redirect: false,
      // });
      // console.log(res);
    } catch (error: any) {
      console.error({ message: error });
    }
  };

  return (
    <div className="flex justify-center pt-8">
      <div className="w-2/3 p-4 border shadow-2xl lg:w-1/3">
        <h1 className="my-4 text-2xl font-bold text-center">Login</h1>
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            handleSubmit(onSubmit);
            e.preventDefault();
            reset();
            console.log("holaaa");
          }}
        >
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
          <button
            className="p-2 bg-blue-400 border rounded-md hover:bg-blue-300"
            disabled={isSubmitting}
            type="submit"
          >
            Sign in
          </button>
        </form>
        <p className="p-2 text-sm text-center lg:text-base">
          Don&apos;t have an account?
          <Link href={"/register"} className="ml-2 text-blue-400">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
