import React, { useState } from "react";
import { Input, Select, Button } from "antd";
import BenefitPropertyForm from "../BenefitPropertyForm/BenefitPropertyForm";

interface ProductOptionFormProps {
  index: number;
  benefit: string;
  onDelete: () => void;
}

const ProductOptionForm: React.FC<ProductOptionFormProps> = ({
  index,
  benefit,
  onDelete,
}) => {
  const [benefitforProperty, setBenefitforProperty] = useState<any[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAddBenefitforProperty = () => {
    setBenefitforProperty([
      ...benefitforProperty,
      setIsButtonDisabled(!isButtonDisabled),
    ]);
  };

  const handleDelete = (index: number) => {
    setBenefitforProperty(benefitforProperty.filter((_, i) => i !== index));
    setIsButtonDisabled(!isButtonDisabled);
  };

  return (
    <div className="mb-3 w-full rounded-md border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center space-x-4">
        <div className="flex flex-grow flex-col gap-1">
          <label htmlFor="Option_title" className="dark:text-white">
            Product Option Title
          </label>
          <Input
            id="Option_title"
            placeholder="Basic usage"
            className="w-full dark:border-strokedark dark:bg-boxdark dark:text-white"
            style={{ borderRadius: "6px", borderColor: "gray" }}
          />
        </div>
        <div className="flex flex-grow flex-col gap-1">
          <label htmlFor="Option_select" className="dark:text-white">
            Type
          </label>
          <Select
            size={"large"}
            className="w-full dark:border-strokedark dark:bg-boxdark dark:text-white"
            defaultValue="a1"
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </div>
        <div className="flex flex-grow flex-col gap-1">
          <label htmlFor="Option_position" className="dark:text-white">
            Product Position
          </label>
          <Input
            id="Option_position"
            placeholder="Basic usage"
            defaultValue={"1"}
            className="w-full dark:border-strokedark dark:bg-boxdark dark:text-white"
            style={{ borderRadius: "6px", borderColor: "gray" }}
          />
        </div>
        <Button
          type="primary"
          danger
          className="self-end dark:bg-red"
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>
      <div className="mt-4 w-full">
        <Button
          type="primary"
          className="my-3 bg-primary dark:text-white"
          onClick={handleAddBenefitforProperty}
          disabled={isButtonDisabled}
        >
          Add Property
        </Button>
        {benefitforProperty.map((benefit, index) => (
          <BenefitPropertyForm
            key={index}
            benefit={benefit}
            index={index}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductOptionForm;
