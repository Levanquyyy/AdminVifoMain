"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type {
  CollapseProps,
  GetProp,
  UploadFile,
  UploadProps,
  TableProps,
  CheckboxProps,
} from "antd";
import {
  Checkbox,
  Collapse,
  Button,
  Modal,
  Input,
  message,
  Upload,
  Image,
  Space,
  Table,
} from "antd";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import {
  UploadOutlined,
  CaretRightOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const { TextArea } = Input;

const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};
// validation schema for coverage
const validationSchemaCoverage = Yup.object({
  LabelEn: Yup.string().required("This field is required"),
  LabelVi: Yup.string().required("This field is required"),
  DescriptionEn: Yup.string().required("This field is required"),
  DescriptionVi: Yup.string().required("This field is required"),
  Rank: Yup.string().required("This field is required"),
});
// validation schema for attributes
const validationSchemaAttributes = Yup.object({
  LabelEn: Yup.string().required("This field is required"),
  LabelVi: Yup.string().required("This field is required"),
  DescriptionEn: Yup.string().required("This field is required"),
  DescriptionVi: Yup.string().required("This field is required"),
  Rank: Yup.string().required("This field is required"),
});
const FormLayout = () => {
  // handle checkbox
  const [checked, setChecked] = useState(false);

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };
  // formik for coverage
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
  // formik for attributes
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

  // table add coverage
  interface DataType {
    key: string;
    lbel: string;
    lbvn: string;
    FieldType: string;
    Required: string;
    Position: number;
  }
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Label (English)",
      dataIndex: "lbel",
      key: "Label (English)",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Label (Việt Nam)",
      dataIndex: "lbvn",
      key: "Label (Việt Nam)",
    },
    {
      title: "Field Type",
      dataIndex: "FieldType",
      key: "Field Type",
      render: (text) => <li className="handlewraptext">{text}</li>,
    },
    {
      title: "Required",
      key: "Required",
      dataIndex: "Required",
      render: (text) => <li className="handlewraptextRequired">{text}</li>,
    },
    {
      title: "Position",
      key: "Position",
      dataIndex: "Position",
      render: (text) => <li className="handlewraptextPosition">{text}</li>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={showisCoveragesForTable}
            className="handlebuttonedit edit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </Button>
          <Modal
            title="Add Coverage"
            open={isCoveragesfortable}
            onCancel={handleCancelisCoveragesForTable}
            className="dark: bg-form-input"
          >
            <form onSubmit={formikforCoverage.handleSubmit}>
              <div className="w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                <div className="mb-4.5  flex flex-col gap-6 ">
                  <div className="w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      vf-cov-1685949151382
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="English"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="LabelEn"
                      value="vf-cov-1685949151382
"
                    />
                  </div>
                  <div className="w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Label (en) *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="English"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value="Coverage"
                    />
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
                      value="Mức bảo hiểm"
                    />
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
                      value="Coverage"
                    />
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
                      value="Mức bảo hiểm"
                    />
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
                            nhacungcap="Currency "
                            name="Rank"
                            value="Physical"
                            onChange=""
                            onBlur=""
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
                  <div className="w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      position
                    </label>
                    <input
                      type="number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value="101"
                    />
                  </div>
                  <div className="flex items-end justify-end gap-5">
                    <button
                      onClick={handleCancelisCoveragesForTable}
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
          <button className="handlebuttonedit trash ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </Space>
      ),
    },
  ];
  const data: DataType[] = [
    {
      key: "1",
      lbel: "Coverage",
      lbvn: "Mức bảo hiểm",
      FieldType: "currency",
      Required: "no",
      Position: 101,
    },
    {
      key: "1",
      lbel: "Coverage",
      lbvn: "Mức bảo hiểm",
      FieldType: "currency",
      Required: "no",
      Position: 101,
    },
  ];
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
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
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
  // handel modal
  const [isCoverages, setIsCoverages] = useState(false);
  const showisCoverages = () => {
    setIsCoverages(true);
  };

  const handleCancelisCoverages = () => {
    setIsCoverages(false);
  };
  // handle modal for table

  const [isCoveragesfortable, setIsCoveragesForTable] = useState(false);
  const showisCoveragesForTable = () => {
    setIsCoveragesForTable(true);
  };
  const handleCancelisCoveragesForTable = () => {
    setIsCoveragesForTable(false);
  };
  const [Attributes, setAttributes] = useState(false);
  const showAttributes = () => {
    setAttributes(true);
  };

  const handleAttributes = () => {
    setAttributes(false);
  };

  const handleCancelAttributes = () => {
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

  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: "Edit Product Family",
      children: (
        <>
          <Breadcrumb pageName="Edit Product Family" />

          <div className=" gap-9  sm:grid-cols-4 ">
            <div className="flex flex-col gap-9">
              {/* <!--Bao hiem xe co --> */}
              <div className="w1/2 rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                <form action="#">
                  <div className="p-6.5">
                    <div className=" mb-4.5 flex flex-col gap-6 rounded-sm border  border-stroke bg-white p-3 font-medium text-black dark:border-strokedark dark:bg-boxdark dark:text-white xl:flex-row">
                      {/* <!-- File upload --> */}
                      <div className=" w-full ">
                        <div className=" rounded-sm border border-stroke bg-white p-3 dark:border-strokedark dark:bg-boxdark">
                          <h3 className="font-medium text-black dark:text-white">
                            File upload
                          </h3>
                          <div className="flex flex-col gap-5.5 ">
                            <div className="flex items-center gap-4 ">
                              <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                product Logo
                              </label>
                              <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-circle"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                              >
                                {fileList.length >= 8 ? null : uploadButton}
                              </Upload>
                              {previewImage && (
                                <Image
                                  alt="preview"
                                  wrapperStyle={{ display: "none" }}
                                  preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) =>
                                      setPreviewOpen(visible),
                                    afterOpenChange: (visible) =>
                                      !visible && setPreviewImage(""),
                                  }}
                                  src={previewImage}
                                />
                              )}
                            </div>
                          </div>

                          <br />
                        </div>
                      </div>
                    </div>

                    <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className=" flex flex-col gap-6 p-3  xl:flex-row">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            product name (English)
                          </label>
                          <input
                            defaultValue={"Flight Cancellation Insurance"}
                            required
                            type="text"
                            placeholder="English"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            product name (Việt Nam)
                          </label>
                          <input
                            defaultValue={"BH Hủy chuyến bay"}
                            required
                            type="text"
                            placeholder="VietNam"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className=" flex flex-col gap-6 p-3  xl:flex-row">
                        <div className="w-full ">
                          <TextArea
                            defaultValue={"Flight Cancellation Insurance"}
                            required
                            rows={4}
                            placeholder="Mô tả sản phẩm (Việt Nam)"
                            maxLength={500}
                            className=" dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full ">
                          <TextArea
                            defaultValue={"Flight Cancellation Insurance"}
                            required
                            rows={4}
                            placeholder="Mô tả sản phẩm (Việt Nam)"
                            maxLength={500}
                            className=" dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                            Product Slug (English)
                          </label>
                          <input
                            defaultValue={"flight-cancelled"}
                            required
                            type="text"
                            placeholder="English"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Product Slug (Việt Nam)
                          </label>
                          <input
                            defaultValue={"bh-huy-chuyen-bay"}
                            required
                            type="text"
                            placeholder="VietNam"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                    {/* product name */}
                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className="flex flex-col gap-6 p-3  xl:flex-row">
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
                                id="Productfamily"
                                nhacungcap=" Product Family"
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
                      </div>
                    </div>
                    {/* Valid After (days) */}
                    <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className="flex flex-col gap-6 p-3 xl:flex-row">
                        <div className=" w-full">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Valid After (days)
                          </label>
                          <input
                            defaultValue={"1"}
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
                            defaultValue={"FLCA"}
                            required
                            type="text"
                            placeholder="VietNam"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>

                    {/* product rank */}

                    {/* product position */}
                    <div className="mb-4.5  w-full rounded-sm border border-stroke bg-white p-3 p-3  dark:border-strokedark dark:bg-boxdark">
                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className=" w-full">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            position
                          </label>
                          <input
                            defaultValue={"30"}
                            type="text"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            SMS Content
                          </label>
                          <TextArea
                            defaultValue={"undefined"}
                            rows={2}
                            className="dark:bg-form-input dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="mb-4.5 flex flex-col flex-wrap gap-6 xl:flex-row">
                        <div className="mb-4.5 flex flex-1 flex-wrap gap-4 p-3">
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
                      </div>
                      <div className="flex flex-1 flex-col gap-8">
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
                                      onChange={formikforCoverage.handleChange}
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
                                      onChange={formikforCoverage.handleChange}
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
                                      onChange={formikforCoverage.handleChange}
                                      onBlur={formikforCoverage.handleBlur}
                                    />
                                    {formikforCoverage.touched.DescriptionEn &&
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
                                      onChange={formikforCoverage.handleChange}
                                      onBlur={formikforCoverage.handleBlur}
                                    />
                                    {formikforCoverage.touched.DescriptionVi &&
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
                                                {formikforCoverage.errors.Rank}
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

                        <Table columns={columns} dataSource={data} />

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
                                      value={formikforAtrributes.values.LabelEn}
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
                                      value={formikforAtrributes.values.LabelVi}
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
                                        formikforAtrributes.values.DescriptionEn
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
                                        formikforAtrributes.values.DescriptionVi
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
                                            formikforAtrributes.errors.Rank && (
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
                        <Table columns={columns} dataSource={data} />
                      </div>
                    </div>
                    <div className="w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                      <div className="w-full ">
                        <Checkbox className=" text-black dark:bg-boxdark dark:text-white">
                          Has Beneficiary
                        </Checkbox>
                        <Checkbox className=" text-black dark:bg-boxdark dark:text-white">
                          Is Allow Send SMS
                        </Checkbox>
                        <Checkbox
                          checked={true}
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
      >
        Submit
      </button>
    </DefaultLayout>
  );
};

export default FormLayout;
