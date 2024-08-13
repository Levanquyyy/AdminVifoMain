"use client";
import type { CollapseProps } from "antd";
import { Collapse, Select, Badge, Card, Button } from "antd";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CaretRightOutlined } from "@ant-design/icons";
import { useState } from "react";

const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const page = () => {
  const [userselected, setUserselected] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const adddistributorgr = () => {
    if (selectedOption) {
      setUserselected([...userselected, selectedOption]);
    }
  };
  const deletedistributorgr = (index) => {
    setUserselected(userselected.filter((_, i) => i !== index));
  };
  const [optionsfordistributor, setOptionsfordistributor] = useState([
    {
      value: "1",
      label: "Not Identified",
    },
    {
      value: "2",
      label: "Closed",
    },
    {
      value: "3",
      label: "Communicated",
    },
    {
      value: "4",
      label: "Identified",
    },
    {
      value: "5",
      label: "Resolved",
    },
    {
      value: "6",
      label: "Cancelled",
    },
  ]);

  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: "Add Group Distributor",
      children: (
        <>
          <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
            <div className=" flex flex-col gap-6 ">
              <div className="w-full ">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Group Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder="Company Name"
                  defaultValue={"HDI"}
                />
              </div>
              <div className="w-full ">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Group Code *
                </label>
                <input
                  required
                  type="text"
                  placeholder="VietNam"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  defaultValue={"HDI"}
                />
              </div>
              <div className="w-full ">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  search name if you want find Distributor
                </label>
                {/* test */}
                <div className="flex flex-col gap-3">
                  <Select
                    showSearch
                    className="h-14 w-full"
                    placeholder="Search to Select"
                    optionFilterProp="label"
                    onChange={(value) => {
                      const selectedOption = optionsfordistributor.find(
                        (option) => option.value === value,
                      );
                      setSelectedOption(selectedOption);
                    }}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={optionsfordistributor}
                  />

                  <button
                    type="button"
                    onClick={adddistributorgr}
                    className="edit handlebuttonedit w-16 max-w-18"
                  >
                    Add
                  </button>
                  {userselected.map((item, index) => (
                    <div className="flex w-full">
                      <Badge.Ribbon text="VIFO" color="volcano">
                        <Card title="Current Distributor" size="small">
                          {item.label}
                        </Card>
                      </Badge.Ribbon>
                      <Button
                        type="primary"
                        danger
                        onClick={() => deletedistributorgr(index)}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 "
              >
                Thêm Bảo Hiểm
              </button>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <Collapse
        bordered={false}
        defaultActiveKey={["1", "2"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        items={getItems()}
      />
    </DefaultLayout>
  );
};

export default page;
