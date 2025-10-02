export default function AddressField({ label, name, type = "text", value, onChange, onBlur, error, required = false, 
    disabled = false, placeholder = "", options = [] 
}) {
  const fieldClasses = `w-full border rounded px-3 py-2 ${error ? "border-red-500" : ""}`;

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      
      {type === "select" ? (
        <select name={name} className={fieldClasses} value={value} onChange={onChange} onBlur={onBlur} disabled={disabled}>
          <option value="">Select...</option>
          {options.map((option, idx) => (
            <option key={idx} value={option.value}> {option.label} </option>
          ))}
        </select>
      ) : (
        <input type={type} name={name} className={fieldClasses} value={value} onChange={onChange} onBlur={onBlur} 
            disabled={disabled} placeholder={placeholder} />
      )}
      
      {error && ( <div className="text-xs text-red-500 mt-1">{error}</div> )}
    </div>
  );
}