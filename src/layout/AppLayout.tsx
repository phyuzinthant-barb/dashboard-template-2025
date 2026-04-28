import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Navigate, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  if (!localStorage.getItem("auth_token")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex max-h-screen overflow-hidden w-screen bg-[#F7F8F8] dark:bg-dark">
      <Sidebar />
      <main className="flex-1 max-h-screen overflow-scroll scroll-container">
        <Navbar />
        <div className=" min-h-[87%] pb-4 overflow-auto px-5 mt-5 ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
