import { Button, Checkbox, Collapse, Select } from "antd";
import { useState } from "react";
import type { CollapseProps, InputNumberProps } from "antd";
import { InputNumber } from "antd";

const items = [
  "Daily",
  "Monthly",
  "Yearly",
  "6 Months",
  "Quarterly",
  "Trip",
  "Percent",
];
const Price = () => {
  // xoa

  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [checkedItem, setCheckedItem] = useState("");
  const onChange = (e: any, value: any) => {
    if (e.target.checked) {
      setCheckedItem(value); // Update the checked item
      setIsInputDisabled(false);
    } else {
      setCheckedItem(""); // Reset if unchecked

      setIsInputDisabled(true);
    }
  };

  const onChangeInPut: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };

  // const handleAddBenefitForPricesQuan = createAddBenefitHandler(
  //   benefitforpricesquan,
  //   setBenefitforpricesquan,
  // );
  const [benefits, setBenefits] = useState<string[]>([]);
  const [benefitsforQuan, setBenefitsforQuan] = useState<string[]>([]);

  const handleAddBenefitForPrices = () => {
    setBenefits([...benefits, `Benefit ${benefits.length + 1}`]);
  };
  const handleAddBenefitForQuan = () => {
    setBenefitsforQuan([
      ...benefitsforQuan,
      `Benefit ${benefitsforQuan.length + 1}`,
    ]);
  };

  const handleRemoveBenefitByIndex = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const handleRemoveBenefitForQuanByIndex = (index: number) => {
    setBenefitsforQuan(benefitsforQuan.filter((_, i) => i !== index));
  };

  const underprices: CollapseProps["items"] = items
    .filter((value) => value === checkedItem)
    .map((value) => [
      {
        key: `${value}-1`,
        label: `${value} Discount`,
        children: (
          <>
            {benefits.map((benefit, index) => (
              <div
                key={benefit}
                className=" mb-4.5 flex flex-col gap-6 rounded-sm border  border-stroke p-3 font-medium text-black dark:border-strokedark dark:bg-boxdark dark:text-white xl:flex-row"
              >
                <div className=" flex w-full flex-col items-center gap-5  xl:flex-row">
                  <div className="flex w-full">
                    <InputNumber
                      min={1}
                      max={10}
                      onChange={onChangeInPut}
                      disabled={disabled}
                      id="taxprice"
                      className="handlecsspicker w-full"
                    />
                  </div>
                  <div className=" flex w-full flex-col xl:flex-row">
                    <label
                      htmlFor="price"
                      className=" dark:text-white xl:w-full"
                    >
                      Value:
                    </label>
                    <InputNumber
                      min={1}
                      max={10}
                      defaultValue={3}
                      onChange={onChangeInPut}
                      disabled={isInputDisabled}
                      id="extraprice"
                      className="handlecsspicker w-full"
                    />
                  </div>
                  <div className="flex w-full">
                    <Select
                      defaultValue="%"
                      style={{ width: 120 }}
                      options={[{ value: "%", label: "%" }]}
                      className="handlecsspicker"
                    />
                  </div>
                  <div className="flex w-full items-start">
                    <Button
                      type="primary"
                      shape="circle"
                      style={{ backgroundColor: "#f86c6b" }}
                      onClick={() => handleRemoveBenefitByIndex(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="primary"
              style={{ backgroundColor: "#20a8d8" }}
              onClick={handleAddBenefitForPrices}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add
            </Button>
          </>
        ),
      },
      {
        key: `${value}-2`,
        label: "Quantity discount",
        children: (
          <>
            {benefitsforQuan.map((benefit, index) => (
              <div
                key={benefit}
                className="mb-4.5 flex flex-col  gap-7 xl:flex-row"
              >
                <div className="flex w-full flex-col items-center gap-5 xl:flex-row">
                  <div className="flex w-full">
                    <InputNumber
                      min={1}
                      max={10}
                      onChange={onChangeInPut}
                      disabled={isInputDisabled}
                      id="taxprice"
                      className="w-full"
                    />
                  </div>
                  <div className="flex w-full items-center gap-3">
                    <label htmlFor="price" className="dark:text-white">
                      Value:
                    </label>
                    <InputNumber
                      min={1}
                      max={10}
                      defaultValue={3}
                      onChange={onChangeInPut}
                      disabled={isInputDisabled}
                      id="extraprice"
                      className="handlewf"
                    />
                  </div>
                  <div className="flex w-full">
                    <Select
                      defaultValue="%"
                      style={{ width: 120 }}
                      options={[{ value: "%", label: "%" }]}
                    />
                  </div>
                  <div className="flex w-full items-start">
                    <Button
                      type="primary"
                      shape="circle"
                      style={{ backgroundColor: "#f86c6b" }}
                      onClick={() => handleRemoveBenefitForQuanByIndex(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="primary"
              style={{ backgroundColor: "#20a8d8" }}
              onClick={handleAddBenefitForQuan}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add
            </Button>
          </>
        ),
      },
    ])
    .flat();

  return items.map((value) => [
    <>
      {/* product prices */}
      <div className=" mb-4.5 flex flex-col gap-6 rounded-sm border  border-stroke  p-3 font-medium text-black dark:border-strokedark dark:bg-boxdark dark:text-white xl:flex-row">
        <div className=" w-full items-center gap-5  rounded-sm p-3 xl:flex">
          <div
            className="flex flex-shrink-0 flex-col"
            style={{ width: "200px" }}
          >
            {" "}
            {/* Adjust the width as needed */}
            <Checkbox
              checked={checkedItem === value}
              disabled={disabled}
              onChange={(e) => onChange(e, value)}
              className="dark:text-white"
            >
              {value}term
            </Checkbox>
          </div>
          <div className="  w-full flex-col xl:flex">
            <label htmlFor="price" className="dark:text-white xl:w-full">
              Exc. tax price
            </label>
            <InputNumber
              min={1}
              max={10}
              defaultValue={3}
              onChange={onChangeInPut}
              disabled={checkedItem !== value}
              id="price"
              className="w-full dark:border-meta-4"
            />
          </div>
          <div className="w-full flex-col ">
            <label htmlFor="price" className="dark:text-white xl:w-full">
              {" "}
              Inc. tax price
            </label>
            <InputNumber
              min={1}
              max={10}
              defaultValue={3}
              onChange={onChangeInPut}
              disabled={checkedItem !== value}
              id="taxprice"
              className="w-full dark:border-meta-4"
            />
          </div>
          <div className="w-full flex-col">
            <label htmlFor="price" className="dark:text-white xl:w-full">
              Extra price
            </label>
            <InputNumber
              min={1}
              max={10}
              defaultValue={3}
              onChange={onChangeInPut}
              disabled={checkedItem !== value}
              id="extraprice"
              className="w-full dark:border-meta-4"
            />
          </div>
        </div>
      </div>
      {checkedItem === value ? (
        <div className="flex flex-col gap-7">
          <Collapse
            items={underprices}
            bordered={false}
            defaultActiveKey={["1"]}
          />
        </div>
      ) : null}
    </>,
  ]);
};

export default Price;
