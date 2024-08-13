"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";

import MultiSelect from "@/components/FormElements/MultiSelect";
import { useState } from "react";

const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormLayout = () => {
  const [benefitforbike, setBenefitsforbike] = useState([""]);
  const createAddBenefitHandler = (benefits: any, setBenefits: any) => () => {
    setBenefits([...benefits, ""]);
  };
  const createInputChangeHandler =
    (benefits: any, setBenefits: any) => (index: number, event: any) => {
      const newBenefits = [...benefits];
      newBenefits[index] = event.target?.value;
      setBenefits(newBenefits);
    };
  const handleAddBenefitForBike = createAddBenefitHandler(
    benefitforbike,
    setBenefitsforbike,
  );
  const handleInputChangeForBike = createInputChangeHandler(
    benefitforbike,
    setBenefitsforbike,
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Thêm Sản Phẩm" />

      <div className=" gap-9 sm:grid-cols-4 ">
        <div className="flex flex-col gap-9">
          {/* <!--Bao hiem xe co --> */}
          <div className="w1/2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Bảo hiểm xe cộ
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

                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Chọn phân khối xe
                      </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <MultiSelect id="phankhoixemay">
                        <option value="50">50cc</option>
                        <option value="125">125cc</option>
                        <option value="175">175cc</option>
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
                    Mức trách nhiệm bảo hiểm về người
                  </label>
                  <MultiSelect id="muctrachnhiembaohiem">
                    <option value="4">Xe không kinh doanh</option>
                    <option value="5">Xe có kinh doanh</option>
                  </MultiSelect>
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Mức trách nhiệm bảo hiểm về vật
                  </label>
                  <input
                    type="number"
                    placeholder="chỉ điền số"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <SelectGroupOne />

                {benefitforbike.map((benefit, index) => (
                  <div key={index} className="mb-4.5 w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Thêm lợi ích
                    </label>
                    <input
                      type="text"
                      placeholder="Thêm lợi ích"
                      value={benefit}
                      onChange={(event) =>
                        handleInputChangeForBike(index, event)
                      }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                ))}
                <div className="mb-4.5 flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddBenefitForBike}
                    className="btn btn-info  text-black dark:text-white"
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

export default FormLayout;
