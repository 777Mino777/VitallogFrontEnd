const Modal = ({ title, children, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClose} className="text-lg font-bold">×</button>
          </div>
          <div className="mt-4">
            {children}
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;