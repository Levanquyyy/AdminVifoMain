"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CheckboxProps, CollapseProps } from "antd";
import { Checkbox, Collapse, Select, theme } from "antd";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { DatePicker, Space } from "antd";
import { useState } from "react";
import { Button, Input } from "antd";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import type { InputNumberProps } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Price from "@/components/Prices/Price";
import { useFormik } from "formik";
import * as Yup from "yup";
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};
const validationSchema = Yup.object({
  productcode: Yup.string().required("This field is required"),
  version: Yup.string().required("This field is required"),
  productnameEl: Yup.string().required("This field is required"),
  productnameVn: Yup.string().required("This field is required"),
  ProductSlugEl: Yup.string().required("This field is required"),
  ProductSlugVn: Yup.string().required("This field is required"),
  ProductFamily: Yup.string().required("This field is required"),
  Provider: Yup.string().required("This field is required"),
  Rank: Yup.string().required("This field is required"),
  CommisionOn: Yup.string().required("This field is required"),
  TermConditionFile: Yup.string().required("This field is required"),
  DetailFile: Yup.string().required("This field is required"),
});
const FormLayout = () => {
  // check field empty

  const formik = useFormik({
    initialValues: {
      productcode: "",
      version: "",
      productnameEl: "",
      productnameVn: "",
      ProductSlugEl: "",
      ProductSlugVn: "",
      ProductFamily: "",
      Provider: "",
      Rank: "",
      CommisionOn: "",
      TermConditionFile: "",
      DetailFile: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, e) => {
      e.preventDefault();
      console.log("Form data", values);
    },
  });
  const [checked, setChecked] = useState(false);

  const [benefitforbike, setBenefitsforbike] = useState([""]);
  const createAddBenefitHandler = (benefits: any, setBenefits: any) => () => {
    setBenefits([...benefits, ""]);
  };
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };
  const createInputChangeHandler =
    (benefits: any, setBenefits: any) => (index: number, event: any) => {
      const newBenefits = [...benefits];
      newBenefits[index] = event.target?.value;
      setBenefits(newBenefits);
    };
  const handleAddBenefitForBike = createAddBenefitHandler(
    benefitforbike,
    setBenefitsforbike,
  );
  const handleInputChangeForBike = createInputChangeHandler(
    benefitforbike,
    setBenefitsforbike,
  );

  const onChangeTab = (key: string) => {
    console.log(key);
  };

  const itemstabs: TabsProps["items"] = [
    {
      key: "1",
      label: "EN",
      children: <input type="text" className="handlecsspicker" />,
    },
    {
      key: "2",
      label: "VN",
      children: <input type="text" className="handlecsspicker" />,
    },
  ];

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
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Tên Sản Phẩm
                    </h3>
                  </div>
                  <form action="#">
                    <div className="p-6.5">
                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        {/* <!-- File upload --> */}
                        <div className="  w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                          <div className=" ">
                            <div className="flex flex-col gap-5.5 ">
                              <div className="p-3">
                                <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                  product Logo
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
                        <div className="w-full">
                          <Space direction="vertical" size={12}>
                            <RangePicker showTime className="handlecsspicker" />
                          </Space>
                        </div>
                      </div>

                      {/* product code */}
                      <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                        <div className=" flex flex-col gap-6 xl:flex-row">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              product code{" "}
                              <strong className="text-red">*</strong>
                            </label>
                            <input
                              name="productcode"
                              required
                              type="text"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.productcode}
                            />
                            {formik.touched.productcode &&
                            formik.errors.productcode ? (
                              <div className="text-red">
                                {formik.errors.productcode}
                              </div>
                            ) : null}
                          </div>
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              version <strong className="text-red">*</strong>
                            </label>
                            <input
                              name="version"
                              required
                              type="text"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.version}
                            />
                            {formik.touched.version && formik.errors.version ? (
                              <div className="text-red">
                                {formik.errors.version}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      {/* product name */}
                      <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                        <div className=" flex flex-col gap-6 p-3 px-3 xl:flex-row">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              product name (English){" "}
                              <strong className="text-red">*</strong>
                            </label>
                            <input
                              name="productnameEl"
                              required
                              type="text"
                              placeholder="English"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.productnameEl}
                            />
                            {formik.touched.productnameEl &&
                            formik.errors.productnameEl ? (
                              <div className="text-red">
                                {formik.errors.productnameEl}
                              </div>
                            ) : null}
                          </div>
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              product name (Việt Nam){" "}
                              <strong className="text-red">*</strong>
                            </label>
                            <input
                              name="productnameVn"
                              required
                              type="text"
                              placeholder="VietNam"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.productnameVn}
                            />
                            {formik.touched.productnameVn &&
                            formik.errors.productnameVn ? (
                              <div className="text-red">
                                {formik.errors.productnameVn}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      {/* product desc */}

                      <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col gap-6 p-3 px-3 xl:flex-row">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              Product Slug (English){" "}
                              <strong className="text-red">*</strong>
                            </label>
                            <input
                              name="ProductSlugEl"
                              required
                              type="text"
                              placeholder="English"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.ProductSlugEl}
                            />
                            {formik.touched.ProductSlugEl &&
                            formik.errors.ProductSlugEl ? (
                              <div className="text-red">
                                {formik.errors.ProductSlugEl}
                              </div>
                            ) : null}
                          </div>
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              Product Slug (Việt Nam){" "}
                              <strong className="text-red">*</strong>
                            </label>
                            <input
                              name="ProductSlugVn"
                              required
                              type="text"
                              placeholder="VietNam"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.ProductSlugVn}
                            />
                            {formik.touched.ProductSlugVn &&
                            formik.errors.ProductSlugVn ? (
                              <div className="text-red">
                                {formik.errors.ProductSlugVn}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      {/* product highlight */}

                      <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                        <div className=" flex flex-col gap-6 p-3 px-3 xl:flex-row">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              Product Highlighted Text (English)
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
                              Product Highlighted Text (Việt Nam)
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
                      {/* product description */}
                      <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                        <div className=" flex flex-col gap-6 p-3 xl:flex-row">
                          <div className=" handlecssplacholder w-full rounded-sm  bg-white font-medium text-black  dark:border-strokedark dark:bg-boxdark dark:text-white xl:w-1/2">
                            <TextArea
                              required
                              rows={4}
                              placeholder={`Product Description (Việt Nam) * ${"*"}`}
                              maxLength={500}
                              className=" dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                          <div className="handlecssplacholder w-full rounded-sm  bg-white font-medium text-black dark:border-strokedark dark:bg-boxdark dark:text-white xl:w-1/2">
                            <TextArea
                              required
                              rows={4}
                              placeholder={`Product Description (English)  ${"*"}`}
                              maxLength={500}
                              className="dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                                <SelectGroupTwo
                                  id="Productfamily"
                                  nhacungcap=" Product Family "
                                >
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
                                  id="provider"
                                  nhacungcap="Provider"
                                >
                                  <option value="dongabank">DOng A Bank</option>
                                  <option value="mbbank">MB Bank</option>
                                  <option value="bamabank">Ba Ma Bank</option>
                                </SelectGroupTwo>
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
                              <SelectGroupTwo id="Danhmuc" nhacungcap="Rank">
                                <option value=""></option>
                              </SelectGroupTwo>
                              <Checkbox
                                onChange={onChange}
                                className="text-black dark:text-white"
                              >
                                Vifo Choice
                              </Checkbox>
                            </div>

                            <br />
                          </div>
                        </div>
                      </div>
                      {/* product position */}
                      <div className="w-full rounded-sm border border-stroke bg-white p-3 dark:border-strokedark dark:bg-boxdark">
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              position
                            </label>
                            <input
                              type="text"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              External link
                            </label>
                            <input
                              type="text"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              evalution
                            </label>
                            <input
                              type="text"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>

                          <div className="w-full ">
                            <SelectGroupTwo
                              id="Commission"
                              nhacungcap="Commision On"
                            >
                              <option
                                value="Exclude Tax"
                                className="text-black dark:text-white"
                              >
                                Exclude Tax
                              </option>
                              <option
                                value="Include Tax"
                                className="text-black dark:text-white"
                              >
                                Include Tax
                              </option>
                            </SelectGroupTwo>
                          </div>
                        </div>
                      </div>
                      {/* product check */}
                      <div className="w-full rounded-sm border border-stroke bg-white p-3 dark:border-strokedark dark:bg-boxdark">
                        <div className="flex w-full flex-col">
                          <Checkbox
                            onChange={onChange}
                            className=" text-black dark:bg-boxdark dark:text-white"
                          >
                            Activated
                          </Checkbox>
                          <Checkbox
                            onChange={onChange}
                            className=" text-black dark:bg-boxdark dark:text-white"
                          >
                            Is Partnership
                          </Checkbox>
                          <Checkbox
                            onChange={onChange}
                            className=" text-black dark:bg-boxdark dark:text-white"
                          >
                            Is LeadCapture
                          </Checkbox>
                          <Checkbox
                            onChange={onChange}
                            className=" text-black dark:bg-boxdark dark:text-white"
                          >
                            Has promotion
                          </Checkbox>
                          <Checkbox
                            onChange={onChange}
                            className=" text-black dark:bg-boxdark dark:text-white"
                          >
                            Contact Us
                          </Checkbox>
                        </div>

                        {benefitforbike.map((benefit, index) => (
                          <div key={index} className="mb-4.5 w-full">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                              Thêm lợi ích
                            </label>
                            <input
                              type="text"
                              placeholder="Thêm lợi ích"
                              value={benefit}
                              onChange={(event) =>
                                handleInputChangeForBike(index, event)
                              }
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        ))}
                        <div className="mb-4.5 flex justify-end">
                          <Button
                            type="primary"
                            className="bg-primary dark:text-white"
                            onClick={handleAddBenefitForBike}
                          >
                            Thêm Lợi ích
                          </Button>
                        </div>
                      </div>
                      <div className="mb-6"></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </form>
        </>
      ),
    },
    {
      key: "2",
      label: "Product Attachments",
      children: (
        <>
          <div className="rounded-sm border border-stroke bg-white p-3 dark:border-strokedark dark:bg-boxdark">
            <div className="mb-4.5 flex flex-col gap-6 p-3 xl:flex-row">
              {/* <!-- File upload --> */}
              <div className="w-full rounded-sm border border-stroke bg-white p-3 dark:border-strokedark dark:bg-boxdark">
                <h3 className="mb-2 font-medium text-black dark:text-white">
                  Term & Condition File <strong className="text-red">*</strong>
                </h3>
                <div className="flex flex-col gap-5.5">
                  <div>
                    <input
                      name="TermConditionFile"
                      type="file"
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.TermConditionFile}
                    />
                    {formik.touched.TermConditionFile &&
                    formik.errors.TermConditionFile ? (
                      <div className="text-red">
                        {formik.errors.TermConditionFile}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className=" w-full rounded-sm border border-stroke bg-white p-3 dark:border-strokedark dark:bg-boxdark">
                <h3 className="mb-2 font-medium text-black dark:text-white">
                  Detail File <strong className="text-red">*</strong>
                </h3>
                <div className="flex flex-col gap-5.5 ">
                  <div>
                    <input
                      name="DetailFile"
                      type="file"
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.DetailFile}
                    />
                    {formik.touched.DetailFile && formik.errors.DetailFile ? (
                      <div className="text-red">{formik.errors.DetailFile}</div>
                    ) : null}
                  </div>
                </div>

                <br />
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: "Prices",
      children: (
        <>
          <Price />
        </>
      ),
    },
    {
      key: "4",
      label: "Product Detail",
      children: (
        <Tabs
          defaultActiveKey="1"
          items={itemstabs}
          onChange={onChangeTab}
          className=" rounded-sm border border-b border-stroke bg-white px-6.5 py-4 dark:border-strokedark dark:bg-boxdark dark:text-white"
        />
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
      <button
        type="submit"
        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 "
        onClick={() =>
          document
            .getElementById("insuranceForm")
            ?.dispatchEvent(
              new Event("submit", { cancelable: true, bubbles: true }),
            )
        }
      >
        Thêm Bảo Hiểm
      </button>
    </DefaultLayout>
  );
};

export default FormLayout;
