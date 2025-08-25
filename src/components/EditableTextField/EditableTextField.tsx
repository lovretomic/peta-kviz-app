import { useState } from "react";
import c from "./EditableTextField.module.scss";
import EditIcon from "../../assets/icons/edit.svg?react";
import clsx from "clsx";

type EditableTextFieldProps = {
  defaultValue: string;
} & React.HTMLAttributes<HTMLParagraphElement>;

const EditableTextField = ({
  defaultValue,
  ...props
}: EditableTextFieldProps) => {
  const [value, setValue] = useState<string>(defaultValue);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className={c.editableTextField}>
      <p
        contentEditable={isEditing}
        suppressContentEditableWarning
        onInput={(e) => setValue(e.currentTarget.textContent || "")}
        {...props}
        className={clsx(props.className, c.text, {
          [c.isEditing]: isEditing,
          [c.isDifferent]: value !== defaultValue,
        })}
      >
        {defaultValue}
      </p>
      <EditIcon
        className={c.editIcon}
        onClick={() => setIsEditing((prev) => !prev)}
      />
    </div>
  );
};

export default EditableTextField;
