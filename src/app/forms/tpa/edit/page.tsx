"use client";
import type {
  CheckboxProps,
  CollapseProps,
  GetProp,
  SelectProps,
  UploadFile,
  UploadProps,
} from "antd";
import { Collapse, Upload, Image, Select, Table, Checkbox } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CaretRightOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import OrganizationalChart from "@/components/OriginalChart";
import Column from "antd/es/table/Column";
const sampleData = {
  name: "safeSaving",
  children: [
    {
      name: "SafeSaving con 1",
      children: [
        {
          name: "SafeSaving con 1.1",
          children: [
            {
              name: "SafeSaving con 1.1.1",
              children: [
                {
                  name: "SafeSaving con",
                  children: [], // Added missing children array
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "SafeSaving con 2",
      children: [],
    },
  ],
};
interface DataType {
  key: React.Key;

  name: string;
  enable: boolean;
}

const page = () => {
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      name: "VBI - Bảo hiểm VietinBank - Covid Included Insurance",
      enable: true,
    },
    {
      key: "2",
      name: "VBI - Bảo hiểm VietinBank - Covid Included Insurance",
      enable: true,
    },
    {
      key: "3",
      name: "VBI - Bảo hiểm VietinBank - Covid Included Insurance",
      enable: true,
    },
    {
      key: "4",
      name: "VBI - Bảo hiểm VietinBank - Covid Included Insurance",
      enable: true,
    },
    {
      key: "5",
      name: "VBI - Bảo hiểm VietinBank - Covid Included Insurance",
      enable: true,
    },
    {
      key: "6",
      name: "VBI - Bảo hiểm VietinBank - Covid Included Insurance",
      enable: true,
    },
    {
      key: "7",
      name: "VBI - Bảo hiểm VietinBank - Covid Included Insurance",
      enable: true,
    },
    {
      key: "8",
      name: "VBI - Bảo hiểm VietinBank - Covid Included Insurance",
      enable: true,
    },
    {
      key: "9",
      name: "VBI - Bảo hiểm VietinBank - Covid Included Insurance",
      enable: true,
    },
    {
      key: "10",
      name: "VBI - Bảo hiểm VietinBank - Covid Included Insurance",
      enable: true,
    },
    {
      key: "11",
      name: "VBI - Bảo hiểm VietinBank - Covid Included Insurance",
      enable: true,
    },
    {
      key: "12",
      name: "VBI - Bảo hiểm VietinBank - Covid Included Insurance",
      enable: true,
    },
    {
      key: "13",
      name: "VBI - Bảo hiểm VietinBank - Covid Included Insurance",
      enable: true,
    },
    {
      key: "14",
      name: "VBI - Bảo hiểm VietinBank - Covid Included Insurance",
      enable: true,
    },
    {
      key: "15",
      name: "VBI - Bảo hiểm VietinBank - Covid Included Insurance",
      enable: true,
    },

    // Add more data as needed
  ]);
  // check upload file already
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
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

  const [checked, setChecked] = useState(false);
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };
  // Provider
  const options: SelectProps["options"] = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: "Edit TPA",
      children: (
        <>
          <div className=" w-full  rounded-sm border border-stroke bg-white font-medium text-black shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white">
            <div className="mb-4.5  flex flex-col gap-6 ">
              <div className="w-full border-b border-stroke p-3  dark:border-strokedark  ">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Tpa Logo *
                </label>
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-circle"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  maxCount={1}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    alt="preview"
                    wrapperStyle={{ display: "none" }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </div>
              <div className=" w-full rounded-sm border border-stroke bg-white font-medium text-black shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white ">
                {/* <!-- Chọn Category --> */}
                <div className="border-b  border-stroke p-3 dark:border-strokedark">
                  <h3 className=" font-medium capitalize text-black dark:text-white">
                    Provider
                  </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    defaultValue={["VBI - VietNam Bank for Industry"]}
                    options={options}
                  />
                </div>

                <br />
              </div>
              <div className=" w-full rounded-sm border border-stroke bg-white font-medium text-black shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white ">
                {/* <!-- Chọn Category --> */}
                <div className="border-b border-stroke p-3 dark:border-strokedark">
                  <h3 className=" font-medium capitalize text-black dark:text-white">
                    Product Family
                  </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    defaultValue={["Bảo hiểm hỗ trợ dịch bệnh"]}
                    options={options}
                  />
                </div>

                <br />
              </div>
              <div className="w-full p-3">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Tpa Code *
                </label>
                <input
                  defaultValue={"VIFO Test"}
                  type="text"
                  placeholder="VietNam"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  disabled
                />
              </div>
              <div className="w-full p-3">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Tpa Name *
                </label>
                <input
                  defaultValue={"VIFO"}
                  required
                  type="text"
                  placeholder="VietNam"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full p-3">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Email
                </label>
                <input
                  required
                  type="text"
                  placeholder="VietNam"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full p-3">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Phone *
                </label>
                <input
                  defaultValue={"02471010100"}
                  required
                  type="text"
                  placeholder="VietNam"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-full p-3">
                <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                  Tpa Description
                </label>
                <input
                  required
                  type="text"
                  placeholder="VietNam"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 "
              >
                Submit
              </button>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Organization Chart",
      children: (
        <>
          <div className="  w-full rounded-sm border border-stroke bg-white font-medium text-black shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white">
            <div className="mb-4.5  flex flex-col gap-6 px-3">
              <OrganizationalChart data={sampleData} />
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 "
              >
                Submit
              </button>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Available Table",
      children: (
        <>
          <div className="  w-full rounded-sm border border-stroke bg-white font-medium text-black shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white">
            <div className="mb-4.5  flex flex-col gap-6 px-3">
              <Table dataSource={data}>
                <Column title="#" dataIndex="key" key="key"></Column>
                <Column title="	Provider - Family" dataIndex="name" key="name" />
                <Column
                  title="Enable"
                  key="enable"
                  render={() => <Checkbox defaultChecked={false} />}
                />
              </Table>
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 "
              >
                Submit
              </button>
            </div>
          </div>
        </>
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
