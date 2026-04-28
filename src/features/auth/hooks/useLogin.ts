import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/utils/errorHandler";
import { toast } from "sonner";
import { useLoginMutation } from "../services/authServices";
import { jwtDecode } from "jwt-decode";

export const useLogin = () => {
  const nav = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  interface JwtPayload {
    exp: number;
    iat: number;
    email: string;
    userType: string;
    userId: string;
  }

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const res = await login({ ...data, userType: "ADMIN" }).unwrap();
      if (res) {
        localStorage.setItem("auth_token", res.accessToken);
        localStorage.setItem("refresh_token", res.refreshToken);
        localStorage.setItem("userId", res.userId);

        const decodedAccess = jwtDecode<JwtPayload>(res.accessToken);
        const decodedRefresh = jwtDecode<JwtPayload>(res.refreshToken);

        localStorage.setItem(
          "accessToken_exp",
          (decodedAccess.exp * 1000).toString()
        ); // in ms
        localStorage.setItem(
          "refreshToken_exp",
          (decodedRefresh.exp * 1000).toString()
        ); // in ms

        toast.success("Login successful", { position: "top-center" });
        nav("/");
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  };

  return { handleLogin, isLoading, error };
};
