"use client";
import {
  CaretRightOutlined,
  DeleteOutlined,
  StarOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { CollapseProps, FormInstance, UploadProps } from "antd";
import {
  Collapse,
  Select,
  Input,
  Button,
  Popconfirm,
  Checkbox,
  Upload,
  InputRef,
  Table,
  Form,
  InputNumber,
} from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useFormik } from "formik";
import * as Yup from "yup";

import React, { useContext, useEffect, useRef, useState } from "react";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  id: string;
  label: string;
  sampleFile: string;
  isMandatory: boolean;
  position: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
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
        {dataIndex === "isMandatory" ? (
          <Checkbox
            checked={form.getFieldValue(dataIndex)}
            onChange={(e) => {
              form.setFieldValue(dataIndex, e.target.checked);
              save();
            }}
          />
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
        {dataIndex === "isMandatory" ? (
          <Checkbox
            checked={record[dataIndex]}
            onChange={(e) => {
              const newData = { ...record, isMandatory: e.target.checked };
              handleSave(newData);
            }}
          />
        ) : (
          children
        )}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  id: string;
  label: string;
  sampleFile: string;
  isMandatory: boolean;
  position: string;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;
const validationSchema = Yup.object({
  Productfamily: Yup.string().required("Required"),
  Provider: Yup.string().required("Required"),
});

// sample

const uploadProps: UploadProps = {
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file, fileList);
    }
  },
  defaultFileList: [],
  showUploadList: {
    extra: ({ size = 0 }) => (
      <span style={{ color: "#cccccc" }}>
        ({(size / 1024 / 1024).toFixed(2)}MB)
      </span>
    ),
    showDownloadIcon: true,
    downloadIcon: "Download",
    showRemoveIcon: true,
    removeIcon: (
      <DeleteOutlined
        onClick={(e) => console.log(e, "custom removeIcon event")}
      />
    ),
  },
};

const FormLayout = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%",
      editable: true,
    },
    {
      title: "Label",
      dataIndex: "label",
      width: "20%",
      editable: true,
    },
    {
      title: "Sample File",
      dataIndex: "sampleFile",
      width: "20%",

      render: (_, record) => {
        return (
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture"
          >
            <Button type="primary" icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
        );
      },
    },
    {
      title: "Is Mandatory",
      dataIndex: "isMandatory",
      width: "15%",

      render: (_, record) => (
        <Checkbox
          checked={record.isMandatory}
          onChange={(e) => {
            const newData = [...dataSource];
            const index = newData.findIndex((item) => record.key === item.key);
            newData[index].isMandatory = e.target.checked;
            setDataSource(newData);
          }}
        />
      ),
    },
    {
      title: "Position",
      dataIndex: "position",
      width: "15%",

      render: () => {
        return <InputNumber min={1} max={10} defaultValue={3} />;
      },
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count.toString(),
      id: count.toString(),
      label: `Label ${count}`,
      sampleFile: `File ${count}`,
      isMandatory: false,
      position: count.toString(),
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const formik = useFormik({
    initialValues: {
      Productfamily: "",
      Provider: "",
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
      label: "Add Claim Documents",
      children: (
        <>
          <form onSubmit={formik.handleSubmit} id="insuranceForm">
            <div className="gap-9 sm:grid-cols-4">
              <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                  <div className="p-6.5">
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
                        <div className="w-full">
                          <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Provider <strong className="text-red">*</strong>
                          </label>
                          <Select
                            className="h-12 w-full rounded bg-transparent text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            options={[
                              { value: "provider1", label: "Provider 1" },
                              {
                                value: "provider2",
                                label: "Provider 2",
                              },
                              { value: "provider3", label: "Provider 3" },
                            ]}
                            name="Provider"
                            onChange={(value) =>
                              formik.setFieldValue("Provider", value)
                            }
                            onBlur={formik.handleBlur}
                            value={formik.values.Provider}
                          />
                          {formik.touched.Provider && formik.errors.Provider ? (
                            <div className="text-red">
                              {formik.errors.Provider}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      <div className="flex flex-col gap-6 p-3 px-3 xl:flex-row">
                        <div className="w-full">
                          <Button
                            onClick={handleAdd}
                            type="primary"
                            style={{ marginBottom: 16 }}
                          >
                            Add Question
                          </Button>
                          <Table
                            components={components}
                            rowClassName={() => "editable-row"}
                            bordered
                            dataSource={dataSource}
                            columns={columns as ColumnTypes}
                          />
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
