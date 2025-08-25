import "./index.scss";
import type { ModalProps } from "./types";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      data-testid="modal-overlay"
      className={`modal-overlay ${!isOpen ? "hidden" : ""}`}
      onClick={() => onClose()}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{fontWeight: "bolder", fontSize:"20px"}}>{title}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="modal-body" role="dialog">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
