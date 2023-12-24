import React, { FC } from "react";
import { Field, useField } from "formik";

interface InputProps {
  label?: string;
  id?: string;
  name: string;
  type?: string;
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  inputOnChange?: (value: string) => void;
}


const Input: FC<InputProps> = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
  labelClassName,
  inputClassName,
  errorClassName,
  inputOnChange,
}) => {
  const [, meta, helpers] = useField(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (inputOnChange) {
      inputOnChange(value);
    } else {
      helpers.setValue(value);
    }
  };

  const value = inputOnChange ? undefined : meta.value;

  return (
    <>
      <label htmlFor={id} className={`form-label ${labelClassName}`}>
        {label}
      </label>
      <Field
        type={type}
        name={name}
        className={inputClassName}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {meta.touched && meta.error && (
        <div className={`text-red-500 text-sm ${errorClassName ?? ""}`}>
          {meta.error}
        </div>
      )}
    </>
  );
};


export default Input;