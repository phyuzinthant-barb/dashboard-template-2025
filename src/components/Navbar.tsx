import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogOut, SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/features/auth/hooks/useProfile";

const Navbar = () => {
  const nav = useNavigate();

  const { data } = useProfile();

  return (
    <div className=" sticky top-0 z-[50] bg-gray dark:bg-dark w-full p-5 pb-0">
      <div className=" flex  mb-0  gap-3 bg-white dark:bg-gray-600 rounded shadow justify-end p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className=" px-2.5 font-normal" variant="outline">
              {data?.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 space-y-1 me-1">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => nav(`/account-setting/${data?._id}`)}
                className=" my-1.5"
              >
                <SettingsIcon /> <span className=" ms-1">Setting</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  localStorage.clear();
                  nav("/login");
                }}
              >
                <LogOut /> <span className=" ms-1">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
