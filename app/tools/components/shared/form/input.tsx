import React, { FC } from 'react';

import { ErrorMessage, Field } from 'formik';

interface InputProps {
	label?: string;
	id?: string;
	name: string;
	type?: string;
	placeholder?: string;
	labelClassName?: string;
	inputClassName?: string;
	errorClassName?: string;
}


const Input: FC<InputProps> = ({
	label,
	id,
	name,
	type = 'text',
	placeholder,
	labelClassName,
	inputClassName,
	errorClassName,
}) => {

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
			/>
			<ErrorMessage name={name} className={`text-red-500 text-sm ${errorClassName ?? ''}`} component="div"/>

		</>
	)
}


export default Input;