"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CheckboxProps, CollapseProps } from "antd";
import { Avatar, Checkbox, Collapse, Select, theme } from "antd";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { DatePicker, Space } from "antd";
import { useRef, useState } from "react";
import { Button, Input } from "antd";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import type { InputNumberProps } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Price from "@/components/Prices/Price";
import ProductOptionForm from "@/components/ProductOptionForm/ProductOptionForm";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormLayout = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };
  const onChangea: CheckboxProps["onChange"] = (e) => {
    console.log("checked = ", e.target.checked);
    setIsChecked(e.target.checked);
  };

  // Add Product Option
  const [benefitforOptions, setBenefitforOptions] = useState<string[]>([]);

  const handleAddBenefitForOptions = () => {
    setBenefitforOptions([
      ...benefitforOptions,
      `Benefit ${benefitforOptions.length + 1}`,
    ]);
    setIsButtonDisabled(true);
  };
  const handleDeleteOptions = (index: number) => {
    setBenefitforOptions(benefitforOptions.filter((_, i) => i !== index));
    setIsButtonDisabled(!isButtonDisabled);
  };

  const [benefitforProperty, setbenefitforProperty] = useState<string[]>([]);

  // remove

  const onChangeTab = (key: string) => {
    console.log(key);
  };
  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

  const itemstabs: TabsProps["items"] = [
    {
      key: "1",
      label: "EN",
      children: (
        <input type="text" className="handlecsspicker" defaultValue={"a"} />
      ),
    },
    {
      key: "2",
      label: "VN",
      children: <input type="text" className="handlecsspicker" />,
    },
  ];
  // Correctly type the ref to be an HTMLInputElement
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Function to trigger input click
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: "Product Information",
      children: (
        <>
          <Breadcrumb pageName="Thêm Sản Phẩm" />

          <div className=" gap-9  sm:grid-cols-4 ">
            <div className="flex flex-col gap-9">
              {/* <!--Bao hiem xe co --> */}
              <div className="w1/2 rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Tên Sản Phẩm
                  </h3>
                </div>
                <form action="#">
                  <div className="p-6.5">
                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      {/* <!-- File upload --> */}
                      <div className=" flex flex-col gap-6 p-3  xl:flex-row">
                        <div className="  w-full">
                          <div className="flex items-center  rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                            <div className="flex h-full flex-col gap-5.5 ">
                              <div className="flex items-center gap-3 px-3">
                                <label className=" block text-sm font-medium capitalize text-black dark:text-white">
                                  product Logo
                                </label>
                                <div className="">
                                  <input
                                    ref={fileInputRef} // Step 2: Assign the ref to the input
                                    type="file"
                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                    style={{ display: "none" }}
                                  />
                                  <div className="" onClick={handleAvatarClick}>
                                    <Avatar src={url} />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <br />
                          </div>
                        </div>
                        <div className="w-full">
                          <Space direction="vertical" size={12}>
                            <RangePicker showTime className="handlecsspicker" />
                          </Space>
                        </div>
                      </div>
                    </div>

                    {/* product code */}
                    <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                      <div className=" w-full ">
                        <div className="mb-4.5 flex flex-col gap-6  xl:flex-row">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              product code
                            </label>
                            <input
                              defaultValue="TASCOTNCAR20120179B"
                              required
                              type="text"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              version
                            </label>
                            <input
                              defaultValue="2"
                              required
                              type="text"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* product name */}
                    <div className=" mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                      <div className=" w-full ">
                        <div className="mb-4.5 flex flex-col gap-6  xl:flex-row">
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              product name (English)
                            </label>
                            <input
                              defaultValue="Car 3th party Insurance"
                              required
                              type="text"
                              placeholder="English"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                          <div className="w-full ">
                            <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                              product name (Việt Nam)
                            </label>
                            <input
                              defaultValue="BH TNDS Tải chở hàng TASCO Dưới 3 tấn - Không KD"
                              required
                              type="text"
                              placeholder="VietNam"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* product slug */}
                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                      <div className=" flex flex-col gap-6  xl:flex-row">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Product Slug (English)
                          </label>
                          <input
                            defaultValue={
                              "bao_hiem_trach_nhiem_dan_su_tasco_xe_tai_cho_hang_duoi_3_tan_kkd"
                            }
                            required
                            type="text"
                            placeholder="English"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Product Slug (Việt Nam)
                          </label>
                          <input
                            defaultValue={
                              "bao_hiem_trach_nhiem_dan_su_tasco_xe_tai_cho_hang_duoi_3_tan_kkd"
                            }
                            required
                            type="text"
                            placeholder="VietNam"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                      {/* product highlight */}
                      <div className=" flex flex-col gap-6  xl:flex-row">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Product Highlighted Text (English)
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="English"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            Product Highlighted Text (Việt Nam)
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="VietNam"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                    {/* product description */}
                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                      <div className=" flex flex-col gap-6  xl:flex-row">
                        <div className=" w-full ">
                          <TextArea
                            required
                            rows={4}
                            placeholder="Mô tả sản phẩm (Việt Nam)"
                            maxLength={500}
                            className=" dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className=" w-full ">
                          <TextArea
                            required
                            rows={4}
                            placeholder="Mô tả sản phẩm (Việt Nam)"
                            maxLength={500}
                            className=" dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                    {/* product category */}

                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                      <div className=" flex flex-col gap-6 xl:flex-row">
                        <div className=" w-full ">
                          {/* <!-- Chọn Category --> */}
                          <h3 className=" font-medium capitalize text-black dark:text-white">
                            Product Family
                          </h3>
                          <div className="flex flex-col gap-5.5 ">
                            <SelectGroupTwo id="Danhmuc" nhacungcap="">
                              <option value="xemay">Bảo Hiểm Xe Hơi</option>
                              <option value="xehoi">Bảo Hiểm Xe Máy</option>
                              <option value="suckhoe">Bảo Hiểm Sức Khỏe</option>
                            </SelectGroupTwo>
                          </div>
                        </div>
                        <div className="w-full ">
                          <h3 className="font-medium text-black dark:text-white">
                            Providers
                          </h3>
                          <div className="flex flex-col gap-5.5 ">
                            <SelectGroupTwo id="provider" nhacungcap="">
                              <option value="dongabank">DOng A Bank</option>
                              <option value="mbbank">MB Bank</option>
                              <option value="bamabank">Ba Ma Bank</option>
                            </SelectGroupTwo>
                          </div>

                          <br />
                        </div>
                      </div>
                    </div>
                    {/* product rank */}

                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                      <div className=" w-full ">
                        {/* <!-- Chọn Category --> */}
                        <h3 className=" font-medium capitalize text-black dark:text-white">
                          rank
                        </h3>
                        <div className="flex flex-col gap-5.5">
                          <SelectGroupTwo id="Danhmuc" nhacungcap="">
                            <option value="tai">Tai</option>
                          </SelectGroupTwo>
                          <Checkbox
                            onChange={onChange}
                            className="text-black dark:text-white"
                          >
                            Vifo Choice
                          </Checkbox>

                          <br />
                        </div>
                      </div>
                    </div>
                    {/* product position */}
                    <div className="mb-4.5 w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                      <div className=" mb-4.5 flex  flex-col gap-6 xl:flex-row">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            position
                          </label>
                          <input
                            defaultValue={"0"}
                            type="text"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            External link
                          </label>
                          <input
                            type="text"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className=" flex flex-col gap-6 xl:flex-row">
                        <div className="w-full ">
                          <label className=" mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                            evalution
                          </label>
                          <input
                            type="text"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="w-full ">
                          <SelectGroupTwo
                            id="Commission"
                            nhacungcap="Exclude Tax"
                          >
                            <option
                              value="Exclude Tax"
                              className="text-black dark:text-white"
                            >
                              Exclude Tax
                            </option>
                            <option
                              value="Include Tax"
                              className="text-black dark:text-white"
                              disabled
                            >
                              Include Tax
                            </option>
                          </SelectGroupTwo>
                        </div>
                      </div>
                    </div>
                    {/* product rank */}

                    <div className="w-full rounded-sm border border-stroke bg-white p-3  dark:border-strokedark dark:bg-boxdark">
                      <div className="flex w-full flex-col">
                        <Checkbox
                          onChange={onChangea}
                          className=" text-black dark:bg-boxdark dark:text-white"
                          checked={isChecked}
                        >
                          Activated
                        </Checkbox>
                        <Checkbox
                          onChange={onChange}
                          className=" text-black dark:bg-boxdark dark:text-white"
                        >
                          Is Partnership
                        </Checkbox>
                        <Checkbox
                          onChange={onChange}
                          className=" text-black dark:bg-boxdark dark:text-white"
                        >
                          Is LeadCapture
                        </Checkbox>
                        <Checkbox
                          onChange={onChange}
                          className=" text-black dark:bg-boxdark dark:text-white"
                        >
                          Has promotion
                        </Checkbox>
                        <Checkbox
                          onChange={onChange}
                          className=" text-black dark:bg-boxdark dark:text-white"
                        >
                          Contact Us
                        </Checkbox>
                      </div>
                      <div className="mb-4.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Giá
                        </label>
                        <input
                          type="number"
                          placeholder="Điền Giá Tiền"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="mb-6"></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Product Attachments",
      children: (
        <>
          <div className="rounded-sm border border-stroke bg-white p-3 dark:border-strokedark dark:bg-boxdark">
            <div className="mb-4.5 flex flex-col gap-6 p-3 xl:flex-row">
              {/* <!-- File upload --> */}
              <div className="w-full rounded-sm border border-stroke bg-white p-3 dark:border-strokedark dark:bg-boxdark">
                <h3 className="mb-2 font-medium text-black dark:text-white">
                  Term & Condition File
                </h3>
                <div className="flex flex-col gap-5.5">
                  <div>
                    <input
                      type="file"
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              <div className=" w-full rounded-sm border border-stroke bg-white p-3 dark:border-strokedark dark:bg-boxdark">
                <h3 className="mb-2 font-medium text-black dark:text-white">
                  Detail File
                </h3>
                <div className="flex flex-col gap-5.5 ">
                  <div>
                    <input
                      type="file"
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <br />
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: "Prices",
      children: (
        <>
          <Price />
        </>
      ),
    },
    {
      key: "4",
      label: "Product Detail",
      children: (
        <Tabs
          defaultActiveKey="1"
          items={itemstabs}
          onChange={onChangeTab}
          className=" rounded-sm border border-b border-stroke bg-white px-6.5 py-4  dark:border-strokedark dark:bg-boxdark dark:text-white"
        />
      ),
    },
    {
      key: "5",
      label: "Product Options",
      children: (
        <>
          <Button
            type="primary"
            className="mb-3 bg-primary"
            onClick={handleAddBenefitForOptions}
            disabled={isButtonDisabled}
          >
            Add Product Option
          </Button>

          {benefitforOptions.map((benefit, index) => (
            <ProductOptionForm
              key={index}
              index={index}
              benefit={benefit}
              onDelete={() => handleDeleteOptions(index)}
            />
          ))}
        </>
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
      <button
        type="submit"
        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 "
      >
        Thêm Bảo Hiểm
      </button>
    </DefaultLayout>
  );
};

export default FormLayout;
