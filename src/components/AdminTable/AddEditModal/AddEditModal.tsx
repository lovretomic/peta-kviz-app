import AdminModal from "../../AdminModal";

type AddEditModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const AddEditModal = ({ isOpen, setIsOpen }: AddEditModalProps) => {
  return (
    <AdminModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="AddEditModal"
    ></AdminModal>
  );
};

export default AddEditModal;
