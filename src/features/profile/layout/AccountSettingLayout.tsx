import { Button } from "@/components/ui/button";
import { ChevronLeft, Lock, User } from "lucide-react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const AccountSettingLayout = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();

  return (
    <div className=" grid grid-cols-12 gap-y-6 gap-x-12">
      <div className="col-span-full">
        <Button
          onClick={() => nav(-1)}
          variant={"ghost"}
          className=" !p-0 items-center cursor-pointer flex gap-1"
        >
          <ChevronLeft /> <span>Back</span>
        </Button>
        <p className="font-bold text-xl ">Account Setting</p>
      </div>

      <div className=" col-span-3">
        <div className=" space-y-3">
          <Button
            onClick={() => nav(`/account-setting/${id}`)}
            variant={pathname.includes("password") ? "ghost" : "default"}
            className=" w-full py-5 flex gap-1"
          >
            <User />
            Profile Information
          </Button>
          <Button
            onClick={() => nav(`/account-setting/password/${id}`)}
            variant={pathname.includes("password") ? "default" : "ghost"}
            className=" w-full py-5 flex gap-1"
          >
            <Lock />
            Change Password
          </Button>
        </div>
      </div>
      <div className=" col-span-9">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountSettingLayout;
