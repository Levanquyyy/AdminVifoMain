"use client";

import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type {
  InputRef,
  MenuProps,
  TableColumnsType,
  TableColumnType,
} from "antd";
import { Button, Dropdown, Input, Space, Table, Tag } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useRouter } from "next/navigation";

interface DataType {
  key: string;
  Name: string;
  ProductFamily: string;
  RankCode: string;
  Status: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    Name: "Product A",
    ProductFamily: "Family 1",
    RankCode: "R1",
    Status: "COMPLETED",
  },
  {
    key: "2",
    Name: "Product B",
    ProductFamily: "Family 2",
    RankCode: "R2",
    Status: "PENDING",
  },
  {
    key: "3",
    Name: "Product C",
    ProductFamily: "Family 3",
    RankCode: "R3",
    Status: "COMPLETED",
  },
  {
    key: "4",
    Name: "Product D",
    ProductFamily: "Family 4",
    RankCode: "R4",
    Status: "PENDING",
  },
  {
    key: "5",
    Name: "A D",
    ProductFamily: "Family 4",
    RankCode: "R4",
    Status: "PENDING",
  },
];

const TableThree = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const items: MenuProps["items"] = [
    {
      label: "Edit",
      key: "0",
      onClick: () => {
        router.push("/forms/management/edit");
      },
    },
    {
      label: "Deactive",
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "Duplicate",
      key: "3",
    },
  ];

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
      width: "20%",
      ...getColumnSearchProps("key"),
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      ...getColumnSearchProps("Name"),
      sorter: (a, b) => a.Name.length - b.Name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Product Family",
      dataIndex: "ProductFamily",
      key: "ProductFamily",
      width: "20%",
      ...getColumnSearchProps("ProductFamily"),
    },
    {
      title: "Rank Code",
      dataIndex: "RankCode",
      key: "RankCode",
      width: "20%",
      ...getColumnSearchProps("RankCode"),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: "20%",
      ...getColumnSearchProps("Status"),
      render: (status: string) => {
        let color = status === "COMPLETED" ? "green" : "volcano";
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-3.5">
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            overlayClassName="w-32"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space
                style={{
                  padding: "8px 12px",
                  background: "rgba(201, 206,212, 1)",
                  borderRadius: "8px",
                  color: "black",
                }}
              >
                Action
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </Space>
            </a>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex items-end justify-end gap-3 p-3">
        <Button
          type="primary"
          className="bg-primary"
          onClick={() => router.push("/forms/management/add")}
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
