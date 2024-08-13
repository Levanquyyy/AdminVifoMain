"use client";

import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type {
  InputRef,
  MenuProps,
  TableColumnsType,
  TableColumnType,
} from "antd";
import { Button, Dropdown, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useRouter } from "next/navigation";

interface DataType {
  key: string;
  Username: string;
  Name: string;
  Role: string;
  Email: string;
  Status: string;
  eKYC: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "o6grd4e6n6n58kye",
    Username: "0917875455",
    Name: "Thanh test",
    Role: "User Role",
    Email: "thanhmegaman@gmail.com",
    Status: "Active",
    eKYC: "Verified",
  },
  {
    key: "a1b2c3d4e5f6g7h8",
    Username: "0987654321",
    Name: "John Doe",
    Role: "Admin",
    Email: "johndoe@example.com",
    Status: "Inactive",
    eKYC: "Pending",
  },
  {
    key: "i9j8k7l6m5n4o3p2",
    Username: "0123456789",
    Name: "Jane Smith",
    Role: "User",
    Email: "janesmith@example.com",
    Status: "Active",
    eKYC: "Verified",
  },
  {
    key: "q1r2s3t4u5v6w7x8",
    Username: "1234567890",
    Name: "Alice Johnson",
    Role: "Moderator",
    Email: "alicejohnson@example.com",
    Status: "Active",
    eKYC: "Verified",
  },
  {
    key: "y9z8a7b6c5d4e3f2",
    Username: "2345678901",
    Name: "Bob Brown",
    Role: "User",
    Email: "bobbrown@example.com",
    Status: "Inactive",
    eKYC: "Pending",
  },
  {
    key: "g1h2i3j4k5l6m7n8",
    Username: "3456789012",
    Name: "Charlie Davis",
    Role: "Admin",
    Email: "charliedavis@example.com",
    Status: "Active",
    eKYC: "Verified",
  },
  {
    key: "q1r2s3t4u5v6w7x8",
    Username: "1234567890",
    Name: "Alice Johnson",
    Role: "Moderator",
    Email: "alicejohnson@example.com",
    Status: "Active",
    eKYC: "Verified",
  },
  {
    key: "y9z8a7b6c5d4e3f2",
    Username: "2345678901",
    Name: "Bob Brown",
    Role: "User",
    Email: "bobbrown@example.com",
    Status: "Inactive",
    eKYC: "Pending",
  },
  {
    key: "g1h2i3j4k5l6m7n8",
    Username: "3456789012",
    Name: "Charlie Davis",
    Role: "Admin",
    Email: "charliedavis@example.com",
    Status: "Active",
    eKYC: "Verified",
  },
  {
    key: "n9m8l7k6j5h4g3f2",
    Username: "4567890123",
    Name: "Diana Prince",
    Role: "User",
    Email: "dianaprince@example.com",
    Status: "Inactive",
    eKYC: "Pending",
  },
  {
    key: "e1d2c3b4a5f6g7h8",
    Username: "5678901234",
    Name: "Eve Adams",
    Role: "Moderator",
    Email: "eveadams@example.com",
    Status: "Active",
    eKYC: "Verified",
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
        router.push("/forms/user/edit");
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
      width: "30%",
      ...getColumnSearchProps("key"),
    },
    {
      title: "Username",
      dataIndex: "Username",
      key: "Username",
      width: "20%",
      ...getColumnSearchProps("Username"),
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
      title: "Role",
      dataIndex: "Role",
      key: "Role",
      width: "20%",
      ...getColumnSearchProps("Role"),
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      width: "20%",
      ...getColumnSearchProps("Email"),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: "20%",
      ...getColumnSearchProps("Status"),
    },
    {
      title: "eKYC	",
      dataIndex: "eKYC	",
      key: "eKYC	",
      width: "20%",
      ...getColumnSearchProps("eKYC"),
    },
    {
      title: "Action	",
      dataIndex: "eKYC	",
      key: "eKYC	",
      width: "20%",
      render: () => (
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
    <div className="  rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex items-end justify-end gap-3 p-3">
        <Button
          type="primary"
          className="  bg-primary "
          onClick={() => router.push("/forms/user/add")}
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
