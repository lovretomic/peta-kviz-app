import AdminPillInput from "./AdminPillInput/AdminPillInput";
import c from "./AdminMemberList.module.scss";
import AdminButton from "../AdminButton";
import type { AdminTableColumn } from "../AdminTable/types";

type AdminMemberListProps = {
  column: AdminTableColumn<any>;
  items: string[];
  disabled?: boolean;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
};

const AdminMemberList: React.FC<AdminMemberListProps> = ({
  column,
  items,
  disabled,
  onAdd,
  onRemove,
  onChange,
}) => {
  return (
    <div>
      <div className={c.pillsContainer}>
        {items &&
          items.map((value: string, index: number) => (
            <div key={`${String(column.id)}-${index}`}>
              <AdminPillInput
                type="text"
                name={column.id as string}
                id={column.id as string}
                value={value}
                disabled={disabled}
                placeholder="Unesi novog člana"
                removeMember={() => onRemove(index)}
                onChange={(e) => onChange(index, e.target.value)}
                maxLength={35}
              />
            </div>
          ))}
      </div>
      <AdminButton disabled={disabled} onClick={onAdd}>
        Dodaj
      </AdminButton>
    </div>
  );
};

export default AdminMemberList;
