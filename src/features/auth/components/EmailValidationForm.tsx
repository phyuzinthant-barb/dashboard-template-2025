import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRightIcon, LucideLoaderCircle } from "lucide-react";
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
import { useNavigate } from "react-router-dom";
import { useOtp } from "../hooks/useOtp";
import { ActionType } from "../types";
import { useEffect } from "react";

const EmailValidationForm = () => {
  const nav = useNavigate();
  const { handleSendOtp, isLoading, error } = useOtp();

  const otpSchema = z.object({
    email: z.string().email("Invalid email address"),
    action: z.nativeEnum(ActionType),
  });

  type otpFormValues = z.infer<typeof otpSchema>;
  const form = useForm<otpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    form.setValue("action", ActionType.PASSWORD_RESET);
  }, [form]);

  return (
    <div className=" w-[464px] relative text-dark rounded-2xl px-8 py-10 bg-white">
      <div>
        <div className=" mb-4">
          <h1 className="mb-2 mt-1 font-semibold leading-[20px] text-dark text-2xl">
            Reset Password
          </h1>
          <p className=" font-normal text-dark/80">
            Enter the E-mail associated with your account and we&apos;ll send
            verification code.{" "}
          </p>
          {error && (
            <p className=" text-red-500 text-sm">{getErrorMessage(error)}</p>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSendOtp)}>
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

            <Button
              size={"lg"}
              disabled={isLoading}
              className=" flex text-lg justify-between w-full "
            >
              <span></span>
              <span>Continue</span>
              {isLoading ? (
                <LucideLoaderCircle className=" animate-spin " />
              ) : (
                <ArrowRightIcon />
              )}
            </Button>
          </form>
        </Form>
      </div>

      <div className=" absolute top-0 flex items-start left-0  rounded-2xl">
        <div
          onClick={() => nav(-1)}
          style={{
            background:
              "linear-gradient(128.88deg, #03045E 1.86%, #0057FF 100%)",
          }}
          className=" w-[44px] active:scale-95 cursor-pointer h-[32px] flex justify-center items-center rounded-tl-2xl rounded-br-2xl"
        >
          <ArrowLeft className=" stroke-white size-5" />
        </div>
      </div>
    </div>
  );
};

export default EmailValidationForm;
