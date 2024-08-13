"use client";
import type { CollapseProps, InputRef, TableColumnsType } from "antd";
import {
  Collapse,
  Select,
  Badge,
  Card,
  Button,
  Table,
  Input,
  Space,
} from "antd";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};
interface DataType {
  key: string;
  Phone: string;
  Username: string;
  Distributor: string;
  Duplicated: boolean;
}
// exmaple data
const data: DataType[] = [
  {
    key: "1",
    Phone: "0345671348",
    Username: "wuys",
    Distributor: "New York No. 1 Lake Park",
    Duplicated: false,
  },
  {
    key: "2",
    Phone: "0909090909",
    Username: "nam",
    Distributor: "New York No. 1 Lake Park",
    Duplicated: false,
  },
];
type DataIndex = keyof DataType;
const page = () => {
  const [validateUser, setValidateUser] = useState(false);
  const checkValidateUser = () => {
    setValidateUser(!validateUser);
  };
  // table columns
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
    onFilter: (value, record) => {
      if (typeof record[dataIndex] === "boolean") {
        return record[dataIndex] === (value === "true");
      }
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
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
      ) : text !== undefined && text !== null ? (
        text.toString()
      ) : (
        ""
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      width: "30%",
      ...getColumnSearchProps("Phone"),
    },
    {
      title: "Username",
      dataIndex: "Username",
      key: "Username",
      width: "20%",
      ...getColumnSearchProps("Username"),
    },
    {
      title: "Distributor",
      dataIndex: "Distributor",
      key: "Distributor",
      ...getColumnSearchProps("Distributor"),
      sorter: (a, b) => a.Distributor.length - b.Distributor.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Duplicated",
      dataIndex: "Duplicated",
      key: "Duplicated",
      width: "20%",
      ...getColumnSearchProps("Duplicated"),
      render: (text) => text.toString(),
    },
  ];
  // filter member
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  // user selected
  const [userselected, setUserselected] = useState([
    {
      value: "1",
      label: "Not Identified",
    },
  ]);
  const [selectedOption, setSelectedOption] = useState(null);
  const adddistributorgr = () => {
    if (selectedOption) {
      setUserselected([...userselected, selectedOption]);
    }
  };
  const deletedistributorgr = (index) => {
    setUserselected(userselected.filter((_, i) => i !== index));
  };
  const [optionsfordistributor, setOptionsfordistributor] = useState([
    {
      value: "1",
      label: "Not Identified",
    },
    {
      value: "2",
      label: "Closed",
    },
    {
      value: "3",
      label: "Communicated",
    },
    {
      value: "4",
      label: "Identified",
    },
    {
      value: "5",
      label: "Resolved",
    },
    {
      value: "6",
      label: "Cancelled",
    },
  ]);

  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: "Add Group Distributor",
      children: (
        <>
          <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
            <div className=" flex flex-col gap-6 ">
              <div className="w-full ">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Group Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder="Company Name"
                  defaultValue={"HDI"}
                />
              </div>
              <div className="w-full ">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Group Code *
                </label>
                <input
                  required
                  type="text"
                  placeholder="VietNam"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  defaultValue={"HDI"}
                  disabled
                />
              </div>
              <div className="w-full ">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  search name if you want find Distributor
                </label>
                {/* test */}
                <div className="flex flex-col gap-3">
                  <Select
                    showSearch
                    className="h-14 w-full"
                    placeholder="Search to Select"
                    optionFilterProp="label"
                    onChange={(value) => {
                      const selectedOption = optionsfordistributor.find(
                        (option) => option.value === value,
                      );
                      setSelectedOption(selectedOption);
                    }}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={optionsfordistributor}
                  />

                  <button
                    type="button"
                    onClick={adddistributorgr}
                    className="edit handlebuttonedit w-16 max-w-18"
                  >
                    Add
                  </button>
                  {userselected.map((item, index) => (
                    <div className="flex flex-col">
                      <div className="mb-4.5 flex w-full">
                        <Badge.Ribbon text="VIFO" color="volcano">
                          <Card title="Current Distributor" size="small">
                            {item.label}
                          </Card>
                        </Badge.Ribbon>
                        <Button
                          type="primary"
                          danger
                          onClick={() => deletedistributorgr(index)}
                        >
                          X
                        </Button>
                      </div>
                      <Button
                        type="primary"
                        className="w-fit "
                        onClick={checkValidateUser}
                      >
                        Validate User
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 "
              >
                Thêm Bảo Hiểm
              </button>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Member",
      children: (
        <>{validateUser && <Table columns={columns} dataSource={data} />}</>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <Collapse
        bordered={false}
        defaultActiveKey={["1", "2"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        items={getItems()}
      />
    </DefaultLayout>
  );
};

export default page;
