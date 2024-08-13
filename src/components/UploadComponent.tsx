import React from "react";
import { Upload, Image } from "antd";
import useUpload from "./useUpload"; // Adjust the import path as necessary

const UploadComponent = ({ title }) => {
  const {
    previewOpen,
    previewImage,
    fileList,
    handlePreview,
    handleChange,
    setPreviewOpen,
    setPreviewImage,
  } = useUpload();

  const uploadButton = (
    <button
      style={{ border: 0, background: "none" }}
      type="button"
      className="flex flex-col items-center justify-center"
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
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="col-span-2 mb-3 flex items-center gap-4 border border-stroke p-3 sm:col-span-1">
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      <label className="mb-3 block text-sm font-medium capitalize text-black dark:text-white">
        {title}
      </label>
    </div>
  );
};

export default UploadComponent;
