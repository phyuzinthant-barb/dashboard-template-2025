import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { Edit } from "lucide-react";
import { useState } from "react";
import ChangeInformationForm from "../components/ChangeInformationForm";

const AccountSettingPage = () => {
  const { data } = useProfile();

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="p-5  bg-white rounded-lg dark:bg-gray-800  shadow-lg">
      {isEdit ? (
        <ChangeInformationForm setIsEdit={setIsEdit} />
      ) : (
        <>
          <div className=" flex justify-between ">
            <div className="-mt-16 bg-white  dark:bg-gray-800  shadow size-24 flex justify-center items-center rounded-full">
              {data?.profilePictureUrl ? (
                <img
                  src={data?.profilePictureUrl}
                  className="size-20 rounded-full"
                />
              ) : (
                <Avatar className="size-20 " />
              )}
            </div>
            <Button
              onClick={() => setIsEdit(true)}
              className=" text-blue-600"
              variant={"ghost"}
            >
              <Edit /> <span className=" ms-0.5">Edit</span>
            </Button>
          </div>
          <div className="mt-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-0.5">
                <Label>Full Name</Label>
                <Input readOnly onChange={() => {}} value={data?.name || ""} />
              </div>
              <div className="space-y-0.5">
                <Label>Email</Label>
                <Input readOnly onChange={() => {}} value={data?.email || ""} />
              </div>
              <div className="space-y-0.5">
                <Label>Phone</Label>
                <Input readOnly onChange={() => {}} value={data?.phone || ""} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountSettingPage;
