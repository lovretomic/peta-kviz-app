import c from "./AdminTable.module.scss";

export type AdminTableColumn<T> = {
  id: keyof T;
  label: string;
  render: (item: T) => React.ReactNode;
};

const AdminTable = () => {
  return <div className={c.adminTable}></div>;
};

export default AdminTable;
