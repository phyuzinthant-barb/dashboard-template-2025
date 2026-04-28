import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { getErrorMessage } from "@/utils/errorHandler";
import useAdmin from "../../hooks/useAdmin";
import { Icon } from "@iconify/react";
import { Edit3, EyeIcon, EyeOffIcon, Plus, RefreshCcw } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAdminRoles from "../../hooks/useAdminRoles";
import { GeneratePassword } from "js-generate-password";

type ApiError = {
  data: {
    details?: string[];
  };
  status: number;
};

const AdminSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.string().min(1, "Phone number must be at least 10 characters"),
  profilePicture: z.instanceof(File).optional(),
});

type AdminFormValues = z.infer<typeof AdminSchema>;

const AddAdminForm = () => {
  const nav = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(true);

  const { addAdmin, adding, added, addError } = useAdmin();
  const { data: roleData } = useAdminRoles();

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(AdminSchema),
  });

  const generatePassword = () => {
    const password = GeneratePassword({
      length: 8,
      symbols: true,
    });
    form.setValue("password", password);
    return password;
  };

  const profilePicture = form.watch("profilePicture");

  const onSubmit = (data: any) => {
    addAdmin(data);
  };

  useEffect(() => {
    if (added) {
      form.reset();
      nav(-1);
    }
  }, [form, added]);

  return (
    <Form {...form}>
      <form
        className="space-y-2 w-2/3 mx-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <section className=" bg-white  rounded-xl">
          <div className="p-4 text-xl border-b-[1.5px] font-bold border-b-blue-800">
            Add New Admin
          </div>

          {addError &&
            (addError as ApiError).data?.details?.map((el: string) => (
              <ErrorMessage key={el} message={el} />
            ))}

          {addError && <ErrorMessage message={getErrorMessage(addError)} />}

          <div className="!text-dark !mt-0 px-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div
                  style={{
                    backgroundImage: profilePicture
                      ? `url(${URL.createObjectURL(profilePicture)})`
                      : undefined,
                    backgroundColor: profilePicture ? undefined : "#0006254D",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => inputRef?.current?.click()}
                  className="size-[120px] cursor-pointer relative flex justify-center items-center border-[3px] shadow-lg rounded-full border-white"
                >
                  {!profilePicture && (
                    <Icon
                      icon={"fluent:person-32-filled"}
                      className=" size-16"
                      color="white"
                    />
                  )}
                  <div className=" absolute bg-white shadow-lg -right-2 bottom-0 size-10 rounded-full flex justify-center items-center">
                    {profilePicture ? (
                      <Edit3 className=" size-6" color="black" />
                    ) : (
                      <Plus className=" size-6" color="black" />
                    )}
                  </div>
                </div>

                <input
                  ref={inputRef}
                  className="hidden"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      form.setValue("profilePicture", e.target.files[0]);
                    }
                  }}
                  accept="image/*"
                />
              </div>
              <div className=" flex justify-end">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className=" ">
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className=" w-[200px] h-11 bg-gray border-[1.5px]  border-dark/30">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roleData?.data.map((item: any) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Name" />
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email Address" />
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
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className=" flex">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className=" pe-5  basis-[75%]">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="Enter Password"
                            type={showPassword ? "text" : "password"}
                            className=""
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                          >
                            {showPassword ? (
                              <EyeIcon size={18} />
                            ) : (
                              <EyeOffIcon size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="h-full flex-col justify-center mt-4 flex ">
                  <Button
                    type="button"
                    onClick={generatePassword}
                    variant="outline"
                    className=" flex  gap-2 h-11 "
                  >
                    <RefreshCcw className=" size-4" /> Generate
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex py-6 gap-3 items-center justify-end">
              <Button
                onClick={() => {
                  form.reset();
                  nav(-1);
                }}
                disabled={adding}
                type="button"
                variant="ghost"
                className="!px-8 h-12"
              >
                Cancel
              </Button>

              <Button className=" h-12 min-w-28 flex items-center justify-between">
                {adding ? "Adding..." : "Add Admin"}
              </Button>
            </div>
          </div>
        </section>

        {/* Submit buttons */}
      </form>
    </Form>
  );
};

export default AddAdminForm;
