"use client";

import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, Tag, DatePicker, Popconfirm } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useRouter } from "next/navigation";
const { RangePicker } = DatePicker;

interface DataType {
  key: string;
  Name: string;
  Email: string;
  Product: string;
  SignupTime: number;
  Message: string;
  CampaignSource: string;
  CampaignMedium: string;
  CampaignName: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    Name: "John Doe",
    Email: "john@example.com",
    Product: "Product A",
    SignupTime: 1633024800,
    Message: "Interested in Product A",
    CampaignSource: "Google",
    CampaignMedium: "CPC",
    CampaignName: "Campaign 1",
  },
  {
    key: "2",
    Name: "Jane Smith",
    Email: "jane@example.com",
    Product: "Product B",
    SignupTime: 1633111200,
    Message: "Interested in Product B",
    CampaignSource: "Facebook",
    CampaignMedium: "Organic",
    CampaignName: "Campaign 2",
  },
];

const TableThree = () => {
  const [dataSource, setDataSource] = useState(data);
  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex,
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
    dataIndex: DataIndex,
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
      title: "Order Id",
      dataIndex: "key",
      key: "key",
      width: "10%",
      ...getColumnSearchProps("key"),
      render: (text) => (
        <a className="text-blue-600" href={`/forms/crosssell/${text}`}>
          {text}
        </a>
      ),
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      width: "15%",
      ...getColumnSearchProps("Name"),
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      width: "15%",
      ...getColumnSearchProps("Email"),
    },
    {
      title: "Product",
      dataIndex: "Product",
      key: "Product",
      width: "15%",
      ...getColumnSearchProps("Product"),
      render: (text) => (
        <a className="text-blue-600" href="https://www.google.com">
          {text}
        </a>
      ),
    },
    {
      title: "Signup Time",
      dataIndex: "SignupTime",
      key: "SignupTime",
      width: "10%",
      ...getColumnSearchProps("SignupTime"),
    },
    {
      title: "Message",
      dataIndex: "Message",
      key: "Message",
      width: "15%",
      ...getColumnSearchProps("Message"),
    },
    {
      title: "Campaign Source",
      dataIndex: "CampaignSource",
      key: "CampaignSource",
      width: "10%",
      ...getColumnSearchProps("CampaignSource"),
    },
    {
      title: "Campaign Medium",
      dataIndex: "CampaignMedium",
      key: "CampaignMedium",
      width: "10%",
      ...getColumnSearchProps("CampaignMedium"),
    },
    {
      title: "Campaign Name",
      dataIndex: "CampaignName",
      key: "CampaignName",
      width: "10%",
      ...getColumnSearchProps("CampaignName"),
    },
  ];

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex-col-reverse items-start justify-end gap-3 p-3">
        <div className="mb-4.5 flex flex-wrap items-center gap-4">
          {/* date voucher */}
          <div className=" w-full">
            <label
              className="mb-3 block text-sm font-medium capitalize text-black dark:text-white"
              htmlFor="DateVoucher"
            >
              Date Voucher
            </label>
            <div className="flex items-center gap-3 ">
              <RangePicker className="h-12" id="DateVoucher" />
              <Button type="primary" shape="circle" icon={<SearchOutlined />} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button
            type="primary"
            className="bg-primary"
            onClick={() => router.push("/forms/crosssell/add")}
          >
            Thêm Sản Phẩm
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => window.location.reload()}
          >
            Reset
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default TableThree;
