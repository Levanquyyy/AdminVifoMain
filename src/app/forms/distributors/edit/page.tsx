"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type {
  CollapseProps,
  FormInstance,
  GetProp,
  InputRef,
  SelectProps,
  TabsProps,
  UploadFile,
  UploadProps,
} from "antd";
import {
  Checkbox,
  Collapse,
  ColorPicker,
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Select,
  Tabs,
  Space,
} from "antd";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import { CaretRightOutlined } from "@ant-design/icons";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ColumnsType } from "antd/es/table";
import TextArea from "antd/es/input/TextArea";
import UploadComponent from "@/components/UploadComponent";
import Column from "antd/es/table/Column";
import Link from "next/link";
import OrganizationalChart from "@/components/OriginalChart";
import { commissiontablelevel } from "@/types/commissiontablelevel";
import CommissionTable from "@/components/CommissionTableLevel";

const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};
const data: commissiontablelevel[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
const sampleData = {
  name: "safeSaving",
  children: [
    {
      name: "SafeSaving con 1",
      children: [
        {
          name: "SafeSaving con 1.1",
          children: [
            {
              name: "SafeSaving con 1.1.1",
              children: [
                {
                  name: "SafeSaving con",
                  children: [], // Added missing children array
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "SafeSaving con 2",
      children: [],
    },
  ],
};
// type for table in Member
interface DataType {
  key: React.Key;
  phone: string;
  name: string;
  role: string;
  email: string;
}

const validationSchemaOrganization = Yup.object({
  OrganizationCode: Yup.string().required("This field is required"),
  OrganizationLogo: Yup.string().required("This field is required"),
  OrganizationName: Yup.string().required("This field is required"),
  Phone1: Yup.string().required("This field is required"),
});
// validate for Add member
const validateMemBer = Yup.object({
  UserPhoneNumber: Yup.string().required("This field is required"),
  Position: Yup.string().required("This field is required"),
});
// add row in Customer Notification

interface Item {
  id: string;
  templateId?: string;
  type?: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  title: string;
  record: Item;
  handleSave: (record: Item) => void;
}
// handle upload image
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const FormLayout = () => {
  // table in Member
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      phone: "123456789",
      name: "John",
      role: "Admin",
      email: "john@example.com",
    },
    {
      key: "2",
      phone: "987654321",
      name: "Jane",
      role: "User",
      email: "jane@example.com",
    },
    // Add more data as needed
  ]);
  const [commissiontablelevel, setCommissiontablelevel] = useState<
    commissiontablelevel[]
  >([
    {
      key: "1",
      Family_Providers: ["ceive VA - Non Billing", "VIFO"],
      Level1: 0,
      Level2: 0,
      Level3: 0,
      Level4: 0,
      Level5: 0,
      enabler: false,
      RestrictionRanks: "Revanue",
    },
    {
      key: "2",
      Family_Providers: ["	Receive Money VA", "VIFO"],
      Level1: 0,
      Level2: 0,
      Level3: 0,
      Level4: 0,
      Level5: 0,
      enabler: false,
      RestrictionRanks: "Revanue",
    },
    {
      key: "3",
      Family_Providers: ["Transfer Money out ", "VIFO"],
      Level1: 0,
      Level2: 0,
      Level3: 0,
      Level4: 0,
      Level5: 0,
      enabler: false,
      RestrictionRanks: "Revanue",
    },
  ]);
  const handleDeleteinMember = (key: string) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };
  // tabas
  const itemstabs: TabsProps["items"] = [
    {
      key: "1",
      label: "EN",
      children: (
        <input
          type="text"
          className="handlecsspicker"
          defaultValue={"safesavings@vifo123"}
        />
      ),
    },
    {
      key: "2",
      label: "VN",
      children: <input type="text" className="handlecsspicker" />,
    },
  ];
  // handle upload image
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

  const handleChange = (value: any) => {
    formikforMember.setFieldValue("Position", value);
  };
  // muilti choice provider
  const options: SelectProps["options"] = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }
  const EditableContext = React.createContext<FormInstance<any> | null>(null);

  const EditableRow: React.FC<{ index: number }> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
      if (editing) {
        inputRef.current?.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: `${title} is required.` }]}
        >
          {dataIndex === "type" ? (
            <Select ref={inputRef} onPressEnter={save} onBlur={save}>
              <Select.Option value="type1">Type 1</Select.Option>
              <Select.Option value="type2">Type 2</Select.Option>
            </Select>
          ) : (
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          )}
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingInlineEnd: 24 }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const [dataSource, setDataSource] = useState<Item[]>([
    {
      id: "0",
      templateId: "Template 0",
      type: "type1",
    },
  ]);
  const [count, setCount] = useState(1);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.id !== key);
    setDataSource(newData);
  };

  const handleAdd = () => {
    const newData: Item = {
      id: count.toString(),
      templateId: `Template ${count}`,
      type: "type1", // Set a default value for the type field
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: Item) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const defaultColumns: ColumnsType<Item> = [
    {
      title: "Template_ID",
      dataIndex: "templateId",
      width: "50%",
      editable: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      width: "50%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  // handle color clear
  const [accent, setColorAccent] = useState("#1677ff");
  const [text, setColorText] = useState("#1677ff");
  const [button, setColorButton] = useState("#1677ff");
  // handle formik

  const handlesetColorAccent = (e) => {
    setColorAccent("#FFFFFF");
    // console.log("click");
  };

  const handlesetColorText = (e) => {
    setColorText("#FFFFFF");
    // console.log("click");
  };

  const handlesetColorButton = (e) => {
    setColorButton("#FFFFFF");
    // console.log("click");
  };
  const formikforOrganization = useFormik({
    initialValues: {
      OrganizationCode: "",
      OrganizationLogo: "",
      OrganizationName: "",
      Phone1: "",
      Rank: "",
    },
    validationSchema: validationSchemaOrganization,
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });
  const formikforMember = useFormik({
    initialValues: {
      UserPhoneNumber: "",
      Position: "lucy",
    },
    validationSchema: validateMemBer,
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });

  // check handle event checkbox

  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(true);
  const [bankTranFers, setBankTranFers] = useState(true);
  const [AlepayPayment, setAlepayPayment] = useState(false);
  const [VNPAYPayment, setVNPAYPayment] = useState(false);
  const [VietQR, setVietQR] = useState(false);
  const [CHAIPayment, setCHAIPayment] = useState(false);
  const [ApotaPayment, setApotaPayment] = useState(false);
  const [OCBVirtualBank, setOCBVirtualBank] = useState(false);
  const [IsNonBillingVirtualAccount, setIsNonBillingVirtualAccount] =
    useState(true);
  const handleIsNonBillingVirtualAccount = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsNonBillingVirtualAccount(event.target.checked);
    console.log("checked = ", event.target.checked);
  };
  const handleOCBVirtualBank = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOCBVirtualBank(event.target.checked);
    console.log("checked = ", event.target.checked);
  };
  const handleApotaPayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApotaPayment(event.target.checked);
    console.log("checked = ", event.target.checked);
  };
  const handleCHAIPayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCHAIPayment(event.target.checked);
    console.log("checked = ", event.target.checked);
  };

  const handleVietQR = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVietQR(event.target.checked);
    console.log("checked = ", event.target.checked);
  };
  const handleVNPAYPayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVNPAYPayment(event.target.checked);
    console.log("checked = ", event.target.checked);
  };
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked1(event.target.checked);
    console.log("checked = ", event.target.checked);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked2(event.target.checked);
    console.log("checked = ", event.target.checked);
  };
  const handleBankTransfers = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBankTranFers(event.target.checked);
    console.log("checked = ", event.target.checked);
  };
  const handleAlepayPayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlepayPayment(event.target.checked);
    console.log("checked = ", event.target.checked);
  };
  // check handle Customer Notification
  const [AllowSendSMS, setAllowSendSMS] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);

  const handlechangeCustomerNotification4 = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsChecked4(event.target.checked);
    console.log("checked = ", event.target.checked);
  };
  const handlechangeCustomerNotification5 = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsChecked5(event.target.checked);
    console.log("checked = ", event.target.checked);
  };

  const handleAllowSendSMSChange = () => {
    if (AllowSendSMS) {
      setIsChecked3(false);
    }
    setAllowSendSMS(!AllowSendSMS);
  };
  const handlechangeCustomerNotification = () => {
    setIsChecked3(!isChecked3);
  };
  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues,
  ) => {
    console.log("checked = ", checkedValues);
  };
  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: "Add Organization",
      children: (
        <>
          <Breadcrumb pageName="Add Organization" />

          <div className=" gap-9  sm:grid-cols-4 ">
            <form onSubmit={formikforOrganization.handleSubmit}>
              <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                <div className=" flex flex-col gap-6 p-3  xl:flex-row">
                  <div className="w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Id
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="English"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      disabled
                      defaultValue={"qmv7dk48eo4b690w"}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col ">
                {/* product category */}
                <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                  <div className="flex flex-col gap-6 p-3 xl:flex-row">
                    <div className=" w-full">
                      {/* <!-- Chọn Category --> */}
                      <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col gap-5.5 p-3">
                          <label
                            htmlFor="Provider"
                            className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white"
                          >
                            Provider
                          </label>
                          <Select
                            mode="multiple"
                            allowClear
                            style={{ width: "100%" }}
                            placeholder="Please select"
                            defaultValue={["a10", "c12"]}
                            options={options}
                            id="Provider"
                          />
                        </div>

                        <br />
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                  <div className="flex flex-col gap-6 p-3 xl:flex-row">
                    <div className=" w-full">
                      {/* <!-- Chọn Category --> */}
                      <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col gap-5.5 p-3">
                          <label
                            htmlFor="Product Family
"
                            className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white"
                          >
                            Product Family
                          </label>
                          <Select
                            mode="multiple"
                            allowClear
                            style={{ width: "100%" }}
                            placeholder="Please select"
                            defaultValue={["a10", "c12"]}
                            options={options}
                            id="Product Family
"
                          />
                        </div>

                        <br />
                      </div>
                    </div>
                  </div>
                </div>
                {/* product code */}
                <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                  <div className=" flex flex-col gap-6 p-3  xl:flex-row">
                    <div className="w-full ">
                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                        Organization Code *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="English"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        disabled
                        defaultValue={"VIFO-TRANSACTION-KL"}
                      />
                    </div>
                  </div>
                </div>
                <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                  <div className="flex flex-col gap-6 p-3 xl:flex-row">
                    <div className="w-full">
                      <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col gap-5.5 p-3">
                          <SelectGroupTwo
                            id="OCRProvider
"
                            name="OCRProvider"
                            nhacungcap="OCRProvider"
                            value=""
                            onChange={(e) => {}}
                            onBlur={(e) => {}}
                          >
                            <option value="xemay">Computer Vision</option>
                            <option value="xehoi">Fin OS</option>
                          </SelectGroupTwo>
                        </div>

                        <br />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  {/* <!-- File upload --> */}
                  <div className="  w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                    <div className=" ">
                      <div className="flex flex-col gap-5.5 ">
                        <div className="p-3">
                          <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Organization Logo *
                          </label>
                          {/* <Upload
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-circle"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            maxCount={1}
                          >
                            {fileList.length >= 8 ? null : uploadButton}
                          </Upload>
                          {previewImage && (
                            <Image
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
                          )} */}
                        </div>
                      </div>

                      <br />
                    </div>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  {/* <!-- File upload --> */}
                  <div className="w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                    <div className="w-full ">
                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                        Organization Name *
                      </label>
                      <input
                        required
                        type="text"
                        name="OrganizationName"
                        placeholder="Việt Nam"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        defaultValue={"VIFO TRANSACTION KIENLONGBANK"}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  {/* <!-- File upload --> */}
                  <div className="w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                    <div className="w-full ">
                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                        Email Customer Services
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Việt Nam"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  {/* <!-- File upload --> */}
                  <div className="w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                    <div className="w-full ">
                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                        Email Accountant
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Việt Nam"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  {/* <!-- File upload --> */}
                  <div className="w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                    <div className="w-full ">
                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                        Phone 1 *
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        defaultValue={"0912345678"}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  {/* <!-- File upload --> */}
                  <div className="w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                    <div className="w-full ">
                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                        Phone 2 (Backup)
                      </label>
                      <input
                        required
                        type="text"
                        name="Phone1"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  {/* <!-- File upload --> */}
                  <div className="w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                    <div className="w-full ">
                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                        Organization Name *
                      </label>
                      <input
                        required
                        type="text"
                        name="OrganizationName"
                        placeholder="Việt Nam"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={formikforOrganization.values.OrganizationName}
                        onChange={formikforOrganization.handleChange}
                        onBlur={formikforOrganization.handleBlur}
                      />
                      {formikforOrganization.touched.OrganizationName &&
                        formikforOrganization.errors.OrganizationName && (
                          <div>
                            {" "}
                            <p className="text-red">
                              {formikforOrganization.errors.OrganizationName}
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  {/* <!-- File upload --> */}
                  <div className="w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                    <div className="w-full ">
                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                        Website
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  {/* <!-- File upload --> */}
                  <div className="w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                    <div className="w-full ">
                      <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                        Organization Description
                      </label>
                      <input
                        required
                        type="text"
                        name="Phone1"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                {/* tabs */}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  {/* <!-- File upload --> */}
                  <div className="w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      {" "}
                      Desktop Footer
                    </label>

                    <div className="w-full ">
                      <Tabs
                        defaultActiveKey="1"
                        items={itemstabs}
                        className=" rounded-sm border border-b border-stroke bg-white px-6.5 py-4  dark:border-strokedark dark:bg-boxdark dark:text-white"
                        id="DesktopFooter"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  {/* <!-- File upload --> */}
                  <div className="w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      {" "}
                      Mobile Footer
                    </label>

                    <div className="w-full ">
                      <Tabs
                        defaultActiveKey="1"
                        items={itemstabs}
                        className=" rounded-sm border border-b border-stroke bg-white px-6.5 py-4  dark:border-strokedark dark:bg-boxdark dark:text-white"
                        id="DesktopFooter"
                      />
                    </div>
                  </div>
                </div>
                {/* <!--Bao hiem xe co --> */}
                <div className=" rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                  <div className="p-6.5">
                    <div className="mb-4.5  w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                      <div className="flex w-full flex-col">
                        <Checkbox
                          onChange={(e: any) => handleChange1(e)}
                          className=" text-black dark:bg-boxdark dark:text-white"
                          checked={isChecked1}
                        >
                          Is Allow View Virtual Payment Report
                        </Checkbox>
                        <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                          <div className=" flex flex-col gap-6 p-3  xl:flex-row">
                            <div className="w-full ">
                              <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                Id
                              </label>
                              <input
                                required
                                type="text"
                                placeholder="English"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                disabled
                                defaultValue={
                                  "fLm7U2OFfgTN8nCaK6efkNrYQGmLpWyh"
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <Checkbox
                          onChange={(e: any) => handleChange2(e)}
                          className=" text-black dark:bg-boxdark dark:text-white"
                          checked={isChecked2}
                        >
                          Is Enable Webhook
                        </Checkbox>
                        {isChecked2 && (
                          <div className="mb-4.5 w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                            <div className="w-full ">
                              <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                Webhook Endpoint
                              </label>
                              <input
                                required
                                type="text"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                defaultValue={
                                  "https://webhook.site/664a9cbf-026f-45eb-a49b-5e118bc44e60"
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className=" mb-4.5 flex items-end gap-3">
                        <div className="flex flex-col">
                          <label htmlFor="" className="dark:text-white">
                            Accent Color
                          </label>
                          <ColorPicker
                            className="flex-1"
                            showText
                            value={accent}
                            onChange={(newColor) => setColorAccent(newColor)}
                          />
                        </div>
                        <button
                          type="button"
                          className="edit handlebuttonedit h-9 "
                          onClick={handlesetColorAccent}
                        >
                          Default Color
                        </button>
                      </div>
                      <div className=" mb-4.5 flex items-end gap-3">
                        <div className="flex flex-col">
                          <label htmlFor="" className="dark:text-white">
                            Text Color
                          </label>
                          <ColorPicker
                            showText
                            value={text}
                            onChange={(newColor) => setColorText(newColor)}
                          />
                        </div>
                        <button
                          type="button"
                          className="edit handlebuttonedit h-9 "
                          onClick={handlesetColorText}
                        >
                          Default Color
                        </button>
                      </div>
                      <div className=" mb-4.5 flex items-end gap-3">
                        <div className="flex flex-col">
                          <label htmlFor="" className="dark:text-white">
                            Button Color
                          </label>
                          <ColorPicker
                            showText
                            value={button}
                            onChange={(newColor) => setColorButton(newColor)}
                          />
                        </div>
                        <button
                          type="button"
                          className="edit handlebuttonedit h-9 "
                          onClick={handlesetColorButton}
                        >
                          Default Color
                        </button>
                      </div>
                    </div>

                    <div className="flex items-end justify-end gap-5">
                      <button className="handlebuttonedit w-18 max-w-17 bg-primary ">
                        Submit
                      </button>
                      <button
                        type="submit"
                        className="trash handlebuttonedit w-18 max-w-17"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Customer Notification",
      children: (
        <>
          <div className=" rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
            <div className="p-6.5">
              <div className="mb-4.5   w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                <div className="flex w-full flex-col">
                  <Checkbox
                    onChange={onChange}
                    className=" text-black dark:bg-boxdark dark:text-white"
                    // checked={isChecked}
                  >
                    Disable Send Email
                  </Checkbox>
                  <div className="flex flex-col border-b">
                    <Checkbox
                      onChange={handleAllowSendSMSChange}
                      className=" text-black dark:bg-boxdark dark:text-white"
                      // checked={isChecked}
                    >
                      Allow Send SMS
                    </Checkbox>
                    {AllowSendSMS && (
                      <Checkbox
                        onChange={handlechangeCustomerNotification}
                        className=" text-black dark:bg-boxdark dark:text-white "
                        // checked={isChecked}
                      >
                        Is From Provider Brand{" "}
                      </Checkbox>
                    )}
                    {isChecked3 && (
                      <>
                        <div className="mb-3 w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              SMS BrandName
                            </label>
                            <input
                              required
                              type="text"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        </div>
                        <div className="mb-3  w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              SMS api Username
                            </label>
                            <input
                              required
                              type="text"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        </div>
                        <div className="mb-3  w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              SMS Api Password
                            </label>
                            <input
                              required
                              type="text"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <Checkbox
                    onChange={handlechangeCustomerNotification4}
                    className=" text-black dark:bg-boxdark dark:text-white"
                    // checked={isChecked}
                  >
                    Send Zalo message By VietGuys
                  </Checkbox>
                  {isChecked4 && (
                    <>
                      <div className="mb-3 w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Zalo OA ID
                          </label>
                          <input
                            required
                            type="text"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                      <div className="mb-3  w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Zalo Api Key
                          </label>
                          <input
                            required
                            type="text"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                      <div className="mb-3  w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Zalo Api Secret
                          </label>
                          <input
                            required
                            type="text"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  <Checkbox
                    onChange={handlechangeCustomerNotification5}
                    className=" text-black dark:bg-boxdark dark:text-white"
                    // checked={isChecked}
                  >
                    Send Zalo message By Zalo Zns
                  </Checkbox>
                  {isChecked5 && (
                    <>
                      <div className="mb-3 w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Zalo OA ID
                          </label>
                          <input
                            required
                            type="text"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                      <div className="mb-3 w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                        <Button
                          onClick={handleAdd}
                          type="primary"
                          style={{ marginBottom: 16 }}
                        >
                          Add a row
                        </Button>
                        <Table
                          components={components}
                          rowClassName={() => "editable-row"}
                          bordered
                          dataSource={dataSource}
                          columns={columns as ColumnsType<Item>}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className=" mb-4.5 flex items-end gap-3">
                  <div className="flex flex-col">
                    <label htmlFor="" className="dark:text-white">
                      Accent Color
                    </label>
                    <ColorPicker
                      className="flex-1"
                      showText
                      value={accent}
                      onChange={(newColor) => setColorAccent(newColor)}
                    />
                  </div>
                  <button
                    type="button"
                    className="edit handlebuttonedit h-9 "
                    onClick={handlesetColorAccent}
                  >
                    Default Color
                  </button>
                </div>
                <div className=" mb-4.5 flex items-end gap-3">
                  <div className="flex flex-col">
                    <label htmlFor="" className="dark:text-white">
                      Text Color
                    </label>
                    <ColorPicker
                      showText
                      value={text}
                      onChange={(newColor) => setColorText(newColor)}
                    />
                  </div>
                  <button
                    type="button"
                    className="edit handlebuttonedit h-9 "
                    onClick={handlesetColorText}
                  >
                    Default Color
                  </button>
                </div>
                <div className=" mb-4.5 flex items-end gap-3">
                  <div className="flex flex-col">
                    <label htmlFor="" className="dark:text-white">
                      Button Color
                    </label>
                    <ColorPicker
                      showText
                      value={button}
                      onChange={(newColor) => setColorButton(newColor)}
                    />
                  </div>
                  <button
                    type="button"
                    className="edit handlebuttonedit h-9 "
                    onClick={handlesetColorButton}
                  >
                    Default Color
                  </button>
                </div>
              </div>

              <div className="flex items-end justify-end gap-5">
                <button className="handlebuttonedit w-18 max-w-17 bg-primary ">
                  Submit
                </button>
                <button
                  type="submit"
                  className="trash handlebuttonedit w-18 max-w-17"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: "Payment Info",
      children: (
        <div className=" rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
          <div className="p-6.5">
            <div className="mb-4.5 flex w-full flex-col border-b p-3">
              <Checkbox
                onChange={onChange}
                className=" text-black dark:bg-boxdark dark:text-white"
                // checked={isChecked}
              >
                Enable Liabilities
              </Checkbox>

              <label
                htmlFor="Salemanminlevel
"
              >
                Saleman min level
              </label>
              <input
                required
                type="number"
                placeholder="English"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                defaultValue={5}
              />
            </div>
            <div className="mb-4.5 flex w-full flex-col border-b p-3">
              <Checkbox
                onChange={onChange}
                className=" text-black dark:bg-boxdark dark:text-white"
                // checked={isChecked}
              >
                Enable Wallet
              </Checkbox>
            </div>
            <div className="mb-4.5 flex w-full flex-col border-b p-3">
              <Checkbox
                onChange={handleBankTransfers}
                className=" text-black dark:bg-boxdark dark:text-white"
                // checked={isChecked}
                checked={bankTranFers}
              >
                Bank Transfer
              </Checkbox>
              {bankTranFers && (
                <>
                  <div className="mb-3 w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Bank Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-3 w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Bank Branch
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-3 w-full">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Account Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-3 w-full">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Account Number
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="mb-4.5 flex w-full flex-col border-b p-3">
              <Checkbox
                onChange={handleAlepayPayment}
                className=" text-black dark:bg-boxdark dark:text-white"
                // checked={isChecked}
                checked={AlepayPayment}
              >
                Alepay Payment
              </Checkbox>
              {AlepayPayment && (
                <>
                  <div className="mb-3 w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Token Key
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-3 w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Encrypt Key
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-3 w-full">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Checksum Key
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="mb-4.5 flex w-full flex-col border-b p-3">
              <Checkbox
                onChange={handleVNPAYPayment}
                className=" text-black dark:bg-boxdark dark:text-white"
                // checked={isChecked}
                checked={VNPAYPayment}
              >
                VNPAY Payment
              </Checkbox>
              {VNPAYPayment && (
                <>
                  <div className="mb-3 w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Website Key
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-3 w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Checksum Secret
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-3 w-full">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Checksum Key
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="mb-4.5 flex w-full flex-col border-b p-3">
              <Checkbox
                onChange={handleVietQR}
                className=" text-black dark:bg-boxdark dark:text-white"
                // checked={isChecked}
                checked={VietQR}
              >
                VietQR
              </Checkbox>
              {VietQR && (
                <>
                  <div className="mb-3 w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Bank Code
                    </label>
                    <Select
                      defaultValue="lucy"
                      className="w-full"
                      onChange={handleChange}
                      options={[
                        { value: "jack", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                        { value: "Yiminghe", label: "yiminghe" },
                      ]}
                    />
                  </div>
                  <div className="mb-3 w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Account Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-3 w-full">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Account Number
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="mb-4.5 flex w-full flex-col border-b p-3">
              <Checkbox
                onChange={handleCHAIPayment}
                className=" text-black dark:bg-boxdark dark:text-white"
                // checked={isChecked}
                checked={CHAIPayment}
              >
                CHAIPayment
              </Checkbox>
              {CHAIPayment && (
                <>
                  <div className="mb-3 w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Merchant Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-3 w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Key
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-3 w-full">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Secure Secret Key
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="mb-4.5 flex w-full flex-col border-b p-3">
              <Checkbox
                onChange={handleApotaPayment}
                className=" text-black dark:bg-boxdark dark:text-white"
                // checked={isChecked}
                checked={ApotaPayment}
              >
                Apota Payment
              </Checkbox>
              {ApotaPayment && (
                <>
                  <div className="mb-3 w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Partner Code
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-3 w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Api Key
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-3 w-full">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Secret Key
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="mb-4.5 flex w-full flex-col border-b p-3">
              <Checkbox
                onChange={handleOCBVirtualBank}
                className=" text-black dark:bg-boxdark dark:text-white"
                // checked={isChecked}
                checked={OCBVirtualBank}
              >
                OCB Virtual Bank
              </Checkbox>
              {OCBVirtualBank && (
                <>
                  <div className="mb-3 w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Bank Code
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      disabled
                      defaultValue={"OCB"}
                    />
                  </div>
                  <div className="mb-3 w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Account Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      defaultValue={"VIFO KIEN LONG BANK"}
                    />
                  </div>
                  <div className="mb-3 w-full">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Account Prefix
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      defaultValue={"1601"}
                    />
                  </div>

                  <Checkbox
                    onChange={handleIsNonBillingVirtualAccount}
                    className=" text-black dark:bg-boxdark dark:text-white"
                    // checked={isChecked}
                    checked={IsNonBillingVirtualAccount}
                  >
                    Is Non Billing Virtual Account
                  </Checkbox>
                  {IsNonBillingVirtualAccount && (
                    <>
                      <div className="mb-3 w-full ">
                        <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                          Allowed Account Name
                        </label>
                        <TextArea
                          rows={4}
                          defaultValue={"VIFO KIEN LONG BANK \nVIFO SPRING"}
                        />
                      </div>
                    </>
                  )}
                  <div className="mb-3 w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Base Account
                    </label>
                    <TextArea rows={4} defaultValue={"0000052237"} />
                  </div>
                  <div className="mb-3 w-full">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Client Id
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      defaultValue={"ba633f2c-bd49-4452-8089-f7ba56dcc276"}
                    />
                  </div>
                  <div className="mb-3 w-full">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Client Secret
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      defaultValue={
                        "N+3aXaFbP9iVEBrD3+iUbRnrA/3UYTaegC0z0u2iFQMtlmQV8i+aoBZgN6OxeGeMKtAhqAjX62Oui8I535dX7RNTuOaIpp0f1k7paDXHZLMkUM0DJuWXrdRr0EKLwViTQQFqaGffB+ikIcpDt43vRNSHR9H/Nzuw+c4CUV9cMdxxe6zcbONpzuIy9GWohA8lzyjy3JESjbDcAjh97dfUtZbyax6+xXVKZfRTPps2E2nyrNdMpNPDL2JluFlHw3atN7BWJKY0oenlRLyOlEdUdjdThaAvH+NYrt80foM2SyCqA0ju58TLraprq00i8AjeKuZE0hu/Kr3xc+Xi4GTobg=="
                      }
                    />
                  </div>
                  <div className="mb-3 w-full">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Signature Private Key
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      defaultValue={
                        "85ADF2EF18B2D252E13335312ED93F3DB50C18692A30DFE0C57244E2DD196B91"
                      }
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex items-end justify-end gap-5">
              <button className="handlebuttonedit w-18 max-w-17 bg-primary ">
                Submit
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: "Settings",
      children: (
        <>
          <div className=" rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
            <div className="p-6.5">
              <div className="mb-4.5 flex w-full flex-col border-b p-3">
                <Checkbox
                  onChange={onChange}
                  className=" text-black dark:bg-boxdark dark:text-white"
                  // checked={isChecked}
                >
                  Enable ORC{" "}
                </Checkbox>
              </div>
              <div className="mb-4.5 flex w-full flex-col border-b p-3">
                <Checkbox
                  onChange={onChange}
                  className=" text-black dark:bg-boxdark dark:text-white"
                  // checked={isChecked}
                >
                  Show Term & Condition
                </Checkbox>
              </div>
              <div className="mb-4.5 flex w-full flex-col border-b p-3">
                <Checkbox
                  onChange={onChange}
                  className=" text-black dark:bg-boxdark dark:text-white"
                  // checked={isChecked}
                  // checked={bankTranFers}
                >
                  Commission Deduct
                </Checkbox>
              </div>
              <div className="mb-4.5 flex w-full flex-col border-b p-3">
                <Checkbox
                  onChange={onChange}
                  className=" text-black dark:bg-boxdark dark:text-white"
                  // checked={isChecked}
                  // checked={AlepayPayment}
                >
                  Hiển thị hoa hồng
                </Checkbox>
              </div>

              <div className="flex items-end justify-end gap-5">
                <button className="handlebuttonedit w-18 max-w-17 bg-primary ">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="flex  items-end justify-end gap-3 p-4">
            <button
              type="submit"
              className="handlebuttonedit w-31 max-w-26 bg-primary "
            >
              Save Setting
            </button>
          </div>
        </>
      ),
    },
    {
      key: "5",
      label: "Promotion Banner",
      children: (
        <>
          <div className=" rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
            <div className="p-6.5">
              <div className="mb-4.5  flex w-full border-b p-3 sm:flex-col">
                <div className="mb-3 grid grid-cols-2 gap-4 ">
                  <UploadComponent
                    title="Homepage Desktop (1920x548 px)
"
                  />
                  <UploadComponent
                    title="Thu hộ - Non Billing Desktop (1920x548 px)
"
                  />
                  <UploadComponent
                    title="Thu hộ  Desktop (1920x548 px)
"
                  />
                  <UploadComponent
                    title="Chi hộ Desktop (1920x548 px)


"
                  />
                  <UploadComponent
                    title="Homepage Mobile (720x400 px)

"
                  />
                  <UploadComponent
                    title="Thu hộ - Non Billing Mobile (720x400 px)



"
                  />
                  <UploadComponent
                    title="Thu hộ Mobile (720x400 px)

"
                  />
                  <UploadComponent
                    title="Chi hộ Mobile (720x400 px)

"
                  />
                </div>
              </div>

              <div className="flex items-end justify-end gap-5">
                <button className="handlebuttonedit w-18 max-w-17 bg-primary ">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="flex  items-end justify-end gap-3 p-4">
            <button className="handlebuttonedit w-31 max-w-26 bg-primary ">
              Save Setting
            </button>
          </div>
        </>
      ),
    },
    {
      key: "6",
      label: "Distributor Product Family Icon",
      children: (
        <>
          <div className=" rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
            <div className="p-6.5">
              <div className="mb-4.5  flex w-full border-b p-3 sm:flex-col">
                <div className="mb-3 grid grid-cols-2 gap-4 ">
                  <UploadComponent
                    title="Thu hộ

"
                  />
                  <UploadComponent
                    title="Thu hộ - Non Billing

"
                  />
                  <UploadComponent
                    title="Chi hộ

"
                  />
                </div>
              </div>

              <div className="flex items-end justify-end gap-5">
                <button className="handlebuttonedit w-18 max-w-17 bg-primary ">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="flex  items-end justify-end gap-3 p-4">
            <button className="handlebuttonedit w-31 max-w-26 bg-primary ">
              Save Setting
            </button>
          </div>
        </>
      ),
    },
    {
      key: "7",
      label: "Add member",
      children: (
        <>
          <div className=" rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
            <div className="p-6.5">
              <form action="" onSubmit={formikforMember.handleSubmit}>
                <div className="mb-4.5  flex w-full  sm:flex-col">
                  <div className="w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      User Phone Number *
                    </label>

                    <input
                      required
                      type="text"
                      className="w-full rounded  border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="UserPhoneNumber"
                      onChange={formikforMember.handleChange}
                      value={formikforMember.values.UserPhoneNumber}
                      onBlur={formikforMember.handleBlur}
                    />

                    {formikforMember.touched.UserPhoneNumber &&
                      (formikforMember.errors.UserPhoneNumber ? (
                        <p className="text-red">
                          {formikforMember.errors.UserPhoneNumber}
                        </p>
                      ) : null)}
                  </div>
                </div>
                <div className="mb-4.5  flex w-full  sm:flex-col">
                  <div className="w-full ">
                    <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                      Position
                    </label>

                    <Select
                      name="Position"
                      defaultValue="lucy"
                      onBlur={formikforMember.handleBlur}
                      value={formikforMember.values.Position}
                      className="w-full"
                      onChange={handleChange}
                      options={[
                        { value: "jack", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                        { value: "Yiminghe", label: "yiminghe" },
                      ]}
                    />
                    {formikforMember.touched.Position && (
                      <p className="text-red">
                        {formikforMember.errors.Position}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-end justify-end gap-5">
                  <button className="handlebuttonedit w-18 max-w-17 bg-primary ">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex  items-end justify-end gap-3 p-4">
            <button className="handlebuttonedit w-31 max-w-26 bg-primary ">
              Save Setting
            </button>
          </div>
        </>
      ),
    },
    {
      key: "8",
      label: "Member",
      children: (
        <>
          {/* test */}
          <div className=" rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
            <div className="border-b p-6.5">
              <div className="mb-4.5  flex w-full  sm:flex-col">
                <div className="w-full  border-b ">
                  <form action="" onSubmit={formikforMember.handleSubmit}>
                    <Table dataSource={data}>
                      <Column
                        title="Phone"
                        dataIndex="phone"
                        key="phone"
                      ></Column>
                      <Column title="Name" dataIndex="name" key="name" />
                      <Column title="Role" dataIndex="role" key="role" />
                      <Column title="Email" dataIndex="email" key="email" />

                      <Column
                        title="Action"
                        key="action"
                        render={(_: any, record: DataType) => (
                          <Space size="middle">
                            <Link href="/forms/saleman/edit">Edit </Link>
                            <a onClick={() => handleDeleteinMember(record.key)}>
                              Delete
                            </a>
                          </Space>
                        )}
                      />
                    </Table>
                  </form>
                </div>
                <OrganizationalChart data={sampleData} />
              </div>
              <div className="flex  items-end justify-end gap-3 ">
                <button className="handlebuttonedit w-31 max-w-26 bg-primary ">
                  Save Setting
                </button>
              </div>
            </div>
            <div className="border-b p-6.5">
              <div className="mb-4.5  flex w-full  sm:flex-col">
                <div className="w-full  border-b ">
                  <CommissionTable data={commissiontablelevel} />;
                </div>
              </div>
              <div className="flex  items-end justify-end gap-3 ">
                <button className="handlebuttonedit w-31 max-w-26 bg-primary ">
                  Save Setting
                </button>
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
        defaultActiveKey={[""]}
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
