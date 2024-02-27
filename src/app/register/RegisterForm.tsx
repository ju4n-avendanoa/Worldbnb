"use client";

import { SignUpSchema } from "@/validations/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ProviderLogs from "../../components/ProviderLogs";
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
      if (!response.ok) {
        toast.error("There was a problem, please try again later");
        return;
      }
      router.push("/");
    } catch (error: any) {
      toast.error("There was a problem, please try again later");
    } finally {
      reset();
    }
  };

  return (
    <div className="flex justify-center p-8 py-8">
      <div className="w-full p-4 border shadow-2xl lg:w-1/4">
        <h1 className="my-4 text-2xl font-bold text-center">
          Create your account
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <label htmlFor="name">
              <input
                required
                autoFocus
                type="text"
                id="name"
                className={`${
                  errors.name
                    ? "border border-red-600 outline-red-600 text-red-600"
                    : "focus:outline-sky-600"
                } w-full p-4 border border-gray-300 rounded-md peer`}
                {...register("name")}
              />
              <span
                className={`${
                  errors.name
                    ? "peer-focus:text-red-600 text-red-600"
                    : "peer-focus:text-sky-600"
                } label-style`}
              >
                Name
              </span>
            </label>
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name?.message}</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="email">
              <input
                required
                type="text"
                id="email"
                className={`${
                  errors.email
                    ? "border border-red-600 outline-red-600 text-red-600"
                    : "focus:outline-sky-600"
                } w-full p-4 border border-gray-300 rounded-md peer`}
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
          <div className="relative">
            <label htmlFor="confirm-password">
              <input
                required
                type="password"
                id="confirm-password"
                className={`${
                  errors.confirmPassword
                    ? "border border-red-600 outline-red-600 text-red-600"
                    : "focus:outline-sky-600"
                } w-full p-4 border border-gray-300 rounded-md peer`}
                {...register("confirmPassword")}
              />
              <span
                className={`${
                  errors.confirmPassword
                    ? "peer-focus:text-red-600 text-red-600"
                    : "peer-focus:text-sky-600"
                } label-style`}
              >
                Confirm password
              </span>
            </label>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="p-3 text-base text-white border rounded-md bg-sky-600 hover:bg-sky-700"
            disabled={isSubmitting}
          >
            Sign up
          </button>
        </form>
        <p className="p-2 text-xs text-center lg:text-sm">
          Already have an account?
          <Link
            href={"/login"}
            className="ml-2 text-sm font-medium text-blue-600"
          >
            Log in
          </Link>
        </p>
        <ProviderLogs />
      </div>
    </div>
  );
}

export default RegisterForm;
