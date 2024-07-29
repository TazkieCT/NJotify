import { useState } from 'react';
import style from '../../styles/widget/Modal.module.css';

interface Modal {
    isOpen: boolean;
    onRequestClose: () => void;
    onSave: (title: string, description: string) => void;
}

const Modal: React.FC<Modal> = ({ isOpen, onRequestClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    onSave(title, description);
    onRequestClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <span className={style.title}>Create Playlist</span>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={style.input}
        />
        <textarea
          placeholder="Description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={style.textarea}
        ></textarea>
        <div className={style.buttons}>
          <button onClick={onRequestClose} className={style.button}>
            Cancel
          </button>
          <button onClick={handleSave} className={style['save-button']}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
