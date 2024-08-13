import React, { useState } from "react";
import {
  Input,
  Select,
  Checkbox,
  Button,
  CheckboxProps,
  InputNumber,
} from "antd";

interface BenefitPropertyFormProps {
  benefit: any;
  index: number;
  onDelete: () => void;
}

const BenefitPropertyForm: React.FC<BenefitPropertyFormProps> = ({
  benefit,
  index,
  onDelete,
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };

  return (
    <>
      <div
        className="flex flex-col  gap-3 md:flex-row md:space-y-0"
        key={index}
      >
        <div className="flex flex-grow flex-col gap-1">
          <label className="dark:text-white" htmlFor={`Option_title_${index}`}>
            Label
          </label>
          <Input
            id={`Option_title_${index}`}
            placeholder="Basic usage"
            className="w-full dark:border-strokedark dark:bg-boxdark dark:text-white"
            style={{ borderRadius: "6px", borderColor: "gray" }}
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-grow flex-col gap-1">
          <label className="dark:text-white" htmlFor={`Option_select_${index}`}>
            Price
          </label>
          <InputNumber
            min={1}
            max={10}
            defaultValue={0}
            className="w-full px-3 py-1 "
          />
        </div>
        <div className="flex flex-grow flex-col gap-1">
          <label className="dark:text-white" htmlFor={`Option_select_${index}`}>
            Percent (%)
          </label>
          <InputNumber
            min={1}
            max={10}
            defaultValue={0}
            className="w-full px-3 py-1 "
          />
        </div>
        <div className="flex flex-grow flex-col gap-1">
          <label className="dark:text-white" htmlFor={`Option_select_${index}`}>
            Benefit amount
          </label>
          <InputNumber
            min={1}
            max={10}
            defaultValue={0}
            className="w-full px-3 py-1 "
          />
        </div>
        <div className="flex flex-grow flex-col gap-1">
          <label className="dark:text-white" htmlFor={`Option_sku_${index}`}>
            Sku
          </label>
          <Input
            id={`Option_sku_${index}`}
            placeholder="Basic usage"
            defaultValue="1"
            className="w-full dark:border-strokedark dark:bg-boxdark dark:text-white"
            style={{ borderRadius: "6px", borderColor: "gray" }}
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>
        <div className="flex flex-grow flex-col gap-1">
          <label
            className="dark:text-white"
            htmlFor={`Option_position_${index}`}
          >
            Position
          </label>
          <Input
            id={`Option_position_${index}`}
            placeholder="Basic usage"
            defaultValue="1"
            className="w-full dark:border-strokedark dark:bg-boxdark dark:text-white"
            style={{ borderRadius: "6px", borderColor: "gray" }}
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className="flex flex-grow items-center">
          <Checkbox>No Tax</Checkbox>
        </div>
        <div className="flex flex-grow flex-col gap-1">
          <label className="dark:text-white" htmlFor={`Option_select_${index}`}>
            Pre Check
          </label>
          <InputNumber
            min={1}
            max={10}
            defaultValue={0}
            className="w-full px-3 py-1 "
          />
        </div>
      </div>
      <Button
        type="primary"
        danger
        className="my-4 self-end dark:bg-red"
        onClick={onDelete}
      >
        Delete
      </Button>
    </>
  );
};

export default BenefitPropertyForm;
