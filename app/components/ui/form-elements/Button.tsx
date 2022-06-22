import cn from 'classnames'
import { FC } from 'react'

import Spinner from '../spinner/Spinner'

import { IButton } from './form.interface'
import styles from './form.module.scss'

const Button: FC<IButton> = ({ isLoading, children, className, ...rest }) => {
	return (
		<button
			disabled={isLoading}
			className={cn(styles.button, className)}
			{...rest}
		>
			{isLoading && <Spinner />}
			{children}
		</button>
	)
}

export default Button
