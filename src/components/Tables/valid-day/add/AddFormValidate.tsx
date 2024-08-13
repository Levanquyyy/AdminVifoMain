import { Button, InputNumber, Select } from "antd";

const AddFormValidate = () => {
  return (
    <div>
      <div className="flex-1 rounded-lg bg-white p-6 shadow-md">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Family
        </label>
        <Select
          defaultValue="lucy"
          className="w-full"
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
          ]}
        />
      </div>
      <div className="flex-1 rounded-lg bg-white p-6 shadow-md">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Provider
        </label>
        <Select
          defaultValue="lucy"
          className="w-full"
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
          ]}
        />
      </div>
      <div className="flex-1 rounded-lg bg-white p-6 shadow-md">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Provider
        </label>
        <div className="flex flex-col gap-3">
          <InputNumber min={1} max={10} defaultValue={0} className="w-full" />

          <Button type="primary" className="mt-3">
            Add New
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddFormValidate;
