"use client";
import React, { use, useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import { Package } from "@/types/package";
import PaginationComponent from "../Pagination/Pagination";
import FilterComponent from "../FIlter/Filter";
import Search from "../Search/Search";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, Space, MenuProps, Dropdown, Select } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { confirm } = Modal;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
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
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN").format(price);
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
const packageData: Package[] = [
  {
    id: "ykwxd4gwzjj5ampj",
    Code: "TASCOTNCAR20120179B",
    Provider: "Bảo hiểm Tasco",
    Product_Name: "Car 3th party Insurance",
    price: 100000,
    status: "Paid",
  },
  {
    id: "ykwxd4gwzjj5ampj",
    Code: "TASCOTNCAR20120179B",
    Provider: "Bảo hiểm Tasco",

    Product_Name: "Car 3th party Insurance",
    price: 1000000,

    status: "pending",
  },
  {
    id: "ykwxd4gwzjj5ampj",
    Code: "TASCOTNCAR20120179B",
    Provider: "Bảo hiểm Tasco",

    Product_Name: "Car 3th party Insurance",
    price: 1000000,
    status: "Unpaid",
  },
];

const TableThree = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      label: "Edit",
      key: "0",

      onClick: () => {
        router.push("/edit");
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
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="  rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex items-center justify-between gap-10">
        <FilterComponent />
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Id
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Code
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Provider
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Product Name
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Price
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Hành Động
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{packageItem.id}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="text-sm">${packageItem.Code}</p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.Provider}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.Product_Name}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      packageItem.status === "Paid"
                        ? "bg-success text-success"
                        : packageItem.status === "Unpaid"
                          ? "bg-danger text-danger"
                          : "bg-warning text-warning"
                    }`}
                  >
                    {packageItem.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatPrice(packageItem.price)}
                  </p>
                </td>

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationComponent />
    </div>
  );
};

export default TableThree;
