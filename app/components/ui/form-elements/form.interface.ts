import { FieldError } from 'react-hook-form'

export interface IButton
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IFieldProps {
	placeholder: string
	error?: FieldError | undefined
}

type TypeInputPropsField = React.InputHTMLAttributes<HTMLInputElement> &
	IFieldProps

export interface IField extends TypeInputPropsField {}
