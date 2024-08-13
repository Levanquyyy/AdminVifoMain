"use client";
import type {
  CheckboxProps,
  CollapseProps,
  TabsProps,
  GetProp,
  UploadFile,
  UploadProps,
  TableProps,
} from "antd";
import { Collapse, Input, message, Upload, Image, Space } from "antd";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import { CaretRightOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
// check formik
const validationSchema = Yup.object({
  TpaCode: Yup.string().required("Required"),
  TpaLogo: Yup.string().required("Required"),
  TpaName: Yup.string().required("Required"),
  Phone: Yup.string().required("Required"),
});

const page = () => {
  // check formik
  const formik = useFormik({
    initialValues: {
      TpaCode: "",
      TpaLogo: "",
      TpaName: "",
      Phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!previewImage) {
        alert("Please upload an image");
        return;
      }
      console.log("Form data", values);
    },
  });
  // table add coverage
  interface DataType {
    key: string;
    lbel: string;
    lbvn: string;
    FieldType: string;
    Required: string;
    Position: number;
  }

  // check upload file already
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: "Add TPA",
      children: (
        <>
          <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
            <div className=" flex flex-col gap-6 ">
              <form onSubmit={formik.handleSubmit} id="families">
                <div className="w-full p-3 ">
                  <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                    Tpa Logo *
                  </label>
                  <Upload
                    name="TpaLogo"
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-circle"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    maxCount={1}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  {formik.touched.TpaLogo && formik.errors.TpaLogo && (
                    <p className="text-red">{formik.errors.TpaLogo}</p>
                  )}
                  {previewImage && (
                    <Image
                      alt="preview"
                      wrapperStyle={{ display: "none" }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                    />
                  )}
                </div>
                <div className=" w-full  p-3 dark:border-strokedark dark:bg-boxdark">
                  <div className="mb-4.5  flex  ">
                    <div className="w-full ">
                      <div className="flex flex-col gap-5.5">
                        <SelectGroupTwo
                          id="ProductFamily
"
                          nhacungcap="Product Family
"
                          value=""
                          onChange={(e) => {}}
                        >
                          <option value="xemay">Physical</option>
                          <option value="xehoi">Bảo Hiểm Xe Máy</option>
                          <option value="suckhoe">Bảo Hiểm Sức Khỏe</option>
                        </SelectGroupTwo>
                      </div>
                    </div>

                    <br />
                  </div>
                  <div className="mb-4.5  flex  ">
                    <div className="w-full ">
                      <div className="flex flex-col gap-5.5">
                        <SelectGroupTwo
                          id="ProductFamily
"
                          nhacungcap="Product Family
"
                        >
                          <option value="xemay">Physical</option>
                          <option value="xehoi">Bảo Hiểm Xe Máy</option>
                          <option value="suckhoe">Bảo Hiểm Sức Khỏe</option>
                        </SelectGroupTwo>
                      </div>
                    </div>

                    <br />
                  </div>
                </div>
                <div className="w-full p-3 ">
                  <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                    Tpa Code *
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Company Name"
                    value={formik.values.TpaCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="TpaCode"
                  />
                  {formik.touched.TpaCode && formik.errors.TpaCode && (
                    <p className="text-red">{formik.errors.TpaCode}</p>
                  )}
                </div>
                <div className="w-full p-3">
                  <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                    Tpa Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="VietNam"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formik.values.TpaName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="TpaName"
                  />
                  {formik.touched.TpaName && formik.errors.TpaName && (
                    <p className="text-red">{formik.errors.TpaName}</p>
                  )}
                </div>
                <div className="w-full p-3">
                  <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                    Email
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="VietNam"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="address"
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="text-red">{formik.errors.address}</p>
                  )}
                </div>
                <div className="w-full p-3">
                  <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                    Phone *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="VietNam"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formik.values.Phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="Phone"
                  />
                  {formik.touched.Phone && formik.errors.Phone && (
                    <p className="text-red">{formik.errors.Phone}</p>
                  )}
                </div>
                <div className="w-full p-3">
                  <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                    Tpa Description
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Tpa Description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 "
                >
                  Thêm Bảo Hiểm
                </button>
              </form>
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
