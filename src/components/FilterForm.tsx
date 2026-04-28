import { ReactNode } from "react";
import { Button } from "./ui/button";

const FilterForm = ({
  children,
  handleFilter,
  onClear,
}: {
  children: ReactNode;
  handleFilter: () => void;
  onClear: () => void;
}) => {
  return (
    <div className=" w-full rounded-lg bg-white">
      <div className=" relative  border-b-2 p-3 border-blue-500">
        <p className="w-1/2 font-bold text-lg">Filter By :</p>
      </div>

      <div className=" p-3 grid gap-4 grid-cols-12">
        <div className=" col-span-10">{children}</div>
        <div className=" col-span-2">
          <div className=" flex items-center justify-end gap-3">
            <Button
              variant={"secondary"}
              onClick={() => {
                onClear();
              }}
              className=" w-full h-10 rounded-full"
            >
              Clear
            </Button>
            <Button
              onClick={() => handleFilter()}
              className=" w-full h-10 rounded-full"
            >
              Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
