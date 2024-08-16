"use client";
import React, { useRef, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";
import type {
  CollapseProps,
  InputRef,
  SelectProps,
  TableColumnsType,
  TableColumnType,
} from "antd";
import {
  Button,
  Checkbox,
  Collapse,
  InputNumber,
  Select,
  Input,
  DatePicker,
  Table,
  Space,
} from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import dayjs from "dayjs";
import { FilterDropdownProps } from "antd/es/table/interface";
import { useRouter } from "next/navigation";
import Highlighter from "react-highlight-words";
interface DataType {
  key: string;
  GiftId: string;
  Giftcode: string;
  NameVoucher: string;
  URLImport: string;
  OrderLinked: string;
  URL: string;
  Status: string;
}
type DataIndex = keyof DataType;
const data: DataType[] = [
  {
    key: "1",
    GiftId: "G1",
    Giftcode: "GC1",
    NameVoucher: "Voucher 1",
    URLImport: "http://example.com/import1",
    OrderLinked: "testthu1",
    URL: "http://example.com/1",
    Status: "Active",
  },
  {
    key: "2",
    GiftId: "G2",
    Giftcode: "GC2",
    NameVoucher: "Voucher 2",
    URLImport: "http://example.com/import2",
    OrderLinked: "testthu2",
    URL: "http://example.com/2",
    Status: "Inactive",
  },
  {
    key: "3",
    GiftId: "G3",
    Giftcode: "GC3",
    NameVoucher: "Voucher 3",
    URLImport: "http://example.com/import3",
    OrderLinked: "testthu3",
    URL: "http://example.com/3",
    Status: "Active",
  },
];
const FormLayout = () => {
  const router = useRouter();
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
      title: "Gift ID",
      dataIndex: "GiftId",
      key: "GiftId",
      width: "10%",
      ...getColumnSearchProps("GiftId"),
    },
    {
      title: "Gift Code",
      dataIndex: "Giftcode",
      key: "Giftcode",
      width: "10%",
      ...getColumnSearchProps("Giftcode"),
    },
    {
      title: "Name Voucher",
      dataIndex: "NameVoucher",
      key: "NameVoucher",
      width: "10%",
      ...getColumnSearchProps("NameVoucher"),
    },
    {
      title: "URL Import",
      dataIndex: "URLImport",
      key: "URLImport",
      width: "10%",
      ...getColumnSearchProps("URLImport"),
    },
    {
      title: "Order Linked",
      dataIndex: "OrderLinked",
      key: "OrderLinked",
      width: "10%",
      render: (text) => {
        return (
          <a href={text} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        );
      },
    },
    {
      title: "URL",
      dataIndex: "URL",
      key: "URL",
      width: "10%",
      ...getColumnSearchProps("URL"),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: "10%",
      ...getColumnSearchProps("Status"),
    },
  ];

  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY/MM/DD";
  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const [campaignName, setCampaignName] = useState("Test Cross Sell order");
  const [family, setFamily] = useState("Lucy");
  const [distributor, setDistributor] = useState(["g16", "c12"]);
  const [provider, setProvider] = useState(["VIFO Team", "VIFO Team 3"]);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [rank, setRank] = useState(["1", "2", "3"]);

  const isSubmitDisabled = () => {
    return (
      !campaignName ||
      !family ||
      distributor.length === 0 ||
      provider.length === 0 ||
      dateRange.length === 0 ||
      rank.length === 0
    );
  };

  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: "Add Cross-sell",
      children: (
        <>
          <Breadcrumb pageName="Add Cross-sell" />
          <form>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                        Campaign Name
                        <strong className="text-red">*</strong>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="English"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="text-md  block font-medium capitalize text-black dark:text-white">
                        Family
                      </label>
                      <Select
                        defaultValue="lucy"
                        className="w-full"
                        options={[
                          { value: "jack", label: "Jack" },
                          { value: "lucy", label: "Lucy" },
                          { value: "Yiminghe", label: "yiminghe" },
                        ]}
                        onChange={(value) => setFamily(value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="text-md  block font-medium capitalize text-black dark:text-white">
                        Distributor
                      </label>
                      <Select
                        mode="multiple"
                        size={"middle"}
                        placeholder="Please select"
                        style={{ width: "100%" }}
                        options={options}
                        onChange={(value) => setDistributor(value)}
                        value={distributor}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="text-md  block font-medium capitalize text-black dark:text-white">
                        Provider
                      </label>
                      <Select
                        mode="multiple"
                        size={"middle"}
                        placeholder="Please select"
                        style={{ width: "100%" }}
                        options={options}
                        onChange={(value) => setProvider(value)}
                        value={provider}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="text-md  block font-medium capitalize text-black dark:text-white">
                        Rank
                      </label>
                      <Select
                        mode="multiple"
                        size={"middle"}
                        placeholder="Please select"
                        style={{ width: "100%" }}
                        options={options}
                        onChange={(value) => setRank(value)}
                        value={rank}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <RangePicker
                      onChange={(dates) => setDateRange(dates)}
                      defaultValue={[
                        dayjs("2015/01/01", dateFormat),
                        dayjs("2015/01/01", dateFormat),
                      ]}
                      format={dateFormat}
                    />
                  </div>
                </div>
                <div className=" w-full">
                  {/* <!-- Chọn Category --> */}
                  <div className="flex flex-col gap-5.5 ">
                    <Checkbox className="text-black dark:text-white">
                      One time per customer
                    </Checkbox>

                    <Checkbox className="text-black dark:text-white" checked>
                      Ekyc Required
                    </Checkbox>
                  </div>

                  <br />
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                        Amount
                      </label>
                      <InputNumber
                        min={0}
                        max={10}
                        defaultValue={5}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="primary"
              className="w-full"
              disabled={isSubmitDisabled()}
            >
              {" "}
              Update
            </Button>
          </form>
        </>
      ),
    },
    {
      key: "2",
      label: "",
      children: (
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="flex justify-end gap-3 p-3">
              <Button type="primary">Import</Button>
              <Button type="primary">Exprot</Button>
            </div>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        items={getItems()}
      />
    </DefaultLayout>
  );
};

export default FormLayout;
