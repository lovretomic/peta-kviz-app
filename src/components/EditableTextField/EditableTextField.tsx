import { useEffect, useState } from "react";
import c from "./EditableTextField.module.scss";
import EditIcon from "../../assets/icons/edit.svg?react";
import CheckIcon from "../../assets/icons/check.svg?react";
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

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

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
      {isEditing && (
        <CheckIcon
          className={c.checkIcon}
          onClick={() => {
            setIsEditing(false);
          }}
        />
      )}
      {!isEditing && (
        <EditIcon
          className={c.editIcon}
          onClick={() => setIsEditing((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default EditableTextField;
