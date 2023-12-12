const Modal = ({ title, children, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="border-8 rounded-lg bg-white shadow-lg">
          <div className="px-4 bg-custom-blue text-white flex justify-between items-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose} className="text-xl font-bold hover:text-black">×</button>
          </div>
          <div className="text-sm mt-4 p-4">
            {children}
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;