import { formatDate } from "../../../helpers";
import AdminTableButton from "../AdminTableButton";
import type { ColumnType } from "../types";
import c from "./Render.module.scss";

type RenderProps = {
  type: ColumnType;
  item: any;
  value?: any;
  actionName?: string;
  onAction?: (item: any) => void;
};

const Render = ({ type, value, onAction, actionName, item }: RenderProps) => {
  switch (type) {
    case "string": {
      if (typeof value !== "string" && value !== "") {
        console.warn("Expected string for string column");
        return null;
      }
      return <p>{value}</p>;
    }
    case "number": {
      if (typeof value !== "number") {
        console.warn("Expected number for number column");
        return null;
      }
      return <p className={c.number}>{value}</p>;
    }
    case "timestamp": {
      if (!(value instanceof Date) && typeof value !== "string") {
        console.warn("Expected Date or string for timestamp column");
        return null;
      }
      return <p>{formatDate(value)}</p>;
    }
    case "action": {
      if (value) console.warn("Value is ignored for action columns");
      return (
        <AdminTableButton onClick={() => onAction?.(item)}>
          {actionName || "Pregledaj"}
        </AdminTableButton>
      );
    }
    case "stringArray": {
      if (!Array.isArray(value) || !value.every((v) => typeof v === "string")) {
        console.warn("Expected string array for stringArray column");
        return null;
      }
      return (
        <div className={c.stringArray}>
          {value.map((v) => (
            <p key={v}>{v}</p>
          ))}
        </div>
      );
    }
    default:
      return null;
  }
};

export default Render;
