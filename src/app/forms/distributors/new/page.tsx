"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type {
  CollapseProps,
  FormInstance,
  GetProp,
  GetRef,
  InputRef,
  InputRefs,
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
} from "antd";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import { UploadOutlined, CaretRightOutlined } from "@ant-design/icons";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EditableRowProps } from "@/types/edittable";
import { ColumnsType } from "antd/es/table";
import { DataType } from "@/types/data";

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

const validationSchemaOrganization = Yup.object({
  OrganizationCode: Yup.string().required("This field is required"),
  OrganizationLogo: Yup.string().required("This field is required"),
  OrganizationName: Yup.string().required("This field is required"),
  Phone1: Yup.string().required("This field is required"),
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

const FormLayout = () => {
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

  // check handle event checkbox

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked1(event.target.checked);
    console.log("checked = ", event.target.checked);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked2(event.target.checked);
    console.log("checked = ", event.target.checked);
  };
  // check handle Customer Notification
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const handlechangeCustomerNotification = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsChecked3(event.target.checked);
    console.log("checked = ", event.target.checked);
  };
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
              <div className="flex flex-col ">
                {/* product category */}
                <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                  <div className="flex flex-col gap-6 p-3 xl:flex-row">
                    <div className=" w-full">
                      {/* <!-- Chọn Category --> */}
                      <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col gap-5.5 p-3">
                          <SelectGroupTwo
                            id="Provider
"
                            name="provider
"
                            nhacungcap="Product Family"
                            value=""
                            onChange={(e) => {}}
                            onBlur={(e) => {}}
                          >
                            <option value="xemay">Bảo Hiểm Xe Hơi</option>
                            <option value="xehoi">Bảo Hiểm Xe Máy</option>
                            <option value="suckhoe">Bảo Hiểm Sức Khỏe</option>
                          </SelectGroupTwo>
                        </div>

                        <br />
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                  <div className="flex flex-col gap-6 p-3 xl:flex-row">
                    <div className="w-full">
                      <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col gap-5.5 p-3">
                          <SelectGroupTwo
                            id="Product Family"
                            name="ProductFamily"
                            nhacungcap="Product Family"
                            value=""
                            onChange={(e) => {}}
                            onBlur={(e) => {}}
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
                        name="OrganizationCode"
                        placeholder="English"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={formikforOrganization.values.OrganizationCode}
                        onChange={formikforOrganization.handleChange}
                        onBlur={formikforOrganization.handleBlur}
                      />
                      {formikforOrganization.touched.OrganizationCode &&
                        formikforOrganization.errors.OrganizationCode && (
                          <div>
                            {" "}
                            <p className="text-red">
                              {formikforOrganization.errors.OrganizationCode}
                            </p>
                          </div>
                        )}
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
                        name="Phone1"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={formikforOrganization.values.Phone1}
                        onChange={formikforOrganization.handleChange}
                        onBlur={formikforOrganization.handleBlur}
                      />
                      {formikforOrganization.touched.Phone1 &&
                        formikforOrganization.errors.Phone1 && (
                          <div>
                            {" "}
                            <p className="text-red">
                              {formikforOrganization.errors.Phone1}
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
                        <Checkbox
                          onChange={(e: any) => handleChange2(e)}
                          className=" text-black dark:bg-boxdark dark:text-white"
                          checked={isChecked2}
                        >
                          Is Enable Webhook
                        </Checkbox>
                        {isChecked2 && (
                          <div className="w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                            <div className="w-full ">
                              <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                                Webhook Endpoint
                              </label>
                              <input
                                required
                                type="text"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
              <div className="mb-4.5  w-full  rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                <div className="flex w-full flex-col">
                  <Checkbox
                    onChange={onChange}
                    className=" text-black dark:bg-boxdark dark:text-white"
                    // checked={isChecked}
                  >
                    Disable Send Email
                  </Checkbox>
                  <Checkbox
                    onChange={onChange}
                    className=" text-black dark:bg-boxdark dark:text-white"
                    // checked={isChecked}
                  >
                    Allow Send SMS
                  </Checkbox>
                  <Checkbox
                    onChange={handlechangeCustomerNotification}
                    className=" text-black dark:bg-boxdark dark:text-white"
                    // checked={isChecked}
                  >
                    Is From Provider Brand{" "}
                  </Checkbox>
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
                        {/* <Button
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
                          columns={columns as ColumnTypes}
                        /> */}
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
        <div className="flex items-end justify-end gap-3 p-4">
          <button className="handlebuttonedit w-18 max-w-17 bg-primary ">
            Submit
          </button>
        </div>
      ),
    },
    {
      key: "4 ",
      label: "Settings",
      children: (
        <div className="flex  items-end justify-end gap-3 p-4">
          <button className="handlebuttonedit w-31 max-w-26 bg-primary ">
            Save Setting
          </button>
        </div>
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
