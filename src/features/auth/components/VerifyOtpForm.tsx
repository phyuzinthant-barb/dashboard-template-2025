import { ArrowLeft, ArrowRightIcon, LucideLoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { getErrorMessage } from "@/utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { useOtp } from "../hooks/useOtp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState } from "react";

const VerifyOtpForm = () => {
  const nav = useNavigate();
  const [otp, setOtp] = useState("");
  const { verifyOtp, isLoading, error } = useOtp();

  const otpSchema = z.object({
    email: z.string().email("Invalid email address"),
    otp: z.number(),
  });

  type otpFormValues = z.infer<typeof otpSchema>;

  const form = useForm<otpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: localStorage.getItem("otp_mail") || "",
    },
  });

  useEffect(() => {
    form.setValue("otp", Number(otp));
  }, [otp, setOtp]);

  return (
    <div className=" w-[464px] relative text-dark rounded-2xl px-8 py-10 bg-white">
      <div>
        <div className=" mb-4">
          <h1 className="mb-2 mt-1 font-semibold leading-[20px] text-dark text-2xl">
            Verification Code
          </h1>
          <p className=" font-normal text-dark/80">Enter otp sent to</p>
          <p className=" text-light-blue">{localStorage.getItem("otp_mail")}</p>
          {error && (
            <p className=" text-red-500 text-sm">{getErrorMessage(error)}</p>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(verifyOtp)}>
            <div className=" flex justify-center gap-12 mb-8">
              <InputOTP
                pattern={REGEXP_ONLY_DIGITS}
                value={otp}
                onChange={setOtp}
                maxLength={6}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

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

export default VerifyOtpForm;
