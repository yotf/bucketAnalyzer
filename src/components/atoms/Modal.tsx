type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 ">
      <div className="bg-white rounded-lg p-4 max-w-xl w-full flex flex-col">
        <button onClick={onClose} className="text-gray-800 mb-4 self-end ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="max-h-[calc(100vh-100px)] overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
