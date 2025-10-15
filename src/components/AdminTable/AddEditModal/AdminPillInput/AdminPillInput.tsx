import c from "./AdminPillInput.module.scss";
import CloseIcon from "../../../../assets/icons/close.svg?react";

type AdminPillInputProps = {
  removeMember?: (name: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const AdminPillInput: React.FC<AdminPillInputProps> = ({
  removeMember,
  ...props
}) => {
  return (
    <div className={c.pillInputContainer}>
      <input className={c.pillInput} {...props} disabled={props.disabled} />
      {removeMember && (
        <CloseIcon
          onClick={() => {
            if (props.value && typeof props.value === "string") {
              removeMember(props.value);
            } else {
              console.error("Member name is not a string");
            }
          }}
        />
      )}
    </div>
  );
};

export default AdminPillInput;
