"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";

import MultiSelect from "@/components/FormElements/MultiSelect";
import { useState } from "react";
const page = () => {
  const [benefitForHealth, setBenefitsForHealth] = useState([""]);
  const createAddBenefitHandler = (benefits, setBenefits) => () => {
    setBenefits([...benefits, ""]);
  };
  const createInputChangeHandler =
    (benefits, setBenefits) => (index, event) => {
      const newBenefits = [...benefits];
      newBenefits[index] = event.target?.value;
      setBenefits(newBenefits);
    };
  const handleAddBenefitForHealth = createAddBenefitHandler(
    benefitForHealth,
    setBenefitsForHealth,
  );
  const handleInputChangeForHealth = createInputChangeHandler(
    benefitForHealth,
    setBenefitsForHealth,
  );
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Thêm Sản Phẩm" />

      <div className=" gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!--Bao hiem suckhoe--> */}
          <div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Bảo hiểm sức khỏe
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Tên loại bảo hiểm
                    </label>
                    <input
                      type="text"
                      placeholder="Tên loại bảo hiểm"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-1/2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Chọn Gói Bảo Hiểm
                      </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <MultiSelect id="baohiemsuckhoe">
                        <option value="1">Bạc</option>
                        <option value="2">Vàng</option>
                        <option value="3">Bạch Kim</option>
                      </MultiSelect>
                    </div>
                  </div>
                </div>
                <div className="mb-4.5">
                  {/* <!-- File upload --> */}
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        File upload
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
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Giá bảo hiểm trên năm (VNĐ)
                  </label>
                  <input
                    type="number"
                    placeholder="điền giá tiền bảo hiểm"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Hạn mức chi trả
                  </label>
                  <input
                    type="number"
                    placeholder="Điền hạn mức chi trả"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Quyền lợi nội trú
                  </label>
                  <input
                    type="number"
                    placeholder="Điền Quyền lợi nội trú"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Quyền lợi ngoại trú
                  </label>
                  <input
                    type="number"
                    placeholder="Điền Quyền lợi ngoại trú"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5 w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Từ
                  </label>
                  <input
                    type="number"
                    placeholder="điền số tuổi"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Tới
                  </label>
                  <input
                    type="number"
                    placeholder="Điền Quyền lợi ngoại trú"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {benefitForHealth.map((benefit, index) => (
                  <div key={index} className="mb-4.5 w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Quyền lợi nổi trội
                    </label>
                    <input
                      type="text"
                      placeholder="Thêm lợi ích"
                      value={benefit}
                      onChange={(event) =>
                        handleInputChangeForHealth(index, event)
                      }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                ))}
                <div className="mb-4.5 flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddBenefitForHealth}
                    className="btn btn-info text-black dark:text-white"
                  >
                    Thêm Lợi ích
                  </button>
                </div>

                <div className="mb-6"></div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 "
                >
                  Thêm Bảo Hiểm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default page;
