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
  Domain: string;
  CustomerName: string;
  FinalPrice: string;
  ProductName: string;
  CustomerNIC: number;
  Comment: number;
  Status: string;
  Username: string;
  Shipping: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "VF240816029034125",
    Domain: "example.com",
    CustomerName: "John Doe",
    FinalPrice: "100",
    ProductName: "Product 1",
    CustomerNIC: 123456789,
    Comment: 5,
    Status: "Pending",
    Username: "johndoe",
    Shipping: "Standard",
  },
  {
    key: "VF240816029034123",
    Domain: "example.org",
    CustomerName: "Jane Smith",
    FinalPrice: "200",
    ProductName: "Product 2",
    CustomerNIC: 987654321,
    Comment: 10,
    Status: "Shipped",
    Username: "janesmith",
    Shipping: "Express",
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
      title: "ID",
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
      title: "Domain",
      dataIndex: "Domain",
      key: "Domain",
      width: "10%",
      ...getColumnSearchProps("Domain"),
    },
    {
      title: "Customer Name",
      dataIndex: "CustomerName",
      key: "CustomerName",
      width: "10%",
      ...getColumnSearchProps("CustomerName"),
    },
    {
      title: "Final Price",
      dataIndex: "FinalPrice",
      key: "FinalPrice",
      width: "10%",
      ...getColumnSearchProps("FinalPrice"),
    },
    {
      title: "Product Name",
      dataIndex: "ProductName",
      key: "ProductName",
      width: "10%",
      ...getColumnSearchProps("ProductName"),
    },
    {
      title: "Customer NIC",
      dataIndex: "CustomerNIC",
      key: "CustomerNIC",
      width: "10%",
      ...getColumnSearchProps("CustomerNIC"),
    },
    {
      title: "Comment",
      dataIndex: "Comment",
      key: "Comment",
      width: "10%",
      ...getColumnSearchProps("Comment"),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: "10%",
      ...getColumnSearchProps("Status"),
      render: (status) => {
        let color = status === "Shipped" ? "green" : "volcano";
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Username",
      dataIndex: "Username",
      key: "Username",
      width: "10%",
      ...getColumnSearchProps("Username"),
    },
    {
      title: "Shipping",
      dataIndex: "Shipping",
      key: "Shipping",
      width: "10%",
      ...getColumnSearchProps("Shipping"),
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
