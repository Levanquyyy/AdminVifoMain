"use client";

import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import {
  Button,
  Dropdown,
  Input,
  Select,
  Space,
  Table,
  Tag,
  DatePicker,
} from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useRouter } from "next/navigation";
const { RangePicker } = DatePicker;

interface DataType {
  key: string;
  Campaign: string;
  E_voucherCode: string;
  E_voucherEncryptedCode: string;
  ProductCode: string;
  Amount: number;
  percent: number;
  Max_Min: string;
  Provider: string;
  Status: string;
  UpdatedTime: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    Campaign: "Campaign 1",
    E_voucherCode: "EV123",
    E_voucherEncryptedCode: "ENC123",
    ProductCode: "P123",
    Amount: 100,
    percent: 10,
    Max_Min: "Max",
    Provider: "Provider 1",
    Status: "Active",
    UpdatedTime: "2023-10-01",
  },
];

const TableThree = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
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
      title: "No",
      dataIndex: "key",
      key: "key",
      width: "10%",
      ...getColumnSearchProps("key"),
    },
    {
      title: "Campaign",
      dataIndex: "Campaign",
      key: "Campaign",
      width: "10%",
      ...getColumnSearchProps("Campaign"),
    },
    {
      title: "E-voucher Code",
      dataIndex: "E_voucherCode",
      key: "E_voucherCode",
      width: "10%",
      ...getColumnSearchProps("E_voucherCode"),
    },
    {
      title: "E-voucher Encrypted Code",
      dataIndex: "E_voucherEncryptedCode",
      key: "E_voucherEncryptedCode",
      width: "10%",
      ...getColumnSearchProps("E_voucherEncryptedCode"),
    },
    {
      title: "Product Code",
      dataIndex: "ProductCode",
      key: "ProductCode",
      width: "10%",
      ...getColumnSearchProps("ProductCode"),
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      width: "10%",
      ...getColumnSearchProps("Amount"),
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
      width: "10%",
      ...getColumnSearchProps("percent"),
    },
    {
      title: "Max/Min",
      dataIndex: "Max_Min",
      key: "Max_Min",
      width: "10%",
      ...getColumnSearchProps("Max_Min"),
    },
    {
      title: "Provider",
      dataIndex: "Provider",
      key: "Provider",
      width: "10%",
      ...getColumnSearchProps("Provider"),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: "10%",
      ...getColumnSearchProps("Status"),
      render: (status: string) => {
        let color = status.length > 5 ? "green" : "red";
        if (status === "Inactive") {
          color = "volcano";
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Updated Time",
      dataIndex: "UpdatedTime",
      key: "UpdatedTime",
      width: "10%",
      ...getColumnSearchProps("UpdatedTime"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-3.5">
          <Button
            type="primary"
            className="bg-primary"
            onClick={() => router.push("/forms/evoucher/edit")}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex-col-reverse items-start justify-end gap-3 p-3">
        <div className="mb-4.5 flex flex-wrap items-center gap-4">
          <div className="w-full">
            <label
              className="mb-3 block text-sm font-medium capitalize text-black dark:text-white"
              htmlFor="campaign"
            >
              Campaign
            </label>
            <input
              id="campaign"
              required
              type="text"
              placeholder="English"
              className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="w-full">
            <label
              className="mb-3 block text-sm font-medium capitalize text-black dark:text-white"
              htmlFor="Distributor"
            >
              Distributor
            </label>
            <Select
              id="Distributor"
              defaultValue="lucy"
              className="h-12 w-full rounded-lg"
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
          </div>
          <div className="w-full">
            <label
              className="mb-3 block text-sm font-medium capitalize text-black dark:text-white"
              htmlFor="E-Voucher_Code"
            >
              E-Voucher_Code
            </label>
            <input
              id="E-Voucher_Code"
              required
              type="text"
              placeholder="English"
              className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="w-full">
            <label
              className="mb-3 block text-sm font-medium capitalize text-black dark:text-white"
              htmlFor="DateVoucher"
            >
              Date Voucher
            </label>
            <RangePicker className="h-12" id="DateVoucher" />
          </div>
          <div className="w-full">
            <label
              className="mb-3 block text-sm font-medium capitalize text-black dark:text-white"
              htmlFor="Provider"
            >
              Provider
            </label>
            <Select
              id="Provider"
              defaultValue="lucy"
              className="h-12 w-full rounded-lg"
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
          </div>
          <div className="w-full">
            <label
              className="mb-3 block text-sm font-medium capitalize text-black dark:text-white"
              htmlFor="Order_number"
            >
              Order_number
            </label>
            <input
              id="Order_number"
              required
              type="text"
              placeholder="English"
              className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="w-full">
            <label
              className="mb-3 block text-sm font-medium capitalize text-black dark:text-white"
              htmlFor="Status"
            >
              Status
            </label>
            <Select
              id="Status"
              defaultValue="lucy"
              className="h-12 w-full rounded-lg"
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
          </div>
          <div className="flex w-full flex-col gap-3">
            <label
              className="mb-3 block text-sm font-medium capitalize text-black dark:text-white"
              htmlFor="Action"
            >
              Action
            </label>
            <Select
              id="Action"
              defaultValue="lucy"
              className="h-12 w-full rounded-lg"
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
              onChange={handleSelectChange}
            />
            <Button type="primary" disabled={!selectedValue} className="w-1/12">
              Update
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button
            type="primary"
            className="bg-primary"
            onClick={() => router.push("/forms/evoucher/add")}
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
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default TableThree;
