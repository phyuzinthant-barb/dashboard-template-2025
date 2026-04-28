import { Navigate, Outlet } from "react-router-dom";
import logo from "../assets/images/Logo.svg";

const AuthLayout = () => {
  if (localStorage.getItem("auth_token")) {
    return <Navigate to="/" />;
  }

  return (
    <section className="auth-bg ">
      <div className="flex justify-center flex-col gap-6 items-center h-[90%] ">
        <img src={logo} alt="" />
        <Outlet />
      </div>
    </section>
  );
};

export default AuthLayout;
