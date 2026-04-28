import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ArrowRight, CalendarIcon } from "lucide-react";
import FilterForm from "@/components/FilterForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const FilterCustomers = () => {
  const [params, setParams] = useSearchParams();
  params;

  const [filters, setFilters] = useState<{
    category: string;
    range: { startDate: Date | null; endDate: Date | null };
    search: string;
    status: string;
    plan: string;
  }>({
    category: "",
    range: { startDate: null, endDate: null },
    search: "",
    status: "",
    plan: "",
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFilter = () => {
    const newParams = new URLSearchParams();
    newParams.set("sortBy", "name");
    newParams.set("sortOrder", "asc");
    newParams.set("limit", "10");
    newParams.set("page", "1");

    if (filters.category) newParams.set("category", filters.category || "");
    if (filters.status) newParams.set("status", filters.status || "");
    if (filters.plan) newParams.set("plan", filters.plan || "");
    if (filters.range.startDate && filters.range.endDate) {
      newParams.set("startDate", format(filters.range.startDate, "yyyy-MM-dd"));
      newParams.set("endDate", format(filters.range.endDate, "yyyy-MM-dd"));
    }

    setParams(newParams);
  };

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const onClear = () => {
    setFilters({
      category: "",
      range: { startDate: null, endDate: null },
      search: "",
      status: "",
      plan: "",
    });

    const newParams = new URLSearchParams();
    newParams.set("page", "1");
    newParams.set("limit", "10");
    newParams.set("sortBy", "name");
    newParams.set("sortOrder", "asc");
    newParams.delete("startDate");
    newParams.delete("endDate");
    setParams(newParams);

    setDate({ from: undefined, to: undefined });
  };

  return (
    <FilterForm onClear={onClear} handleFilter={handleFilter}>
      <div className="grid gap-3 grid-cols-3 lg:grid-cols-5">
        <div className=" col-span-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                id="date"
                className={cn(
                  "justify-between !hover:bg-gray !bg-gray w-full rounded-full text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span className=" flex gap-1 items-center">
                    <span>Start Date</span>
                    <span>
                      <ArrowRight />
                    </span>
                    <span>End Date</span>
                  </span>
                )}
                <CalendarIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(range) => {
                  setDate(range);
                  handleFilterChange("range", {
                    startDate: range?.from || null,
                    endDate: range?.to || null,
                  });
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className=" relative">
          <Select
            value={filters.status || ""}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="rounded-full bg-gray">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              {["PAID", "FREE"].map((item: any) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </FilterForm>
  );
};

export default FilterCustomers;
