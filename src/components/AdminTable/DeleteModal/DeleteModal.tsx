import AdminButton from "../../AdminButton";
import AdminModal from "../../AdminModal";
import c from "./DeleteModal.module.scss";

type DeleteModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDelete: () => void;
};

const DeleteModal = ({ isOpen, setIsOpen, onDelete }: DeleteModalProps) => {
  return (
    <AdminModal
      title="Potvrda o brisanju"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className={c.content}>
        <p>Jesi li siguran da želiš obrisati ovu stavku?</p>
        <div className={c.buttons}>
          <AdminButton variant="secondary" onClick={() => setIsOpen(false)}>
            Odustani
          </AdminButton>
          <AdminButton
            variant="primary"
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
