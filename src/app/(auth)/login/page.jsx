"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/validators/auth";
import { useLoginMutation } from "@/store/api/authApi";
import { toast } from "sonner";
import { setUser } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data).unwrap();

      if (res.success) {
        toast.success(res.message || "Login successful");
        dispatch(setUser(res.user));
        if (res.user.role === "admin") {
          router.push("/admin");
        } else if (res.user.role === "user") {
          router.push("/user");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      const message = error?.data?.message || "Invalid credentials";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-primary">Login</h2>

        <p className="text-center text-gray-500">
          Welcome back, Login to access your resources
        </p>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2495ef]"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="********"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2495ef]"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link
            href={"/register"}
            className="text-[#2495ef] font-medium cursor-pointer hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
