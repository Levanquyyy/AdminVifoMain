"use client";
import React, { useRef, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {
  CaretRightOutlined,
  InboxOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type {
  CollapseProps,
  InputRef,
  TableColumnsType,
  TableColumnType,
} from "antd";
import { Button, Collapse, Input, Select, Space, Table } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import TextArea from "antd/es/input/TextArea";
import { message, Upload } from "antd";
interface DataType {
  key: string;
  Type: string;
  Content: string;
  Detail: string;
  CreateAt: string;
}
const data: DataType[] = [
  {
    key: "1",
    Type: "Type A",
    Content: "Content A",
    Detail: "Detail A",
    CreateAt: "2023-09-05 09:49:15",
  },
  {
    key: "2",
    Type: "Type B",
    Content: "Content B",
    Detail: "Detail B",
    CreateAt: "2023-09-06 10:50:20",
  },
  {
    key: "3",
    Type: "Type C",
    Content: "Content C",
    Detail: "Detail C",
    CreateAt: "2023-09-07 11:51:25",
  },
];
const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const FormLayout = () => {
  const { Dragger } = Upload;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: string,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: string,
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Message Id",
      dataIndex: "key",
      key: "key",
      width: "20%",
      className: "text-start",
      ...getColumnSearchProps("key"),
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
      width: "20%",
      className: "text-start",
      ...getColumnSearchProps("Type"),
    },
    {
      title: "Content",
      dataIndex: "Content",
      key: "Content",
      width: "20%",
      className: "text-start",
      ...getColumnSearchProps("Content"),
    },
    {
      title: "Detail",
      dataIndex: "Detail",
      key: "Detail",
      width: "20%",
      ...getColumnSearchProps("Detail"),
    },
    {
      title: "Create At",
      dataIndex: "CreateAt",
      key: "CreateAt",
      width: "20%",
      ...getColumnSearchProps("CreateAt"),
    },
  ];
  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: "Detail Claim",
      children: (
        <>
          <Breadcrumb pageName="Detail Claim" />
          <form>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <div className="w-full">
                  <div className="flex flex-col gap-5.5 p-3">
                    <label className="block text-sm font-medium capitalize text-black dark:text-white">
                      Id
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="English"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={"qmv7dk48ax3b690w"}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex flex-col gap-5.5 p-3">
                    <label className="block text-sm font-medium capitalize text-black dark:text-white">
                      Claim Number
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="English"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={""}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex flex-col gap-5.5 p-3">
                    <label className="block text-sm font-medium capitalize text-black dark:text-white">
                      Status
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="English"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={"Doc Required"}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex flex-col gap-5.5 p-3">
                    <label className="block text-sm font-medium capitalize text-black dark:text-white">
                      Order
                    </label>
                    <a
                      href={`/forms/crosssell/VF220905026018801`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      VF220905026018801
                    </a>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex flex-col gap-5.5 p-3">
                    <label className="block text-sm font-medium capitalize text-black dark:text-white">
                      Product
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="English"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={"Bảo hiểm TNDS xe máy - TNDSBHV08220101"}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex flex-col gap-5.5 p-3">
                    <label className="block text-sm font-medium capitalize text-black dark:text-white">
                      Message
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="English"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={"Bồi thường TNDS xe máy"}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full  border-b">
                  <div className="flex flex-col gap-5.5 p-3">
                    <label className="block text-sm font-medium capitalize text-black dark:text-white">
                      File
                    </label>
                    <a
                      href="https://i.pinimg.com/564x/72/83/88/72838802b8ba70e66cc61786b964e80b.jpg"
                      download="image.jpg"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      Download Image
                    </a>
                    <strong>By: BHV UAT Test - At: 2023-09-05 09:49:15</strong>
                  </div>
                </div>
                <div className="w-full border-b">
                  <div className="flex flex-col gap-5.5 p-3">
                    <label className="block text-3xl font-medium capitalize text-black dark:text-white">
                      History of Claim
                    </label>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                      <li>
                        <strong>Doc Required</strong> - By: BHV UAT Test - At:
                        2023-09-05 09:49:15
                      </li>
                      <li>
                        <strong>Doc Required</strong> - By: BHV UAT Test - At:
                        2023-09-05 09:49:15
                      </li>
                      <li>
                        <strong>Doc Required</strong> - By: BHV UAT Test - At:
                        2023-09-05 09:49:15
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full  border-b">
                  <div className="flex flex-col gap-5.5 p-3">
                    <label className="block text-3xl font-medium capitalize text-black dark:text-white">
                      Chat logs
                    </label>
                    <Table columns={columns} dataSource={data} />
                  </div>
                </div>
                <div className="w-full  ">
                  <div className="flex flex-col ">
                    <label className="block p-3 text-3xl font-medium capitalize text-black dark:text-white">
                      Update Claim Status
                    </label>
                    <div className="flex flex-col gap-3 p-3">
                      <label className="block text-sm font-medium capitalize text-black dark:text-white">
                        Status
                      </label>
                      <Select
                        defaultValue="lucy"
                        className="w-full"
                        options={[
                          { value: "jack", label: "Jack" },
                          { value: "lucy", label: "Lucy" },
                          { value: "Yiminghe", label: "yiminghe" },
                        ]}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full ">
                  <div className="flex flex-col ">
                    <div className="flex flex-col gap-3 p-3">
                      <label className="block text-sm font-medium capitalize text-black dark:text-white">
                        Note:
                      </label>
                      <TextArea rows={4} />
                    </div>
                  </div>
                </div>
                <div className="w-full ">
                  <div className="flex flex-col ">
                    <div className="flex flex-col gap-3 p-3">
                      <label className="block text-sm font-medium capitalize text-black dark:text-white">
                        Select File
                      </label>
                      <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                          Support for a single or bulk upload. Strictly
                          prohibited from uploading company data or other banned
                          files.
                        </p>
                      </Dragger>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button type="primary" className="w-full">
              {" "}
              Update
            </Button>
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
