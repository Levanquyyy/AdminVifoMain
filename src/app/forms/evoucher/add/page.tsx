"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Button, Checkbox, Collapse, Select } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import { Input } from "antd";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
const { TextArea } = Input;

const validationSchema = Yup.object({
  Campaign: Yup.string().required("Required"),
  ProductFamily: Yup.string().required("Required"),
});
const FormLayout = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.checked);
  };
  const [selectedValueZalo, setselectedValueZalo] = useState<string | null>(
    null,
  );
  const handleSelectChangeZalo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setselectedValueZalo(e.target.checked);
  };
  // check field empty

  const formik = useFormik({
    initialValues: {
      Campaign: "",
      ProductFamily: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Form data", values);
      resetForm();
    },
  });

  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: "Create New Vouchers",
      children: (
        <>
          <Breadcrumb pageName="Your level: 1" />
          <form onSubmit={formik.handleSubmit} id="insuranceForm">
            <div className=" gap-9  sm:grid-cols-4 ">
              <div className="flex flex-col gap-9">
                {/* <!--Bao hiem xe co --> */}
                <div className=" rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                  <form action="#">
                    <div className="p-6.5">
                      {/* product code */}
                      <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                        <div className=" flex flex-col gap-6 xl:flex-row">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              Campaign <strong className="text-red">*</strong>
                            </label>
                            <input
                              required
                              type="text"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              name="Campaign"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.Campaign}
                            />
                            {formik.touched.Campaign &&
                            formik.errors.Campaign ? (
                              <div className="text-red">
                                {formik.errors.Campaign}
                              </div>
                            ) : null}
                          </div>
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              Quantity
                            </label>
                            <input
                              required
                              type="number"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              QR Code base url
                            </label>
                            <input
                              required
                              type="text"
                              placeholder="English"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                      {/* product name */}
                      <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                        <div className=" flex flex-col gap-6 p-3 px-3 xl:flex-row">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              Distributor
                              <strong className="text-red">*</strong>
                            </label>
                            <Select
                              className="h-12 w-full rounded  bg-transparent  text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              options={[
                                { value: "jack", label: "Jack" },
                                { value: "lucy", label: "Lucy" },
                                { value: "Yiminghe", label: "yiminghe" },
                                {
                                  value: "disabled",
                                  label: "Disabled",
                                  disabled: true,
                                },
                              ]}
                            />
                          </div>
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              Product Family
                              <strong className="text-red">*</strong>
                            </label>
                            <Select
                              className="h-12 w-full rounded  bg-transparent  text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              options={[
                                { value: "jack", label: "Jack" },
                                { value: "lucy", label: "Lucy" },
                                { value: "Yiminghe", label: "yiminghe" },
                                {
                                  value: "disabled",
                                  label: "Disabled",
                                  disabled: true,
                                },
                              ]}
                            />
                          </div>
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              Provider
                              <strong className="text-red">*</strong>
                            </label>
                            <Select
                              className="h-12 w-full rounded  bg-transparent  text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              options={[
                                { value: "jack", label: "Jack" },
                                { value: "lucy", label: "Lucy" },
                                { value: "Yiminghe", label: "yiminghe" },
                                {
                                  value: "disabled",
                                  label: "Disabled",
                                  disabled: true,
                                },
                              ]}
                            />
                          </div>
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              Rank
                            </label>
                            <Select
                              className="h-12 w-full rounded  bg-transparent  text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              options={[
                                { value: "jack", label: "Jack" },
                                { value: "lucy", label: "Lucy" },
                                { value: "Yiminghe", label: "yiminghe" },
                                {
                                  value: "disabled",
                                  label: "Disabled",
                                  disabled: true,
                                },
                              ]}
                            />
                          </div>
                        </div>
                      </div>

                      {/* product rank */}

                      <div className=" mb-4.5 flex flex-col gap-6 rounded-sm border  border-stroke bg-white p-3 font-medium text-black dark:border-strokedark dark:bg-boxdark dark:text-white xl:flex-row">
                        <div className=" w-full">
                          {/* <!-- Chọn Category --> */}
                          <div className="flex flex-col gap-5.5 ">
                            <Checkbox
                              className="text-black dark:text-white"
                              onChange={handleSelectChange}
                            >
                              Is Freelancer
                            </Checkbox>

                            <Checkbox className="text-black dark:text-white">
                              Reusable
                            </Checkbox>
                            <Checkbox
                              className="text-black dark:text-white"
                              onChange={handleSelectChangeZalo}
                            >
                              Evoucher for Zalo Mini App
                            </Checkbox>
                            <div
                              className="w-full "
                              hidden={!selectedValueZalo}
                            >
                              <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                Distributor
                                <strong className="text-red">*</strong>
                              </label>
                              <Select
                                className="h-12 w-full rounded  bg-transparent  text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                options={[
                                  { value: "jack", label: "Jack" },
                                  { value: "lucy", label: "Lucy" },
                                  { value: "Yiminghe", label: "yiminghe" },
                                  {
                                    value: "disabled",
                                    label: "Disabled",
                                    disabled: true,
                                  },
                                ]}
                              />
                            </div>
                            <Button
                              type="primary"
                              className="w-1/12 bg-primary p-3 font-medium text-white hover:bg-opacity-90 "
                              disabled={!selectedValue}
                            >
                              ADD
                            </Button>
                          </div>

                          <br />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 "
            >
              Thêm Bảo Hiểm
            </button>
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
