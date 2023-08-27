import React, { ReactNode} from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  const navigate = useNavigate();
  const modalContainerClass = isOpen ? "fixed inset-0 flex items-center justify-center" : "hidden";
  const modalContentClass = isOpen ? "w-full md:w-1/2 md:h-1/2 border bg-white rounded-lg p-4 z-50 flex items-center justify-center" : "hidden";

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={modalContainerClass}>
      <div
        className="fixed inset-0 bg-black opacity-30"
      ></div>
      <div className={modalContentClass}>
        {children}
        <button
          className="mt-4 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg"
          onClick={()=> {navigate("/")}}
        >
          Close
        </button>
      </div>
    </div>,
    document.getElementById("portal-root") as HTMLElement
  );
};

export default Modal;
