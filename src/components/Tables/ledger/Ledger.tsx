"use client";

import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Dropdown, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useRouter } from "next/navigation";

interface DataType {
  key: string;
  No: string;
  Provider: string;
  SerialNumber: string;
  Start: string;
  End: string;
  Current: string;
  Remaining: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    No: "1",
    Provider: "Provider A",
    SerialNumber: "SN12345",
    Start: "2023-01-01",
    End: "2023-12-31",
    Current: "5",
    Remaining: "5",
  },
  {
    key: "2",
    No: "2",
    Provider: "Provider B",
    SerialNumber: "SN12346",
    Start: "2023-01-01",
    End: "2023-12-31",
    Current: "10",
    Remaining: "10",
  },
  // Thêm các mục khác nếu cần
];

const TableThree = () => {
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
      dataIndex: "No",
      key: "No",
      width: "10%",
      ...getColumnSearchProps("No"),
    },
    {
      title: "Provider",
      dataIndex: "Provider",
      key: "Provider",
      width: "20%",
      ...getColumnSearchProps("Provider"),
    },
    {
      title: "Serial Number",
      dataIndex: "SerialNumber",
      key: "SerialNumber",
      width: "20%",
      ...getColumnSearchProps("SerialNumber"),
    },
    {
      title: "Start",
      dataIndex: "Start",
      key: "Start",
      width: "10%",
      ...getColumnSearchProps("Start"),
    },
    {
      title: "End",
      dataIndex: "End",
      key: "End",
      width: "10%",
      ...getColumnSearchProps("End"),
    },
    {
      title: "Current",
      dataIndex: "Current",
      key: "Current",
      width: "10%",
      ...getColumnSearchProps("Current"),
    },
    {
      title: "Remaining",
      dataIndex: "Remaining",
      key: "Remaining",
      width: "10%",
      ...getColumnSearchProps("Remaining"),
    },
  ];

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex items-end justify-end gap-3 p-3">
        <Button
          type="primary"
          className="bg-primary"
          onClick={() => router.push("/forms/claimrequirements/add")}
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
        <Button type="primary" danger onClick={() => window.location.reload()}>
          Reset
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default TableThree;
