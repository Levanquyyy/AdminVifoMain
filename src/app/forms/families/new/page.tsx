"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type {
  CheckboxProps,
  CollapseProps,
  TabsProps,
  UploadProps,
} from "antd";
import {
  Checkbox,
  Collapse,
  Button,
  Modal,
  Input,
  message,
  Upload,
} from "antd";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import { UploadOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const { TextArea } = Input;

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
const validationSchemaCoverage = Yup.object({
  LabelEn: Yup.string().required("This field is required"),
  LabelVi: Yup.string().required("This field is required"),
  DescriptionEn: Yup.string().required("This field is required"),
  DescriptionVi: Yup.string().required("This field is required"),
  Rank: Yup.string().required("This field is required"),
});
const validationSchemaAttributes = Yup.object({
  LabelEn: Yup.string().required("This field is required"),
  LabelVi: Yup.string().required("This field is required"),
  DescriptionEn: Yup.string().required("This field is required"),
  DescriptionVi: Yup.string().required("This field is required"),
  Rank: Yup.string().required("This field is required"),
});
const FormLayout = () => {
  // handle formik

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
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });
  const formikforCoverage = useFormik({
    initialValues: {
      LabelEn: "",
      LabelVi: "",
      DescriptionEn: "",
      DescriptionVi: "",
      Rank: "",
    },
    validationSchema: validationSchemaCoverage,
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });
  const formikforAtrributes = useFormik({
    initialValues: {
      LabelEn: "",
      LabelVi: "",
      DescriptionEn: "",
      DescriptionVi: "",
      Rank: "",
    },
    validationSchema: validationSchemaAttributes,
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });

  // handel modal
  const [isCoverages, setIsCoverages] = useState(false);
  const showisCoverages = () => {
    setIsCoverages(true);
  };

  const handleisCoverages = (e: any) => {
    e.preventDefault();
  };

  const handleCancelisCoverages = (e: any) => {
    setIsCoverages(false);
  };
  const [isAttributes, setIsAttributes] = useState(false);
  const handleCancelAttributes = (e: any) => {
    setIsAttributes(false);
  };
  const [Attributes, setAttributes] = useState(false);
  const showAttributes = () => {
    setAttributes(true);
  };

  const handleAttributes = () => {
    setAttributes(false);
  };

  // check upload file
  const props: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const [checked, setChecked] = useState(false);

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };

  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: "Add Product Family",
      children: (
        <>
          <Breadcrumb pageName="Add Product Family" />

          <div className=" gap-9  sm:grid-cols-4 ">
            <div className="flex flex-col gap-9">
              {/* <!--Bao hiem xe co --> */}
              <div className="w1/2 rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                <form onSubmit={formik.handleSubmit} id="families">
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
                    </div>

                    {/* product name */}
                    <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className=" flex flex-col gap-6 p-3  xl:flex-row">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            product name (English)
                          </label>
                          <input
                            required
                            type="text"
                            name="productnameEl"
                            placeholder="English"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={formik.values.productnameEl}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.productnameEl &&
                            formik.errors.productnameEl && (
                              <div>
                                {" "}
                                <p className="text-red">
                                  {formik.errors.productnameEl}
                                </p>
                              </div>
                            )}
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            product name (Việt Nam)
                          </label>
                          <input
                            required
                            type="text"
                            name="productnameVn"
                            placeholder="Việt Nam"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={formik.values.productnameVn}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.productnameVn &&
                            formik.errors.productnameVn && (
                              <div>
                                {" "}
                                <p className="text-red">
                                  {formik.errors.productnameVn}
                                </p>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className=" flex flex-col gap-6 p-3  xl:flex-row">
                        <div className=" handlecssplacholder w-full ">
                          <TextArea
                            required
                            rows={4}
                            placeholder="Mô tả sản phẩm (Việt Nam)"
                            maxLength={500}
                            className=" dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="handlecssplacholder w-full ">
                          <TextArea
                            required
                            rows={4}
                            placeholder="Mô tả sản phẩm (English)"
                            maxLength={500}
                            className="dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                    {/* product desc */}

                    {/* product slug */}
                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                      <div className=" flex flex-col gap-6  xl:flex-row">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Product Slug (English)
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="English"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={formik.values.ProductSlugEl}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.ProductSlugEl &&
                            formik.errors.ProductSlugEl && (
                              <div>
                                {" "}
                                <p className="text-red">
                                  {formik.errors.ProductSlugEl}
                                </p>
                              </div>
                            )}
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Product Slug (Việt Nam)
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="VietNam"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={formik.values.ProductSlugVn}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.ProductSlugVn &&
                            formik.errors.ProductSlugVn && (
                              <p className="text-red">
                                {formik.errors.ProductSlugVn}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                    {/* product name */}
                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white p-3 p-3  dark:border-strokedark dark:bg-boxdark">
                      <div className="flex flex-col gap-6  xl:flex-row">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Promotion Text (English)
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Promotion Text (English)"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Promotion Text (Việt Nam)
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Promotion Text (Việt Nam)"
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
                              <SelectGroupTwo
                                id="ProductFamily"
                                name="ProductFamily"
                                nhacungcap="Product Family"
                                value={formik.values.ProductFamily}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              >
                                <option value="xemay">Bảo Hiểm Xe Hơi</option>
                                <option value="xehoi">Bảo Hiểm Xe Máy</option>
                                <option value="suckhoe">
                                  Bảo Hiểm Sức Khỏe
                                </option>
                              </SelectGroupTwo>
                              {formik.touched.ProductFamily &&
                                formik.errors.ProductFamily && (
                                  <p className="text-red">
                                    {formik.errors.ProductFamily}
                                  </p>
                                )}
                            </div>

                            <br />
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                            <div className="flex flex-col gap-5.5 p-3">
                              <SelectGroupTwo
                                id="Provider"
                                name="Provider"
                                nhacungcap="Product Family"
                                value={formik.values.Provider}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              >
                                <option value="dongabank">DOng A Bank</option>
                                <option value="mbbank">MB Bank</option>
                                <option value="bamabank">Ba Ma Bank</option>
                              </SelectGroupTwo>
                              {formik.touched.Provider &&
                                formik.errors.Provider && (
                                  <p className="text-red">
                                    {formik.errors.Provider}
                                  </p>
                                )}
                            </div>

                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Valid After (days) */}
                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                      <div className="flex flex-col gap-6  xl:flex-row">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Valid After (days)
                          </label>
                          <input
                            required
                            type="number"
                            placeholder="English"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Product Family Code *
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="VietNam"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            value={formik.values.productcode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.productcode &&
                            formik.errors.productcode && (
                              <p className="text-red">
                                {formik.errors.productcode}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>

                    {/* product position */}
                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                      <div className="mb-4.5 flex flex-col items-center gap-6 xl:flex-row">
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
                            SMS Content
                          </label>
                          <TextArea
                            rows={2}
                            className="dark:bg-form-input dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="mb-4.5 flex flex-col flex-wrap gap-6 xl:flex-row">
                        <div className="flex flex-1 flex-wrap gap-4">
                          <div className="min-w-[200px] flex-1">
                            <label
                              htmlFor="upload1"
                              className="mb-3 block text-sm font-medium capitalize text-black dark:text-white"
                            >
                              Product Family Banner
                            </label>
                            <Upload {...props} className="flex-1" id="upload1">
                              <Button
                                icon={<UploadOutlined />}
                                className="dark:text-white"
                              >
                                Click to Upload
                              </Button>
                            </Upload>
                          </div>
                          <div className="min-w-[200px] flex-1">
                            <label
                              htmlFor="upload2"
                              className="mb-3 block text-sm font-medium capitalize text-black dark:text-white"
                            >
                              Product Family Banner Promotion
                            </label>
                            <Upload {...props} className="flex-1" id="upload2">
                              <Button
                                icon={<UploadOutlined />}
                                className="dark:text-white"
                              >
                                Click to Upload
                              </Button>
                            </Upload>
                          </div>
                          <div className="min-w-[200px] flex-1">
                            <label
                              htmlFor="upload3"
                              className="mb-3 block text-sm font-medium capitalize text-black dark:text-white"
                            >
                              Order Template Upload
                            </label>
                            <Upload {...props} className="flex-1" id="upload3">
                              <Button
                                icon={<UploadOutlined />}
                                className="dark:text-white"
                              >
                                Click to Upload
                              </Button>
                            </Upload>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-wrap gap-8">
                          <div className="flex gap-3">
                            <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              Coverages
                            </label>
                            <Button
                              type="primary"
                              onClick={showisCoverages}
                              className="bg-primary"
                            >
                              +
                            </Button>
                            <Modal
                              title="Add Coverage"
                              open={isCoverages}
                              onCancel={handleCancelisCoverages}
                              className="dark: bg-form-input"
                            >
                              <form onSubmit={formikforCoverage.handleSubmit}>
                                <div className="w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                                  <div className="mb-4.5  flex flex-col gap-6 ">
                                    <div className="w-full ">
                                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                        Label (en) *
                                      </label>
                                      <input
                                        required
                                        type="text"
                                        placeholder="English"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        name="LabelEn"
                                        value={formikforCoverage.values.LabelEn}
                                        onChange={
                                          formikforCoverage.handleChange
                                        }
                                        onBlur={formikforCoverage.handleBlur}
                                      />
                                      {formikforCoverage.touched.LabelEn &&
                                        formikforCoverage.errors.LabelEn && (
                                          <p className="text-red">
                                            {formikforCoverage.errors.LabelEn}
                                          </p>
                                        )}
                                    </div>
                                    <div className="w-full ">
                                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                        Label (vi) *
                                      </label>
                                      <input
                                        required
                                        type="text"
                                        placeholder="VietNam"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        name="LabelVi"
                                        value={formikforCoverage.values.LabelVi}
                                        onChange={
                                          formikforCoverage.handleChange
                                        }
                                        onBlur={formikforCoverage.handleBlur}
                                      />
                                      {formikforCoverage.touched.LabelVi &&
                                        formikforCoverage.errors.LabelVi && (
                                          <p className="text-red">
                                            {formikforCoverage.errors.LabelVi}
                                          </p>
                                        )}
                                    </div>
                                    <div className="w-full ">
                                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                        Description (en) *
                                      </label>
                                      <input
                                        required
                                        type="text"
                                        placeholder="English"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        name="DescriptionEn"
                                        value={
                                          formikforCoverage.values.DescriptionEn
                                        }
                                        onChange={
                                          formikforCoverage.handleChange
                                        }
                                        onBlur={formikforCoverage.handleBlur}
                                      />
                                      {formikforCoverage.touched
                                        .DescriptionEn &&
                                        formikforCoverage.errors
                                          .DescriptionEn && (
                                          <p className="text-red">
                                            {
                                              formikforCoverage.errors
                                                .DescriptionEn
                                            }
                                          </p>
                                        )}
                                    </div>
                                    <div className="w-full ">
                                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                        Description (vi) *
                                      </label>
                                      <input
                                        required
                                        type="text"
                                        placeholder="VietNam"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        name="DescriptionVi"
                                        value={
                                          formikforCoverage.values.DescriptionVi
                                        }
                                        onChange={
                                          formikforCoverage.handleChange
                                        }
                                        onBlur={formikforCoverage.handleBlur}
                                      />
                                      {formikforCoverage.touched
                                        .DescriptionVi &&
                                        formikforCoverage.errors
                                          .DescriptionVi && (
                                          <p className="text-red">
                                            {
                                              formikforCoverage.errors
                                                .DescriptionVi
                                            }
                                          </p>
                                        )}
                                    </div>
                                    <div className="w-full ">
                                      <Checkbox
                                        onChange={onChange}
                                        className=" text-black dark:bg-boxdark dark:text-white "
                                      >
                                        Required
                                      </Checkbox>
                                      <Checkbox
                                        onChange={onChange}
                                        className=" text-black dark:bg-boxdark dark:text-white"
                                      >
                                        Sort
                                      </Checkbox>
                                      <Checkbox
                                        onChange={onChange}
                                        className=" text-black dark:bg-boxdark dark:text-white"
                                      >
                                        Filter
                                      </Checkbox>
                                    </div>
                                    <div className=" w-full rounded-sm   bg-white font-medium text-black  dark:border-strokedark dark:bg-boxdark dark:text-white ">
                                      <div className="rounded-sm   bg-white  dark:border-strokedark dark:bg-boxdark">
                                        <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                                          <div className="flex flex-col gap-5.5 p-6.5">
                                            <SelectGroupTwo
                                              id="Danhmuc"
                                              nhacungcap="Field Type "
                                              name="Rank"
                                              value={
                                                formikforCoverage.values.Rank
                                              }
                                              onChange={
                                                formikforCoverage.handleChange
                                              }
                                              onBlur={
                                                formikforCoverage.handleBlur
                                              }
                                            >
                                              <option value="xemay">
                                                Physical
                                              </option>
                                              <option value="xehoi">
                                                Bảo Hiểm Xe Máy
                                              </option>
                                              <option value="suckhoe">
                                                Bảo Hiểm Sức Khỏe
                                              </option>
                                            </SelectGroupTwo>
                                            {formikforCoverage.touched.Rank &&
                                              formikforCoverage.errors.Rank && (
                                                <p className="text-red">
                                                  {
                                                    formikforCoverage.errors
                                                      .Rank
                                                  }
                                                </p>
                                              )}
                                          </div>
                                        </div>

                                        <br />
                                      </div>
                                    </div>
                                    <div className="w-full ">
                                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                        position
                                      </label>
                                      <input
                                        type="number"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                      />
                                    </div>
                                    <div className="flex items-end justify-end gap-5">
                                      <button
                                        onClick={handleCancelisCoverages}
                                        className="edit handlebuttonedit w-18 max-w-17 "
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="submit"
                                        className="edit handlebuttonedit w-18 max-w-17"
                                      >
                                        Ok
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </Modal>
                          </div>
                          <div className="flex  gap-3">
                            <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              Attributes
                            </label>
                            <Button
                              type="primary"
                              onClick={showAttributes}
                              className="bg-primary"
                            >
                              +
                            </Button>
                            <Modal
                              title=" Add Attributes"
                              open={Attributes}
                              onOk={handleAttributes}
                              onCancel={handleAttributes}
                            >
                              <form onSubmit={formikforAtrributes.handleSubmit}>
                                <div className="w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                                  <div className="mb-4.5  flex flex-col gap-6 ">
                                    <div className="w-full ">
                                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                        Label (en) *
                                      </label>
                                      <input
                                        required
                                        type="text"
                                        placeholder="English"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        name="LabelEn"
                                        value={
                                          formikforAtrributes.values.LabelEn
                                        }
                                        onChange={
                                          formikforAtrributes.handleChange
                                        }
                                        onBlur={formikforAtrributes.handleBlur}
                                      />
                                      {formikforAtrributes.touched.LabelEn &&
                                        formikforAtrributes.errors.LabelEn && (
                                          <p className="text-red">
                                            {formikforAtrributes.errors.LabelEn}
                                          </p>
                                        )}
                                    </div>
                                    <div className="w-full ">
                                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                        Label (vi) *
                                      </label>
                                      <input
                                        required
                                        type="text"
                                        placeholder="VietNam"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        name="LabelVi"
                                        value={
                                          formikforAtrributes.values.LabelVi
                                        }
                                        onChange={
                                          formikforAtrributes.handleChange
                                        }
                                        onBlur={formikforAtrributes.handleBlur}
                                      />
                                      {formikforAtrributes.touched.LabelVi &&
                                        formikforAtrributes.errors.LabelVi && (
                                          <p className="text-red">
                                            {formikforAtrributes.errors.LabelVi}
                                          </p>
                                        )}
                                    </div>
                                    <div className="w-full ">
                                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                        Description (en) *
                                      </label>
                                      <input
                                        required
                                        type="text"
                                        placeholder="English"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        name="DescriptionEn"
                                        value={
                                          formikforAtrributes.values
                                            .DescriptionEn
                                        }
                                        onChange={
                                          formikforAtrributes.handleChange
                                        }
                                        onBlur={formikforAtrributes.handleBlur}
                                      />
                                      {formikforAtrributes.touched
                                        .DescriptionEn &&
                                        formikforAtrributes.errors
                                          .DescriptionEn && (
                                          <p className="text-red">
                                            {
                                              formikforAtrributes.errors
                                                .DescriptionEn
                                            }
                                          </p>
                                        )}
                                    </div>
                                    <div className="w-full ">
                                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                        Description (vi) *
                                      </label>
                                      <input
                                        required
                                        type="text"
                                        placeholder="VietNam"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        name="DescriptionVi"
                                        value={
                                          formikforAtrributes.values
                                            .DescriptionVi
                                        }
                                        onChange={
                                          formikforAtrributes.handleChange
                                        }
                                        onBlur={formikforAtrributes.handleBlur}
                                      />
                                      {formikforAtrributes.touched
                                        .DescriptionVi &&
                                        formikforAtrributes.errors
                                          .DescriptionVi && (
                                          <p className="text-red">
                                            {
                                              formikforAtrributes.errors
                                                .DescriptionVi
                                            }
                                          </p>
                                        )}
                                    </div>
                                    <div className="w-full ">
                                      <Checkbox
                                        onChange={onChange}
                                        className=" text-black dark:bg-boxdark dark:text-white "
                                      >
                                        Required
                                      </Checkbox>
                                      <Checkbox
                                        onChange={onChange}
                                        className=" text-black dark:bg-boxdark dark:text-white"
                                      >
                                        Sort
                                      </Checkbox>
                                      <Checkbox
                                        onChange={onChange}
                                        className=" text-black dark:bg-boxdark dark:text-white"
                                      >
                                        Filter
                                      </Checkbox>
                                    </div>
                                    <div className=" w-full rounded-sm   bg-white font-medium text-black  dark:border-strokedark dark:bg-boxdark dark:text-white ">
                                      <div className="rounded-sm   bg-white  dark:border-strokedark dark:bg-boxdark">
                                        <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                                          <div className="flex flex-col gap-5.5 p-6.5">
                                            <SelectGroupTwo
                                              id="Danhmuc"
                                              nhacungcap="Field Type "
                                              name="Rank"
                                              value={
                                                formikforAtrributes.values.Rank
                                              }
                                              onChange={
                                                formikforAtrributes.handleChange
                                              }
                                              onBlur={
                                                formikforAtrributes.handleBlur
                                              }
                                            >
                                              <option value="xemay">
                                                Physical
                                              </option>
                                              <option value="xehoi">
                                                Bảo Hiểm Xe Máy
                                              </option>
                                              <option value="suckhoe">
                                                Bảo Hiểm Sức Khỏe
                                              </option>
                                            </SelectGroupTwo>
                                            {formikforAtrributes.touched.Rank &&
                                              formikforAtrributes.errors
                                                .Rank && (
                                                <p className="text-red">
                                                  {
                                                    formikforAtrributes.errors
                                                      .Rank
                                                  }
                                                </p>
                                              )}
                                          </div>
                                        </div>

                                        <br />
                                      </div>
                                    </div>
                                    <div className="w-full ">
                                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                        position
                                      </label>
                                      <input
                                        type="number"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                      />
                                    </div>
                                    <div className="flex items-end justify-end gap-5">
                                      <button
                                        onClick={handleAttributes}
                                        className="edit handlebuttonedit w-18 max-w-17 "
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="submit"
                                        className="edit handlebuttonedit w-18 max-w-17"
                                      >
                                        Ok
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="  w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                      <div className="flex w-full flex-col">
                        <Checkbox
                          onChange={onChange}
                          className=" text-black dark:bg-boxdark dark:text-white"
                        >
                          Has Beneficiary
                        </Checkbox>
                        <Checkbox
                          onChange={onChange}
                          className=" text-black dark:bg-boxdark dark:text-white"
                        >
                          Is Allow Send SMS
                        </Checkbox>
                        <Checkbox
                          onChange={onChange}
                          className=" text-black dark:bg-boxdark dark:text-white"
                        >
                          Is Disable Reminder
                        </Checkbox>
                      </div>
                    </div>

                    <div className="mb-6"></div>
                  </div>
                </form>
              </div>
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
            .getElementById("families")
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
