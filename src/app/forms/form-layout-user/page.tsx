"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import { useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";
import {
  // Button,
  // Cascader,
  // Checkbox,
  // ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  // Radio,
  // Select,
  // Slider,
  // Switch,
  // TreeSelect,
  // Upload,
} from "antd";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormLayoutUSer = () => {
  const [benefitforUser, setbenefitForUser] = useState([""]);
  const createAddBenefitHandler = (benefits: any, setBenefits: any) => () => {
    setBenefits([...benefits, ""]);
  };
  const createInputChangeHandler =
    (benefits: any, setBenefits: any) => (index: number, event: any) => {
      const newBenefits = [...benefits];
      newBenefits[index] = event.target?.value;
      setBenefits(newBenefits);
    };
  const handleAddbenefitforUser = createAddBenefitHandler(
    benefitforUser,
    setbenefitForUser,
  );
  const handleInputChangeForUser = createInputChangeHandler(
    benefitforUser,
    setbenefitForUser,
  );
  // email

  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState(true);
  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const handleEMailChange = (event: any) => {
    setEmail(event.target.value);
    if (validateEmail(event.target.value)) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  };

  // sdt
  const [phone, setPhone] = useState(0);
  const [checkPhone, setCheckPhone] = useState(true);

  const validatePhone = (phone: number) => {
    const re = /^[0-9]{10}$/;
    return re.test(String(phone).toLowerCase());
  };

  const handlePHoneChange = (event: any) => {
    setPhone(event.target.value);
    if (validatePhone(event.target.value)) {
      setCheckPhone(true);
    } else {
      setCheckPhone(false);
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Thêm Sản Phẩm" />

      <div className=" gap-9 sm:grid-cols-4 ">
        <div className="flex flex-col gap-9">
          {/* <!--Bao hiem xe co --> */}
          <div className="w1/2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Thêm User
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Tên Người Dùng
                    </label>
                    <input
                      type="text"
                      placeholder="Tên loại bảo hiểm"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Số Điện Thoại Cá Nhân
                    </label>
                    <input
                      type="number"
                      placeholder="Số điện thoại"
                      value={phone}
                      onChange={handlePHoneChange}
                      className={
                        checkPhone
                          ? "w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          : "w-full rounded border  border-red"
                      }
                    />
                    <span className="text-red">
                      {checkPhone ? "" : "Vui lòng kiểm tra lại Số Điện Thoại"}
                    </span>
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Email Cá Nhân
                    </label>
                    <input
                      type="email"
                      placeholder="Nhập  Email"
                      value={email}
                      onChange={handleEMailChange}
                      className={
                        checkEmail
                          ? "w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          : "w-full rounded border  border-red"
                      }
                    />
                    <span className="text-red">
                      {checkEmail ? "" : "Vui lòng kiểm tra lại Email!"}
                    </span>
                  </div>
                </div>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Vai Trò
                    </h3>
                  </div>
                  <div className="flex flex-col gap-5.5 p-6.5">
                    {/* <Select id="ActiveUser" defaultValue="Active">
                      <option value="Active">Active</option>
                      <option value="UnActive">UnActive</option>
                    </Select> */}
                    <Select
                      defaultValue="Active"
                      style={{ width: "100%" }}
                      onChange={handleChange}
                      options={[
                        { value: "Active", label: "Active" },
                        { value: "UnActive", label: "UnActive" },
                      ]}
                    />
                  </div>
                  <div className="flex flex-col gap-5.5 p-6.5">
                    {/* <Select id="ActiveUser" defaultValue="Active">
                      <option value="Active">Active</option>
                      <option value="UnActive">UnActive</option>
                    </Select> */}
                    <Select
                      defaultValue="Role"
                      style={{ width: "100%" }}
                      onChange={handleChange}
                      options={[
                        { value: "Admin", label: "Admin" },
                        { value: "Guess", label: "Guess" },
                      ]}
                    />
                  </div>
                </div>
                <div className="mb-4.5">
                  {/* <!-- File upload --> */}
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Avatar
                      </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Attach file
                        </label>
                        <input
                          type="file"
                          className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Form.Item
                  label="Điền Mô Tả"
                  className="text-black dark:text-white"
                >
                  <TextArea rows={4} />
                </Form.Item>

                {benefitforUser.map((benefit, index) => (
                  <div key={index} className="mb-4.5 w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Thêm Thông Tin
                    </label>
                    <input
                      type="text"
                      placeholder="Thêm Thông Tin"
                      value={benefit}
                      onChange={(event) =>
                        handleInputChangeForUser(index, event)
                      }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                ))}
                <div className="mb-4.5 flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddbenefitforUser}
                    className="btn btn-info bg-primary p-3 font-medium text-white hover:bg-opacity-90  dark:text-black"
                  >
                    Thêm Lợi Ích
                  </button>
                </div>

                <div className="mb-6 flex items-center justify-end gap-4">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 "
                  >
                    Thêm User
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
          <Checkbox>Checkbox</Checkbox>
        </Form.Item>
        <Form.Item label="Radio">
          <Radio.Group>
            <Radio value="apple"> Apple </Radio>
            <Radio value="pear"> Pear </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Input">
          <Input />
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              {
                title: "Light",
                value: "light",
                children: [{ title: "Bamboo", value: "bamboo" }],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: "zhejiang",
                label: "Zhejiang",
                children: [
                  {
                    value: "hangzhou",
                    label: "Hangzhou",
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
        <Form.Item label="Slider">
          <Slider />
        </Form.Item>
        <Form.Item label="ColorPicker">
          <ColorPicker />
        </Form.Item>
      </Form> */}
    </DefaultLayout>
  );
};

export default FormLayoutUSer;
