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
      if (typeof value !== "string") {
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
      if (!(value instanceof Date)) {
        console.warn("Expected Date for timestamp column");
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
  }
};

export default Render;
