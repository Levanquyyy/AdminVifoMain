// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Pagination } from "antd";
const PaginationComponent = () => {
  return (
    <Pagination
      defaultCurrent={6}
      total={500}
      className="align-end custom-pagination justify-end py-4"
    />
  );
};

export default PaginationComponent;
