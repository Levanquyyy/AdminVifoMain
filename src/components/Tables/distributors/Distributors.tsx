"use client";
import { DISTRIBUTER } from "@/types/distributer";
import Image from "next/image";
import { Button, Drawer, Dropdown, Input, MenuProps, Select } from "antd";
import { useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, Space } from "antd";
import { useRouter } from "next/navigation";

const brandData: DISTRIBUTER[] = [
  {
    Code: "SAFESAVINGS",
    Organization_Name: "SAFESAVINGS",
    Description: "",
  },
];
const { confirm } = Modal;

const showConfirm = () => {
  confirm({
    title: "Do you want to delete these items?",
    icon: <ExclamationCircleFilled />,
    content: "Some descriptions",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

const showPromiseConfirm = () => {
  confirm({
    title: "Do you want to delete these items?",
    icon: <ExclamationCircleFilled />,
    content:
      "When clicked the OK button, this dialog will be closed after 1 second",
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log("Oops errors!"));
    },
    onCancel() {},
  });
};

const showDeleteConfirm = () => {
  confirm({
    title: "Are you sure delete this task?",
    icon: <ExclamationCircleFilled />,
    content: "Some descriptions",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

const showPropsConfirm = () => {
  confirm({
    title: "Are you sure delete this task?",
    icon: <ExclamationCircleFilled />,
    content: "Some descriptions",
    okText: "Yes",
    okType: "danger",
    okButtonProps: {
      disabled: true,
    },
    cancelText: "No",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};
const TableOne = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const router = useRouter();

  const items: MenuProps["items"] = [
    {
      label: "Edit",
      key: "0",

      onClick: () => {
        router.push("/forms/distributors/edit");
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
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex">
        <div className="flex-1 ">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            FamiLy
          </h4>
        </div>
        <div className=" flex flex-1  justify-end">
          <Button
            type="primary"
            className="  bg-primary "
            onClick={() => router.push("/forms/distributors/new")}
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
        </div>
      </div>
      <div className="flex gap-5 py-3 ">
        <div className="flex-1">
          <Input
            placeholder="Organization Code"
            className="custom-input"
            style={{ borderRadius: "6px", height: "32px" }}
          />
        </div>
        <div className="flex-1">
          <Input
            placeholder="Organization Name"
            className="custom-input"
            style={{ borderRadius: "6px", height: "32px" }}
          />
        </div>

        <div className="flex flex-1 gap-5 dark:bg-boxdark">
          <button
            onClick={() => window.location.reload()}
            className="h-8 rounded-md bg-primary px-4 py-1 text-white"
          >
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
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
          <Button
            type="primary"
            danger
            className="handleaddred"
            onClick={() => window.location.reload()}
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Code
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Organization_Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Description
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Hành Động
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.Code}</p>
            </div>

            <div className="flex items-center justify-start p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {brand.Organization_Name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{brand.Description}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
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
              </td>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
