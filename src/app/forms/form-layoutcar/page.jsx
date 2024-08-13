"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";

import MultiSelect from "@/components/FormElements/MultiSelect";
import { useState } from "react";
const page = () => {
  const [benefitForCar, setBenefitsForCar] = useState([""]);
  const createAddBenefitHandler = (benefits, setBenefits) => () => {
    setBenefits([...benefits, ""]);
  };
  const createInputChangeHandler =
    (benefits, setBenefits) => (index, event) => {
      const newBenefits = [...benefits];
      newBenefits[index] = event.target?.value;
      setBenefits(newBenefits);
    };
  const handleAddBenefitForCar = createAddBenefitHandler(
    benefitForCar,
    setBenefitsForCar,
  );

  const handleInputChangeForCar = createInputChangeHandler(
    benefitForCar,
    setBenefitsForCar,
  );
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Thêm Sản Phẩm" />

      <div className=" gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!--Bao hiem o to--> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Bảo hiểm ô tô
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Loại xe
                  </label>
                  <MultiSelect id="muctrachnhiembaohiem">
                    <option value="4">Xe không kinh doanh</option>
                    <option value="5">Xe có kinh doanh</option>
                  </MultiSelect>
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
                    Số chổ ngồi
                  </label>
                  <input
                    type="number"
                    placeholder="chỉ điền số"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Tổng số tiền bảo hiểm
                  </label>
                  <input
                    type="number"
                    placeholder="chỉ điền số"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {benefitForCar.map((benefit, index) => (
                  <div key={index} className="mb-4.5 w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Thêm lợi ích
                    </label>
                    <input
                      type="text"
                      placeholder="Thêm lợi ích"
                      value={benefit}
                      onChange={(event) =>
                        handleInputChangeForCar(index, event)
                      }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                ))}
                <div className="mb-4.5 flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddBenefitForCar}
                    className="btn btn-info text-black dark:text-white"
                  >
                    Thêm Lợi ích
                  </button>
                </div>
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
