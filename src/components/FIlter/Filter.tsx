"use client";
import { Form, Input, Modal, Select, Space, Upload } from "antd";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
const FIlter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const router = useRouter();
  return (
    <div className="custom-input flex items-end justify-between gap-3 ">
      <Space wrap>
        <div className="flex-1">
          <Select
            defaultValue="Family"
            onChange={handleChange}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
            ]}
          />
        </div>
        <div className="flex-1">
          <Select
            className="dark:border-strokedark"
            defaultValue="Provider"
            onChange={handleChange}
            options={[
              { value: "99", label: "99" },
              { value: "66", label: "66" },
              { value: "33", label: "33" },
            ]}
          />
        </div>
        <div className="flex-1">
          <Input
            defaultValue="Product Name"
            className="dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            style={{ borderRadius: "6px", height: "32px" }}
          />
        </div>
        <div className="flex-1">
          <Input
            defaultValue="Product Code"
            style={{ borderRadius: "6px", height: "32px" }}
            className="dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="flex-1">
          <Select
            defaultValue="Trạng Thái"
            onChange={handleChange}
            options={[
              { value: "Thành Công", label: "Thành Công" },
              { value: "Đang Chờ", label: "Đang chờ" },
              { value: "Thất bại", label: "Thất bại" },
            ]}
          />
        </div>
      </Space>
      <Space wrap>
        <div className="flex-1">
          <Button type="primary" className="bg-[#21a9d8] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Button>
        </div>
        {/* check */}
        <div className="flex-1">
          <Button type="primary" onClick={showModal} className="bg-[#21a9d8] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
          </Button>
          <Modal
            title="Import product"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            style={{ width: "800px" }}
          >
            <div className="mb-8  flex flex-shrink-0 gap-4">
              <label htmlFor="select" className="w-30">
                Select family:{" "}
              </label>
              <div className="flex  w-full flex-1 gap-5.5">
                <Select
                  id="select"
                  defaultValue="lucy"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </div>
            </div>
            <div className="flex  flex-shrink-0 gap-4">
              <label htmlFor="select " className="w-30">
                Select provider:
              </label>
              <div className="flex  w-full flex-1">
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />

                <br />
              </div>
            </div>
          </Modal>
        </div>
        <div className="flex-1">
          <Button
            type="primary"
            danger
            onClick={() => window.location.reload()}
          >
            Reset
          </Button>
        </div>
        <div className="flex-1">
          <Button
            type="primary"
            className="  bg-primary "
            onClick={() => router.push("/forms/form-addproducts")}
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
      </Space>
    </div>
  );
};

export default FIlter;
