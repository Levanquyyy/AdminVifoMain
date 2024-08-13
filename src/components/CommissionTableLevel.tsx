// CommissionTable.tsx
import { commissiontablelevel } from "@/types/commissiontablelevel";
import { Checkbox, InputNumber, Select, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

const columns: TableProps<commissiontablelevel>["columns"] = [
  {
    title: "#",
    dataIndex: "key",
    key: "key",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Family - Provider",
    dataIndex: "Family_Providers",
    key: "Family_Providers",
    render: (_, { Family_Providers }) => (
      <>
        {Family_Providers?.map((Family_Provider) => {
          let color = Family_Provider.length > 5 ? "geekblue" : "green";
          if (Family_Provider === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={Family_Provider}>
              {Family_Provider.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Level 1",
    dataIndex: "Level1",
    key: "Level1",
    render: () => (
      <div style={{ width: "100%" }}>
        <InputNumber
          min={1}
          max={10}
          defaultValue={0}
          style={{ width: "100%" }}
        />
      </div>
    ),
  },
  {
    title: "Level 2",
    dataIndex: "Level2",
    key: "Level2",
    render: () => (
      <div style={{ width: "100%" }}>
        <InputNumber
          min={1}
          max={10}
          defaultValue={0}
          style={{ width: "100%" }}
        />
      </div>
    ),
  },
  {
    title: "Level 3",
    key: "Level3",
    dataIndex: "Level3",
    render: () => (
      <div style={{ width: "100%" }}>
        <InputNumber
          min={1}
          max={10}
          defaultValue={0}
          style={{ width: "100%" }}
        />
      </div>
    ),
  },
  {
    title: "Level 4",
    key: "Level4",
    dataIndex: "Level4",
    render: () => (
      <div style={{ width: "100%" }}>
        <InputNumber
          min={1}
          max={10}
          defaultValue={0}
          style={{ width: "100%" }}
        />
      </div>
    ),
  },
  {
    title: "Level 5",
    key: "Level5",
    dataIndex: "Level5",
    render: () => (
      <div style={{ width: "100%" }}>
        <InputNumber
          min={1}
          max={10}
          defaultValue={0}
          style={{ width: "100%" }}
        />
      </div>
    ),
  },
  {
    title: "Enabler",
    key: "enabler",
    dataIndex: "enabler",
    render: () => (
      <div style={{ width: "100%" }}>
        <Checkbox onChange={(e) => console.log(e.target.checked)}></Checkbox>
      </div>
    ),
  },
  {
    title: "Restriction Ranks",
    key: "RestrictionRanks",
    dataIndex: "RestrictionRanks",
    render: () => (
      <div style={{ width: "100%" }}>
        <Select
          defaultValue="0ucy"
          style={{ width: "100%" }}
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
      </div>
    ),
  },
];

const CommissionTable = ({ data }) => {
  return <Table columns={columns} dataSource={data} />;
};

export default CommissionTable;
