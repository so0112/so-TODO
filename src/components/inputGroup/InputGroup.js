import React from "react";

const InputGroup = ({ type = "text", placeholder = "", value, setValue, setIsError = Boolean }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClick={(e) => setIsError(false)}
      />
    </div>
  );
};

export default InputGroup;
