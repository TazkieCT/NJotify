import style from '../../styles/widget/Modal.module.css';

interface Modal {
    isOpen: boolean;
    onRequestClose: () => void;
    onSave: () => void;
}

const ModalDelete: React.FC<Modal> = ({ isOpen, onRequestClose, onSave }) => {

  const handleSave = () => {
    onSave();
    onRequestClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={style.overlay}>
      <div className={style['modal-delete']}>
        <span className={style.title}>You want to delete the playlist</span>
        <div className={style.buttons}>
          <button onClick={onRequestClose} className={style.button}>
            Cancel
          </button>
          <button onClick={handleSave} className={style['save-button']}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
