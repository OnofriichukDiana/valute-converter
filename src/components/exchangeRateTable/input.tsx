import React, { useState } from "react";
import EditIcon from "./EditIcon";
import CorrectIcon from "./CorrectIcon";
import ErrorIcon from "./ErrorIcon";
import { ExchangeRateItem } from "../../pages/Converter";

export interface InputProps {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus: React.FocusEventHandler<HTMLInputElement>;
  onBlur: (
    e: React.ChangeEvent<HTMLInputElement>,
    isCorrectValue: boolean
  ) => void;
  initial: any;
}

const Input: React.FC<InputProps> = ({
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  initial,
}) => {
  const [isCorrectValue, setIsCorrectValue] = useState(false);
  const [isErrorValue, setIsErrorValue] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(e);
    const initialValue = initial[e.currentTarget.name];
    const lowerBound = +initialValue - initialValue * 0.1;
    const upperBound = +initialValue + initialValue * 0.1;
    if (+newValue >= lowerBound && +newValue <= upperBound) {
      setIsCorrectValue(true);
      setIsErrorValue(false);
    } else {
      setIsErrorValue(true);
      setIsCorrectValue(false);
    }
  };

  return (
    <div className="relative w-14 input-wrapper">
      <EditIcon />
      {isCorrectValue && <CorrectIcon />}
      {isErrorValue && <ErrorIcon />}
      <input
        className={`w-14 p-0.5`}
        onChange={handleChange}
        type="number"
        name={name}
        value={value}
        onFocus={onFocus}
        onBlur={(e) => {
          onBlur(e, isCorrectValue);
          setIsErrorValue(false);
          setIsCorrectValue(false);
        }}
      />
    </div>
  );
};

export default Input;
