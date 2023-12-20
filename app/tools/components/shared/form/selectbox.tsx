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
  defaultValue?: string | undefined;
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
  defaultValue,
  options,
  labelClassName,
  SelectClassName,
  optionClassName,
  errorClassName,
  onChange,
  ...props
}: SelectBoxProps) => {
  
  return (
    <>
      <label
        htmlFor={id}
        className={`block mb-2 text-sm font-medium text-gray-900 dark:text-whiteform-label ${labelClassName}`}
      >
        {label}
      </label>
      <Field name={name} id={id} className={SelectClassName}>
        {({ field, meta }: FieldProps) => {
          let selectedValue = field.value || defaultValue || "";
          
          // solve Warning: The `value` prop supplied to <select> must be a scalar value if `multiple` is false.
          selectedValue.length === 0 ? selectedValue = '' : ''

          return (
            <select
              {...field}
              {...props}
              value={selectedValue}
              className={`
              bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${optionClassName}`}
              onChange={onChange || field.onChange}
            >
              {options.map((option: SelectBoxOptionsInterface, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        }}
      </Field>
      <ErrorMessage
        name={name}
        className={`text-red-500 text-sm ${errorClassName ?? ""}`}
      />
    </>
  );
};

export default SelectBox;