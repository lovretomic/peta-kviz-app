import { Timestamp } from "firebase/firestore";
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
  if (value === undefined && type !== "action") return null;
  switch (type) {
    case "string": {
      if (value === "" || value === null || value === undefined) {
        return <p className={c.emptyString}>prazan string</p>;
      }
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
      if (
        !(value instanceof Date) &&
        typeof value !== "string" &&
        !(value instanceof Timestamp)
      ) {
        console.warn(
          "Expected Date or string or Timestamp for timestamp column"
        );
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
          {value.map((v, index) => (
            <p key={`${index}-${v}`}>{v}</p> //ovo sam promijenio jer inače ne mogu biti duplikati imena (ak se to nekad desi)
          ))}
        </div>
      );
    }
    default:
      return null;
  }
};

export default Render;
