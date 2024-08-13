"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { CollapseProps, UploadProps, CheckboxProps } from "antd";
import { Checkbox, Collapse, Button, Select } from "antd";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CaretRightOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import UploadComponent from "@/components/UploadComponent";

const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormLayout = () => {
  // handle checkpassword
  const validationSchema = Yup.object({
    password: Yup.string().min(6, "Password must be at least 6 characters."),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Password is valid:", values.password);
    },
  });
  // handle checkbox
  const [checked, setChecked] = useState(false);
  const [checkclickpsw, setCheckclickpsw] = useState(false);
  const [addnewbank, setAddnewbank] = useState(false);
  const handleAddnewbank = () => {
    setAddnewbank(!addnewbank);
  };
  const handleChangeClickPsw = () => {
    setCheckclickpsw(!checkclickpsw);
  };

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };

  // check upload file already

  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: "Edit Saleman",
      children: (
        <>
          <Breadcrumb pageName="Edit Saleman" />

          <div className=" gap-9  sm:grid-cols-4 ">
            <div className="flex flex-col gap-9">
              {/* <!--Bao hiem xe co --> */}
              <div className="w1/2 rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                <form action="#">
                  <div className="p-6.5">
                    <div className=" mb-4.5 flex flex-col gap-6 rounded-sm border  border-stroke bg-white p-3 font-medium text-black dark:border-strokedark dark:bg-boxdark dark:text-white xl:flex-row">
                      {/* <!-- File upload --> */}
                      <div className=" flex w-full items-center">
                        <div className="flex flex-col gap-5.5 ">
                          <div className="flex items-center gap-4 ">
                            <UploadComponent title="Avatar" />
                          </div>
                        </div>

                        <br />
                      </div>
                    </div>

                    <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className=" flex flex-col gap-6 p-3  xl:flex-row">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Phone
                          </label>
                          <input
                            defaultValue={"09128371827"}
                            required
                            type="text"
                            placeholder="English"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Username
                          </label>
                          <input
                            defaultValue={"SAFESAVINGS_sale_demo"}
                            required
                            type="text"
                            placeholder="VietNam"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className=" flex flex-col gap-6 p-3  xl:flex-row">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Name
                          </label>
                          <input
                            defaultValue={"SAFESAVINGS_sale_demo"}
                            required
                            type="text"
                            placeholder="English"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Status
                          </label>
                          <Select
                            defaultValue="please select"
                            className="w-full"
                            options={[
                              { value: "Active", label: "Active" },
                              { value: "Inactive", label: "Inactive" },
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                    {/* product desc */}

                    {/* product slug */}
                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className="flex flex-col gap-6 p-3  xl:flex-row">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Email
                          </label>
                          <input
                            defaultValue={"SAFESAVINGS_sale_demo@email.com"}
                            required
                            type="email"
                            placeholder="English"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Organization
                          </label>
                          <Select
                            defaultValue="please select"
                            className="w-full "
                            options={[
                              { value: "SafeSaving", label: "SafeSaving" },
                              { value: "Yunke", label: "Yunke" },
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                    {/* product name */}
                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className="flex flex-col gap-6 p-3  ">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Parent Saleman
                          </label>
                          <Select
                            defaultValue="please select"
                            className="w-full "
                            options={[
                              { value: "SafeSaving", label: "SafeSaving" },
                              { value: "Yunke", label: "Yunke" },
                            ]}
                          />
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Address
                          </label>
                          <input
                            type="text"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Country
                          </label>
                          <input
                            type="text"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Passport / Driver License ID
                          </label>
                          <input
                            type="text"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            ID / Tax Code *
                          </label>
                          <input
                            required
                            type="text"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            defaultValue={"172637162731232"}
                          />
                        </div>
                        <div className="flex w-full items-center justify-between">
                          <Checkbox
                            className=" text-black dark:bg-boxdark dark:text-white"
                            onChange={onChange}
                          >
                            Is Freelancer
                          </Checkbox>
                          <div className="flex items-center gap-3">
                            <Button
                              type="primary"
                              onClick={handleChangeClickPsw}
                              hidden={checkclickpsw}
                            >
                              Change PassWord
                            </Button>
                            {checkclickpsw && (
                              <form onSubmit={formik.handleSubmit}>
                                <div className="flex items-center gap-3">
                                  <input
                                    type="text"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    placeholder="New Password"
                                    {...formik.getFieldProps("password")}
                                  />

                                  <button
                                    type="submit"
                                    className="edit handlebuttonedit"
                                  >
                                    Save
                                  </button>
                                </div>
                                {formik.touched.password &&
                                formik.errors.password ? (
                                  <p className="block text-red">
                                    {formik.errors.password}
                                  </p>
                                ) : null}
                              </form>
                            )}
                          </div>
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-2xl font-medium capitalize text-black dark:text-white sm:text-sm">
                            Generate Mini App QR{" "}
                          </label>
                          <Select
                            defaultValue="please select Select Mini App"
                            className="h-13 w-full"
                            options={[
                              { value: "Active", label: "Active" },
                              { value: "Inactive", label: "Inactive" },
                            ]}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 flex justify-end">
                      <button
                        type="submit"
                        className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 "
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Provider Configuration",
      children: (
        <>
          <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-6 p-3  ">
              <div className="w-full ">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Provider Distributor Code
                </label>
                <input
                  type="text"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full ">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Agency Code
                </label>
                <input
                  type="text"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full ">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Employee Code
                </label>
                <input
                  type="text"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: "Bank account",
      children: (
        <>
          {/* test */}
          <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
            <Button
              type="primary"
              onClick={handleAddnewbank}
              hidden={addnewbank}
            >
              Add new Bank Account
            </Button>
          </div>

          {addnewbank && (
            <>
              <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col gap-6 p-3  ">
                  <div className="w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Bank
                    </label>
                    <Select
                      defaultValue="please select"
                      className="w-full"
                      options={[
                        { value: "Active", label: "Active" },
                        { value: "Inactive", label: "Inactive" },
                      ]}
                    />
                  </div>
                  <div className="w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Agency Code
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Employee Code
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="p-3">
                  <button type="submit" className="edit handlebuttonedit">
                    Change
                  </button>
                </div>
              </div>
            </>
          )}
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
