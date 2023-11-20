const InputField = ({ label, type, placeholder, value, onChange}) => {
  return (
    <div className="mb-4">
      <label htmlFor={label} className="block text-start text-gray-700 text-sm font-bold mb-2" >
        {label}
      </label>
      <input 
        type={type}
        id={label}
        className="shadow-md appearance-none border-4 border-gray-400 rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
  
export default InputField

