import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/utils/errorHandler";
import { toast } from "sonner";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "../services/authServices";
import { OTPFormValues, OTPVerifyFormValues } from "../types";

export const useOtp = () => {
  const nav = useNavigate();

  const [sendOtp, { isLoading, error }] = useSendOtpMutation();

  const [verify, { isLoading: verifyLoading, error: verifyError }] =
    useVerifyOtpMutation();

  const handleSendOtp = async (data: OTPFormValues) => {
    try {
      await sendOtp(data).unwrap();
      toast.success("OTP sent to your email!", { position: "top-center" });
      localStorage.setItem("otp_mail", data.email);
      nav("/login/verify-otp");
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  const verifyOtp = async (data: OTPVerifyFormValues) => {
    try {
      const res = await verify(data).unwrap();
      toast.success("Successfully verified your OTP!", {
        position: "top-center",
      });
      nav("/login/reset-password");
      localStorage.removeItem("otp_mail");
      localStorage.setItem("otp_token", res?.token);
      localStorage.setItem("otp_psw", res?.data[0]?.token);
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return {
    verifyOtp,
    handleSendOtp,
    isLoading,
    error,
    verifyLoading,
    verifyError,
  };
};
