import c from "./AdminPillInput.module.scss";
import CloseIconBlack from "../../../../assets/icons/close-black.svg?react";

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
        <CloseIconBlack
          onClick={() => {
            if (props.value && typeof props.value === "string") {
              removeMember(props.value);
            } else {
              console.log(typeof props.value);
              console.error("nije string");
            }
          }}
        />
      )}
    </div>
  );
};

export default AdminPillInput;
