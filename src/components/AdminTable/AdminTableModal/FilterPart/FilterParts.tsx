import type { NumberFilterDesc, StringFilterDesc } from "../../types";

type StringFilterPartProps = {
  type: "string";
  label?: string;
  descriptor: StringFilterDesc<any>;
  remove: () => void;
};

type NumberFilterPartProps = {
  type: "number";
  label?: string;
  descriptor: NumberFilterDesc<any>;
  remove: () => void;
};

type FilterPartProps = StringFilterPartProps | NumberFilterPartProps;

const StringFilterPart = ({
  label,
  descriptor,
  remove,
}: Omit<StringFilterPartProps, "type">) => {
  return (
    <div>
      <h4>{label}</h4>
      <p>Type: {descriptor.type}</p>
      <button onClick={remove}>Remove</button>
    </div>
  );
};

const NumberFilterPart = ({
  label,
  descriptor,
  remove,
}: Omit<NumberFilterPartProps, "type">) => {
  return (
    <div>
      <h4>{label}</h4>
      <p>Type: {descriptor.type}</p>
      <button onClick={remove}>Remove</button>
    </div>
  );
};

const FilterPart = ({ type, label, descriptor, remove }: FilterPartProps) => {
  switch (type) {
    case "string":
      return (
        <StringFilterPart
          label={label}
          descriptor={descriptor}
          remove={remove}
        />
      );
    case "number":
      return (
        <NumberFilterPart
          label={label}
          descriptor={descriptor}
          remove={remove}
        />
      );
  }
};

export default FilterPart;
