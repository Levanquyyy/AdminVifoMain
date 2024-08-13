"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type {
  CheckboxProps,
  CollapseProps,
  TabsProps,
  GetProp,
  UploadFile,
  UploadProps,
  TableProps,
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
  Tag,
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

const { TextArea } = Input;

const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};
import { useFormik } from "formik";
import * as Yup from "yup";
// check formik
const validationSchema = Yup.object({
  companyName: Yup.string().required("Company Name is required"),
  description: Yup.string().required("Description is required"),
  address: Yup.string().required("Address is required"),
  companyInformation: Yup.string().required("Company Information is required"),
  businessLicenceNumber: Yup.string().required(
    "Business Licence Number is required",
  ),
  code: Yup.string().required("Code is required"),
  catalog: Yup.string().required("Catalog is required"),
});

const page = () => {
  // check formik
  const formik = useFormik({
    initialValues: {
      companyName: "",
      description: "",
      address: "",
      companyInformation: "",
      businessLicenceNumber: "",
      code: "",
      catalog: "",
    },
    validationSchema: validationSchema,
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
          <button className="handlebuttonedit edit">
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
          </button>
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
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
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

  const handleisCoverages = () => {
    setIsCoverages(false);
  };

  const handleCancelisCoverages = () => {
    setIsCoverages(false);
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
  const [checked, setChecked] = useState(false);
  const [underpricess, setUnderprices] = useState("hidden");
  const [benefitforbike, setBenefitsforbike] = useState([""]);
  const [benefitforpricesquan, setBenefitforpricesquan] = useState([""]);
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
      label: "Add Provider",
      children: (
        <>
          <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
            <div className=" flex flex-col gap-6 ">
              <form onSubmit={formik.handleSubmit} id="families">
                <div className="w-full ">
                  <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                    Provider Logo *
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
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                    />
                  )}
                </div>
                <div className=" w-full  dark:border-strokedark dark:bg-boxdark">
                  <div className="mb-4.5  flex  ">
                    <div className="w-full ">
                      <div className="flex flex-col gap-5.5">
                        <SelectGroupTwo
                          id="Danhmuc"
                          nhacungcap="Catelog"
                          value={formik.values.catalog}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="catalog"
                        >
                          <option value="xemay">Physical</option>
                          <option value="xehoi">Bảo Hiểm Xe Máy</option>
                          <option value="suckhoe">Bảo Hiểm Sức Khỏe</option>
                        </SelectGroupTwo>
                        {formik.touched.catalog && formik.errors.catalog && (
                          <p className="text-red">{formik.errors.catalog}</p>
                        )}
                      </div>
                    </div>

                    <br />
                  </div>
                </div>
                <div className="w-full ">
                  <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                    Company Name *
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Company Name"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="companyName"
                  />
                  {formik.touched.companyName && formik.errors.companyName && (
                    <p className="text-red">{formik.errors.companyName}</p>
                  )}
                </div>
                <div className="w-full ">
                  <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                    Description *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="VietNam"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="description"
                  />
                  {formik.touched.description && formik.errors.description && (
                    <p className="text-red">{formik.errors.description}</p>
                  )}
                </div>
                <div className="w-full ">
                  <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                    Address *
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
                <div className="w-full ">
                  <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                    Company Information *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="VietNam"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formik.values.companyInformation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="companyInformation"
                  />
                  {formik.touched.companyInformation &&
                    formik.errors.companyInformation && (
                      <p className="text-red">
                        {formik.errors.companyInformation}
                      </p>
                    )}
                </div>
                <div className="w-full ">
                  <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                    Business Licence Number *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="VietNam"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formik.values.businessLicenceNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="businessLicenceNumber"
                  />
                  {formik.touched.businessLicenceNumber &&
                    formik.errors.businessLicenceNumber && (
                      <p className="text-red">
                        {formik.errors.businessLicenceNumber}
                      </p>
                    )}
                </div>
                <div className="w-full ">
                  <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                    Code *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="VietNam"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="code"
                  />
                  {formik.touched.code && formik.errors.code && (
                    <p className="text-red">{formik.errors.code}</p>
                  )}
                </div>
                <div className="w-full ">
                  <Checkbox
                    onChange={onChange}
                    className=" text-black dark:bg-boxdark dark:text-white "
                  >
                    Is Disable Send Data To Provider
                  </Checkbox>
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
    {
      key: "2",
      label: "Contact",
      children: (
        <>
          <div className=" w-full rounded-sm border border-stroke bg-white p-3 font-medium text-black shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white">
            <div className="mb-4.5  flex flex-col gap-6 ">
              <div className="w-full ">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Email Customer Services
                </label>
                <input
                  required
                  type="email"
                  placeholder="VietNam"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full ">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Email Accountant
                </label>
                <input
                  required
                  type="email"
                  placeholder=""
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full ">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Address *
                </label>
                <input
                  required
                  type="text"
                  placeholder=""
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full ">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Phone 1
                </label>
                <input
                  required
                  type="number"
                  placeholder=""
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full ">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Phone 2 (Backup)
                </label>
                <input
                  required
                  type="text"
                  placeholder=""
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 "
              >
                Submit
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
