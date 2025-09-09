import { toLocalInputValue } from "../../../../../helpers";
import {
  NumberFilterOps,
  StringFilterOps,
  TimestampFilterOps,
  type NumberFilterDesc,
  type StringFilterDesc,
  type TimestampFilterDesc,
} from "../../../types";

import c from "./FilterParts.module.scss";

type StringFilterPartProps = {
  type: "string";
  label?: string;
  descriptor: StringFilterDesc<any>;
  remove: () => void;
  edit: (desc: StringFilterDesc<any>) => void;
};

type NumberFilterPartProps = {
  type: "number";
  label?: string;
  descriptor: NumberFilterDesc<any>;
  remove: () => void;
  edit: (desc: NumberFilterDesc<any>) => void;
};

type TimestampFilterPartProps = {
  type: "timestamp";
  label?: string;
  descriptor: TimestampFilterDesc<any>;
  remove: () => void;
  edit: (desc: TimestampFilterDesc<any>) => void;
};

type FilterPartProps =
  | StringFilterPartProps
  | NumberFilterPartProps
  | TimestampFilterPartProps;

const StringFilterPart = ({
  label,
  descriptor,
  remove,
  edit,
}: Omit<StringFilterPartProps, "type">) => {
  return (
    <div className={c.filterPart}>
      <div className={c.header}>
        <p className={c.type}>{descriptor.type}</p>
        <h4 className={c.label}>{label}</h4>
      </div>
      <div className={c.inputs}>
        <select
          name=""
          id=""
          value={descriptor.op}
          onChange={(e) => edit?.({ ...descriptor, op: e.target.value as any })}
        >
          {StringFilterOps.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={descriptor.value}
          onChange={(e) => edit?.({ ...descriptor, value: e.target.value })}
        />
      </div>

      <button onClick={remove}>Ukloni</button>
    </div>
  );
};

const NumberFilterPart = ({
  label,
  descriptor,
  remove,
  edit,
}: Omit<NumberFilterPartProps, "type">) => {
  return (
    <div className={c.filterPart}>
      <div className={c.header}>
        <p className={c.type}>{descriptor.type}</p>
        <h4 className={c.label}>{label}</h4>
      </div>
      <div className={c.inputs}>
        <select
          name=""
          id=""
          value={descriptor.op}
          onChange={(e) => edit?.({ ...descriptor, op: e.target.value as any })}
        >
          {NumberFilterOps.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
        <input
          type="number"
          id={descriptor.id as string}
          value={descriptor.a}
          onChange={(e) =>
            edit?.({ ...descriptor, a: e.target.value as unknown as number })
          }
        />
        {descriptor.op === "between" && (
          <>
            <input
              type="number"
              id={descriptor.id as string}
              value={descriptor.b}
              onChange={(e) =>
                edit?.({
                  ...descriptor,
                  b: e.target.value as unknown as number,
                })
              }
            />
          </>
        )}
      </div>

      <button onClick={remove}>Ukloni</button>
    </div>
  );
};

const TimestampFilterPart = ({
  label,
  descriptor,
  remove,
  edit,
}: Omit<TimestampFilterPartProps, "type">) => {
  return (
    <div className={c.filterPart}>
      <div className={c.header}>
        <p className={c.type}>{descriptor.type}</p>
        <h4 className={c.label}>{label}</h4>
      </div>
      <div className={c.inputs}>
        <select
          name=""
          value={descriptor.op}
          onChange={(e) => edit?.({ ...descriptor, op: e.target.value as any })}
        >
          {TimestampFilterOps.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={descriptor.a ? toLocalInputValue(descriptor.a) : ""}
          onChange={(e) => {
            const v = e.target.value;
            const d = v ? new Date(v) : undefined;
            edit?.({ ...descriptor, a: d });
          }}
        />
        {descriptor.op === "between" && (
          <>
            <input
              type="datetime-local"
              value={descriptor.a ? toLocalInputValue(descriptor.a) : ""}
              onChange={(e) => {
                const v = e.target.value;
                const d = v ? new Date(v) : undefined;
                edit?.({ ...descriptor, a: d });
              }}
            />
          </>
        )}
      </div>

      <button onClick={remove}>Ukloni</button>
    </div>
  );
};

const FilterPart = ({
  type,
  label,
  descriptor,
  remove,
  edit,
}: FilterPartProps) => {
  switch (type) {
    case "string":
      return (
        <StringFilterPart
          label={label}
          descriptor={descriptor}
          remove={remove}
          edit={edit}
        />
      );
    case "number":
      return (
        <NumberFilterPart
          label={label}
          descriptor={descriptor}
          remove={remove}
          edit={edit}
        />
      );
    case "timestamp":
      return (
        <TimestampFilterPart
          label={label}
          descriptor={descriptor}
          remove={remove}
          edit={edit}
        />
      );
  }
};

export default FilterPart;
