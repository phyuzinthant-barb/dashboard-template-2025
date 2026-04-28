import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useProfile } from "@/features/auth/hooks/useProfile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar } from "@/components/ui/avatar";
import { getErrorMessage } from "@/utils/errorHandler";
import ErrorMessage from "@/components/ErrorMessage";

type ApiError = {
  data: {
    details?: string[];
  };
  status: number;
};

const ChangeInformationForm = ({
  setIsEdit,
}: {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: user, updateMe, updating, updated, updateError } = useProfile();
  const [file, setFile] = useState<File | undefined>(undefined);

  const accountSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone Number is required"),
    email: z.string().min(1, "Email is required").email(),
  });

  type AccountFormValue = z.infer<typeof accountSchema>;

  const form = useForm<AccountFormValue>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      });
    }
  }, [form, user]);

  const ref = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (values: AccountFormValue) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);

      if (file) {
        formData.append("profilePicture", file);
      }

      await updateMe(formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (updated) {
      setIsEdit(false);
    }
  }, [updating, updated]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" flex justify-between ">
          <input
            type="file"
            ref={ref}
            className=" hidden"
            accept=".png,.jpg,.jpeg"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <div
            onClick={() => ref?.current?.click()}
            className="-mt-16 bg-white  dark:bg-gray-800  shadow size-24 flex cursor-pointer justify-center items-center rounded-full"
          >
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                className="size-20 object-cover rounded-full "
              />
            ) : (
              <>
                {user?.data?.profile ? (
                  <img
                    src={user?.data?.profile}
                    className="size-20 rounded-full"
                  />
                ) : (
                  <Avatar className="size-20" />
                )}
              </>
            )}
          </div>
        </div>
        <div className="mt-5">
          {updateError && (
            <ErrorMessage message={getErrorMessage(updateError)} />
          )}
          {updateError &&
            (updateError as ApiError).data?.details?.map((el: string) => (
              <ErrorMessage key={el} message={el} />
            ))}

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className=" flex gap-2 justify-end col-span-full">
              <Button
                onClick={() => setIsEdit(false)}
                type="button"
                variant={"ghost"}
              >
                Cancel
              </Button>

              <Button disabled={updating}>
                {updating && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ChangeInformationForm;
