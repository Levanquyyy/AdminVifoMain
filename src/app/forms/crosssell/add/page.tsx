"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps, SelectProps } from "antd";
import {
  Button,
  Checkbox,
  Collapse,
  InputNumber,
  Select,
  Input,
  DatePicker,
} from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const FormLayout = () => {
  const { RangePicker } = DatePicker;
  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const [formSections, setFormSections] = useState([
    { answerText: "", answerValue: "", answerCode: "", answerNote: "" },
  ]);
  const [campaignName, setCampaignName] = useState("");
  const [family, setFamily] = useState("");
  const [distributor, setDistributor] = useState("");
  const [provider, setProvider] = useState("");
  const [dateRange, setDateRange] = useState(null);

  const isSubmitDisabled = () => {
    return !campaignName || !family || !distributor || !provider || !dateRange;
  };

  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: "Add Cross-sell",
      children: (
        <>
          <Breadcrumb pageName="Add Cross-sell" />
          <form>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                        Campaign Name
                        <strong className="text-red">*</strong>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="English"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="text-md  block font-medium capitalize text-black dark:text-white">
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
                        onChange={(value) => setFamily(value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="text-md  block font-medium capitalize text-black dark:text-white">
                        Distributor
                      </label>
                      <Select
                        mode="multiple"
                        size={"middle"}
                        placeholder="Please select"
                        style={{ width: "100%" }}
                        options={options}
                        onChange={(value) => setDistributor(value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="text-md  block font-medium capitalize text-black dark:text-white">
                        Provider
                      </label>
                      <Select
                        mode="multiple"
                        size={"middle"}
                        placeholder="Please select"
                        style={{ width: "100%" }}
                        options={options}
                        onChange={(value) => setProvider(value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <RangePicker onChange={(dates) => setDateRange(dates)} />
                  </div>
                </div>
                <div className=" w-full">
                  {/* <!-- Chọn Category --> */}
                  <div className="flex flex-col gap-5.5 ">
                    <Checkbox className="text-black dark:text-white">
                      One time per customer
                    </Checkbox>

                    <Checkbox className="text-black dark:text-white">
                      Ekyc Required
                    </Checkbox>
                  </div>

                  <br />
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                        Position
                      </label>
                      <InputNumber
                        min={0}
                        max={10}
                        defaultValue={1}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="primary"
              className="w-full"
              disabled={isSubmitDisabled()}
            >
              {" "}
              Thêm Bảo Hiểm
            </Button>
          </form>
        </>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        items={getItems()}
      />
    </DefaultLayout>
  );
};

export default FormLayout;
