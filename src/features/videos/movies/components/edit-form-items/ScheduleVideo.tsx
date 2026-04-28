import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScheduleVideo = ({ form, adding }: any) => {
  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("scheduleAt", date.toISOString());
    }
  }

  const nav = useNavigate();

  function handleTimeChange(type: "hour" | "minute" | "ampm", value: string) {
    const currentISO = form.getValues("scheduleAt");
    const currentDate = currentISO ? new Date(currentISO) : new Date();
    let newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      const isPM = newDate.getHours() >= 12;
      newDate.setHours(isPM ? (hour % 12) + 12 : hour % 12);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (value === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (value === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }

    form.setValue("scheduleAt", newDate.toISOString());
  }

  return (
    <div className="py-12 ps-4">
      <div className="flex justify-between items-start w-2/3">
        <div>
          <p className="font-bold mb-1 text-xl text-dark/80">
            Schedule your Video
          </p>
          <p className="text-dark/80">
            Schedule Video automates video uploads for timely publishing
          </p>
        </div>
        <Button
          onClick={() => form.setValue("status", "PUBLISHED")}
          type="button"
          variant="ghost"
          size="icon"
        >
          <X />
        </Button>
      </div>

      <FormField
        control={form.control}
        name="scheduleAt"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="sm:flex">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={handleDateSelect}
                initialFocus
              />

              <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                {/* Hour Picker */}
                <ScrollArea className="w-64 sm:w-auto">
                  <div className="flex sm:flex-col p-2">
                    {Array.from({ length: 12 }, (_, i) => i + 1)
                      .reverse()
                      .map((hour) => (
                        <Button
                          key={hour}
                          size="icon"
                          variant={
                            field.value &&
                            new Date(field.value).getHours() % 12 === hour % 12
                              ? "default"
                              : "ghost"
                          }
                          type="button"
                          className="sm:w-full shrink-0 aspect-square"
                          onClick={() =>
                            handleTimeChange("hour", hour.toString())
                          }
                        >
                          {hour}
                        </Button>
                      ))}
                  </div>
                  <ScrollBar orientation="horizontal" className="sm:hidden" />
                </ScrollArea>

                {/* Minute Picker */}
                <ScrollArea className="w-64 sm:w-auto">
                  <div className="flex sm:flex-col p-2">
                    {Array.from({ length: 12 }, (_, i) => i * 5).map(
                      (minute) => (
                        <Button
                          key={minute}
                          size="icon"
                          type="button"
                          variant={
                            field.value &&
                            new Date(field.value).getMinutes() === minute
                              ? "default"
                              : "ghost"
                          }
                          className="sm:w-full shrink-0 aspect-square"
                          onClick={() =>
                            handleTimeChange("minute", minute.toString())
                          }
                        >
                          {minute.toString().padStart(2, "0")}
                        </Button>
                      )
                    )}
                  </div>
                  <ScrollBar orientation="horizontal" className="sm:hidden" />
                </ScrollArea>

                {/* AM/PM Picker */}
                <ScrollArea>
                  <div className="flex sm:flex-col p-2">
                    {["AM", "PM"].map((ampm) => (
                      <Button
                        key={ampm}
                        size="icon"
                        variant={
                          field.value &&
                          ((ampm === "AM" &&
                            new Date(field.value).getHours() < 12) ||
                            (ampm === "PM" &&
                              new Date(field.value).getHours() >= 12))
                            ? "default"
                            : "ghost"
                        }
                        type="button"
                        className="sm:w-full shrink-0 aspect-square"
                        onClick={() => handleTimeChange("ampm", ampm)}
                      >
                        {ampm}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

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
        <Button disabled={adding} className="!px-8 h-12">
          Create Schedule Upload
        </Button>
      </div>
    </div>
  );
};

export default ScheduleVideo;
