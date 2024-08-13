"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Button, Checkbox, Collapse, Select, Table } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import { Input } from "antd";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Column from "antd/es/table/Column";
const { TextArea } = Input;

const validationSchema = Yup.object({
  IDTaxCode: Yup.string().required("Required"),
});
const validatePassword = Yup.object({
  password: Yup.string().min(6, "Password must be at least 6 characters."),
});
interface DataType {
  key: React.Key;
  StartAt: string;
  EndAt: string;
  Username: string;
  Current: boolean;
}

const FormLayout = () => {
  // data
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      StartAt: "2024-08-09",
      EndAt: "",
      Username: "Thanh test",
      Current: true,
    },

    // Add more data as needed
  ]);
  // check password
  const [checkclickpsw, setCheckclickpsw] = useState(false);

  const handleChangeClickPsw = () => {
    setCheckclickpsw(!checkclickpsw);
  };

  const formilkPassword = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });
  // check field empty

  const formik = useFormik({
    initialValues: {
      IDTaxCode: "",
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
      label: "Product Information",
      children: (
        <>
          <Breadcrumb pageName="Thêm Sản Phẩm" />
          <form onSubmit={formik.handleSubmit} id="insuranceForm">
            <div className=" gap-9  sm:grid-cols-4 ">
              <div className="flex flex-col gap-9">
                {/* <!--Bao hiem xe co --> */}
                <div className=" rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                  <form action="#">
                    <div className="p-6.5">
                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        {/* <!-- File upload --> */}
                        <div className="  w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                          <div className=" ">
                            <div className="flex flex-col gap-5.5 ">
                              <div className="p-3">
                                <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                  Avatar
                                </label>
                                <input
                                  type="file"
                                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                />
                              </div>
                            </div>

                            <br />
                          </div>
                        </div>
                      </div>

                      {/* product code */}
                      <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                        <div className=" flex flex-col gap-6 xl:flex-row">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              phone
                            </label>
                            <input
                              defaultValue={"0917875455"}
                              required
                              type="text"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              UserName <strong className="text-red">*</strong>
                            </label>
                            <input
                              defaultValue={"0917875455"}
                              required
                              type="text"
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
                              Name <strong className="text-red">*</strong>
                            </label>
                            <input
                              required
                              type="text"
                              placeholder="English"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              defaultValue={"Thanh test"}
                            />
                          </div>
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              Status
                              <strong className="text-red">*</strong>
                            </label>
                            <Select
                              className=" h-15 w-full  bg-transparent  text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              options={[
                                { value: "Active", label: "Active" },
                                { value: "Inactive", label: "Inactive" },
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                      {/* product desc */}

                      <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col gap-6 p-3 px-3 xl:flex-row">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              Email
                              <strong className="text-red">*</strong>
                            </label>
                            <input
                              defaultValue={"thanhmegaman@gmail.com"}
                              required
                              type="email"
                              placeholder="VietNam"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              Address
                              <strong className="text-red">*</strong>
                            </label>
                            <input
                              required
                              type="text"
                              placeholder="VietNam"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                      {/* product highlight */}

                      <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                        <div className=" flex flex-col gap-6 p-3 px-3 xl:flex-row">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              Passport / Driver License ID
                            </label>
                            <input
                              required
                              type="text"
                              placeholder="English"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              ID / Tax Code{" "}
                              <strong className="text-red">*</strong>
                            </label>
                            <input
                              required
                              type="text"
                              placeholder="English"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              name="IDTaxCode"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.IDTaxCode}
                            />
                            {formik.touched.IDTaxCode &&
                            formik.errors.IDTaxCode ? (
                              <div className="text-red">
                                {formik.errors.IDTaxCode}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                        <div className=" flex flex-col gap-6 p-3 px-3 xl:flex-row">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              City
                            </label>
                            <input
                              required
                              type="text"
                              placeholder="English"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              Country
                            </label>
                            <input
                              required
                              type="text"
                              placeholder="VietNam"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>

                      {/* product category */}
                      <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col gap-6 p-3 xl:flex-row">
                          <div className=" w-full">
                            {/* <!-- Chọn Category --> */}
                            <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                              <div className="flex flex-col gap-5.5 p-3">
                                <SelectGroupTwo id="TPA" nhacungcap="TPA">
                                  <option value="xemay">Bảo Hiểm Xe Hơi</option>
                                  <option value="xehoi">Bảo Hiểm Xe Máy</option>
                                  <option value="suckhoe">
                                    Bảo Hiểm Sức Khỏe
                                  </option>
                                </SelectGroupTwo>
                              </div>

                              <br />
                            </div>
                          </div>
                          <div className="w-full">
                            <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                              <div className="flex flex-col gap-5.5 p-6.5">
                                <SelectGroupTwo
                                  id="Roles"
                                  nhacungcap="User Role"
                                >
                                  <option value="dongabank">DOng A Bank</option>
                                  <option value="mbbank">MB Bank</option>
                                  <option value="bamabank">Ba Ma Bank</option>
                                </SelectGroupTwo>
                              </div>

                              <br />
                            </div>
                          </div>
                          <div className="w-full">
                            <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                              <div className="flex flex-col gap-5.5 p-6.5">
                                <Button
                                  type="primary"
                                  onClick={handleChangeClickPsw}
                                  hidden={checkclickpsw}
                                >
                                  Change PassWord
                                </Button>
                                {checkclickpsw && (
                                  <div className="flex items-center gap-3">
                                    <input
                                      type="text"
                                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                      placeholder="New Password"
                                    />

                                    <button
                                      type="submit"
                                      className="edit handlebuttonedit"
                                    >
                                      Save
                                    </button>
                                  </div>
                                )}
                              </div>

                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* product rank */}

                      <div className=" mb-4.5 flex flex-col gap-6 rounded-sm border  border-stroke bg-white p-3 font-medium text-black dark:border-strokedark dark:bg-boxdark dark:text-white xl:flex-row">
                        <div className=" w-full">
                          {/* <!-- Chọn Category --> */}
                          <div className=" rounded-sm border border-stroke bg-white p-3 dark:border-strokedark dark:bg-boxdark">
                            <div className="flex flex-col gap-5.5 ">
                              <SelectGroupTwo
                                id="Provider"
                                nhacungcap="Provider"
                              >
                                <option value="dongabank">DOng A Bank</option>
                                <option value="mbbank">MB Bank</option>
                                <option value="bamabank">Ba Ma Bank</option>
                              </SelectGroupTwo>
                              <Checkbox className="text-black dark:text-white">
                                Is Freelancer
                              </Checkbox>
                            </div>

                            <br />
                          </div>
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
    {
      key: "2",
      label: "BETA_Group",
      children: (
        <>
          <div className="rounded-sm border border-stroke bg-white p-3 dark:border-strokedark dark:bg-boxdark">
            <Table dataSource={data}>
              <Column
                title="Start at"
                dataIndex="StartAt"
                key="StartAt"
                width={"25%"}
              ></Column>
              <Column
                title="	End at "
                dataIndex="EndAt"
                key="EndAt"
                width={"25%"}
              />
              <Column
                title="Username"
                key="Username"
                dataIndex="Username"
                width={"25%"}
              />
              <Column
                title="Current"
                key="Current"
                dataIndex="Current"
                width={"25%"}
                render={(text, record: DataType) =>
                  record.Current ? "true" : "false"
                }
              />
            </Table>
          </div>
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
