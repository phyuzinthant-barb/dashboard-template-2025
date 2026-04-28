import ActorFormItem from "./ActorFormItem";
import ActressFormItem from "./ActressFormItem";
import SupportsFormItem from "./SupportingFormItem";

const CastFormSection = ({ form }: any) => {
  return (
    <section className=" bg-white  rounded-xl">
      <div className="p-4 text-xl border-b-[1.5px] font-bold border-b-blue-800">
        Cast Information
      </div>

      <div className="grid grid-cols-1 p-4 md:grid-cols-2 gap-4">
        <ActorFormItem form={form} />
        <ActressFormItem form={form} />
        <div className=" col-span-1">
          <SupportsFormItem form={form} />
        </div>
      </div>
    </section>
  );
};

export default CastFormSection;
