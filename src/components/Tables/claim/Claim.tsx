"use client";
import React, { useRef, useState } from "react";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";
import type {
  CollapseProps,
  InputRef,
  MenuProps,
  SelectProps,
  TableColumnsType,
  TableColumnType,
} from "antd";
import { Button, Collapse, Input, Table, Space, Tag, Dropdown } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useRouter } from "next/navigation";

interface DataType {
  key: string;
  ClaimNumber: string;
  Name: string;
  Email: string;
  Phone: number;
  Order: string;
  Product: string;
  SignupTime: string;
  Subject: string;
  Message: string;
  Status: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    ClaimNumber: "12345",
    Name: "John Doe",
    Email: "john@example.com",
    Phone: 1234567890,
    Order: "order-123",
    Product: "Product A",
    SignupTime: "2023-10-01",
    Subject: "Subject A",
    Message: "Message A",
    Status: "Pending",
  },
  {
    key: "2",
    ClaimNumber: "67890",
    Name: "Jane Smith",
    Email: "jane@example.com",
    Phone: 9876543210,
    Order: "order-456",
    Product: "Product B",
    SignupTime: "2023-10-02",
    Subject: "Subject B",
    Message: "Message B",
    Status: "Completed",
  },
  {
    key: "3",
    ClaimNumber: "11223",
    Name: "Alice Johnson",
    Email: "alice@example.com",
    Phone: 1231231234,
    Order: "order-789",
    Product: "Product C",
    SignupTime: "2023-10-03",
    Subject: "Subject C",
    Message: "Message C",
    Status: "In Progress",
  },
];

const FormLayout = () => {
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      label: "Edit",
      key: "0",

      onClick: () => {
        router.push("/forms/claim/edit");
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
  // table
  const [dataSource, setDataSource] = useState(data);
  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
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
      title: "Claim Number",
      dataIndex: "ClaimNumber",
      key: "ClaimNumber",
      width: "10%",
      ...getColumnSearchProps("ClaimNumber"),
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      width: "10%",
      ...getColumnSearchProps("Name"),
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      width: "10%",
      ...getColumnSearchProps("Email"),
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      width: "10%",
      ...getColumnSearchProps("Phone"),
    },
    {
      title: "Order",
      dataIndex: "Order",
      key: "Order",
      width: "10%",
      render: (text) => (
        <a
          href={`/forms/crosssell/${text}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ),
    },
    {
      title: "Product",
      dataIndex: "Product",
      key: "Product",
      width: "10%",
      ...getColumnSearchProps("Product"),
    },
    {
      title: "Signup Time",
      dataIndex: "SignupTime",
      key: "SignupTime",
      width: "10%",
      ...getColumnSearchProps("SignupTime"),
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      key: "Subject",
      width: "10%",
      ...getColumnSearchProps("Subject"),
    },
    {
      title: "Message",
      dataIndex: "Message",
      key: "Message",
      width: "10%",
      ...getColumnSearchProps("Message"),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: "10%",
      ...getColumnSearchProps("Status"),
      render: (status) => {
        let color = status === "Completed" ? "green" : "volcano";
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",

      width: "10%",
      ...getColumnSearchProps("Status"),
      render: () => {
        return (
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
        );
      },
    },
  ];

  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "2",
      label: "",
      children: (
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="flex justify-end gap-3 p-3">
              <Button type="primary">Import</Button>
              <Button type="primary">Export</Button>
            </div>
            <Table columns={columns} dataSource={dataSource} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <Collapse
        bordered={false}
        defaultActiveKey={["2"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        items={getItems()}
      />
    </DefaultLayout>
  );
};

export default FormLayout;
