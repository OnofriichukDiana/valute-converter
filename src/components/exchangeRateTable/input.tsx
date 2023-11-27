import React from "react";

interface InputProps {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  name,
  value,
  onChange,
  onFocus,
  onBlur,
}) => {
  return (
    <div>
      <input
        className="full-width"
        onChange={onChange}
        type="number"
        name={name}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
