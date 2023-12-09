import React, { ChangeEvent, FC } from "react";

import { ErrorMessage, Field, FieldProps } from "formik";

interface SelectBoxOptionsInterface {
  label: string;
  value: any;
}

interface SelectBoxProps {
  label?: string;
  id?: string;
  name: string;
  options: SelectBoxOptionsInterface[];
  labelClassName?: string;
  SelectClassName?: string;
  optionClassName?: string;
  errorClassName?: string;
  onChange?: (e: ChangeEvent | null) => void;
}

const SelectBox: FC<SelectBoxProps> = ({
  label,
  id,
  name,
  options,
  labelClassName,
  SelectClassName,
  optionClassName,
  errorClassName,
  onChange,
}) => {
  return (
    <>
      <label htmlFor={id} className={`form-label ${labelClassName}`}>
        {label}
      </label>
      <Field name={name} id={id} className={SelectClassName}>
        {({ field, meta }: FieldProps) => (
          <select
            {...field}
            className={optionClassName}
            onChange={onChange || field.onChange}
          >
            {options.map((option: SelectBoxOptionsInterface, index) => (
              <option
                key={index}
                value={option.value}
                defaultValue={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        )}
      </Field>
      <ErrorMessage
        name={name}
        className={`text-red-500 text-sm ${errorClassName ?? ""}`}
      />
    </>
  );
};

export default SelectBox;