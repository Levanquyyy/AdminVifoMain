"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Button, Checkbox, Collapse, InputNumber, Select, Input } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";

const { TextArea } = Input;

const FormLayout = () => {
  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const [formSections, setFormSections] = useState([
    { answerText: "", answerValue: "", answerCode: "", answerNote: "" },
  ]);
  const [questionText, setQuestionText] = useState("");
  const [questionCode, setQuestionCode] = useState("");
  const [position, setPosition] = useState("");
  const [provider, setProvider] = useState([]);
  const [rank, setRank] = useState([]);
  const [family, setFamily] = useState("");
  const [questionType, setQuestionType] = useState("");

  const handleInputChange = (index: number, field: string, value: string) => {
    const newFormSections = [...formSections];
    newFormSections[index][field] = value;
    setFormSections(newFormSections);
  };

  const handleAddAnswer = () => {
    setFormSections([
      ...formSections,
      { answerText: "", answerValue: "", answerCode: "", answerNote: "" },
    ]);
  };

  const handleDeleteAnswer = (index: number) => {
    const newFormSections = formSections.filter((_, i) => i !== index);
    setFormSections(newFormSections);
  };

  const isAddAnswerDisabled = formSections.some(
    (section) =>
      !section.answerText ||
      !section.answerValue ||
      !section.answerCode ||
      !section.answerNote,
  );

  const isSubmitDisabled = () => {
    return (
      !questionText ||
      !questionCode ||
      !position ||
      !provider.length ||
      !rank.length ||
      !family ||
      !questionType ||
      isAddAnswerDisabled
    );
  };

  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: "Add Question",
      children: (
        <>
          <Breadcrumb pageName="Your level: 1" />
          <form>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="text-md  block font-medium capitalize text-black dark:text-white">
                        Family
                      </label>
                      <Select
                        defaultValue="lucy"
                        className="w-full"
                        options={[
                          { value: "jack", label: "Jack" },
                          { value: "lucy", label: "Lucy" },
                          { value: "Yiminghe", label: "yiminghe" },
                        ]}
                        onChange={(value) => setFamily(value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="text-md  block font-medium capitalize text-black dark:text-white">
                        Provider
                      </label>
                      <Select
                        mode="multiple"
                        size={"middle"}
                        placeholder="Please select"
                        style={{ width: "100%" }}
                        options={options}
                        value={provider}
                        // onChange={setProvider}
                        onChange={(value) => setProvider(value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="text-md  block font-medium capitalize text-black dark:text-white">
                        Rank
                      </label>
                      <Select
                        mode="multiple"
                        size={"middle"}
                        placeholder="Please select"
                        style={{ width: "100%" }}
                        options={options}
                        value={rank}
                        onChange={(value) => setRank(value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label
                        htmlFor="Question"
                        className="text-md mb-3 block font-medium capitalize text-black dark:text-white"
                      >
                        Question Text *
                      </label>
                      <TextArea
                        id="Question"
                        rows={8}
                        className="dark:border-strokedark dark:bg-boxdark dark:text-white"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                        Question Code
                        <strong className="text-red">*</strong>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="English"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={questionCode}
                        onChange={(e) => setQuestionCode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="text-md  block font-medium capitalize text-black dark:text-white">
                        Question Type
                      </label>
                      <Select
                        defaultValue="lucy"
                        className="w-full"
                        options={[
                          { value: "jack", label: "Jack" },
                          { value: "lucy", label: "Lucy" },
                          { value: "Yiminghe", label: "yiminghe" },
                        ]}
                        onChange={(value) => setQuestionType(value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-3">
                    <div className="flex flex-col gap-5.5 p-3">
                      <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
                        Position
                      </label>
                      <InputNumber
                        min={1}
                        max={10}
                        defaultValue={1}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={position}
                        onChange={(value) => setPosition(value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <label className=" mb-3 block text-3xl  font-bold capitalize text-black dark:text-white">
                  Answer Data
                </label>
                <div className="border border-stroke">
                  {formSections.map((section, index) => (
                    <div
                      key={index}
                      className="mb-4.5 border border-stroke p-3"
                    >
                      <div className="w-full">
                        <div className="p-3">
                          <div className="flex flex-col gap-5.5">
                            <label className=" text-md block font-semibold capitalize text-black dark:text-white">
                              Answer Text *
                            </label>
                            <input
                              required
                              type="text"
                              placeholder="English"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              value={section.answerText}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "answerText",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="flex flex-col gap-5.5">
                            <label className=" text-md block font-semibold capitalize text-black dark:text-white">
                              Answer Value *
                            </label>
                            <input
                              required
                              type="text"
                              placeholder="English"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              value={section.answerValue}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "answerValue",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="flex flex-col gap-5.5">
                            <label className=" text-md block font-semibold capitalize text-black dark:text-white">
                              Answer Code
                            </label>
                            <input
                              required
                              type="text"
                              placeholder="English"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              value={section.answerCode}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "answerCode",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="flex flex-col gap-5.5">
                            <label className=" text-md block font-semibold capitalize text-black dark:text-white">
                              Answer Note
                            </label>
                            <input
                              required
                              type="text"
                              placeholder="English"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              value={section.answerNote}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "answerNote",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <Button
                        type="primary"
                        danger
                        onClick={() => handleDeleteAnswer(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  type="primary"
                  className="my-3 bg-primary"
                  disabled={isAddAnswerDisabled}
                  onClick={handleAddAnswer}
                >
                  Add Answer
                </Button>
              </div>
            </div>

            <Button
              type="primary"
              className="w-full"
              disabled={isSubmitDisabled()}
            >
              {" "}
              Thêm Bảo Hiểm
            </Button>
          </form>
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
    </DefaultLayout>
  );
};

export default FormLayout;
