"use client";

import { useErrorStore } from "@/store/errorStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/validations/userSchema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import ProviderLogs from "./ProviderLogs";

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
  } = useForm<Inputs>({
    resolver: zodResolver(LoginSchema),
  });
  const { error, errorMessage, setError, setErrorMessage } = useErrorStore();

  const router = useRouter();

  useEffect(() => {
    setError(false);
  }, [setError]);

  const onSubmit = async (data: Inputs) => {
    try {
      setError(false);
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res?.error) {
        setError(true);
        setErrorMessage(res.error);
        return;
      }
      router.push("/");
    } catch (error: any) {
      console.error({ message: error });
    } finally {
      reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8 pt-8">
      <div className="w-full p-4 border shadow-2xl lg:w-1/4">
        <h1 className="my-6 text-2xl font-bold text-center">Welcome back</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <label htmlFor="email" className="text-gray-700">
              <input
                type="text"
                id="email"
                className={`${
                  errors.email
                    ? "border border-red-600 outline-red-600 text-red-600"
                    : "focus:outline-sky-600"
                } w-full p-4 border border-gray-300 rounded-md peer`}
                required
                {...register("email")}
              />
              <span
                className={`${
                  errors.email
                    ? "peer-focus:text-red-600 text-red-600"
                    : "peer-focus:text-sky-600"
                } label-style`}
              >
                Email address
              </span>
            </label>
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email?.message}</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="password">
              <input
                required
                type="password"
                id="password"
                className={`${
                  errors.password
                    ? "border border-red-600 outline-red-600 text-red-600"
                    : "focus:outline-sky-600"
                } w-full p-4 border border-gray-300 rounded-md peer`}
                {...register("password")}
              />
              <span
                className={`${
                  errors.password
                    ? "peer-focus:text-red-600 text-red-600"
                    : "peer-focus:text-sky-600"
                } label-style`}
              >
                Password
              </span>
            </label>

            {errors.password && (
              <p className="text-xs text-red-500">{errors.password?.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="p-3 text-base text-white border rounded-md bg-sky-600 hover:bg-sky-700"
            disabled={isSubmitting}
          >
            Sign in
          </button>
        </form>
        <p className="p-2 text-sm text-center lg:text-sm">
          Don&apos;t have an account?
          <Link href={"/register"} className="ml-2 font-medium text-sky-600">
            Sign up
          </Link>
        </p>
        <ProviderLogs />
      </div>
      {error ? (
        <div className="p-4 bg-red-500 rounded-lg">
          <p className="text-white">{errorMessage}</p>
        </div>
      ) : null}
    </div>
  );
}

export default LoginForm;
