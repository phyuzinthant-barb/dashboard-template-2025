import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  LucideLoaderCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { getErrorMessage } from "@/utils/errorHandler";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { handleLogin, isLoading, error } = useLogin();

  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    userType: z.string().optional(),
  });

  type loginFormValues = z.infer<typeof loginSchema>;

  const form = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "superadmin@gmail.com",
      password: "passwordD123!@#",
      userType: "ADMIN",
    },
  });

  return (
    <div className=" lg:w-[400px] 2xl:w-[464px] text-dark rounded-2xl 2xl:px-8 p-7 2xl:py-10 bg-white">
      <div className=" mb-4">
        <h1 className="2xl:mb-2 font-semibold leading-[20px] text-dark text-lg 2xl:text-2xl">
          Welcome Back!
        </h1>
        <p className=" 2xl:text-base lg:text-sm font-normal text-dark/80">
          Please log in to your account.
        </p>
        {error && (
          <p className=" text-red-500 text-sm">{getErrorMessage(error)}</p>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className=" mb-3.5 flex flex-col gap-2.5">
                    <Label>E-mail Address</Label>
                    <div className=" space-y-1">
                      <Input
                        {...field}
                        className={
                          form.formState.errors.email ? "border-red-500" : ""
                        }
                        placeholder="admin@example.com"
                      />
                      <FormMessage />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className=" mb-1.5 flex flex-col gap-2.5">
                    <Label>Password</Label>
                    <div className=" space-y-1">
                      <div className=" flex">
                        <Input
                          {...field}
                          id="password"
                          className={
                            form.formState.errors.password
                              ? "border-red-500"
                              : ""
                          }
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className=" -ms-8"
                        >
                          {showPassword ? (
                            <EyeIcon size={18} />
                          ) : (
                            <EyeOffIcon size={18} />
                          )}{" "}
                        </button>
                      </div>
                      <FormMessage />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <div className=" mb-4 flex justify-end">
            <Link to="/login/forgot-password">
              <p className=" text-sm font-medium hover:text-light-blue text-dark/80 hover:text-primary">
                Forgot Password?
              </p>
            </Link>
          </div>

          <Button
            size={"lg"}
            disabled={isLoading}
            className=" lg:h-11 2xl:h-12 flex justify-between text-lg w-full "
          >
            <span></span>
            <span>Login</span>
            {isLoading ? (
              <LucideLoaderCircle className=" animate-spin " />
            ) : (
              <ArrowRightIcon />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
