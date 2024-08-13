import { AutoComplete } from "antd";

const User = [{ value: "wuys" }, { value: "hung" }, { value: "nam" }];
const Search = () => {
  return (
    <AutoComplete
      className="custom-input"
      style={{ width: 200 }}
      options={User}
      placeholder="try to type `b`"
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
  );
};

export default Search;
