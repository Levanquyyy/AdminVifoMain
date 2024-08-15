"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Checkbox, Collapse, InputNumber, Select } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

const { TextArea } = Input;

const validationSchema = Yup.object({
  RankCode: Yup.string().required("Required"),
  NameEL: Yup.string().required("Required"),
  NameVN: Yup.string().required("Required"),
  Productfamily: Yup.string().required("Required"),
});

const FormLayout = () => {
  const formik = useFormik({
    initialValues: {
      RankCode: "NANGCAO",
      NameEL: "NANGCAO",
      NameVN: "NANGCAO",
      Productfamily: "test1",
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
          <Breadcrumb pageName="Your level: 1" />
          <form onSubmit={formik.handleSubmit} id="insuranceForm">
            <div className="gap-9 sm:grid-cols-4">
              <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                  <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <div className="p-3">
                          <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Logo
                          </label>
                          <input
                            type="file"
                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      <div className="flex flex-col gap-6 p-3 px-3 xl:flex-row">
                        <div className="w-full">
                          <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Rank Code <strong className="text-red">*</strong>
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Rank Code"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            name="RankCode"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.RankCode}
                          />
                          {formik.touched.RankCode && formik.errors.RankCode ? (
                            <div className="text-red">
                              {formik.errors.RankCode}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      <div className="flex flex-col gap-6 p-3 px-3 xl:flex-row">
                        <div className="w-full">
                          <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Name (English){" "}
                            <strong className="text-red">*</strong>
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Name (English)"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            name="NameEL"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.NameEL}
                          />
                          {formik.touched.NameEL && formik.errors.NameEL ? (
                            <div className="text-red">
                              {formik.errors.NameEL}
                            </div>
                          ) : null}
                        </div>
                        <div className="w-full">
                          <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Name (Tiếng Việt){" "}
                            <strong className="text-red">*</strong>
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Name (Tiếng Việt)"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            name="NameVN"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.NameVN}
                          />
                          {formik.touched.NameVN && formik.errors.NameVN ? (
                            <div className="text-red">
                              {formik.errors.NameVN}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      <div className="flex flex-col gap-6 p-3 px-3 xl:flex-row">
                        <div className="w-full">
                          <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Product Family{" "}
                            <strong className="text-red">*</strong>
                          </label>
                          <Select
                            className="h-12 w-full rounded bg-transparent text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                            name="Productfamily"
                            onChange={(value) =>
                              formik.setFieldValue("Productfamily", value)
                            }
                            onBlur={formik.handleBlur}
                            value={formik.values.Productfamily}
                          />
                          {formik.touched.Productfamily &&
                          formik.errors.Productfamily ? (
                            <div className="text-red">
                              {formik.errors.Productfamily}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      <div className="flex flex-col gap-6 p-3">
                        <div className="w-full">
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
                        <div className="w-full">
                          <Checkbox
                            className="text-black dark:text-white"
                            checked
                          >
                            Is Freelancer
                          </Checkbox>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
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
