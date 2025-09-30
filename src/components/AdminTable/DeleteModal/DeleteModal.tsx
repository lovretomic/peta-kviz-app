import AdminButton from "../../AdminButton";
import AdminModal from "../../AdminModal";
import c from "./DeleteModal.module.scss";

type DeleteModalProps = {
  isOpen: boolean;
  itemLabel?: string;
  setIsOpen: (isOpen: boolean) => void;
  onDelete: () => void;
};

const DeleteModal = ({
  isOpen,
  itemLabel,
  setIsOpen,
  onDelete,
}: DeleteModalProps) => {
  const getMessage = () => {
    if (itemLabel) {
      return `Jesi li siguran da želiš obrisati stavku "${itemLabel}"?`;
    }
    return "Jesi li siguran da želiš obrisati ovu stavku?";
  };

  return (
    <AdminModal
      title="Potvrda o brisanju"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className={c.content}>
        <p>{getMessage()}</p>
        <div className={c.buttons}>
          <AdminButton variant="secondary" onClick={() => setIsOpen(false)}>
            Odustani
          </AdminButton>
          <AdminButton
            variant="danger"
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
          >
            Obriši
          </AdminButton>
        </div>
      </div>
    </AdminModal>
  );
};

export default DeleteModal;
