import React, { FC } from 'react';

import { ErrorMessage, Field } from 'formik';

interface TextAreaProps {
	label?: string;
	id?: string;
	name: string;
	rows?: number;
	placeholder?: string;
	labelClassName?: string;
	inputClassName?: string;
	errorClassName?: string;
}


const TextArea: FC<TextAreaProps> = ({
	label,
	id,
	name,
	rows,
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
				// type={type}
				name={name}
				className={inputClassName}
				placeholder={placeholder}
				component="textarea"
				as="textarea"
				rows = {rows}
			/>
			<ErrorMessage name={name} className={`text-red-500 text-sm ${errorClassName ?? ''}`}/>

		</>
	)
}


export default TextArea;