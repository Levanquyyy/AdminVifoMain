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
  Family: string;
  Provider: string;
  Rank: string;
  Question: string;
  Answer: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "o6grd4e6n6n58kye",
    Family: "Covid Included Insurance",
    Provider: "PVI CÔNG TY BẢO HIỂM PVI",
    Rank: "VÀNG,BẠC,ĐỒNG",
    Question: "Code: PVICOVID2 Text:Khai báo của khách hàng. Tôi xin cam đoan",
    Answer:
      "Code: Text: Tôi không có nguy cơ lây nhiễm cao và đang được yêu cầu cách lý tập trung/tại nhà (hoặc diện F1, F2) do dịch bệnh.Value: 1Code: adda Text: Tôi không đang trong quá trình điệu trị bệnh thương tật và/hoặc được bác sĩ theo dõi sức khoẻ không Value: 2Code:Text: Tôi không mắc phải, hoặc được thông báo rằng mắc phải hoặc đang trong quá trình kiểm tra hoặc điều trị : tâm thần, ung thư, phong, thương tật vĩnh viễn trên 50%Value: 3Code:Text: Tôi không có dự định hay đang trong thời gian chuẩn bị để được làm các xét nghiệm, chẩn đoán y khoa cho các triệu chứng bệnh hay một căn bệnh chưa rõ ràngValue: 4",
  },
  {
    key: "o6grd4e6n6n58kyf",
    Family: "Covid Included Insurance",
    Provider: "Bảo Long",
    Rank: "",
    Question:
      "Code: 1 Text: 1. Người được bảo hiểm có đang theo dõi hoặc điều trị thương tật, bệnh tật hay không?",
    Answer: "Code: 01a Text: Có Value: 1 Code: 01b Text: Không Value: 1",
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
        router.push("/forms/saleman/edit");
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
      title: "Family",
      dataIndex: "Family",
      key: "Family",
      width: "20%",
      className: "text-start",

      ...getColumnSearchProps("Family"),
    },
    {
      title: "Provider",
      dataIndex: "Provider",
      key: "Provider",
      width: "20%",
      className: "text-start",

      ...getColumnSearchProps("Provider"),
    },
    {
      title: "Rank",
      dataIndex: "Rank",
      key: "Rank",
      width: "20%",

      ...getColumnSearchProps("Rank"),
    },
    {
      title: "Question",
      dataIndex: "Question",
      key: "Question",
      width: "20%",
      ...getColumnSearchProps("Question"),
    },
    {
      title: "Answer",
      dataIndex: "Answer",
      key: "Answer",
      width: "20%",
      ...getColumnSearchProps("Answer"),
    },
  ];

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex items-end justify-end gap-3 p-3">
        <Button
          type="primary"
          className="bg-primary"
          onClick={() => router.push("/forms/questionnaire/add")}
        >
          Add New
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
