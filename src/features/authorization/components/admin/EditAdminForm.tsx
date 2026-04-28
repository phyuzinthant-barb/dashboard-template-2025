import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { getErrorMessage } from "@/utils/errorHandler";
import useAdmin from "../../hooks/useAdmin";
import { Icon } from "@iconify/react";
import { Edit3, Plus } from "lucide-react";
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
import { useSingleAdminQuery } from "../../services/adminService";

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
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
  role: z.string().min(1, "Phone number must be at least 10 characters"),
  profilePicture: z.union([z.instanceof(File), z.string()]).optional(),
});

type AdminFormValues = z.infer<typeof AdminSchema>;

const EditAdminForm = () => {
  const nav = useNavigate();
  const { id } = useParams();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { updateAdmin, updating, updated, updateError } = useAdmin();
  const { data } = useSingleAdminQuery({
    id: id as string,
  });

  const { data: roleData } = useAdminRoles();

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(AdminSchema),
  });

  const profilePicture = form.watch("profilePicture");

  const onSubmit = (data: any) => {
    updateAdmin(id as string, data);
  };

  useEffect(() => {
    if (updated) {
      form.reset();
      nav(-1);
    }
  }, [form, updated]);

  useEffect(() => {
    if (data) {
      form.reset({
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        role: data?.role?._id,
        profilePicture: data?.profilePictureUrl,
      });
    }
  }, [data, form]);

  return (
    <Form {...form}>
      <form
        className="space-y-2 w-2/3 mx-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <section className=" bg-white  rounded-xl">
          <div className="p-4 text-xl border-b-[1.5px] font-bold border-b-blue-800">
            Edit Admin
          </div>

          {updateError &&
            (updateError as ApiError).data?.details?.map((el: string) => (
              <ErrorMessage key={el} message={el} />
            ))}

          {updateError && (
            <ErrorMessage message={getErrorMessage(updateError)} />
          )}

          <div className="!text-dark !mt-0 px-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div
                style={{
                  backgroundImage: profilePicture
                    ? `url(${
                        typeof profilePicture === "string"
                          ? profilePicture
                          : URL.createObjectURL(profilePicture)
                      })`
                    : undefined,
                  backgroundColor: !profilePicture ? "#0006254D" : undefined,
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
                            <SelectValue placeholder={data?.role?.title} />
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
                    <FormLabel>Email Editress</FormLabel>
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex py-6 gap-3 items-center justify-end">
              <Button
                onClick={() => {
                  form.reset();
                  nav(-1);
                }}
                disabled={updating}
                type="button"
                variant="ghost"
                className="!px-8 h-12"
              >
                Cancel
              </Button>

              <Button className=" h-12 min-w-28 flex items-center justify-between">
                {updating ? "Updating..." : "Edit Admin"}
              </Button>
            </div>
          </div>
        </section>

        {/* Submit buttons */}
      </form>
    </Form>
  );
};

export default EditAdminForm;
