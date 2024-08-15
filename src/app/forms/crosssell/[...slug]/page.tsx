"use client";
import React, { useRef, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {
  CaretRightOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type {
  CollapseProps,
  GetProp,
  InputRef,
  SelectProps,
  TableColumnsType,
  TableColumnType,
  UploadFile,
  UploadProps,
} from "antd";
import {
  Button,
  Collapse,
  Input,
  Table,
  Space,
  Upload,
  Image,
  Tag,
} from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface DataType {
  key: string;
  CustomerName: string;
  StartDate: string;
  EndDate: string;
  Status: string;
  ProductName: string;
  Price: string;
  Contract: string;
}

interface PaymentHistory {
  id: string;
  PaymentMethod: string;
  PaymentTerm: string;
  Amount: string;
  Status: string;
  CreatedAt: string;
  Evoucher: string;
  Note: string;
}
const jsonData = {
  id: 57555,
  uuid: "5d8bccaf-4fc8-47e2-b4a0-730a56ea95c3",
  order_id: 34016,
  contract_id: 45369,
  product_id: 1411,
  relationship: null,
  fullname: null,
  gender: null,
  birthday: null,
  nic: null,
  phone: "",
  address: null,
  email: null,
  product_options: null,
  product_options_old: null,
  conditional_questions: null,
  base_subtotal: "66000.0000",
  home_type: null,
  owner_type: null,
  built_year: null,
  start_date: null,
  purpose_text: null,
  purpose_of_use: null,
  created_at: "2024-08-15 10:27:58",
  updated_at: "2024-08-15 10:27:58",
  deleted_at: null,
  cross_sells: null,
  medical_id: null,
  city: null,
  hospital: null,
  social_id: null,
  required_value: null,
  required_month: null,
  discount_amount: null,
  provider_status_code: null,
  provider_status_description: null,
  provider_logging: null,
  attributes: [
    {
      id: 256688,
      beneficiary_id: 57555,
      key: "productSelected",
      value:
        '{"id":"rldzq4kbej4nea7j","product_family_id":"qnwmkv5704blag6r","provider_id":"6rldzq4kg3nea7jp","product_code":"TNDSMIC10200101","title":"B\\u1ea3o hi\\u1ec3m TNDS xe m\\u00e1y","slug":"mandatory-bike-insurance-mic","price":66000,"valid_after_days":0,"icon":"https:\\/\\/sapi.vifo.vn\\/images\\/product\\/files\\/PyNTg3zstHPWxT33Ossvfte0SjRMlh3VU2knpMGF.png"}',
      meta: null,
      created_at: "2024-08-15 10:27:58",
      updated_at: "2024-08-15 10:27:58",
    },
    {
      id: 256689,
      beneficiary_id: 57555,
      key: "bike_type",
      value: "2",
      meta: null,
      created_at: "2024-08-15 10:27:58",
      updated_at: "2024-08-15 10:27:58",
    },
    {
      id: 256690,
      beneficiary_id: 57555,
      key: "amount",
      value: "66000",
      meta: null,
      created_at: "2024-08-15 10:27:58",
      updated_at: "2024-08-15 10:27:58",
    },
    {
      id: 256691,
      beneficiary_id: 57555,
      key: "totalPrice",
      value: "66000",
      meta: null,
      created_at: "2024-08-15 10:27:58",
      updated_at: "2024-08-15 10:27:58",
    },
  ],
};
const jsonDataOrderAttribute = {
  uuid: "4850bca5-59c0-4e1c-9b9d-324aa40e86e2",
  start_date: "2024-08-15 10:27:58",
  year: "1",
  end_date: "2025-08-15 10:27:58",
};

type DataIndex = keyof DataType;
type PaymentHistoryDataIndex = keyof PaymentHistory;

const data: DataType[] = [
  {
    key: "1",
    CustomerName: "John Doe",
    StartDate: "2023-01-01",
    EndDate: "2023-12-31",
    Status: "Active",
    ProductName: "Product A",
    Price: "100",
    Contract: "Contract A",
  },
  {
    key: "2",
    CustomerName: "Jane Smith",
    StartDate: "2023-02-01",
    EndDate: "2023-11-30",
    Status: "Inactive",
    ProductName: "Product B",
    Price: "200",
    Contract: "Contract B",
  },
  {
    key: "3",
    CustomerName: "Alice Johnson",
    StartDate: "2023-03-01",
    EndDate: "2023-10-31",
    Status: "Active",
    ProductName: "Product C",
    Price: "300",
    Contract: "Contract C",
  },
];

const paymentHistoryData: PaymentHistory[] = [
  {
    id: "1",
    PaymentMethod: "Credit Card",
    PaymentTerm: "Monthly",
    Amount: "100",
    Status: "Completed",
    CreatedAt: "2023-01-01",
    Evoucher: "EV123",
    Note: "First payment",
  },
  {
    id: "2",
    PaymentMethod: "PayPal",
    PaymentTerm: "Yearly",
    Amount: "1200",
    Status: "Pending",
    CreatedAt: "2023-02-01",
    Evoucher: "EV124",
    Note: "Annual subscription",
  },
  {
    id: "3",
    PaymentMethod: "Bank Transfer",
    PaymentTerm: "Quarterly",
    Amount: "300",
    Status: "Failed",
    CreatedAt: "2023-03-01",
    Evoucher: "EV125",
    Note: "Payment failed",
  },
];

const FormLayout = () => {
  // handle img
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  //
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
    dataIndex: DataIndex | PaymentHistoryDataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex | PaymentHistoryDataIndex,
  ): TableColumnType<DataType | PaymentHistory> => ({
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
      title: "Customer Name",
      dataIndex: "CustomerName",
      key: "CustomerName",
      width: "15%",
      ...getColumnSearchProps("CustomerName"),
    },
    {
      title: "Start Date",
      dataIndex: "StartDate",
      key: "StartDate",
      width: "15%",
      ...getColumnSearchProps("StartDate"),
    },
    {
      title: "End Date",
      dataIndex: "EndDate",
      key: "EndDate",
      width: "15%",
      ...getColumnSearchProps("EndDate"),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: "10%",
      ...getColumnSearchProps("Status"),
      render: (status) => {
        let color = status === "Active" ? "green" : "volcano";
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Product Name",
      dataIndex: "ProductName",
      key: "ProductName",
      width: "15%",
      ...getColumnSearchProps("ProductName"),
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      width: "10%",
      ...getColumnSearchProps("Price"),
    },
    {
      title: "Contract",
      dataIndex: "Contract",
      key: "Contract",
      width: "20%",
      ...getColumnSearchProps("Contract"),
    },
  ];

  const paymentHistoryColumns: TableColumnsType<PaymentHistory> = [
    {
      title: "Payment Method",
      dataIndex: "PaymentMethod",
      key: "PaymentMethod",
      width: "15%",
      ...getColumnSearchProps("PaymentMethod"),
    },
    {
      title: "Payment Term",
      dataIndex: "PaymentTerm",
      key: "PaymentTerm",
      width: "15%",
      ...getColumnSearchProps("PaymentTerm"),
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      width: "10%",
      ...getColumnSearchProps("Amount"),
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
      title: "Created At",
      dataIndex: "CreatedAt",
      key: "CreatedAt",
      width: "15%",
      ...getColumnSearchProps("CreatedAt"),
    },
    {
      title: "Evoucher",
      dataIndex: "Evoucher",
      key: "Evoucher",
      width: "15%",
      ...getColumnSearchProps("Evoucher"),
    },
    {
      title: "Note",
      dataIndex: "Note",
      key: "Note",
      width: "20%",
      ...getColumnSearchProps("Note"),
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
      key: "1",
      label: "Order Information",
      children: (
        <>
          <Breadcrumb pageName="Order Information" />
          <form>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className=" block text-sm font-medium capitalize text-black dark:text-white">
                        Order Number
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="English"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        disabled
                        value={"VF240815011034016"}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className=" block text-sm font-medium capitalize text-black dark:text-white">
                        Product Family
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="English"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        disabled
                        value={"Manadatory Bike Insurance"}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className=" block text-sm font-medium capitalize text-black dark:text-white">
                        Product Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="English"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        disabled
                        value={"Mandatory Bike Insurance"}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className=" block text-sm font-medium capitalize text-black dark:text-white">
                        Product Code
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="English"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        disabled
                        value={"TNDSMIC10200101"}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className=" block text-sm font-medium capitalize text-black dark:text-white">
                        Provider
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="English"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        disabled
                        value={"MIC HỒ CHÍ MINH"}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className=" block text-sm font-medium capitalize text-black dark:text-white">
                        Total Amount{" "}
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="English"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        disabled
                        value={"66,000 đ"}
                      />
                    </div>
                  </div>
                </div>
                {/* tets */}
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className=" block text-sm font-medium capitalize text-black dark:text-white">
                        Provider Order Number{" "}
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="English"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        disabled
                        value={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className=" block text-sm font-medium capitalize text-black dark:text-white">
                        Distributor Order Number{" "}
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="English"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        disabled
                        value={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className=" block text-sm font-medium capitalize text-black dark:text-white">
                        Reference Id{" "}
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="English"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        disabled
                        value={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className=" block text-sm font-medium capitalize text-black dark:text-white">
                        Customer Name{" "}
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="English"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        disabled
                        value={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className=" block text-sm font-medium capitalize text-black dark:text-white">
                        Status of order{" "}
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="English"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        disabled
                        value={"Draft"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      ),
    },
    {
      key: "2",
      label: "All Contracts",
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
    {
      key: "3",
      label: "Payment History",
      children: (
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="flex justify-end gap-3 p-3">
              <Button type="primary">Import</Button>
              <Button type="primary">Exprot</Button>
            </div>
            <Table
              columns={paymentHistoryColumns}
              dataSource={paymentHistoryData}
            />
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: "Attachments",
      children: (
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: "Data Log",
      children: (
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          </div>
        </div>
      ),
    },
    {
      key: "5",
      label: "Order Attribute",
      children: (
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <pre>{JSON.stringify(jsonDataOrderAttribute, null, 2)}</pre>
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
