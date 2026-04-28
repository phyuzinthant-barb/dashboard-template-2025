import { apiService } from "@/service/apiService";
import { LoginFormValues, OTPFormValues, OTPVerifyFormValues } from "../types";

const authEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (arg: LoginFormValues) => ({
        body: arg,
        method: "POST",
        url: "/auth/login",
      }),
      invalidatesTags: ["Me"],
    }),

    sendOtp: builder.mutation({
      query: (arg: OTPFormValues) => ({
        body: { ...arg, userType: "ADMIN" },
        method: "POST",
        url: "/auth/otp/send",
      }),
    }),

    verifyOtp: builder.mutation({
      query: (arg: OTPVerifyFormValues) => ({
        body: arg,
        method: "POST",
        url: "/auth/otp/verify",
      }),
    }),
  }),
});

export const { useLoginMutation, useSendOtpMutation, useVerifyOtpMutation } =
  authEndpoints;
