import React from 'react';

export function InputGroup({
  type = 'text',
  placeholder = '',
  value,
  setValue,
  setIsError = Boolean,
}) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        onClick={() => setIsError(false)}
      />
    </div>
  );
}
