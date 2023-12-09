import React, { FC } from 'react';

interface InputProps {
	label: string;
	placeholder?: string;
	className?: string;
}

const Input: FC<InputProps> = (InputProps) => {
	
	return (
		<>
			<div className="mb-3">
				<label htmlFor="name" className="form-label">
					Name
				</label>
				<input
					type="text"
					name="name"
					className="form-control"
					placeholder="John Doe"
				/>
			</div>
		</>
	)
}


export default Input;