import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { getErrorMessage } from "@/utils/errorHandler";
type ApiError = {
  data: {
    details?: string[];
  };
  status: number;
};
const PasswordSetting = () => {
  const { updateUserPassword, updatePasswordError, updatingPassword } =
    useProfile();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const accountSchema = z.object({
    oldPassword: z.string().min(1, "Current Password is required"),
    newPassword: z.string().min(1, "New Password is required"),
  });

  type PasswordFormValue = z.infer<typeof accountSchema>;

  const form = useForm<PasswordFormValue>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const submit = async (values: PasswordFormValue) => {
    try {
      await updateUserPassword(values);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="p-5 bg-white  dark:bg-gray-800  rounded-lg  shadow-lg"
      >
        <div className=" flex justify-between ">
          <p className=" text-xl font-semibold">Change Password</p>
        </div>
        <div className="mt-5">
          {updatePasswordError && (
            <ErrorMessage message={getErrorMessage(updatePasswordError)} />
          )}

          {updatePasswordError &&
            (updatePasswordError as ApiError).data?.details?.map(
              (el: string) => <ErrorMessage key={el} message={el} />
            )}
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showOldPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      >
                        {showOldPassword ? <EyeIcon /> : <EyeOffIcon />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showNewPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeIcon /> : <EyeOffIcon />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className=" flex gap-2 justify-end col-span-full">
              <Button disabled={updatingPassword}>Save</Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PasswordSetting;
