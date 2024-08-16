"use client";

import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, DatePicker, Popconfirm } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useRouter } from "next/navigation";
const { RangePicker } = DatePicker;
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface DataType {
  key: string;

  OrderNumber: string;
  CustomerName: string;
  CustomerPhone: string;
  CCCD: string;
  CustomerBirthday: string;
  Address: string;
  ProductName: string;
  ProductPrice: string;
  Saleman: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",

    OrderNumber: "ORD12345",
    CustomerName: "Customer 1",

    CustomerPhone: "1234567890",
    CCCD: "CCCD12345",
    CustomerBirthday: "1990-01-01",
    Address: "Address 1",
    ProductName: "Product 1",
    ProductPrice: "100",
    Saleman: "Saleman 1",
  },
  {
    key: "2",

    OrderNumber: "ORD12346",
    CustomerName: "Customer 2",

    CustomerPhone: "0987654321",
    CCCD: "CCCD12346",
    CustomerBirthday: "1991-02-02",
    Address: "Address 2",
    ProductName: "Product 2",
    ProductPrice: "200",
    Saleman: "Saleman 2",
  },
  {
    key: "3",

    OrderNumber: "ORD12347",
    CustomerName: "Customer 3",

    CustomerPhone: "1122334455",
    CCCD: "CCCD12347",
    CustomerBirthday: "1992-03-03",
    Address: "Address 3",
    ProductName: "Product 3",
    ProductPrice: "300",
    Saleman: "Saleman 3",
  },
];

const TableThree = () => {
  const [dataSource, setDataSource] = useState(data);

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
      title: "Order Number",
      dataIndex: "OrderNumber",
      key: "OrderNumber",
      width: "10%",
      ...getColumnSearchProps("OrderNumber"),
      render: (text) => (
        <a
          className="text-blue-500"
          onClick={() => router.push(`/forms/crosssell/${text}`)}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Customer Name",
      dataIndex: "CustomerName",
      key: "CustomerName",
      width: "10%",
      ...getColumnSearchProps("CustomerName"),
    },

    {
      title: "Customer Phone",
      dataIndex: "CustomerPhone",
      key: "CustomerPhone",
      width: "10%",
      ...getColumnSearchProps("CustomerPhone"),
    },
    {
      title: "CCCD",
      dataIndex: "CCCD",
      key: "CCCD",
      width: "10%",
      ...getColumnSearchProps("CCCD"),
    },
    {
      title: "Customer Birthday",
      dataIndex: "CustomerBirthday",
      key: "CustomerBirthday",
      width: "10%",
      ...getColumnSearchProps("CustomerBirthday"),
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
      width: "10%",
      ...getColumnSearchProps("Address"),
    },
    {
      title: "Product Name",
      dataIndex: "ProductName",
      key: "ProductName",
      width: "10%",
      ...getColumnSearchProps("ProductName"),
    },
    {
      title: "Product Price",
      dataIndex: "ProductPrice",
      key: "ProductPrice",
      width: "10%",
      ...getColumnSearchProps("ProductPrice"),
    },
    {
      title: "Saleman",
      dataIndex: "Saleman",
      key: "Saleman",
      width: "10%",
      ...getColumnSearchProps("Saleman"),
    },
  ];

  return (
    <>
      <Breadcrumb pageName="Family Reports" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex items-center justify-between gap-3 p-3">
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
                <Button
                  type="primary"
                  shape="circle"
                  icon={<SearchOutlined />}
                />
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end gap-5">
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

            <div className=" flex flex-col items-end justify-end gap-3 text-xl">
              <strong>Total Order: 98 </strong>
              <strong>Total Amount: 959,883,660 đ </strong>
            </div>
          </div>
        </div>
        <Table columns={columns} dataSource={dataSource} />
      </div>
    </>
  );
};

export default TableThree;
